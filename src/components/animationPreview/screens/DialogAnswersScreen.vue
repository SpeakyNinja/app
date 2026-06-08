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
                    <p class="dialog-play__line">Choose the best answer:</p>
                </div>
            </div>

            <TransitionGroup
                v-if="useTransitionGroup"
                :key="replayKey"
                name="dialog-answers"
                tag="div"
                class="dialog-play__answers"
            >
                <button
                    v-for="(answer, idx) in answers"
                    :key="`${replayKey}-${idx}`"
                    type="button"
                    class="dialog-play__answer"
                >
                    {{ answer }}
                </button>
            </TransitionGroup>
            <div v-else :key="replayKey" class="dialog-play__answers">
                <button
                    v-for="(answer, idx) in answers"
                    :key="`${replayKey}-${idx}`"
                    type="button"
                    class="dialog-play__answer"
                    :style="itemStyle(idx)"
                >
                    {{ answer }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import TalosEyes from '@/components/TalosEyes.vue';
import { ANIMATION_CONFIG_KEY, REPLAY_KEY, durationCss, easingCss } from '@/utils/animationPreviewConfig.js';
import { inject } from 'vue';

const SAMPLE = ['Fine, thanks!', 'Not bad', 'Could be better', 'Great!'];

export default {
    name: 'DialogAnswersScreen',

    components: { TalosEyes },

    setup() {
        return {
            config: inject(ANIMATION_CONFIG_KEY),
            replayKey: inject(REPLAY_KEY),
        };
    },

    computed: {
        answers() {
            return SAMPLE.slice(0, this.config?.item_count || 4);
        },

        useTransitionGroup() {
            return (this.config?.preset || 'stagger_slide') === 'simultaneous';
        },
    },

    methods: {
        itemStyle(idx) {
            const preset = this.config?.preset || 'stagger_slide';
            const anim = preset === 'stagger_fade' ? 'ap-fade' : 'ap-slide-up';
            const delay = idx * (this.config?.stagger_ms || 80);

            return {
                animation: `${anim} ${durationCss(this.config?.duration_ms || 400)} ${easingCss(this.config?.easing || 'ease')} ${delay}ms forwards`,
                opacity: 0,
            };
        },
    },
};
</script>

<style lang="scss">
.dialog-anim-screen .dialog-play__answers {
    flex-shrink: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.dialog-anim-screen .dialog-play__answer {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 20px 50px;
    cursor: pointer;
    border: none;
    background: transparent;
    color: #ebebed;
    font-family: Light, sans-serif;
    font-size: 20px;
    letter-spacing: 1px;
    border-top: 1px solid #ebebed;
    border-image: linear-gradient(to right, transparent 15%, #69696d, transparent 85%);
    border-image-slice: 1;

    &:first-child {
        border-top: none;
    }
}

.dialog-anim-screen .dialog-answers-enter-active {
    transition: opacity var(--ap-duration, 350ms) var(--ap-easing, ease),
        transform var(--ap-duration, 350ms) var(--ap-easing, ease);
}

.dialog-anim-screen .dialog-answers-enter-from {
    opacity: 0;
    transform: translateY(var(--ap-distance, 12px));
}
</style>
