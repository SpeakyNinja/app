<template>
    <StatisticsAnimPreview
        ref="previewRef"
        mode="regularity_dashboard"
        @ready="onReady"
    />
</template>

<script>
import StatisticsAnimPreview from '@/components/animationPreview/StatisticsAnimPreview.vue';
import { sleep } from '@/utils/animPreviewDemo.js';
import {
    ANIMATION_CONFIG_KEY,
    REPLAY_KEY,
    durationCss,
    easingCss,
} from '@/utils/animationPreviewConfig.js';
import { inject } from 'vue';

export default {
    name: 'StatisticsLayerScreen',

    components: { StatisticsAnimPreview },

    setup() {
        return {
            config: inject(ANIMATION_CONFIG_KEY),
            replayKey: inject(REPLAY_KEY),
        };
    },

    data() {
        return {
            pendingPlay: false,
        };
    },

    mounted() {
        this.pendingPlay = true;
    },

    watch: {
        replayKey() {
            this.playTransition();
        },
    },

    methods: {
        onReady() {
            if (this.pendingPlay) {
                this.playTransition();
            }
        },

        async playTransition() {
            this.pendingPlay = false;

            const preview = this.$refs.previewRef;
            const wrapper = preview?.$refs?.layersWrapper;
            if (!preview || !wrapper) {
                return;
            }

            preview.curIndex = 0;
            preview.updateLeft();

            wrapper.style.transition = 'none';
            wrapper.style.left = '0%';
            void wrapper.offsetWidth;

            wrapper.style.transition = `left ${durationCss(this.config?.duration_ms || 300)} ${easingCss(this.config?.easing || 'ease')}`;

            await sleep(800);
            preview.toggle(1);
        },
    },
};
</script>
