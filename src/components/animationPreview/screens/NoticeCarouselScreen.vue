<template>
    <AnimPreviewShell scenario-key="notice.carousel">
        <div class="notice-carousel-screen" :class="noticeAnimClass">
            <div class="notice-carousel-screen__bg">
                <Training />
            </div>
            <NoticeLayer
                :key="noticeKey"
                :items="noticeItems"
                :fade="useFade"
            />
        </div>
    </AnimPreviewShell>
</template>

<script>
import Training from '@/views/Training.vue';
import NoticeLayer from '@/components/NoticeLayer.vue';
import NoticeService from '@/services/NoticeService.js';
import AnimPreviewShell from '@/components/animationPreview/AnimPreviewShell.vue';
import { ANIMATION_CONFIG_KEY, REPLAY_KEY } from '@/utils/animationPreviewConfig.js';
import { inject } from 'vue';

export default {
    name: 'NoticeCarouselScreen',

    components: { Training, NoticeLayer, AnimPreviewShell },

    setup() {
        return {
            config: inject(ANIMATION_CONFIG_KEY),
            replayKey: inject(REPLAY_KEY),
        };
    },

    data() {
        return {
            noticeKey: 0,
            noticeItems: [],
        };
    },

    computed: {
        useFade() {
            const preset = this.config?.preset || 'slide';
            return preset === 'fade' || preset === 'slide_fade';
        },

        noticeAnimClass() {
            return `notice-carousel-screen--${this.config?.preset || 'slide'}`;
        },
    },

    watch: {
        replayKey: {
            immediate: true,
            handler() {
                this.reloadNotice();
            },
        },
    },

    methods: {
        reloadNotice() {
            const service = new NoticeService();
            this.noticeItems = service.getItems('testBefore') || [];
            this.noticeKey += 1;
        },
    },
};
</script>

<style scoped lang="scss">
.notice-carousel-screen {
    position: relative;
    height: 100%;
    min-height: 100%;
}

.notice-carousel-screen__bg {
    position: absolute;
    inset: 0;
    opacity: 0.35;
    pointer-events: none;
    overflow: hidden;

    :deep(.training) {
        height: 100%;
    }
}

.notice-carousel-screen :deep(.notice-layer) {
    position: absolute;
}

.notice-carousel-screen :deep(.dummy) {
    transition: all var(--ap-duration) var(--ap-easing) !important;
}

.notice-carousel-screen :deep(.item) {
    transition: opacity var(--ap-item-fade) var(--ap-easing) !important;
}

.notice-carousel-screen--slide_fade :deep(.item.visible) {
    transform: translateX(0);
}
</style>
