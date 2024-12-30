<template>
    <div class="statistics main-bg no-select" v-if="isReady">
        
        <component 
            :statService="statService"
            :is="layers[ curIndex ].component" 
            :key="layers[ curIndex ].component" 
        />

        <div class="items no-scrollbar" ref="itemsList">
            <div class="items-wrapper">
                
                <div class="item" v-for="item in statService.items">
                    <div class="text">
                        <span class="en">{{ item.en }}</span><span class="m-light"> — {{ item.ru }}</span>
                    </div>
                    <Memorization :mem="item.memorization" fill="transparent" />
                </div>

            </div>
        </div>

        <StatPult :layers="layers" @toggle="toggle" :curIndex="curIndex" />
         
    </div>
</template>

<script>
    import { inject } from 'vue';
    import { nextTick } from "vue";
    import Memorization from '@/components/Memorization.vue';
    import LayerAccuracy from '@/components/stat/LayerAccuracy.vue';
    import LayerPredict from '@/components/stat/LayerPredict.vue';
    import LayerRegularity from '@/components/stat/LayerRegularity.vue';
    import LayerDashboard from '@/components/stat/LayerDashboard.vue';
    import LayerLevel from '@/components/stat/LayerLevel.vue';
    import StatPult from '@/components/stat/StatPult.vue';
    import StatService from '@/services/StatService.js';

    export default {

        components: {
            Memorization,
            LayerAccuracy,
            LayerPredict,
            LayerRegularity,
            LayerLevel,
            LayerDashboard,
            StatPult
        },

        data() {
            return {
                isReady: false,
                curIndex: 0,
                layers: []
            }
        },

        methods: {
            toggle(step) {
                let index = this.curIndex + step;

                if(step == -1 && index < 0) {
                    return false;
                }

                this.curIndex = index;
            },

            makeLayers() {
                this.layers = [];
                // this.layers = [
                //     {component: 'LayerAccuracy', title: 'Слова'},
                //     {component: 'LayerPredict', title: 'Прогноз'},
                //     {component: 'LayerRegularity', title: 'Регулярность'},
                //     {component: 'LayerLevel', title: 'Уровень'}
                // ];
                
                if(this.state.getShowFullStat()) {
                    this.state.setShowFullStat(false);

                    this.layers.push( {component: 'LayerAccuracy', title: 'Слова'} );
                    
                    if(this.statService.showPredictLayer()) {
                        this.layers.push({component: 'LayerPredict', title: 'Прогноз'});
                    }

                    if(this.statService.showRegularityLayer()) {
                        this.layers.unshift({component: 'LayerRegularity', title: 'Регулярность'});
                    }

                    if(this.statService.showLevelLayer()) {
                        this.layers.push({component: 'LayerLevel', title: 'Уровень'});
                    }
                }

                this.layers.push({component: 'LayerDashboard', title: ''});
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.state = inject('state');

            this.statService = new StatService();

            try {
                this.preloader.show = true;
                const r = await this.statService.fetch();
                
                this.makeLayers();
                this.isReady = true;
                await nextTick();
                this.$refs.itemsList.scrollBy(0, 226);
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
        width: 100%;
        height: 100vh;

        .items {
            max-height: 100%;
            padding: 280px 40px 70px 40px;
            overflow: hidden;
            position: absolute;
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