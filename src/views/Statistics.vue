<template>
    <div class="statistics main-bg">
        
        <div class="top-fixed">
            <div class="wrapper">
                <div class="m-size20 accuracy">Точность ответов</div>
                <div class="m-bold mt-2 percents">95<span class="m-size46 m-light">%</span></div>
                <div class="mt-4">10 тренировок: 98,5%</div>
            </div>
        </div>

        <div class="items">
            <div class="item" v-for="item in items">
                <div class="m-bold">{{ item.word }}</div>
                <div>-</div>
                <div class="translate">{{ item.translate }}</div>
                <RoundProgress :options="item" />
            </div>
        </div>
         
    </div>
</template>

<script>
    import ProgressBar from '@/components/ProgressBar.vue'
    import RoundProgress from '@/components/RoundProgress.vue'

    export default {

        components: {
            ProgressBar,
            RoundProgress
        },

        data() {
            return {
                items: [
                    {word: 'spring', translate: 'ручей', progress: 100},
                    {word: 'summer', translate: 'лето', progress: 78},
                    {word: 'autumn', translate: 'осень', progress: 62},
                    {word: 'winter', translate: 'зима', progress: 15},
                    {word: 'sun', translate: 'солнце', progress: 90},
                    {word: 'moon', translate: 'луна', progress: 73},
                    {word: 'star', translate: 'звезда', progress: 22},
                    {word: 'sky', translate: 'небо', progress: 80},
                    {word: 'cloud', translate: 'облако', progress: 67},
                    {word: 'rain', translate: 'дождь', progress: 7},
                    {word: 'snow', translate: 'снег', progress: 92},
                    {word: 'wind', translate: 'ветер', progress: 69},
                    {word: 'storm', translate: 'буря', progress: 55},
                    {word: 'lightning', translate: 'молния', progress: 45},
                    {word: 'thunder', translate: 'гром', progress: 44},
                    {word: 'river', translate: 'река', progress: 40},
                    {word: 'mountain', translate: 'гора', progress: 37},
                    {word: 'forest', translate: 'лес', progress: 80},
                    {word: 'tree', translate: 'дерево', progress: 10},
                    {word: 'flower', translate: 'цветок', progress: 77}
                ]
            }
        },

        methods: {
            
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
    }

</style>