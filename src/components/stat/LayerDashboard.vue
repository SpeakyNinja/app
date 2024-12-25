<template>
    <div class="layer-dashboard glass">
        
        <div class="wrapper">

            <div class="top">
                <IconCog class="cog" @click="toOptions()" />
            </div>

            <div class="bottom">
                <div class="counter-wrapper">
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

                <div class="in-progress">
                    <div>В процессе:</div>
                    <div class="columns">
                        <div>
                            <div>Знакомство</div>
                            <HexRed class="hex" />
                            <div>{{ getCount('red') }}</div>
                        </div>
                        <div>
                            <div>Усвоение</div>
                            <HexYellow class="hex" />
                            <div>{{ getCount('yellow') }}</div>
                        </div>
                        <div>
                            <div>Закрепление</div>
                            <HexGreen class="hex" />
                            <div>{{ getCount('green') }}</div>
                        </div>
                    </div>
                </div>
                
                <div class="btn green" @click="toTraining()">Тренироваться</div>
            </div>

        </div>
         
    </div>
</template>

<script>
    import StatService from '@/services/StatService.js';
    import RoundProgress from '@/components/RoundProgress.vue';
    import HexRed from '@/components/icons/HexRed.vue';
    import HexYellow from '@/components/icons/HexYellow.vue';
    import HexGreen from '@/components/icons/HexGreen.vue';
    import IconCog from '@/components/icons/IconCog.vue';

    export default {

        components: {
            IconCog,
            HexRed,
            HexYellow,
            HexGreen,
            RoundProgress
        },

        props: {
            statService: {
                type: StatService,
                required: true
            }
        },

        data() {
            return {
            }
        },

        methods: {
            toTraining() {
                this.$router.push('/training');
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
            }
        }
    }
</script>

<style lang="scss" scoped>

    .layer-dashboard {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 2;
            position: relative;
            height: 100%;

            .top {
                display: flex;
                justify-content: flex-end;
                padding: 16px;
                width: 100%;

                .cog {
                    width: 32px;
                    height: 32px;
                    cursor: pointer;
                }
            }

            .bottom {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                gap: 20px;
                flex-grow: 2;

                >:last-child {
                    margin-bottom: 30px;
                }

                .counter-wrapper {
                    display: flex;
                    justify-content: center;

                    .counter {
                        position: relative;
                        
                        .title {
                            position: absolute;
                            top: 75px;
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
                            top: 102px;
                            left: 0;
                            width: 100%;
                            text-align: center;
                            display: flex;
                            justify-content: center;

                            >div {
                                font-size: 64px;
                                font-family: Black;
                                color: #41424b;
                                z-index: 3;
                                
                                &.highlight {
                                    color: white;
                                    font-size: 64px;
                                    font-family: Black;
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
                    }
                }

                .in-progress {
                    display: flex;
                    flex-direction: column;
                    gap: 19px;
                    width: 310px;
                    background-color: #1e1f2c;
                    border-radius: 10px;
                    padding: 16px;

                    >:first-child {
                        color: white;
                        font-size: 16px;
                        text-align: center;
                    }

                    .columns {
                        display: flex;
                        justify-content: space-around;
                        gap: 5px;
                        width: 100%;

                        >div {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 10px;

                            >:first-child {
                                font-family: Light;
                                color: white;
                                font-size: 14px;
                            }

                            .hex {
                                width: 28px;
                                height: 28px;
                            }

                            >:last-child {
                                color: white;
                                font-size: 16px;
                            }
                        }
                    }
                }

            }

        }
    }

</style>