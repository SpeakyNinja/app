<template>
    <SalonChatShell
        ref="shell"
        title="Talos"
        :subtitle="subtitle"
        show-talos-avatar
        :talos-mood="talosMood"
        anchor-bottom
    >
        <SalonMessage
            v-if="bootMessage"
            role="system"
            variant="system"
            :show-avatar="false"
            :entering="true"
        >
            {{ bootMessage }}
        </SalonMessage>

        <SalonMessage
            v-for="msg in messages"
            :key="msg.id"
            :role="msg.role"
            :variant="msg.variant"
            :time="msg.time"
            :show-avatar="msg.showAvatar"
            :entering="msg.entering"
        >
            {{ msg.text }}
        </SalonMessage>

        <SalonTypingIndicator v-if="typing" />

        <template #footer>
            <div v-if="loadError" class="cf-salon__dialog-end">
                {{ loadError }}
            </div>
            <div v-else-if="choices.length" class="cf-salon__stack-btns" role="listbox" aria-label="Варианты ответа">
                <button
                    v-for="(choice, i) in choices"
                    :key="choice.id"
                    type="button"
                    class="cf-salon__stack-btn cf-salon__press-btn"
                    :disabled="busy"
                    :style="{ animationDelay: `${0.06 + i * 0.04}s` }"
                    @click="onChoice(choice)"
                >
                    {{ choice.label }}
                </button>
            </div>
            <p v-else-if="closed" class="cf-salon__dialog-end m-light">
                Диалог завершён · можно вернуться к входящим
            </p>
        </template>
    </SalonChatShell>
</template>

<script>
import SalonChatShell from '@/components/designPreview/concepts/salon/SalonChatShell.vue';
import SalonMessage from '@/components/designPreview/concepts/salon/SalonMessage.vue';
import SalonTypingIndicator from '@/components/designPreview/concepts/salon/SalonTypingIndicator.vue';
import CanvasDialogService, { replicaScreenSteps } from '@/services/CanvasDialogService.js';
import { normalizeTalosEyesMoodKey } from '@/utils/talosEyesMoods.js';

const CANVAS_SLUG = 'intro-dialog';
const TYPING_BASE_MS = 720;
const TYPING_MIN_MS = 520;
const TYPING_PER_DELAY_SEC = 1000;
const ANSWERS_REVEAL_MS = 280;
const MESSAGE_STAGGER_MS = 120;

let messageId = 0;

function nextMessageId() {
    messageId += 1;
    return `salon-msg-${messageId}`;
}

