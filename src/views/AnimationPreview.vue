<template>
    <div class="animation-preview-page main-bg" :style="rootStyle">
        <component :is="sceneComponent" v-if="sceneComponent" :key="sceneKey" />
        <div v-else class="animation-preview-missing">
            <p>Сцена не найдена.</p>
        </div>
    </div>
</template>

<script>
import TalosEyesMoodScreen from '@/components/animationPreview/screens/TalosEyesMoodScreen.vue';
import DialogLineScreen from '@/components/animationPreview/screens/DialogLineScreen.vue';
import DialogAnswersScreen from '@/components/animationPreview/screens/DialogAnswersScreen.vue';
import RouteTransitionScreen from '@/components/animationPreview/screens/RouteTransitionScreen.vue';
import StatisticsLayerScreen from '@/components/animationPreview/screens/StatisticsLayerScreen.vue';
import NoticeCarouselScreen from '@/components/animationPreview/screens/NoticeCarouselScreen.vue';
import ModalScreen from '@/components/animationPreview/screens/ModalScreen.vue';
import TrainingProgressScreen from '@/components/animationPreview/screens/TrainingProgressScreen.vue';
import TrainingButtonScreen from '@/components/animationPreview/screens/TrainingButtonScreen.vue';
import TrainingWordChangeScreen from '@/components/animationPreview/screens/TrainingWordChangeScreen.vue';
import StatisticsListScreen from '@/components/animationPreview/screens/StatisticsListScreen.vue';
import {
    ANIMATION_CONFIG_KEY,
    REPLAY_KEY,
    cssVarsFromConfig,
    readAnimationPreviewConfig,
} from '@/utils/animationPreviewConfig.js';
import {
    listenAnimationPreviewConfigUpdate,
    listenAnimationPreviewReplay,
} from '@/utils/animationPreviewReplay.js';
import { computed, onMounted, onUnmounted, provide, ref } from 'vue';

const SCENE_COMPONENTS = {
    'eyes.mood': TalosEyesMoodScreen,
    'dialog.line_in': DialogLineScreen,
    'dialog.answers_block': DialogAnswersScreen,
    'route.page': RouteTransitionScreen,
    'statistics.layer': StatisticsLayerScreen,
    'notice.carousel': NoticeCarouselScreen,
    'modal.open': ModalScreen,
    'progress.bar': TrainingProgressScreen,
    'button.press': TrainingButtonScreen,
    'training.word_change': TrainingWordChangeScreen,
    'list.stagger': StatisticsListScreen,
};

export default {
    name: 'AnimationPreview',

    props: {
        scenarioKey: { type: String, required: true },
    },

    setup(props) {
        const replayTick = ref(0);
        const config = ref(readAnimationPreviewConfig(window.location.search));
        let stopReplayListener = null;
        let stopConfigListener = null;

        provide('engagementPreview', true);
        provide('animationPreview', true);
        provide(ANIMATION_CONFIG_KEY, computed(() => config.value));
        provide(REPLAY_KEY, replayTick);

        const triggerReplay = () => {
            replayTick.value += 1;
        };

        onMounted(() => {
            stopReplayListener = listenAnimationPreviewReplay(triggerReplay);
            stopConfigListener = listenAnimationPreviewConfigUpdate((search) => {
                config.value = readAnimationPreviewConfig(search || window.location.search);
            });
            triggerReplay();
        });

        onUnmounted(() => {
            stopReplayListener?.();
            stopConfigListener?.();
        });

        return { config, replayTick };
    },

    computed: {
        sceneComponent() {
            return SCENE_COMPONENTS[this.scenarioKey] || null;
        },

        sceneKey() {
            return this.scenarioKey;
        },

        rootStyle() {
            return cssVarsFromConfig(this.config.value ?? this.config);
        },
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/animationPreviewKeyframes.scss';

html:has(.animation-preview-page),
body:has(.animation-preview-page) {
    overflow: hidden;
}

.animation-preview-page {
    width: 100%;
    height: 100vh;
    height: 100dvh;
    position: relative;
    overflow: hidden;
}

.animation-preview-missing {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    opacity: 0.7;
}

@keyframes anim-target-pulse {
    0%,
    100% {
        box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.95), 0 0 16px rgba(147, 197, 253, 0.45);
    }

    50% {
        box-shadow: 0 0 0 5px rgba(147, 197, 253, 0.75), 0 0 24px rgba(147, 197, 253, 0.35);
    }
}

.anim-target-highlight {
    position: relative;
    z-index: 2;
    animation: anim-target-pulse 1.4s ease-in-out infinite;
    border-radius: 4px;
}
</style>
