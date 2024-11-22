<template>
    <div class="statistics main-bg no-scrollbar no-select" v-if="isReady" ref="self">
        
        <LayerPredict :statService="statService" v-if="currentLayer == 'predict'" />
        <LayerAccuracy :statService="statService" v-if="currentLayer == 'accuracy'" />

        <div class="items">
            <div class="item" v-for="item in statService.items">
                <div class="text">
                    <span class="en">{{ item.en }}</span><span class="m-light"> — {{ item.ru }}</span>
                </div>
                <Memorization :mem="item.memorization" fill="transparent" />
            </div>
        </div>

        <div class="pult">
            <Arrows fill="white" class="m-pointer" @click="toggle(-1)" />
            <div class="text" v-if="currentLayer == 'predict'">Прогноз</div>
            <div class="text" v-if="currentLayer == 'accuracy'">Слова</div>
            <Arrows fill="white" class="m-flip-horizontal m-pointer" @click="toggle(1)" />
        </div>
         
    </div>
</template>

<script>
    import { inject } from 'vue';
    import { nextTick } from "vue";
    import Memorization from '@/components/Memorization.vue'
    import LayerAccuracy from '@/components/stat/LayerAccuracy.vue'
    import LayerPredict from '@/components/stat/LayerPredict.vue'
    import Arrows from '@/components/icons/Arrows.vue'
    import StatService from '@/services/StatService.js';

    export default {

        components: {
            Memorization,
            Arrows,
            LayerAccuracy,
            LayerPredict
        },

        data() {
            return {
                isReady: false,
                currentLayer: 'accuracy',
                layers: ['accuracy', 'predict']
            }
        },

        methods: {
            toggle(step) {
                let currentIndex;

                this.layers.forEach((layer, i) => {
                    if(layer == this.currentLayer) {
                        currentIndex = i;
                    }
                });

                let index = currentIndex + step;

                if(!this.layers[index]) {
                    index = step > 0 ? 0 : this.layers.length - 1;
                }

                this.currentLayer = this.layers[index];
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

    .statistics {
        flex-grow: 2;
        padding-top: 258px;
        padding-bottom: 191px;
        width: 100%;
        height: 100vh;

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

        .pult {
            position: fixed;
            bottom: 0;
            left: -10%;
            width: 120%;
            background-color: rgba(0, 0, 0, 0.2);
            z-index: 100;
            color: white;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 24px;
            border-top-left-radius: 100%;
            border-top-right-radius: 100%;
            border-top: 1px solid #7a7a7d;
            font-family: RobotoLight;
            padding: 0 20%;

            .text {
                margin-bottom: 20px;
                flex-grow: 2;
                text-align: center;
            }
        }
    }

</style>