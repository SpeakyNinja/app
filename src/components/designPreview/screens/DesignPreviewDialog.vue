<template>
    <DesignPreviewShell :variant="variant">
        <div class="dp-screen dp-dialog" @pointerdown="onDialogTap">
            <header class="dp-dialog__header dp-enter">
                <button type="button" class="dp-dialog__back" aria-label="Назад">←</button>
                <span class="dp-dialog__timer" aria-live="off">{{ timerDisplay }}</span>
            </header>

            <div class="dp-dialog__scroll">
                <div
                    class="dp-mascot dp-enter"
                    :class="{ 'dp-mascot--typing': talosTyping }"
                    style="min-height:180px;flex-shrink:0"
                >
                    <TalosEyes
                        mood="listening"
                        mood-transition
                        fill="var(--dp-mascot-fill)"
                        class="ai-image"
                        :speak-glow="talosTyping"
                        :speak-pulse-key="speakPulseKey"
                    />
                </div>
                <div class="dp-dialog__lines" aria-live="polite" aria-relevant="additions text">
                    <DesignPreviewTypewriter
                        ref="typewriter"
                        :lines="dialogLines"
                        :run-key="variant"
                        :start-delay-ms="500"
                        :char-delay-ms="46"
                        :line-gap-ms="450"
                        @update:typing="onTypingChange"
                        @typing-start="onTypingStart"
                        @typing-end="onTypingEnd"
                        @char-typed="onCharTyped"
                    />
                </div>
            </div>

            <p
                v-if="variant === 'liquid_glass' || variant === 'prism_flow'"
                class="dp-dialog__skip-hint"
                :class="{ 'dp-dialog__skip-hint--visible': talosTyping }"
                aria-hidden="true"
            >
                Нажмите на экран, чтобы пропустить
            </p>

            <div
                class="dp-real-sheet dp-dialog__answers"
                :class="{ 'dp-dialog__answers--visible': showAnswers }"
            >
                <ButtonsSticked>
                    <template #items>
                        <div class="item m-light no-select">I'm fine, thanks</div>
                        <div class="item m-light no-select">Could be better</div>
                    </template>
                </ButtonsSticked>
            </div>
        </div>
    </DesignPreviewShell>
</template>

<script>
import TalosEyes from '@/components/TalosEyes.vue';
import ButtonsSticked from '@/components/ButtonsSticked.vue';
import DesignPreviewShell from '@/components/designPreview/DesignPreviewShell.vue';
import DesignPreviewTypewriter from '@/components/designPreview/DesignPreviewTypewriter.vue';

export default {
    name: 'DesignPreviewDialog',

    components: {
        TalosEyes,
        ButtonsSticked,
        DesignPreviewShell,
        DesignPreviewTypewriter,
    },

    props: {
        variant: { type: String, default: 'baseline' },
    },

    data() {
        return {
            dialogLines: [
                'How are you doing today?',
                'I hope you\'re feeling well.',
            ],
            talosTyping: false,
            showAnswers: false,
            speakPulseKey: 0,
            charsSincePulse: 0,
            charsUntilPulse: 5,
            timerDisplay: '23:59:01',
            timerInterval: null,
        };
    },

    watch: {
        variant() {
            this.showAnswers = false;
        },
    },

    methods: {
        onDialogTap(event) {
            if (event.button !== 0) {
                return;
            }

            if (event.target.closest('.dp-real-sheet, .buttons-sticked')) {
                return;
            }

            this.$refs.typewriter?.skip();
        },

        onTypingStart() {
            this.showAnswers = false;
        },

        onTypingEnd() {
            this.showAnswers = true;
        },

        onTypingChange(active) {
            this.talosTyping = active;
            if (active) {
                this.charsSincePulse = 0;
                this.charsUntilPulse = this.nextPulseInterval();
                return;
            }
            this.speakPulseKey = 0;
            this.charsSincePulse = 0;
        },

        nextPulseInterval() {
            return 4 + Math.floor(Math.random() * 2);
        },

        onCharTyped() {
            this.charsSincePulse += 1;
            if (this.charsSincePulse < this.charsUntilPulse) {
                return;
            }
            this.charsSincePulse = 0;
            this.charsUntilPulse = this.nextPulseInterval();
            this.speakPulseKey += 1;
        },
    },

    mounted() {
        let sec = 59;
        this.timerInterval = setInterval(() => {
            sec = sec > 0 ? sec - 1 : 59;
            this.timerDisplay = `23:59:${String(sec).padStart(2, '0')}`;
        }, 1000);
    },

    beforeUnmount() {
        clearInterval(this.timerInterval);
    },
};
</script>
