<template>
    <div class="notice-layer" :class="{hidden: isHidden}">
        <div class="items">

            <div class="dummy" :style="{ 'margin-left': marginLeft + '%' }"></div>

            <div class="item" v-for="item in items">

                <div class="image" v-if="item.image">
                    <img :src="item.image">
                </div>

                <div class="component" v-if="item.component">

                    <SpeedWidget 
                        v-if="item.component == 'SpeedWidget'"
                        :curValue="540"
                        :maxValue="750"
                        backgroundColor="#464664"
                    />

                    <Rainbow v-if="item.component == 'Rainbow'" :freeze="freezeComponentAnimation" />

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

            </div>

        </div>

        <div class="controls" v-if="items.length > 1">
            <div class="controls-wrapper">
                <Arr2 class="arrow no-select" :class="{muted: !marginLeft}" @click="changeItem(-1)" />
                <Arr2 class="arrow no-select" @click="changeItem(1)" />
            </div>
        </div>

    </div>
</template>

<script>

    import { nextTick } from 'vue';
    import Arr2 from '@/components/icons/Arr2.vue';
    import SpeedWidget from '@/components/SpeedWidget.vue';
    import Rainbow from '@/components/Rainbow.vue';

    export default {
        components: {
            Arr2,
            SpeedWidget,
            Rainbow
        },

        props: {
            items: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                isHidden: false,
                marginLeft: 0,
                freezeComponentAnimation: false
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
                    this.isHidden = true;
                }
            }
        }
    }
</script>

<style lang="scss">

    .notice-layer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #393951;
        display: flex;
        justify-content: center;
        z-index: 2;

        &.hidden {
            display: none;
        }

        .items {
            max-width: 600px;
            overflow-x: hidden;
            display: flex;
            flex-wrap: nowrap;

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
                    font-size: 36px;
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
                padding: 20px 30px;
                max-width: 600px;
                width: 100%;

                .arrow {
                    fill: white;
                    width: 25px;
                    height: 22px;
                    cursor: pointer;

                    &:first-child {
                        transform: rotate(180deg);
                    }

                    &.muted {
                        fill: #545454;
                    }
                }
            }
        }

    }

</style>