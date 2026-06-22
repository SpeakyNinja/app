<template>
    <div class="layer-dashboard dp-layer-dashboard">
        <div class="wrapper">
            <DesignPreviewStatChrome :statService="statService" />

            <div class="middle no-scrollbar">
                <PrismVocabOrb
                    v-if="variant === 'prism_flow'"
                    :words="displayWords"
                    :red="displayRed"
                    :yellow="displayYellow"
                    :green="displayGreen"
                    :progress="ringProgress / 100"
                    :bonus-xp="85"
                />
                <div v-else class="counter-wrapper">
                    <DesignPreviewBeltRing
                        :progress="ringProgress"
                        :belt-color="statService.getBeltColor()"
                        :tick-count="tickCount"
                        :radius="ringRadius"
                        :variant="variant"
                    >
                        <div class="dp-layer-dashboard__counter">
                            <div class="dp-layer-dashboard__title">Словарный запас</div>

                            <div class="dp-layer-dashboard__value">
                                <span
                                    v-if="wordsDisplay.muted"
                                    class="dp-layer-dashboard__value-muted"
                                >{{ wordsDisplay.muted }}</span>
                                <span class="dp-layer-dashboard__value-main">{{ wordsDisplay.main }}</span>
                            </div>

                            <div class="dp-layer-dashboard__hexes">
                                <div class="dp-layer-dashboard__hex">
                                    <HexRed class="hex" />
                                    <span>{{ displayRed }}</span>
                                </div>
                                <div class="dp-layer-dashboard__hex">
                                    <HexYellow class="hex" />
                                    <span>{{ displayYellow }}</span>
                                </div>
                                <div class="dp-layer-dashboard__hex">
                                    <HexGreen class="hex" />
                                    <span>{{ displayGreen }}</span>
                                </div>
                            </div>
                        </div>
                    </DesignPreviewBeltRing>
                </div>

                <div class="neurons">
                    Нейроны: {{ formattedNeurons }}
                </div>
            </div>

            <div
                class="dp-layer-dashboard__cta bottom"
                :class="{ glass: variant !== 'liquid_glass' && variant !== 'prism_flow' }"
            >
                <button type="button" class="btn green dp-layer-dashboard__train">Тренироваться</button>
            </div>
        </div>
    </div>
</template>

<script>
import DesignPreviewBeltRing from '@/components/designPreview/DesignPreviewBeltRing.vue';
import DesignPreviewStatChrome from '@/components/designPreview/DesignPreviewStatChrome.vue';
import PrismVocabOrb from '@/components/designPreview/prism/PrismVocabOrb.vue';
import HexGreen from '@/components/icons/HexGreen.vue';
import HexRed from '@/components/icons/HexRed.vue';
import HexYellow from '@/components/icons/HexYellow.vue';
import StatService from '@/services/StatService.js';

export default {
    name: 'DesignPreviewLayerDashboard',

    components: {
        DesignPreviewBeltRing,
        DesignPreviewStatChrome,
        PrismVocabOrb,
        HexGreen,
        HexRed,
        HexYellow,
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
            ringProgress: 0,
            displayWords: 0,
            displayRed: 0,
            displayYellow: 0,
            displayGreen: 0,
            ringRadius: 100,
            ringAnimFrame: null,
            tickCount: 7,
        };
    },

    computed: {
        targetWords() {
            return this.statService.getLearnedWordsCount();
        },

        wordsDisplay() {
            const formatted = this.displayWords.toString().padStart(5, '0');
            const withSpace = `${formatted.slice(0, 2)}\u00a0${formatted.slice(2)}`;

            let highlighted = false;
            let muted = '';
            let main = '';

            withSpace.split('').forEach((char) => {
                if (!highlighted && char > '0') {
                    highlighted = true;
                }

                if (highlighted) {
                    main += char;
                } else {
                    muted += char;
                }
            });

            return { muted, main };
        },

        formattedNeurons() {
            return new Intl.NumberFormat().format(this.statService.count_neurons);
        },
    },

    mounted() {
        this.tickCount = this.getScale().length;
        this.playIntro();
    },

    beforeUnmount() {
        cancelAnimationFrame(this.ringAnimFrame);
    },

    methods: {
        getCount(color) {
            if (color === 'red') {
                return this.statService.countWordsByMemorizations([0, 1, 2, 3]);
            }
            if (color === 'yellow') {
                return this.statService.countWordsByMemorizations([4, 5, 6, 7]);
            }

            return this.statService.countWordsByMemorizations([8, 9, 10, 11]);
        },

        getScale() {
            const belt = this.statService.getBelt();
            const countLevels = this.statService.getCountLevelsInBelt(belt);
            const angleStep = 360 / countLevels;
            const scale = [];

            for (let angle = 0; angle < 360; angle += angleStep) {
                scale.push(angle);
            }

            return scale;
        },

        playIntro() {
            cancelAnimationFrame(this.ringAnimFrame);

            const targetProgress = this.statService.getProgressInBelt();
            const targetWords = this.targetWords;
            const targetRed = this.getCount('red');
            const targetYellow = this.getCount('yellow');
            const targetGreen = this.getCount('green');
            const start = performance.now();
            const duration = 1500;

            this.ringProgress = 0;
            this.displayWords = 0;
            this.displayRed = 0;
            this.displayYellow = 0;
            this.displayGreen = 0;

            const tick = (now) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - (1 - t) ** 3;
                this.ringProgress = targetProgress * eased;
                this.displayWords = Math.round(targetWords * eased);
                this.displayRed = Math.round(targetRed * eased);
                this.displayYellow = Math.round(targetYellow * eased);
                this.displayGreen = Math.round(targetGreen * eased);

                if (t < 1) {
                    this.ringAnimFrame = requestAnimationFrame(tick);
                } else {
                    this.ringProgress = targetProgress;
                    this.displayWords = targetWords;
                    this.displayRed = targetRed;
                    this.displayYellow = targetYellow;
                    this.displayGreen = targetGreen;
                }
            };

            this.ringAnimFrame = requestAnimationFrame(tick);
        },
    },
};
</script>
