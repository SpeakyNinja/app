<template>
    <div class="main-bg statistics-anim-preview">
        <div class="statistics no-select" ref="statisticsContainer">
            <div
                class="layers-wrapper"
                ref="layersWrapper"
                :class="{ 'swipe-in-progress': swipeInProgress }"
            >
                <component
                    v-for="(layer, idx) in layers"
                    :key="`${layer.component}-${idx}`"
                    :is="layer.component"
                    :stat-service="statService"
                />
            </div>

            <div class="items no-scrollbar" ref="itemsList">
                <div class="items-wrapper">
                    <div v-for="item in statService.items" :key="item.en" class="item">
                        <div class="text">
                            <span class="en">{{ item.en }}</span><span class="m-light"> — {{ item.ru }}</span>
                        </div>
                        <Memorization :mem="item.memorization" fill="transparent" />
                    </div>
                </div>
            </div>

            <StatPult :layers="layers" :cur-index="curIndex" @toggle="toggle" />
        </div>
    </div>
</template>

<script>
import Memorization from '@/components/Memorization.vue';
import LayerDashboard from '@/components/stat/LayerDashboard.vue';
import LayerRegularity from '@/components/stat/LayerRegularity.vue';
import StatPult from '@/components/stat/StatPult.vue';
import {
    bootstrapStatisticsAnimPreview,
    bootstrapStatisticsPreview,
    createPreviewStatService,
} from '@/utils/engagementPreviewBootstrap.js';

export default {
    name: 'StatisticsAnimPreview',

    components: {
        Memorization,
        LayerDashboard,
        LayerRegularity,
        StatPult,
    },

    props: {
        /** 'dashboard' | 'regularity_dashboard' */
        mode: {
            type: String,
            default: 'dashboard',
        },
    },

    emits: ['ready'],

    data() {
        return {
            statService: null,
            layers: [],
            curIndex: 0,
            swipeInProgress: false,
            state: {
                getShowFullStat: () => false,
                setShowFullStat: () => {},
            },
        };
    },

    created() {
        this.bootstrap();
    },

    mounted() {
        this.$nextTick(() => {
            this.updateLeft();
            this.$emit('ready');
        });
    },

    methods: {
        bootstrap() {
            const vm = this;
            vm.statService = createPreviewStatService();

            if (this.mode === 'regularity_dashboard') {
                bootstrapStatisticsAnimPreview(vm, ['LayerRegularity', 'LayerDashboard']);
            } else {
                bootstrapStatisticsPreview(vm, 'LayerDashboard');
            }
        },

        toggle(step) {
            let index = this.curIndex + step;

            if (step !== -1 || index >= 0) {
                this.curIndex = index;
            }

            this.updateLeft();
        },

        updateLeft() {
            const wrapper = this.$refs.layersWrapper;
            if (!wrapper) {
                return;
            }
            wrapper.style.left = `${-this.curIndex * 100}%`;
        },

        showLayer(layerName) {
            const layers = [{ component: 'LayerDashboard', title: '' }];

            if (layerName === 'LayerRegularity') {
                layers.unshift({ component: 'LayerRegularity', title: 'Регулярность' });
            } else if (layerName === 'LayerPredict') {
                layers.unshift({ component: 'LayerPredict', title: 'Прогноз' });
            } else {
                return false;
            }

            this.curIndex = 0;
            this.layers = layers;
            this.$nextTick(() => this.updateLeft());
        },
    },
};
</script>

<style lang="scss" scoped>
.statistics-anim-preview {
    width: 100%;
    height: 100%;
    min-height: 100%;
    display: flex;
}

.statistics {
    flex: 1;
    width: 100%;
    height: 100%;
    min-height: 100%;
    position: relative;

    .layers-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;

        &.swipe-in-progress {
            transition: none;
        }
    }

    .items {
        max-height: 100%;
        padding: 280px 40px 100px;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        overflow-y: auto;

        .items-wrapper {
            display: flex;
            flex-direction: column;

            .item {
                display: flex;
                align-items: center;
                gap: 10px;
                color: white;
                font-size: 22px;
                height: 10vh;

                .text {
                    flex-grow: 2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #98989f;

                    .en {
                        font-size: 20px;
                        font-family: Bold;
                        color: #eaeaeb;
                        display: inline-block;
                        text-transform: lowercase;

                        &:first-letter {
                            text-transform: uppercase;
                        }
                    }
                }
            }
        }
    }
}
</style>
