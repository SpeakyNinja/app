<template>
    <div class="statistics main-bg" v-if="isReady">
        
        <div class="top-fixed">
            <div class="wrapper">
                
                <div 
                    class="m-size20 accuracy" 
                    :class="{low : isLowAccuracy() , mid : isMidAccuracy()}"
                >
                    Точность ответов
                </div>

                <div 
                    class="m-bold mt-2 percents" 
                    :class="{low : isLowAccuracy() , mid : isMidAccuracy()}"
                >
                    {{ statService.getAccuracy() }}
                    <span class="m-size46 m-light">%</span>
                </div>

                <!-- <div class="mt-4">10 тренировок: 98,5%</div> -->
            </div>
        </div>

        <div class="items">
            <div class="item" v-for="item in statService.items">
                <div class="m-bold">{{ item.en }}</div>
                <div>-</div>
                <div class="translate">{{ item.ru }}</div>
                <Memorization :mem="item.memorization" />
            </div>
        </div>

        <div class="controls">
            <div class="btn green" @click="toTraining()">Тренироваться</div>
        </div>
         
    </div>
</template>

<script>
    import { inject } from 'vue';
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
            isMidAccuracy() {
                const accuracy = this.statService.getAccuracy();
                return accuracy >=50 && accuracy < 75;
            },

            isLowAccuracy() {
                const accuracy = this.statService.getAccuracy();
                return accuracy < 50;
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
                this.isReady = true;
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
        padding-top: 250px;
        
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
                padding: 30px 10px;
                color: white;
                border-bottom: 1px solid rgba(255,255,255,0.2);

                .accuracy {
                    text-shadow: 
                        0px 0px 80px rgba(34,240,0,1), 
                        0px 0px 20px rgba(34,240,0,0.5), 
                        0px 0px 10px rgba(34,240,0,0.25),
                        0px 0px 5px rgba(255,255,255,0.35);

                    &.low {
                        text-shadow: 
                            0px 0px 80px rgba(240,22,0,1), 
                            0px 0px 20px rgba(240,22,0,0.5), 
                            0px 0px 10px rgba(240,22,0,0.25),
                            0px 0px 5px rgba(255,255,255,0.35);
                    }

                    &.mid {
                        text-shadow: 
                            0px 0px 80px rgba(240,222,0,1), 
                            0px 0px 20px rgba(240,222,0,0.5), 
                            0px 0px 10px rgba(240,222,0,0.25),
                            0px 0px 5px rgba(255,255,255,0.35);
                    }
                }

                .percents {
                    font-size: 56px;
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

                    &.low {
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

                    &.mid {
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
                background-color: rgba(255, 255, 255, .1);
                backdrop-filter: blur(6px);
            }
        }

        .items {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 0 30px;

            .item {
                display: flex;
                align-items: center;
                gap: 10px;
                color: white;
                font-size: 22px;

                .translate {
                    flex-grow: 2;
                }
            }
        }

        .controls {
            margin-top: 10px;
            padding: 20px;
            display: flex;
            justify-content: center;

            .btn {
                max-width: 400px;
            }
        }
    }

</style>