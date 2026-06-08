<template>
    <StatisticsAnimPreview
        ref="previewRef"
        mode="dashboard"
        @ready="onReady"
    />
</template>

<script>
import StatisticsAnimPreview from '@/components/animationPreview/StatisticsAnimPreview.vue';
import { highlightTarget, sleep } from '@/utils/animPreviewDemo.js';
import {
    ANIMATION_CONFIG_KEY,
    REPLAY_KEY,
    durationCss,
    easingCss,
} from '@/utils/animationPreviewConfig.js';
import { inject } from 'vue';

export default {
    name: 'StatisticsListScreen',

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
            this.playStagger();
        },
    },

    methods: {
        onReady() {
            if (this.pendingPlay) {
                this.playStagger();
            }
        },

        async playStagger() {
            this.pendingPlay = false;

            const preview = this.$refs.previewRef;
            const root = preview?.$el;
            const list = root?.querySelector('.items');
            if (!root || !list) {
                return;
            }

            highlightTarget(list);
            await sleep(400);

            const items = root.querySelectorAll('.items .item');
            const preset = this.config?.preset || 'slide_up';
            const animMap = {
                fade: 'ap-fade',
                slide_up: 'ap-slide-up',
                slide_left: 'ap-slide-left',
            };
            const anim = animMap[preset] || animMap.slide_up;
            const count = Math.min(items.length, this.config?.item_count || 5);

            items.forEach((el, idx) => {
                if (idx >= count) {
                    return;
                }
                el.style.opacity = '0';
                el.style.animation = 'none';
                void el.offsetWidth;
                const delay = idx * (this.config?.stagger_ms || 60);
                el.style.animation = `${anim} ${durationCss(this.config?.duration_ms || 300)} ${easingCss(this.config?.easing || 'ease')} ${delay}ms forwards`;
            });
        },
    },
};
</script>