function formatTime(date = new Date()) {
    const pad = (n) => String(n).padStart(2, '0');

    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default {
    name: 'SalonDialogPlayer',

    components: {
        SalonChatShell,
        SalonMessage,
        SalonTypingIndicator,
    },

    props: {
        canvasSlug: { type: String, default: CANVAS_SLUG },
        canvasTitle: { type: String, default: 'Вступительный диалог' },
    },

    data() {
        return {
            api: null,
            state: null,
            messages: [],
            choices: [],
            typing: false,
            busy: false,
            closed: false,
            loadError: '',
            bootMessage: '',
            talosMood: 'listening',
            timerSeconds: 24 * 60 * 60 - 1,
            timerInterval: null,
            playToken: 0,
            timers: [],
        };
    },

    computed: {
        subtitle() {
            const pad = (n) => String(n).padStart(2, '0');
            const s = Math.max(0, this.timerSeconds);
            const h = Math.floor(s / 3600);
            const m = Math.floor((s % 3600) / 60);
            const sec = s % 60;

            return `${this.canvasTitle} · ${pad(h)}:${pad(m)}:${pad(sec)}`;
        },
    },

    async mounted() {
        this.api = new CanvasDialogService();
        this.timerInterval = setInterval(() => {
            if (this.timerSeconds > 0) {
                this.timerSeconds -= 1;
            }
        }, 1000);

        this.bootMessage = 'Диалог из холста конструктора. История сохраняется, как в мессенджере.';

        try {
            const res = await this.api.initEngagementPreview(this.canvasSlug);
            await this.applyResponse(res);
        } catch (e) {
            this.loadError = e?.message || 'Не удалось загрузить диалог';
        }
    },

    beforeUnmount() {
        this.clearTimers();
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    },

    methods: {
        clearTimers() {
            this.timers.forEach((id) => clearTimeout(id));
            this.timers = [];
        },

        wait(ms) {
            return new Promise((resolve) => {
                const id = setTimeout(resolve, ms);
                this.timers.push(id);
            });
        },

        scrollChatToBottom() {
            return this.$refs.shell?.scrollToBottom?.() ?? Promise.resolve();
        },

        lastTalosText() {
            const last = [...this.messages].reverse().find((m) => m.role === 'talos');

            return last?.text || '';
        },

        pushTalosMessage(text, showAvatar = false) {
            if (!text || text === this.lastTalosText()) {
                return;
            }

            const prevTalos = [...this.messages].reverse().find((m) => m.role === 'talos');
            if (prevTalos) {
                prevTalos.showAvatar = false;
            }

            this.messages.push({
                id: nextMessageId(),
                role: 'talos',
                variant: 'default',
                text,
                time: showAvatar ? formatTime() : '',
                showAvatar,
                entering: true,
            });

            this.$nextTick(() => {
                this.scrollChatToBottom();
            });
        },

        pushUserMessage(text) {
            this.messages.push({
                id: nextMessageId(),
                role: 'user',
                variant: 'user',
                text,
                time: formatTime(),
                showAvatar: false,
                entering: true,
            });

            this.$nextTick(() => {
                this.scrollChatToBottom();
            });
        },

        async viewWithDoors(view) {
            const doors = await this.api.doorsEngagementPreview(this.canvasSlug, this.state);
            if (!doors?.success || !doors.choices?.length) {
                return view;
            }

            return {
                ...view,
                reactions: doors.choices.map((choice) => ({
                    id: choice.id,
                    label: choice.label,
                })),
            };
        },

        async applyResponse(res) {
            if (!res?.success) {
                throw res;
            }

            if (res.closed) {
                this.closed = true;
                this.choices = [];
                this.talosMood = 'happy';
                return;
            }

            this.state = res.state;

            let view = res.view;
            const reactions = view?.reactions || [];
            const needsDoors = (view?.is_endpoint && !reactions.length) || res.needs_doors;

            if (needsDoors) {
                view = await this.viewWithDoors(view);
            }

            this.talosMood = normalizeTalosEyesMoodKey(view?.mood);
            await this.playViewReplicas(view);
            this.choices = [...(view?.reactions || [])];
            await this.$nextTick();
            await this.scrollChatToBottom();
            await this.wait(420);
            await this.scrollChatToBottom();
        },

        async playViewReplicas(view) {
            const token = ++this.playToken;
            this.choices = [];
            this.busy = true;

            const steps = replicaScreenSteps(view);

            for (let i = 0; i < steps.length; i += 1) {
                if (token !== this.playToken) {
                    return;
                }

                const delayBefore = i === 0 ? 0 : Number(steps[i].delayBefore || 0);
                const typingMs = Math.max(
                    TYPING_MIN_MS,
                    TYPING_BASE_MS + delayBefore * TYPING_PER_DELAY_SEC,
                );

                this.typing = true;
                this.scrollChatToBottom();
                await this.wait(typingMs);

                if (token !== this.playToken) {
                    return;
                }

                this.typing = false;

                const lines = steps[i].lines || [];
                const text = lines.join('\n');
                if (text) {
                    this.pushTalosMessage(text, i === 0 && this.messages.length === 0);
                    await this.wait(MESSAGE_STAGGER_MS);
                }
            }

            if (token !== this.playToken) {
                return;
            }

            await this.wait(ANSWERS_REVEAL_MS);
            this.busy = false;
        },

        async onChoice(choice) {
            if (this.busy || this.typing || !this.state || this.loadError) {
                return;
            }

            this.busy = true;
            this.choices = [];
            this.pushUserMessage(choice.label);

            await this.wait(220);

            try {
                const res = await this.api.reactionEngagementPreview(
                    this.canvasSlug,
                    this.state,
                    choice.id,
                );
                await this.applyResponse(res);
            } catch (e) {
                this.loadError = e?.message || 'Ошибка при выборе ответа';
            } finally {
                this.busy = false;
            }
        },
    },
};
</script>
