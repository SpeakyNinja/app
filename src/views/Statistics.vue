<template>
    <div class="statistics main-bg no-scrollbar no-select" v-if="isReady" ref="self">
        
        <div class="top-fixed">
            <div class="wrapper">
                
                <div 
                    class="m-size20 accuracy" 
                    :class="accuracyCssClass"
                >
                    Точность ответов
                </div>

                <div 
                    class="percents" 
                    :class="accuracyCssClass"
                >
                    {{ statService.getAccuracy() }}<span class="sign">%</span>
                </div>

                <!-- <div class="mt-4">10 тренировок: 98,5%</div> -->
            </div>
        </div>

        <div class="items">
            <div class="item" v-for="item in statService.items">
                <div class="text">
                    <span class="en">{{ item.en }}</span><span class="m-light"> — {{ item.ru }}</span>
                </div>
                <Memorization :mem="item.memorization" fill="transparent" />
            </div>
        </div>

        <div class="controls">
            <div class="btn green" @click="toTraining()">Тренироваться</div>
        </div>
         
    </div>
</template>

<script>
    import { inject } from 'vue';
    import { nextTick } from "vue";
    import Memorization from '@/components/Memorization.vue'
    import StatService from '@/services/StatService.js';

    export default {

        components: {
            Memorization
        },

        data() {
            return {
                isReady: false
            }
        },

        methods: {
            makeAccuracyCssClass() {
                const accuracy = this.statService.getAccuracy();
                let level = 5;
                if(accuracy == 100) {
                    level = 1;
                } else if(accuracy >= 95) {
                    level = 2;
                } else if(accuracy >= 90) {
                    level = 3;
                } else if(accuracy >= 85) {
                    level = 4;
                }

                this.accuracyCssClass = `accuracy-${level}`;
            },

            toTraining() {
                this.$router.push('/training');
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');

            this.statService = new StatService();

            try {
                this.preloader.show = true;
                await this.statService.fetch();
                this.makeAccuracyCssClass();
                this.isReady = true;
                await nextTick();
                this.$refs.self.scrollBy(0, 226);
            } catch(res) {
                if(res.code == 'training-not-found') {
                    this.$router.push('/training');
                } else {
                    this.modal.show(res);
                }
            } finally {
                this.preloader.show = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .statistics {
        flex-grow: 2;
        padding-top: 226px;
        padding-bottom: 111px;
        width: 100%;
        height: 100vh;

        .top-fixed {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1;

            .wrapper {
                z-index: 2;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 55px 10px;
                color: white;
                border-bottom: 1px solid rgba(255,255,255,0.2);

                .accuracy {
                    &.accuracy-1 {
                        text-shadow: 
                            0px 0px 80px rgba(9,190,255,1), 
                            0px 0px 20px rgba(9,190,255,0.5), 
                            0px 0px 10px rgba(9,190,255,0.25),
                            0px 0px 5px rgba(255,255,255,0.35);
                    }

                    &.accuracy-2 {
                        text-shadow: 
                            0px 0px 80px rgba(34,240,0,1), 
                            0px 0px 20px rgba(34,240,0,0.5), 
                            0px 0px 10px rgba(34,240,0,0.25),
                            0px 0px 5px rgba(255,255,255,0.35);
                    }

                    &.accuracy-3 {
                        text-shadow: 
                            0px 0px 80px rgba(240,222,0,1), 
                            0px 0px 20px rgba(240,222,0,0.5), 
                            0px 0px 10px rgba(240,222,0,0.25),
                            0px 0px 5px rgba(255,255,255,0.35);
                    }

                    &.accuracy-4 {
                        text-shadow: 
                            0px 0px 80px rgba(255,97,22,1), 
                            0px 0px 20px rgba(255,97,22,0.5), 
                            0px 0px 10px rgba(255,97,22,0.25),
                            0px 0px 5px rgba(255,255,255,0.35);
                    }

                    &.accuracy-5 {
                        text-shadow: 
                            0px 0px 80px rgba(240,22,0,1), 
                            0px 0px 20px rgba(240,22,0,0.5), 
                            0px 0px 10px rgba(240,22,0,0.25),
                            0px 0px 5px rgba(255,255,255,0.35);
                    }
                }

                .percents {
                    font-size: 68px;
                    font-family: RobotoBlack;
                    padding-left: 40px;
                    display: flex;
                    gap: 5px;
                    align-items: flex-end;
                    line-height: 0.9;
                    margin-top: 30px;

                    .sign {
                        font-size: 68px;
                        font-family: RobotoLight;
                    }

                    &.accuracy-1 {
                        text-shadow: 
                            0px 0px 80px rgba(9,190,255,1), 
                            0px 0px 50px rgba(9,190,255,1), 
                            0px 0px 30px rgba(9,190,255,0.25), 
                            0px 0px 20px rgba(255,255,255,0.85);
                        
                        span {
                            text-shadow: 
                                0px 0px 50px rgba(9,190,255,1), 
                                0px 0px 20px rgba(9,190,255,1), 
                                0px 0px 10px rgba(9,190,255,0.25),
                                0px 0px 5px rgba(255,255,255,0.85);
                        }
                    }


                    &.accuracy-2 {
                        text-shadow: 
                            0px 0px 80px rgba(34,240,0,1), 
                            0px 0px 50px rgba(34,240,0,1), 
                            0px 0px 30px rgba(34,240,0,0.25), 
                            0px 0px 20px rgba(255,255,255,0.85);
                        
                        span {
                            text-shadow: 
                                0px 0px 50px rgba(34,240,0,1), 
                                0px 0px 20px rgba(34,240,0,1), 
                                0px 0px 10px rgba(34,240,0,0.25),
                                0px 0px 5px rgba(255,255,255,0.85);
                        }
                    }

                    &.accuracy-3 {
                        text-shadow: 
                            0px 0px 80px rgba(240,222,0,1), 
                            0px 0px 50px rgba(240,222,0,1), 
                            0px 0px 30px rgba(240,222,0,0.25), 
                            0px 0px 20px rgba(255,255,255,0.85);

                        span {
                            text-shadow: 
                                0px 0px 50px rgba(240,222,0,1), 
                                0px 0px 20px rgba(240,222,0,1), 
                                0px 0px 10px rgba(240,222,0,0.25),
                                0px 0px 5px rgba(255,255,255,0.85);
                        }
                    }

                    &.accuracy-4 {
                        text-shadow: 
                            0px 0px 80px rgba(255,97,22,1), 
                            0px 0px 50px rgba(255,97,22,1), 
                            0px 0px 30px rgba(255,97,22,0.25), 
                            0px 0px 20px rgba(255,255,255,0.85);

                        span {
                            text-shadow: 
                                0px 0px 50px rgba(255,97,22,1), 
                                0px 0px 20px rgba(255,97,22,1), 
                                0px 0px 10px rgba(255,97,22,0.25),
                                0px 0px 5px rgba(255,255,255,0.85);
                        }
                    }

                    &.accuracy-5 {
                        text-shadow: 
                            0px 0px 80px rgba(240,22,0,1), 
                            0px 0px 50px rgba(240,22,0,1), 
                            0px 0px 30px rgba(240,22,0,0.25), 
                            0px 0px 20px rgba(255,255,255,0.85);

                        span {
                            text-shadow: 
                                0px 0px 50px rgba(240,22,0,1), 
                                0px 0px 20px rgba(240,22,0,1), 
                                0px 0px 10px rgba(240,22,0,0.25),
                                0px 0px 5px rgba(255,255,255,0.85);
                        }
                    }
                }
            }

            &:before {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                content: "";
                background-color: rgba(10, 10, 12, .24);
                backdrop-filter: blur(8px);
            }
        }

        .items {
            display: flex;
            flex-direction: column;
            padding: 0 40px;

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
                        font-family: RobotoBold;
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

        .controls {
            margin-top: 10px;
            padding: 20px;
            display: flex;
            justify-content: center;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            border-top: 1px solid rgba(255,255,255,0.2);

            &:before {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                content: "";
                background-color: rgba(10, 10, 12, .24);
                backdrop-filter: blur(8px);
            }

            .btn {
                max-width: 250px;
                z-index: 2;
            }
        }
    }

</style>