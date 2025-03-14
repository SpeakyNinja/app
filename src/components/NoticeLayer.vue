<template>
    <div class="notice-layer" :class="{hidden: isClosed}">
        <div class="items" ref="slideContainer">

            <div 
                class="dummy" 
                :class="{ 'swipe-in-progress': swipeInProgress, 'fade': fade }" 
                :style="{ 'margin-left': marginLeft + ml + '%' }"></div>

            <template v-for="(item, i) in items">
                <div class="item" :class="{visible: isVisibleItem(i)}">

                    <template v-if="item.customItem">
                        <component :is="item.customItem" :options="item.options" :key="item.customItem" />
                    </template>

                    <template v-else>

                        <div class="image" v-if="item.image">
                            <img :src="item.image">
                        </div>

                        <div class="component" v-if="item.component">

                            <SpeedWidget 
                                v-if="item.component == 'SpeedWidget'"
                                :curValue="540"
                                :maxValue="750"
                                backgroundColor="#464664"
                                :glow="false"
                                forceMainColor="#96dd47"
                            />

                            <Rainbow v-if="item.component == 'Rainbow'" :freeze="freezeComponentAnimation" />

                            <Brain 
                                v-if="item.component == 'Brain'"
                                ref="brain" 
                                :hexRadius="brainHexRadius"
                                :width="brainWidth"
                                :height="brainHeight"
                                :items="statService.getLevelsForBrain(item.brainItems)[0]"
                            />

                            <Ai
                                v-if="item.component == 'Ai'"
                                fill="white"
                                class="ai-image"
                            />

                        </div>

                        <div class="title m-light" v-if="item.title">
                            {{ item.title }}
                        </div>

                        <div class="texts" v-if="item.texts?.length">
                            <template v-for="text in item.texts">
                                <div class="text m-light" :class="{ muted: text.muted }" v-html="text.value">
                                </div>
                            </template>
                        </div>

                    </template>

                </div>
            </template>

            </div>

        <div class="controls" :class="{hidden: hideControls}">
            <div class="controls-wrapper">
                <div class="button no-select" @click="changeItem(-1)" :class="{transparent: items.length == 1}" >
                    <Arr2 
                        class="arrow" 
                        :class="{muted: !marginLeft}" 
                    />
                </div>

                <div class="button no-select" @click="changeItem(1)" >
                    <Arr2 
                        class="arrow" 
                    />
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import { nextTick } from 'vue';
    import Arr2 from '@/components/icons/Arr2.vue';
    import SpeedWidget from '@/components/SpeedWidget.vue';
    import Rainbow from '@/components/Rainbow.vue';
    import Brain from '@/components/Brain.vue';
    import Ai from '@/components/icons/Ai.vue';
    import Rating1 from '@/components/notices/Rating1.vue';
    import Rating2 from '@/components/notices/Rating2.vue';
    import Rating3 from '@/components/notices/Rating3.vue';
    import GreenMemCongratulation from '@/components/notices/GreenMemCongratulation.vue';
    import TimeIsEmpty from '@/components/notices/TimeIsEmpty.vue';
    import AwardByTime from '@/components/notices/AwardByTime.vue';
    import AwardByWords from '@/components/notices/AwardByWords.vue';
    import FirstLevelUp2 from '@/components/notices/FirstLevelUp2.vue';
    import FirstLevelUp4 from '@/components/notices/FirstLevelUp4.vue';
    import LevelUp from '@/components/notices/LevelUp.vue';
    import TrainingsLimit from '@/components/notices/TrainingsLimit.vue';
    import TrainingsLimitUpdated from '@/components/notices/TrainingsLimitUpdated.vue';
    import TimerNotice from '@/components/notices/TimerNotice.vue';
    import PwaInstall from '@/components/notices/PwaInstall.vue';
    import InstallIosNotice from '@/components/notices/InstallIosNotice.vue';
    import AddWordsBefore from '@/components/notices/AddWordsBefore.vue';

    import StatService from '@/services/StatService.js';
    import SlideHandler from "@/services/SlideHandler.js";

    export default {
        components: {
            Arr2,
            SpeedWidget,
            Rainbow,
            Brain,
            Ai,
            Rating1,
            Rating2,
            Rating3,
            GreenMemCongratulation,
            TimeIsEmpty,
            AwardByTime,
            AwardByWords,
            FirstLevelUp2,
            FirstLevelUp4,
            LevelUp,
            TrainingsLimit,
            TrainingsLimitUpdated,
            TimerNotice,
            PwaInstall,
            InstallIosNotice,
            AddWordsBefore
        },

        props: {
            items: {
                type: Array,
                required: true
            },
            fade: {
                type: Boolean,
                required: false,
                default: true
            }
        },

        emits: ['closedHandler'],

        data() {
            return {
                isClosed: false,
                marginLeft: 0,
                ml: 0,
                freezeComponentAnimation: false,
                hideControls: false,
                itemIndex: 0,
                swipeDelta: 20,
                swipeInProgress: false,

                statService: new StatService(),
                brainWidth: window.screen.width > 550 ? 372 : 288,
                brainHeight: window.screen.width > 550 ? 316 : 246,
                brainHexRadius: window.screen.width > 550 ? 36 : 28
            }
        },

        methods: {
            async changeItem(step) {
                const newMargin = this.marginLeft - step * 100;
                if(newMargin > 0) {
                    return false;
                }

                this.itemIndex += step;
                this.hideControls = !!this.items[this.itemIndex]?.hideControls;

                this.freezeComponentAnimation = true;

                if(-newMargin / 100 < this.items.length) {
                    this.marginLeft = newMargin;
                    
                    await nextTick();
                    setTimeout(() => {
                        this.freezeComponentAnimation = false;
                    }, 300);
                } else {
                    this.isClosed = true;
                    this.$emit('closedHandler');
                }
            },

            initSwipeLayers() {
                this.slideHandler = new SlideHandler(
                    this.$refs.slideContainer, 
                    this.swipeEndHandler.bind(this),
                    this.swipeHandler.bind(this),
                    'x'
                );
            },

            swipeEndHandler(direction, delta) {
                this.swipeInProgress = false;
                this.ml = 0;

                if(delta >= this.swipeDelta) {
                    this.changeItem(direction);
                }
            },

            swipeHandler(distance) {
                this.ml = Math.round(distance / this.$refs.slideContainer.clientWidth * 100);
                this.swipeInProgress = true;
            },

            isVisibleItem(pos) {
                return !this.fade || this.itemIndex == pos;
            }
        },

        async mounted() {
            this.hideControls = !!this.items[0]?.hideControls;

            if(!this.fade) {
                await nextTick();
                this.initSwipeLayers();
            }
        },

        unmounted() {
            this.slideHandler?.clearListeners();
        }
    }
