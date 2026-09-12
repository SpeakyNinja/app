<template>
    <div class="dialog-play main-bg">
        <header class="dialog-play__header">
            <button
                v-if="!engagementPreview"
                type="button"
                class="dialog-play__back no-select"
                aria-label="Назад"
                @click="goBack"
            >
                <IcoArrow height="18" fill="#ebebed" />
            </button>
            <div class="dialog-play__timer m-light">{{ timerText }}</div>
        </header>

        <div v-if="previewError" class="dialog-play__error m-light">
            {{ previewError }}
        </div>

        <div v-else-if="ready" class="dialog-play__body">
            <div class="dialog-play__content no-scrollbar">
                <div class="dialog-play__mascot">
                    <TalosEyes
                        :mood="currentMood"
                        mood-transition
                        :mood-transition-ms="500"
                        fill="#ebebed"
                        class="ai-image"
                    />
                </div>

                <div class="dialog-play__texts">
                    <template v-for="(step, stepIndex) in visibleReplicaSteps" :key="`${screenKey}-${stepIndex}`">
                        <p
                            v-for="(line, lineIndex) in step.lines"
                            :key="`${screenKey}-${stepIndex}-${lineIndex}`"
                            class="dialog-play__line m-light dialog-play__line--enter"
                        >{{ line }}</p>
                    </template>
                </div>
            </div>

            <Transition name="dialog-answers">
                <div v-if="replicasReady && choices.length" class="dialog-play__answers">
                    <button
                        v-for="choice in choices"
                        :key="choice.id"
                        type="button"
                        class="dialog-play__answer item m-light no-select dialog-play__answer--enter"
                        :disabled="busy"
                        @click="onChoice(choice)"
                    >{{ choice.label }}</button>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue';
import IcoArrow from '@/components/icons/IcoArrow.vue';
import TalosEyes from '@/components/TalosEyes.vue';
import CanvasDialogService, { replicaScreenSteps } from '@/services/CanvasDialogService.js';
import { normalizeTalosEyesMoodKey } from '@/utils/talosEyesMoods.js';
import { isEngagementPreviewActive } from '@/utils/engagementPreviewBootstrap.js';

const ANSWERS_REVEAL_MS = 280;

