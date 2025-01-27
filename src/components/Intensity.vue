<template>
    <div class="intensity">

        <div class="top">
            <div class="row" v-if="lastEarnedTime">
                <div class="m-white m-light">За тренировку:</div>
                <div class="highlited">{{ getLastTrainingText() }}</div>
            </div>

            <!-- <div class="row">
                <div class="m-white m-light">Бонус:</div>
                <div class="highlited">+30м</div>
            </div> -->
        </div>

        <div class="chart" :style="{width: `${chartWidth}px`}">

            <div class="columns">
                
                <template v-for="item in getChartData()">
                    <div class="column">
                        <div class="bar-wrapper" :style="{height: `${barHeight}px`}">
                            <div 
                                v-if="item.sumTime"
                                class="bar"
                                :style="{
                                    'background-color': getBarBackground(item.sumTime),
                                    'height': getBarHeight(item.sumTime), 
                                    'box-shadow': `0px 0px 8px 0px ${getColor(item.sumTime)}`
                                }"
                            ></div>
                        </div>

                        <div class="mark">
                            <OkRound v-if="item.sumTime" />
                            <div v-else class="empty-mark"></div>
                        </div>

                    </div>
                </template>

            </div>

            <div class="grid" :style="{height: `${barHeight - gridOffset}px`, top: `${gridOffset}px`}">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

        </div>

    </div>
</template>

<script>
    import ToolsService from '@/services/ToolsService.js';
    import EarnedTimes from '@/collections/EarnedTimes.js';
    import OkRound from '@/components/icons/OkRound.vue';

    export default {

        props: {
            dateFrom: {
                type: Object,
                required: true
            },

            countDays: {
                type: Number,
                required: false,
                default: 7
            },

            times: {
                type: EarnedTimes,
                required: true
            },

            barHeight: {
                type: Number,
                required: false,
                default: 180
            },

            chartWidth: {
                type: Number,
                required: false,
                default: 280
            },

            record: {
                type: Number,
                required: true
            },

            lastEarnedTime: {
                required: true
            }
        },

        components: {
            OkRound
        },

        data() {
            return {
                gridOffset: 10
            }
        },

        methods: {
            getChartData() {
                return this.times.mapByDays(this.dateFrom, this.countDays);
            },

            // менее 6ч = красный
            // от 6 до 12 = оранжевый
            // от 12 до 24 = желтый
            // от 24 до 48 = зеленый
            // более 48 = циановый
            getColor(seconds) {
                if(seconds < 60 * 60 * 6) {
                    return '#ff543f';
                } else if(seconds < 60 * 60 * 12) {
                    return '#ff8446';
                } else if(seconds < 60 * 60 * 24) {
                    return '#f1dd77';
                } else if(seconds < 60 * 60 * 48) {
                    return '#88cc69';
                } else {
                    return '#73bdff';
                }
            },

            getBarBackground(seconds) {
                return seconds == this.record ? 'white' : this.getColor(seconds);
            },

            getBarHeight(seconds) {
                const min = 0;
                const maxLimit = 60 * 60 * 48;
                let max = this.times.getMaxSumTime(this.dateFrom, this.countDays);
                if(max < maxLimit) {
                    max = maxLimit;
                }

                const value = Math.round(seconds * 100 / max);

                return `${value}%`;
            },

            getLastTrainingText() {
                const seconds = this.lastEarnedTime?.seconds;
                const hours = this.toolsService.hours(seconds);
                const minutes = this.toolsService.minutes(seconds);
                
                return `+${hours}ч ${minutes}м`;
            }
        },

        beforeMount() {
            this.toolsService = new ToolsService();
        }
    }
</script>

<style lang="scss" scoped>

    .intensity {
        display: flex;
        flex-direction: column;
        gap: 20px;
        
        .top {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .row {
                display: flex;
                gap: 10px;

                >:first-child {
                    width: 142px;
                    text-align: right;
                }

                .highlited {
                    color: white;
                    font-family: RobotoBlack;
                    text-shadow: 0px 0px 15px #7faef9, 0px 0px 15px rgba(127,174,249,0.5);
                }
            }
        }

        .chart {
            position: relative;

            .grid {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                div {
                    width: 100%;
                    height: 1px;
                    background-color: #424558;
                }
            }

            .columns {
                display: flex;
                justify-content: space-around;
                position: relative;
                z-index: 2;

                .column {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;

                    .bar-wrapper {
                        width: 16px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        align-items: center;

                        .bar {
                            width: 6px;
                            height: 50%;
                            border-top-left-radius: 10px;
                            border-top-right-radius: 10px;
                        }
                    }

                    .empty-mark {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        border: 1px solid rgba(255, 255, 255, 0.5);
                    }

                    .mark {
                        width: 16px;
                        height: 16px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        svg {
                            min-width: 30px;
                            min-height: 30px;
                        }
                    }
                }

            }
        }
    }

</style>