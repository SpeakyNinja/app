<template>
    <div class="dp-layer-level">
        <DesignPreviewStatChrome :statService="statService" />

        <div class="dp-layer-level__middle no-scrollbar">
            <PrismCrystalTower
                v-if="variant === 'prism_flow'"
                :level="displayLevel"
            />
            <template v-else>
                <div class="dp-layer-level__num">{{ displayLevel }}</div>
                <div class="dp-layer-level__brain">
                    <Brain
                        ref="brain"
                        :width="brainWidth"
                        :height="brainHeight"
                        :hex-radius="brainHexRadius"
                        :color-theme="brainTheme"
                        :items="[]"
                        :center-in-canvas="true"
                        :glass-cells="variant === 'liquid_glass'"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Brain from '@/components/Brain.vue';
import DesignPreviewStatChrome from '@/components/designPreview/DesignPreviewStatChrome.vue';
import PrismCrystalTower from '@/components/designPreview/prism/PrismCrystalTower.vue';
import StatService from '@/services/StatService.js';
import { brainColorThemeFromVariant } from '@/utils/designPreviewMockData.js';

export default {
    name: 'DesignPreviewLayerLevel',

    components: {
        Brain,
        DesignPreviewStatChrome,
        PrismCrystalTower,
    },

    props: {
        statService: {
            type: StatService,
            required: true,
        },
        variant: {
            type: String,
            default: 'baseline',
        },
    },

    data() {
        return {
            displayLevel: 0,
            brainWidth: 268,
            brainHeight: 228,
            brainHexRadius: 26,
            introTimeouts: [],
            levelAnimFrame: null,
        };
    },

    computed: {
        brainTheme() {
            return brainColorThemeFromVariant(this.variant);
        },

        brainStatuses() {
            const chunks = this.statService.getLevelsForBrain();
            const firstChunk = chunks[0] || [];
            return firstChunk.filter(Boolean);
        },
    },

    mounted() {
        if (this.variant !== 'prism_flow') {
            this.fitBrainSize();
        }
        this.playIntro();
    },

    beforeUnmount() {
        cancelAnimationFrame(this.levelAnimFrame);
        this.introTimeouts.forEach(clearTimeout);
    },

    methods: {
        fitBrainSize() {
            const panelHeight = Math.min(window.innerHeight * 0.58, 480);
            const available = Math.max(180, panelHeight - 120);
            this.brainHeight = Math.round(available * 0.82);
            this.brainWidth = Math.round(this.brainHeight * (372 / 316));
            this.brainHexRadius = Math.round(Math.min(30, this.brainWidth / 10.5));
        },

        playIntro() {
            cancelAnimationFrame(this.levelAnimFrame);
            this.introTimeouts.forEach(clearTimeout);
            this.introTimeouts = [];

            const targetLevel = this.statService.currentLevel;
            const statuses = this.brainStatuses;
            const start = performance.now();
            const levelDuration = 900;

            this.displayLevel = 0;

            const tickLevel = (now) => {
                const t = Math.min(1, (now - start) / levelDuration);
                const eased = 1 - (1 - t) ** 3;
                this.displayLevel = Math.round(targetLevel * eased);

                if (t < 1) {
                    this.levelAnimFrame = requestAnimationFrame(tickLevel);
                } else {
                    this.displayLevel = targetLevel;
                }
            };

            this.levelAnimFrame = requestAnimationFrame(tickLevel);

            if (this.variant === 'prism_flow') {
                return;
            }

            this.$nextTick(() => {
                const brain = this.$refs.brain;
                if (!brain || !statuses.length) {
                    return;
                }

                brain.refresh?.();

                const stagger = Math.max(18, Math.min(42, Math.floor(2200 / statuses.length)));

                statuses.forEach((status, index) => {
                    const timeout = setTimeout(() => {
                        brain.addWord(status);
                    }, 220 + index * stagger);
                    this.introTimeouts.push(timeout);
                });
            });
        },
    },
};
</script>
