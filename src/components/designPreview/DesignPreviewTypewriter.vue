<template>
    <div class="dp-typewriter">
        <p
            v-for="(line, lineIndex) in lines"
            :key="`${runKey}-${lineIndex}`"
            class="dp-typewriter__line"
        >
            {{ typedLines[lineIndex] }}<span
                v-if="showCursor && activeLineIndex === lineIndex"
                class="dp-typewriter__cursor"
                aria-hidden="true"
            >|</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'DesignPreviewTypewriter',

    props: {
        lines: {
            type: Array,
            required: true,
        },
        startDelayMs: {
            type: Number,
            default: 400,
        },
        charDelayMs: {
            type: Number,
            default: 32,
        },
        lineGapMs: {
            type: Number,
            default: 420,
        },
        showCursor: {
            type: Boolean,
            default: true,
        },
        runKey: {
            type: [String, Number],
            default: 0,
        },
    },

    emits: ['typing-start', 'typing-end', 'update:typing', 'char-typed'],

    data() {
        return {
            typedLines: [],
            activeLineIndex: -1,
            isTyping: false,
            typewriterTimer: null,
            typewriterStartTimer: null,
            typewriterGapTimer: null,
        };
    },

    watch: {
        runKey() {
            this.restart();
        },

        lines: {
            deep: true,
            handler() {
                this.restart();
            },
        },
    },

    mounted() {
        if (typeof window !== 'undefined'
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.typedLines = this.lines.map((line) => line || '');
            this.activeLineIndex = -1;
            this.setTyping(false);
            return;
        }

        this.restart();
    },

    beforeUnmount() {
        this.clearTimers();
        this.setTyping(false);
    },

    methods: {
        clearTimers() {
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

        hasPendingTimers() {
            return !!(this.typewriterStartTimer || this.typewriterTimer || this.typewriterGapTimer);
        },

        isComplete() {
            return this.lines.every((line, index) => this.typedLines[index] === (line || ''));
        },

        skip() {
            if (this.isComplete() && !this.isTyping && !this.hasPendingTimers()) {
                return;
            }

            const wasTyping = this.isTyping;
            this.clearTimers();
            this.typedLines = this.lines.map((line) => line || '');
            this.activeLineIndex = -1;

            if (wasTyping) {
                this.setTyping(false);
                return;
            }

            this.isTyping = false;
            this.$emit('update:typing', false);
            this.$emit('typing-end');
        },

        restart() {
            this.clearTimers();
            this.setTyping(false);
            this.typedLines = this.lines.map(() => '');
            this.activeLineIndex = -1;

            if (typeof window !== 'undefined'
                && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.typedLines = this.lines.map((line) => line || '');
                this.$emit('typing-end');
                return;
            }

            const start = () => {
                this.setTyping(true);
                this.runSequence(0);
            };

            if (this.startDelayMs > 0) {
                this.typewriterStartTimer = setTimeout(start, this.startDelayMs);
                return;
            }

            start();
        },

        setTyping(active) {
            if (this.isTyping === active) {
                return;
            }

            this.isTyping = active;
            this.$emit('update:typing', active);
            this.$emit(active ? 'typing-start' : 'typing-end');
        },

        runSequence(lineIndex) {
            this.typeLine(lineIndex, () => {
                if (lineIndex + 1 >= this.lines.length) {
                    this.setTyping(false);
                    return;
                }

                this.typewriterGapTimer = setTimeout(() => {
                    this.runSequence(lineIndex + 1);
                }, this.lineGapMs);
            });
        },

        typeLine(lineIndex, onDone) {
            const text = this.lines[lineIndex] || '';
            let index = 0;

            this.activeLineIndex = lineIndex;

            const tick = () => {
                if (index >= text.length) {
                    if (this.typewriterTimer) {
                        clearInterval(this.typewriterTimer);
                        this.typewriterTimer = null;
                    }
                    this.activeLineIndex = -1;
                    onDone?.();
                    return;
                }

                this.typedLines[lineIndex] += text[index];
                index += 1;
                this.$emit('char-typed');
            };

            tick();
            this.typewriterTimer = setInterval(tick, this.charDelayMs);
        },
    },
};
</script>

<style scoped lang="scss">
.dp-typewriter__line {
    width: 100%;
    margin: 0 0 16px;
    font-family: var(--dp-font-display);
    font-size: 18px;
    line-height: 1.35;
    color: var(--dp-text);
    min-height: 1.35em;
    text-align: left;

    &:last-child {
        margin-bottom: 0;
    }
}

.dp-typewriter__cursor {
    display: inline-block;
    margin-left: 1px;
    color: var(--dp-accent);
    font-weight: 400;
    animation: dp-typewriter-cursor 0.9s step-end infinite;
}

@keyframes dp-typewriter-cursor {
    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}
</style>
