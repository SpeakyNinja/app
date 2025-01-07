<template>
    <div class="notice-layer" :class="{hidden: isClosed}">
        <div class="items">

            <div class="dummy" :style="{ 'margin-left': marginLeft + '%' }"></div>

            <div class="item" v-for="item in items">

                <template v-if="item.customItem">
                    <component :is="item.customItem" :key="item.customItem" />
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

        </div>

        <div class="controls">
            <div class="controls-wrapper">
                <div class="button no-select" @click="changeItem(-1)" >
                    <Arr2 
                        class="arrow" 
                        :class="{muted: !marginLeft, transparent: items.length == 1}" 
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
    import Brain from '@/components/Brain.vue'
    import Ai from '@/components/icons/Ai.vue'
    import Rating1 from '@/components/notices/Rating1.vue'
    import Rating2 from '@/components/notices/Rating2.vue'
    import Rating3 from '@/components/notices/Rating3.vue'
    import StatService from '@/services/StatService.js';

    export default {
        components: {
            Arr2,
            SpeedWidget,
            Rainbow,
            Brain,
            Ai,
            Rating1,
            Rating2,
            Rating3
        },

        props: {
            items: {
                type: Array,
                required: true
            }
        },

        emits: ['closedHandler'],

        data() {
            return {
                isClosed: false,
                marginLeft: 0,
                freezeComponentAnimation: false,

                statService: new StatService(),
                brainWidth: window.screen.width > 550 ? 368 : 283,
                brainHeight: window.screen.width > 550 ? 316 : 245,
                brainHexRadius: window.screen.width > 550 ? 18 : 14
            }
        },

        methods: {
            async changeItem(step) {
                const newMargin = this.marginLeft - step * 100;
                if(newMargin > 0) {
                    return false;
                }

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
            }
        }
    }
</script>

<style lang="scss" scoped>

    .notice-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        z-index: 2;
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
            }

            .item {
                width: 100%;
                min-width: 100%;
                padding: 20px 40px;
                display: flex;
                align-items: center;
                flex-direction: column;

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
                
            }
        }

        .controls {
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;

            display: flex;
            justify-content: center;

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

                        &.transparent {
                            opacity: 0;
                        }
                    }

                    &:first-child {
                        .arrow {
                            transform: rotate(180deg);
                        }
                    }
                }
            }
        }


        .ai-image {
            width: 300px;
            height: 50px;
            filter: drop-shadow(#0bcccf 0px 0px 5px);
        }
    }

    @media(max-width: 600px) {
        
        .notice-layer {

            .items {
                width: 100%;
            }

        }

    }

</style>