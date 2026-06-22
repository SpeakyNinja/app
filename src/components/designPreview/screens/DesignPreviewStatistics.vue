<template>
    <DesignPreviewShell :variant="variant">
        <div class="dp-screen dp-statistics" ref="statisticsContainer">
            <div class="dp-stat-layers">
                <div class="dp-stat-layers__viewport" ref="layersWrapper">
                    <DesignPreviewStatTalosBg :variant="variant" />
                    <div
                        class="dp-stat-layers__track"
                        :style="{ left: `${-curIndex * 100}%` }"
                    >
                        <component
                            v-for="layer in layers"
                            :key="layerKey(layer)"
                            :is="layerComponents[layer.component]"
                            :statService="statService"
                            :variant="variant"
                            class="dp-stat-layer"
                        />
                    </div>
                </div>
            </div>

            <div class="dp-stat-items no-scrollbar">
                <DesignPreviewStatPult
                    :layers="layers"
                    :curIndex="curIndex"
                    @toggle="toggle"
                />
                <div
                    v-for="(item, i) in statService.items"
                    :key="item.en"
                    class="item dp-enter"
                    :class="`dp-enter-delay-${Math.min(i + 1, 3)}`"
                >
                    <div class="text">
                        <span>{{ item.en }}</span>
                        <span class="ru"> — {{ item.ru }}</span>
                    </div>
                    <Memorization :mem="item.memorization" fill="transparent" />
                </div>
            </div>
        </div>
    </DesignPreviewShell>
</template>

<script>
import DesignPreviewLayerDashboard from '@/components/designPreview/DesignPreviewLayerDashboard.vue';
import DesignPreviewLayerLevel from '@/components/designPreview/DesignPreviewLayerLevel.vue';
import DesignPreviewLayerPredict from '@/components/designPreview/DesignPreviewLayerPredict.vue';
import DesignPreviewLayerRegularity from '@/components/designPreview/DesignPreviewLayerRegularity.vue';
import DesignPreviewLayerAccuracy from '@/components/designPreview/DesignPreviewLayerAccuracy.vue';
import DesignPreviewLayerIntensity from '@/components/designPreview/DesignPreviewLayerIntensity.vue';
import DesignPreviewStatPult from '@/components/designPreview/DesignPreviewStatPult.vue';
import DesignPreviewStatTalosBg from '@/components/designPreview/DesignPreviewStatTalosBg.vue';
import Memorization from '@/components/Memorization.vue';
import DesignPreviewShell from '@/components/designPreview/DesignPreviewShell.vue';
import { createDesignPreviewStatService } from '@/utils/designPreviewMockData.js';

const ALL_STAT_LAYERS = [
    { component: 'LayerRegularity', title: 'Регулярность' },
    { component: 'LayerAccuracy', title: 'Слова' },
    { component: 'LayerPredict', title: 'Прогноз' },
    { component: 'LayerLevel', title: 'Уровень' },
    { component: 'LayerIntensity', title: 'Интенсивность' },
    { component: 'LayerDashboard', title: '' },
];

export default {
    name: 'DesignPreviewStatistics',

    components: {
        Memorization,
        DesignPreviewShell,
        DesignPreviewStatPult,
        DesignPreviewStatTalosBg,
        DesignPreviewLayerRegularity,
        DesignPreviewLayerAccuracy,
        DesignPreviewLayerPredict,
        DesignPreviewLayerLevel,
        DesignPreviewLayerIntensity,
        DesignPreviewLayerDashboard,
    },

    props: {
        variant: { type: String, default: 'baseline' },
    },

    data() {
        return {
            layers: ALL_STAT_LAYERS,
            curIndex: ALL_STAT_LAYERS.length - 1,
            statService: createDesignPreviewStatService(),
            speedTarget: 186,
            speedAnimFrame: null,
            dashboardReplay: 0,
            levelReplay: 0,
            layerComponents: {
                LayerRegularity: DesignPreviewLayerRegularity,
                LayerAccuracy: DesignPreviewLayerAccuracy,
                LayerPredict: DesignPreviewLayerPredict,
                LayerLevel: DesignPreviewLayerLevel,
                LayerIntensity: DesignPreviewLayerIntensity,
                LayerDashboard: DesignPreviewLayerDashboard,
            },
        };
    },

    mounted() {
        const layerParam = new URLSearchParams(window.location.search).get('layer');
        if (layerParam) {
            const idx = this.layers.findIndex((layer) => layer.component === layerParam);
            if (idx >= 0) {
                this.curIndex = idx;
            }
        }

        this.onLayerShown(this.layers[this.curIndex]?.component, {
            remountDashboard: false,
            remountLevel: false,
        });
    },

    beforeUnmount() {
        cancelAnimationFrame(this.speedAnimFrame);
    },

    methods: {
        layerKey(layer) {
            if (layer.component === 'LayerDashboard') {
                return `LayerDashboard-${this.dashboardReplay}`;
            }

            if (layer.component === 'LayerLevel') {
                return `LayerLevel-${this.levelReplay}`;
            }

            return layer.component;
        },

        toggle(step) {
            let index = this.curIndex + step;

            if (step !== -1 || index >= 0) {
                if (index < this.layers.length) {
                    this.curIndex = index;
                }
            }

            this.onLayerShown(this.layers[this.curIndex]?.component);
        },

        showLayer(layerName) {
            const idx = this.layers.findIndex((layer) => layer.component === layerName);
            if (idx < 0) {
                return false;
            }

            this.curIndex = idx;
            this.onLayerShown(layerName);
            return true;
        },

        onLayerShown(component, { remountDashboard = true, remountLevel = true } = {}) {
            if (component === 'LayerDashboard' && remountDashboard) {
                this.dashboardReplay += 1;
            }

            if (component === 'LayerLevel' && remountLevel) {
                this.levelReplay += 1;
            }

            if (component === 'LayerPredict') {
                this.statService.predict.curValue = 0;
                this.animateSpeedometer();
            }
        },

        animateSpeedometer() {
            cancelAnimationFrame(this.speedAnimFrame);

            const start = performance.now();
            const duration = 1400;
            const target = this.speedTarget;

            const tick = (now) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - (1 - t) ** 3;
                this.statService.predict.curValue = Math.round(target * eased);
                if (t < 1) {
                    this.speedAnimFrame = requestAnimationFrame(tick);
                }
            };

            this.speedAnimFrame = requestAnimationFrame(tick);
        },
    },
};
</script>
