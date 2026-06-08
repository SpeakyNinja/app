<template>
    <div class="dialog-play main-bg dialog-anim-screen">
        <header class="dialog-play__header">
            <div class="dialog-play__timer">23:59:42</div>
        </header>

        <div class="dialog-play__body">
            <div class="dialog-play__content no-scrollbar">
                <div class="dialog-play__mascot">
                    <TalosEyes fill="#ebebed" class="ai-image" />
                </div>

                <div class="dialog-play__texts">
                    <template v-if="isTypewriter">
                        <p
                            v-for="(line, lineIndex) in replicaLines"
                            :key="`${replayKey}-tw-${lineIndex}`"
                            class="dialog-play__line"
                        >
                            {{ typedLines[lineIndex] }}<span
                                v-if="showCursor && activeLineIndex === lineIndex"
                                class="dialog-play__typewriter-cursor"
                                aria-hidden="true"
                            >|</span>
                        </p>
                    </template>
                    <template v-else>
                        <p class="dialog-play__line">{{ replicaLines[0] }}</p>
                        <p
                            :key="replayKey"
                            class="dialog-play__line dialog-play__line--animated"
                            :class="lineClass"
                        >{{ replicaLines[1] }}</p>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TalosEyes from '@/components/TalosEyes.vue';
import { ANIMATION_CONFIG_KEY, REPLAY_KEY, lineEnterClass } from '@/utils/animationPreviewConfig.js';
import { inject } from 'vue';

const REPLICA_LINES = [
    'Welcome to the lesson!',
    'How are you feeling today?',
];

export default {
    name: 'DialogLineScreen',

    components: { TalosEyes },

    setup() {
        return {
            config: inject(ANIMATION_CONFIG_KEY),
            replayKey: inject(REPLAY_KEY),
        };
    },

    data() {
        return {
            replicaLines: REPLICA_LINES,
            typedLines: REPLICA_LINES.map(() => ''),
            activeLineIndex: -1,
            typewriterTimer: null,
            typewriterStartTimer: null,
            typewriterGapTimer: null,
        };
    },

    computed: {
        isTypewriter() {
            return this.config?.preset === 'typewriter';
        },

        showCursor() {
            return this.config?.show_cursor !== false;
        },

        lineClass() {
            return lineEnterClass(this.config?.preset);
        },
    },

    watch: {
        replayKey() {
            this.resetLineAnimation();
        },

        config: {
            deep: true,
            handler() {
                this.resetLineAnimation();
            },
        },
    },

    mounted() {
        this.resetLineAnimation();
    },

    beforeUnmount() {
        this.clearTypewriterTimers();
    },

    methods: {
        clearTypewriterTimers() {
            if (this.typewriterTimer) {
                clearInterval(this.typewriterTimer);
                this.typewriterTimer = null;
            }

            if (this.typewriterStartTimer) {
                clearTimeout(this.typewriterStartTimer);
                this.typewriterStartTimer = null;
            }

            if (this.typewriterGapTimer) {
                clearTimeout(this.typewriterGapTimer);
                this.typewriterGapTimer = null;
            }
        },

        resetLineAnimation() {
            this.clearTypewriterTimers();

            if (!this.isTypewriter) {
                this.typedLines = REPLICA_LINES.map(() => '');
                this.activeLineIndex = -1;
                return;
            }

            this.typedLines = REPLICA_LINES.map(() => '');
            this.activeLineIndex = -1;

            const startDelay = this.config?.typewriter_start_ms ?? 0;
            const charDelay = this.config?.char_delay_ms ?? 35;
            const lineGap = this.config?.stagger_ms ?? 400;

            const typeLine = (lineIndex, onDone) => {
                const text = REPLICA_LINES[lineIndex];
                let index = 0;

                this.activeLineIndex = lineIndex;

                const tick = () => {
                    if (index >= text.length) {
                        this.clearTypewriterTimers();
                        this.activeLineIndex = -1;
                        onDone?.();
                        return;
                    }

                    this.typedLines[lineIndex] += text[index];
                    index += 1;
                };

                tick();
                this.typewriterTimer = setInterval(tick, charDelay);
            };

            const runSequence = (lineIndex = 0) => {
                typeLine(lineIndex, () => {
                    if (lineIndex + 1 >= REPLICA_LINES.length) {
                        return;
                    }

                    this.typewriterGapTimer = setTimeout(() => {
                        runSequence(lineIndex + 1);
                    }, lineGap);
                });
            };

            const start = () => runSequence(0);

            if (startDelay > 0) {
                this.typewriterStartTimer = setTimeout(start, startDelay);
                return;
            }

            start();
        },
    },
};
</script>

<style lang="scss">
.dialog-anim-screen.dialog-play {
    width: 100%;
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    color: #ebebed;
}

.dialog-anim-screen .dialog-play__header {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    padding: 16px 20px;
}

.dialog-anim-screen .dialog-play__timer {
    font-family: Light, sans-serif;
    font-size: 14px;
    color: #9091a1;
}

.dialog-anim-screen .dialog-play__body {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
}

.dialog-anim-screen .dialog-play__content {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 25px 20px;
    overflow-y: auto;
}

.dialog-anim-screen .dialog-play__mascot {
    flex-shrink: 0;
    width: 100%;
    min-height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog-anim-screen .dialog-play__texts {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 12px;
}

.dialog-anim-screen .dialog-play__line {
    width: 100%;
    margin: 0;
    font-family: Light, sans-serif;
    font-size: 20px;
    line-height: 1.35;
    letter-spacing: 1px;
    text-align: left;
    color: #ebebed;
    min-height: 1.35em;
}

.dialog-anim-screen .dialog-play__typewriter-cursor {
    display: inline-block;
    margin-left: 1px;
    color: #0bcccf;
    font-weight: 400;
    animation: dialog-typewriter-cursor 0.9s step-end infinite;
}

@keyframes dialog-typewriter-cursor {
    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}
</style>
