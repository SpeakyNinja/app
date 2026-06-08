<template>
    <div class="route-transition-screen">
        <div v-show="phase !== 'training'" class="route-transition-screen__base">
            <Index class="route-transition-screen__view" />
            <div class="route-transition-screen__label route-transition-screen__label--index">
                Главная
            </div>
        </div>

        <div
            v-show="phase === 'training'"
            :key="`${replayKey}-${phase}`"
            class="route-transition-screen__overlay"
            :class="enterClass"
            :style="enterStyle"
        >
            <Training class="route-transition-screen__view" />
            <div class="route-transition-screen__label route-transition-screen__label--training">
                Тренировка
            </div>
        </div>
    </div>
</template>

<script>
import Index from '@/views/Index.vue';
import Training from '@/views/Training.vue';
import { sleep } from '@/utils/animPreviewDemo.js';
import { ANIMATION_CONFIG_KEY, REPLAY_KEY, durationCss, easingCss } from '@/utils/animationPreviewConfig.js';
import { inject } from 'vue';

export default {
    name: 'RouteTransitionScreen',

    components: { Index, Training },

    setup() {
        return {
            config: inject(ANIMATION_CONFIG_KEY),
            replayKey: inject(REPLAY_KEY),
        };
    },

    data() {
        return {
            phase: 'index',
        };
    },

    computed: {
        enterClass() {
            const map = {
                fade: 'ap-route-enter-fade',
                slide_left: 'ap-route-enter-slide-left',
                slide_right: 'ap-route-enter-slide-right',
                slide_up: 'ap-route-enter-slide-up',
                slide_down: 'ap-route-enter-slide-down',
                scale: 'ap-route-enter-scale',
            };

            return map[this.config?.preset] || map.slide_left;
        },

        enterStyle() {
            return {
                '--ap-duration': durationCss(this.config?.duration_ms || 350),
                '--ap-easing': easingCss(this.config?.easing || 'ease'),
            };
        },
    },

    watch: {
        replayKey: {
            immediate: true,
            handler() {
                this.runTransition();
            },
        },
    },

    methods: {
        async runTransition() {
            this.phase = 'index';
            await sleep(900);
            this.phase = 'training';
        },
    },
};
</script>

<style scoped lang="scss">
.route-transition-screen {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
    overflow: hidden;
    background: #30313f;
}

.route-transition-screen__base,
.route-transition-screen__overlay {
    position: absolute;
    inset: 0;
}

.route-transition-screen__overlay {
    z-index: 2;
    will-change: transform, opacity;
}

.route-transition-screen__view {
    width: 100%;
    height: 100%;
    min-height: 100%;
}

.route-transition-screen__label {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 5;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: rgba(0, 0, 0, 0.45);
    color: #ebebed;
    pointer-events: none;

    &--index {
        background: rgba(59, 130, 246, 0.35);
    }

    &--training {
        background: rgba(16, 185, 129, 0.35);
    }
}
</style>
