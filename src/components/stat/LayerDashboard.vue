<template>
    <div class="layer-dashboard glass">
        
        <div class="wrapper">

            <div class="top glass">
                <TimerStat :statService="statService" :isSmall="true" />
            </div>

            <div class="middle no-scrollbar">

                <div class="settings-button" @click="toOptions()">
                    <IconCog class="cog" />
                </div>

                <div class="counter-wrapper mt-2">
                    <div class="counter">
                        <div class="title">Словарный запас</div>

                        <div class="value">
                            <div 
                                v-for="(part, i) in getLearnedWordsChars()" 
                                :class="{highlight: i == 1, 'accuracy-1': i == 1}"
                                v-html="part"
                            >
                            </div>
                        </div>

                        <div class="in-progress">
                            <div class="columns" @click="showStagesNotice = true">
                                <div>
                                    <HexRed class="hex" />
                                    <div>{{ getCount('red') }}</div>
                                </div>
                                <div>
                                    <HexYellow class="hex" />
                                    <div>{{ getCount('yellow') }}</div>
                                </div>
                                <div>
                                    <HexGreen class="hex" />
                                    <div>{{ getCount('green') }}</div>
                                </div>
                            </div>
                        </div>

                        <RoundProgress 
                            :options="{progress: statService.getProgressInBelt()}"
                            :radius="134"
                            fill="#1e1f2c"
                            :strokeWidth="7"
                            :filledStroke="statService.getBeltColor()"
                        />
                        <div class="scale" v-for="angle in getScale()">
                            <div class="mark" :style="{ 'transform': 'rotate(' + angle + 'deg)' }"></div>
                        </div>
                    </div>
                </div>

                <div class="neurons m-light">
                    Нейроны: {{ new Intl.NumberFormat().format( statService.count_neurons ) }}
                </div>

                <div class="buttons-wrapper">
                    <div class="row">
                        <div class="item" @click="$parent.showLayer('LayerPredict')">
                            <div class="item-title">Прогноз</div>
                            <div class="item-value">+ {{ statService.predict.curValue }}</div>
                        </div>
                        <div class="item" @click="$parent.showLayer('LayerRegularity')">
                            <div class="item-title">Регулярность</div>
                            <div class="item-value">{{ statService.getNonstopDays() }}</div>
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="bottom glass">
                <div class="btn green" @click="toTraining()">Тренироваться</div>
            </div>

        </div>
         
        <NoticeLayer 
            ref="stagesNoticeLayer"
            :items="noticeService.getItems('stagesWords')" 
            @closedHandler="closeStagesNotice" 
            v-if="showStagesNotice" 
        />

    </div>

</template>

<script>
    import { nextTick } from "vue";
    import StatService from '@/services/StatService.js';
    import RoundProgress from '@/components/RoundProgress.vue';
    import HexRed from '@/components/icons/HexRed.vue';
    import HexYellow from '@/components/icons/HexYellow.vue';
    import HexGreen from '@/components/icons/HexGreen.vue';
    import IconCog from '@/components/icons/IconCog.vue';
    import NoticeLayer from '@/components/NoticeLayer.vue'
    import NoticeService from '@/services/NoticeService.js';
    import TimerStat from '@/components/TimerStat.vue'

    export default {

        components: {
            IconCog,
            HexRed,
            HexYellow,
            HexGreen,
            RoundProgress,
            NoticeLayer,
            TimerStat
        },

        props: {
            statService: {
                type: StatService,
                required: true
            }
        },

        data() {
            return {
                showStagesNotice: false,
                noticeService: null
            }
        },

        methods: {
            toTraining() {
                const trainingCost = 2500;
                if(this.statService.count_neurons >= trainingCost) {
                    this.$router.push('/training');
                } else {
                    this.$router.push('/store');
                }
            },

            toOptions() {
                this.$router.push('/options');
            },

            countLearnedWordsFormatted() {
                const unformatted = this.statService.getLearnedWordsCount();
                const formatted = unformatted.toString().padStart(5, '0');
                return formatted.slice(0, 2) + ' ' + formatted.slice(2);
            },

            getLearnedWordsChars() {
                let highlighted = false;
                const string = this.countLearnedWordsFormatted();

                let moreZero = '';
                let other = '';

                string.split('').forEach(char => {
                    if(char > 0) {
                        highlighted = true;
                    }

                    if(highlighted) {
                        moreZero += char;
                    } else {

                        if(char === ' ') {
                            char = '&nbsp;';
                        }

                        other += char;
                    }
                });

                return [other, moreZero];
            },

            getCount(color) {
                if(color == 'red') {
                    return this.statService.countWordsByMemorizations([0, 1, 2, 3]);
                } else if(color == 'yellow') {
                    return this.statService.countWordsByMemorizations([4, 5, 6, 7]);
                }

                return this.statService.countWordsByMemorizations([8, 9, 10, 11]);
            },

            getScale() {
                const belt = this.statService.getBelt();
                const countLevels = this.statService.getCountLevelsInBelt(belt);
                const angleStep = 360 / countLevels;
                
                const scale = [];
                for(let angle = 0; angle < 360; angle += angleStep) {
                    scale.push(angle);
                }

                return scale;
            },

            closeStagesNotice() {
                this.$refs.stagesNoticeLayer.isClosed = false;
                this.showStagesNotice = false;
            },

            toStore() {
                this.$router.push('/store');
            }
        },

        beforeMount() {
            this.noticeService = new NoticeService();
        }
    }
