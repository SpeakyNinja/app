<template>
    <div class="statistics main-bg no-select" v-if="isReady" ref="statisticsContainer">
        
        <div class="layers-wrapper" ref="layersWrapper" :class="{ 'swipe-in-progress': swipeInProgress }">
            
            <template v-for="layer in layers">
                <component 
                    :statService="statService"
                    :is="layer.component"
                />
            </template>

        </div>

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

    <NoticeLayer 
        :items="noticeItemsBefore"
        @closedHandler="showMainContent"
        v-if="noticeItemsBefore.length"

    />

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
    import LayerIntensity from '@/components/stat/LayerIntensity.vue';
    import NoticeLayer from '@/components/NoticeLayer.vue';
    import StatPult from '@/components/stat/StatPult.vue';
    import StatService from '@/services/StatService.js';
    import NoticeService from '@/services/NoticeService.js';
    import SlideHandler from "@/services/SlideHandler.js";
    import PwaInstallService from '@/services/PwaInstallService.js';
    import ToolsService from '@/services/ToolsService.js';

    export default {

        components: {
            Memorization,
            LayerAccuracy,
            LayerPredict,
            LayerRegularity,
            LayerLevel,
            LayerDashboard,
            LayerIntensity,
            StatPult,
            NoticeLayer
        },

        data() {
            return {
                isReady: false,
                curIndex: 0,
                layers: [],
                noticeItemsBefore: [],
                swipeDelta: 20,
                swipeInProgress: false
            }
        },

        methods: {
            toggle(step) {
                let index = this.curIndex + step;

                if(step != -1 || index >= 0) {
                    this.curIndex = index;
                }

                this.updateLeft();

                if(this.curIndex == this.layers.length - 1) {
                    this.slideHandler?.clearListeners();
                }
            },

            makeLayers() {
                this.layers = [
                    // {component: 'LayerAccuracy', title: 'Слова'},
                    // {component: 'LayerPredict', title: 'Прогноз'},
                    // {component: 'LayerRegularity', title: 'Регулярность'},
                    // {component: 'LayerLevel', title: 'Уровень'},
                    // {component: 'LayerIntensity', title: 'Интенсивность'}
                ];
                
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

                    // this.layers.push({component: 'LayerIntensity', title: 'Интенсивность'});
                }

                this.layers.push({component: 'LayerDashboard', title: ''});
            },

            async showMainContent() {
                this.isReady = true;
                await nextTick();
                this.$refs.itemsList.scrollBy(0, 280);
                // this.initSwipeLayers();
            },

            initSwipeLayers() {
                if(this.layers.length > 1) {
                    this.slideHandler = new SlideHandler(
                        this.$refs.statisticsContainer, 
                        this.swipeEndHandler.bind(this),
                        this.swipeHandler.bind(this),
                        'x'
                    );
                }
            },

            swipeEndHandler(direction, delta) {
                const left = -this.curIndex * 100;

                if(delta >= this.swipeDelta) {
                    this.toggle(direction);
                } else {
                    this.updateLeft();
                }
                    
                this.swipeInProgress = false;
            },

            swipeHandler(distance) {
                this.swipeInProgress = true;
                const curLeft = -this.curIndex * 100;
                const left = curLeft + distance / this.$refs.statisticsContainer.clientWidth * 100;
                this.$refs.layersWrapper.style.left = `${left}%`;
            },

            updateLeft() {
                const left = -this.curIndex * 100;
                this.$refs.layersWrapper.style.left = `${left}%`;
            },

            showLayer(layerName) {
                const layers = [{component: 'LayerDashboard', title: ''}];

                if(layerName == 'LayerRegularity') {
                    layers.unshift({component: 'LayerRegularity', title: 'Регулярность'});
                } else if(layerName == 'LayerPredict') {
                    layers.unshift( {component: 'LayerPredict', title: 'Прогноз'} );
                } else {
                    return false;
                }

                this.curIndex = 0;
                this.layers = layers;
                this.updateLeft();
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.state = inject('state');

            this.statService = new StatService();
            this.noticeService = new NoticeService();
            this.tools = new ToolsService();

            try {
                this.preloader.show = true;
                const r = await this.statService.fetch();

                const notices = [];
                
                if(this.state.updateCurrentLevel( this.statService.currentLevel )) {
                    if(this.statService.currentLevel == 1) {
                        notices.push( ...this.noticeService.getItems('firstLevelUp') );
                    } else {
                        notices.push( ...this.noticeService.getItems('levelUp', {
                            firstTrainingTimeAward: this.statService.firstTrainingTimeAward,
                            currentLevel: this.statService.currentLevel
                        }) );
                    }
                }

                if( this.statService.timeIsEmpty() ) {
                    notices.push( ...this.noticeService.getItems('timeIsEmpty', {statService: this.statService}) );
                } else if( this.statService.isFirstProgress() ) {
                    notices.push( ...this.noticeService.getItems('rating') );
                    await this.statService.setStage(1);
                } else if( this.statService.isSecondProgress() ) {
                    notices.push( ...this.noticeService.getItems('greenMem') );
                    await this.statService.setStage(2);
                }

                if(PwaInstallService.needShowNotice(this.statService)) {

                    if(this.tools.getOs() == 'ios') {
                        notices.push( ...this.noticeService.getItems('iosInstall') );
                    } else {
                        notices.push( ...this.noticeService.getItems('pwaInstall') );
                    }
                    
                    PwaInstallService.setPwaInstallNoticeShown(true);
                }

                if(notices.length) {
                    this.noticeItemsBefore = notices;
                } else {
                    this.showMainContent();
                }
                
                this.makeLayers();
            } catch(res) {
                if(res.code == 'training-not-found') {
                    this.$router.push('/training');
                } else {
                    this.modal.show(res);
                }
            } finally {
                this.preloader.show = false;
            }
        },

        unmounted() {
            this.slideHandler?.clearListeners();
        }
    }
</script>

<style lang="scss" scoped>

    .statistics {
        flex-grow: 2;
        width: 100%;
        height: 100vh;
        height: 100dvh;

        .layers-wrapper {
            display: flex;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            // transition: left 0.5s;

            &.swipe-in-progress {
                transition: none;
            }
        }

        .items {
            max-height: 100%;
            padding: 280px 40px 100px 40px;
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