export default {
    components: { IcoArrow, TalosEyes },

    props: {
        slug: { type: String, required: true },
    },

    data() {
        return {
            engagementPreview: false,
            previewError: '',
            ready: false,
            busy: false,
            state: null,
            view: null,
            timerSeconds: 24 * 60 * 60 - 1,
            timerInterval: null,
            screenKey: 0,
            visibleReplicaCount: 0,
            replicasReady: false,
            replicaTimers: [],
        };
    },

    computed: {
        replicaSteps() {
            return replicaScreenSteps(this.view);
        },

        visibleReplicaSteps() {
            return this.replicaSteps.slice(0, this.visibleReplicaCount);
        },

        choices() {
            return this.view?.reactions || [];
        },

        currentMood() {
            return normalizeTalosEyesMoodKey(this.view?.mood);
        },

        timerText() {
            const s = Math.max(0, this.timerSeconds);
            const h = Math.floor(s / 3600);
            const m = Math.floor((s % 3600) / 60);
            const sec = s % 60;
            const pad = (n) => String(n).padStart(2, '0');
            return `${pad(h)}:${pad(m)}:${pad(sec)}`;
        },
    },

    async beforeMount() {
        this.modal = inject('modal');
        this.preloader = inject('preloader');
        this.engagementPreview = isEngagementPreviewActive(this.$route, inject('engagementPreview', false));
        this.api = new CanvasDialogService();
        this.startTimer();

        try {
            this.preloader.show = true;
            const res = this.engagementPreview
                ? await this.api.initEngagementPreview(this.slug)
                : await this.api.init(this.slug);
            if (this._unmounted) {
                return;
            }
            await this.applyResponse(res, { startSequence: false });
            if (this._unmounted) {
                return;
            }
            this.ready = true;
            await this.scheduleReplicaSequence();
        } catch (e) {
            if (this.engagementPreview) {
                this.previewError = this.normalizeError(e).message || 'Не удалось загрузить превью холста';
                this.ready = false;
                return;
            }
            this.modal.show(this.normalizeError(e));
            this.goBack();
        } finally {
            this.preloader.show = false;
        }
    },

    beforeUnmount() {
        this._unmounted = true;
        this.clearReplicaTimers();
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    },

    methods: {
        startTimer() {
            this.timerInterval = setInterval(() => {
                if (this.timerSeconds > 0) {
                    this.timerSeconds -= 1;
                }
            }, 1000);
        },

        clearReplicaTimers() {
            this.replicaTimers.forEach((id) => clearTimeout(id));
            this.replicaTimers = [];
        },

        async scheduleReplicaSequence() {
            await this.$nextTick();
            if (!this.ready) {
                return;
            }
            this.startReplicaSequence();
        },

        startReplicaSequence() {
            this.clearReplicaTimers();
            this.screenKey += 1;
            const seq = this.screenKey;
            const steps = [...this.replicaSteps];

            if (!steps.length) {
                this.visibleReplicaCount = 0;
                this.replicasReady = true;
                return;
            }

            this.visibleReplicaCount = 0;
            this.replicasReady = false;

            const revealStep = (index) => {
                if (seq !== this.screenKey) {
                    return;
                }

                this.visibleReplicaCount = index + 1;

                if (index + 1 >= steps.length) {
                    const timerId = setTimeout(() => {
                        if (seq === this.screenKey) {
                            this.replicasReady = true;
                        }
                    }, ANSWERS_REVEAL_MS);
                    this.replicaTimers.push(timerId);
                    return;
                }

                const delayMs = Math.max(0, steps[index + 1].delayBefore) * 1000;
                const timerId = setTimeout(() => revealStep(index + 1), delayMs);
                this.replicaTimers.push(timerId);
            };

            revealStep(0);
        },

        goBack() {
            if (this.engagementPreview) {
                return;
            }
            this.clearReplicaTimers();
            this.$router.push('/dialog-test');
        },

        async applyResponse(res, options = { startSequence: true }) {
            if (this._unmounted) {
                return;
            }

            if (!res?.success) {
                throw res;
            }

            if (res.closed) {
                this.clearReplicaTimers();
                if (this._unmounted) {
                    return;
                }
                if (this.engagementPreview) {
                    this.previewError = 'Диалог завершён';
                    this.ready = false;
                    return;
                }
                this.$router.push('/training');
                return;
            }

            this.state = res.state;

            const reactions = res.view?.reactions || [];
            const needsDoors = (res.view?.is_endpoint && !reactions.length) || res.needs_doors;

            if (needsDoors) {
                this.view = await this.viewWithDoors(res.view);
            } else {
                this.view = res.view;
            }

            if (this._unmounted) {
                return;
            }

            if (options.startSequence) {
                await this.scheduleReplicaSequence();
            }
        },

        async viewWithDoors(view) {
            const doors = this.engagementPreview
                ? await this.api.doorsEngagementPreview(this.slug, this.state)
                : await this.api.doors(this.slug, this.state);
            if (!doors?.success) {
                throw doors;
            }

            if (!doors.choices?.length) {
                return view;
            }

            return {
                ...view,
                reactions: doors.choices.map((c) => ({ id: c.id, label: c.label })),
            };
        },

        async onChoice(choice) {
            if (this.busy || !this.state || !this.replicasReady) {
                return;
            }

            if (this.view?.is_endpoint && !(this.view?.reactions || []).length) {
                this.view = await this.viewWithDoors(this.view);
                if (this._unmounted) {
                    return;
                }
                await this.scheduleReplicaSequence();
                return;
            }

            this.busy = true;
            try {
                const res = this.engagementPreview
                    ? await this.api.reactionEngagementPreview(this.slug, this.state, choice.id)
                    : await this.api.reaction(this.slug, this.state, choice.id);
                if (this._unmounted) {
                    return;
                }
                await this.applyResponse(res);
            } catch (e) {
                if (this._unmounted) {
                    return;
                }
                if (this.engagementPreview) {
                    this.previewError = this.normalizeError(e).message || 'Ошибка при выборе ответа';
                    return;
                }
                this.modal.show(this.normalizeError(e));
            } finally {
                if (!this._unmounted) {
                    this.busy = false;
                }
            }
        },

        normalizeError(e) {
            if (e?.message && e?.success === false) {
                return e;
            }
            const data = e?.response?.data;
            return {
                message: data?.message || e?.message || 'Ошибка',
            };
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';

.dialog-play {
    flex: 1;
    width: 100%;
    height: 100%;
    min-height: 0;
    flex-direction: column;
    color: #ebebed;
    overflow: hidden;
}

.dialog-play__header {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 80px;
    width: 100%;
    border-bottom: 1px solid #4c4d57;
}

.dialog-play__back {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.dialog-play__timer {
    font-family: RobotoMonoBold, monospace;
    font-size: 22px;
    letter-spacing: 0.05em;
}

.dialog-play__error {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    text-align: center;
    font-size: 16px;
    line-height: 1.4;
    color: #9091a1;
}

.dialog-play__body {
    flex: 1;
    min-height: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.dialog-play__content {
    flex: 1;
    min-height: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 25px 20px;
}

.dialog-play__mascot {
    flex-shrink: 0;
    width: 100%;
    min-height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog-play__texts {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    padding-top: 20px;
    padding-bottom: 24px;
    text-align: left;
}

.dialog-play__line {
    width: 100%;
    margin: 0;
    font-size: 20px;
    line-height: 1.35;
    letter-spacing: 1px;
    text-align: left;
    word-wrap: break-word;
    overflow-wrap: anywhere;

    &--enter {
        animation: dialog-line-in 0.45s ease forwards;
    }
}

@keyframes dialog-line-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dialog-play__answers {
    flex-shrink: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.dialog-play__answer {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 20px 50px;
    cursor: pointer;
    border: none;
    background: transparent;
    color: #ebebed;
    font-size: 20px;
    letter-spacing: 1px;
    position: relative;
    border-top: 1px solid #ebebed;
    border-image: linear-gradient(to right, transparent 15%, #69696d, transparent 85%);
    border-image-slice: 1;

    &--enter {
        animation: dialog-line-in 0.4s ease forwards;
    }

    &:first-child {
        border-top: none;
    }

    &:disabled {
        opacity: 0.55;
        cursor: default;
    }

    &:active:not(:disabled) {
        opacity: 0.85;
    }
}

.dialog-answers-enter-active {
    transition: opacity 0.35s ease, transform 0.35s ease;
}

.dialog-answers-enter-from {
    opacity: 0;
    transform: translateY(12px);
}

.dialog-answers-enter-to {
    opacity: 1;
    transform: translateY(0);
}
</style>