</script>

<style lang="scss" scoped>

    .layer-dashboard {
        // position: absolute;
        // top: 0;
        // left: 0;
        width: 100%;
        min-width: 100%;
        height: 100%;

        .wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 2;
            position: relative;
            height: 100%;

            .top {
                position: absolute;
                top: 0;
                left: 0;
                height: 81px;
                min-height: 81px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 4px;
                width: 100%;
                border-bottom: 1px solid #4c4d57;
                z-index: 4;
            }

            .cog {
                width: 26px;
                height: 26px;
                cursor: pointer;
            }

            .middle {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                gap: 20px;
                flex-grow: 2;
                padding-top: 81px;
                padding-bottom: 111px;
                overflow-y: auto;
                width: 100%;
                position: relative;

                >:last-child {
                    margin-bottom: 30px;
                }

                .settings-button {
                    position: absolute;
                    top: 100px;
                    right: 25px;
                }

                .neurons {
                    color: white;
                    font-size: 14px;
                }

                .counter-wrapper {
                    display: flex;
                    justify-content: center;

                    .counter {
                        position: relative;
                        
                        .title {
                            position: absolute;
                            top: 54px;
                            left: 0;
                            width: 100%;
                            text-align: center;
                            font-size: 16px;
                            font-family: Light;
                            color: white;
                            z-index: 3;
                        }

                        .value {
                            position: absolute;
                            top: 90px;
                            left: 0;
                            width: 100%;
                            text-align: center;
                            display: flex;
                            justify-content: center;

                            >div {
                                font-size: 64px;
                                font-family: RobotoBlack;
                                color: #41424b;
                                z-index: 3;
                                
                                &.highlight {
                                    color: white;
                                    font-size: 64px;
                                    font-family: RobotoBlack;
                                }
                            }
                        }

                        .scale {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            display: flex;
                            justify-content: center;

                            .mark {
                                height: 100%;
                                display: flex;
                                
                                &:after {
                                    content: '';
                                    width: 2px;
                                    height: 7px;
                                    background-color: #41424b;
                                    margin-top: 7px;
                                }
                            }
                        }

                        .in-progress {
                            display: flex;
                            justify-content: center;
                            width: 100%;
                            position: absolute;
                            top: 175px;
                            left: 0;
                            z-index: 1;

                            .columns {
                                display: flex;
                                justify-content: space-around;
                                gap: 20px;

                                >div {
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    gap: 10px;

                                    .hex {
                                        width: 28px;
                                        height: 28px;
                                    }

                                    >:last-child {
                                        color: white;
                                        font-size: 14px;
                                    }
                                }
                            }
                        }
                    }
                }


                .buttons-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;

                    .row {
                        display: flex;
                        gap: 10px;

                        .item {
                            background-color: #1e1f2c;
                            border-radius: 10px;
                            border: 1px solid #272733;
                            width: 150px;
                            min-width: 150px;
                            height: 87px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            gap: 10px;
                            box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.2);

                            .item-title {
                                text-align: center;
                                font-size: 14px;
                                font-family: Light;
                                color: white;
                            }

                            .item-value {
                                font-size: 20px;
                                font-family: RobotoBold;
                                color: white;
                                text-shadow: 0px 0px 15px #7faef9, 0px 0px 15px rgba(127,174,249,0.5);
                                line-height: 1;
                            }
                        }
                    }
                }

            }

            .bottom {
                position: absolute;
                bottom: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                border-top: 1px solid #4c4d57;
                width: 100%;
                padding: 20px 0;

                .btn {
                    z-index: 2;
                    width: 310px;
                }
            }

        }
    }

</style>