</script>

<style lang="scss">

    .notice-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        z-index: 4;
        color: white;

        &.hidden {
            display: none;
        }

        .items {
            width: 600px;
            overflow-x: hidden;
            display: flex;
            flex-wrap: nowrap;
            background-color: #272733;

            .dummy {
                transition: all 0.3s ease;
                
                &.fade {
                    transition: unset;
                }

                &.swipe-in-progress {
                    transition: none;
                }
            }

            .item {
                width: 100%;
                min-width: 100%;
                padding: 20px 25px;
                display: flex;
                align-items: center;
                flex-direction: column;
                opacity: 0;
                transition: opacity 0.5s ease;

                &.visible {
                    opacity: 1;
                }

                .image, .component {
                    height: 45%;
                    min-height: 45%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .title {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    flex-grow: 2;
                    font-size: 32px;
                    text-align: center;

                    &:first-child {
                        flex-grow: unset;
                        height: 45%;
                        min-height: 45%;
                        justify-content: flex-end;
                        padding-bottom: 50px;
                    }
                }

                .texts {
                    height: 40%;
                    min-height: 40%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    gap: 20px;
                    padding-top: 30px;

                    .text {
                        text-align: center;

                        &.muted {
                            color: #949494;
                        }
                    }
                }

                .button-wrapper {
                    flex-grow: 2;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 20px;

                    .btn {
                        max-width: 310px;
                        width: 310px;
                    }
                }
                
            }
        }

        .controls {
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;

            display: flex;
            justify-content: center;

            &.hidden {
                display: none;
            }

            .controls-wrapper {
                display: flex;
                justify-content: space-between;
                max-width: 600px;
                width: 100%;

                .button {
                    padding: 20px 30px;
                    cursor: pointer;

                    .arrow {
                        fill: white;
                        width: 25px;
                        height: 22px;

                        &.muted {
                            fill: #535567;
                        }
                    }

                    &.transparent {
                        cursor: default;
                        opacity: 0;
                    }

                    &:first-child {
                        .arrow {
                            transform: rotate(180deg);
                        }
                    }
                }
            }
        }
        
    }

    @media(max-width: 600px) {
        
        .notice-layer {

            .items {
                width: 100%;

                .item {
                    .texts {
                        width: 100%;
                    }
                }
            }

        }

    }

</style>