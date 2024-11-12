<template>
    <div class="test-timer">

        <div class="word no-select m-upper-first" @click="wordClick">{{ word }}</div>
        
        <svg :width="progressSize" :height="progressSize">
            <circle class="bg"
                fill="transparent"
                stroke="#2a2b37"
                :cx="progressSize / 2"
                :cy="progressSize / 2"
                :r="progressRadius"
                :stroke-width="progressStrokeWidth"
            />
            <circle :class="{'animated' : isAnimated}"
                fill="none"
                stroke="#696a73"
                :cx="progressSize / 2"
                :cy="progressSize / 2"
                :r="progressRadius"
                :stroke-width="progressStrokeWidth"
                :transform="`rotate(-90 ${progressSize / 2} ${progressSize / 2})`"
                stroke-linecap="butt"
                :stroke-dasharray="strokeDashArray()"
            />
        </svg>

    </div>
</template>

<script>
    import { nextTick } from 'vue';

    export default {
        components: {
        },

        props: {
            word: {
                required: true
            }
        },

        data() {
            return {
                progressSize: 300,
                progressRadius: 140,
                progressStrokeWidth: 2,
                progressPercent: 100,
                animationTime: 30,
                isAnimated: true
            }
        },

        methods: {
            wordClick() {
                this.$emit('wordClick');
            },

            strokeDashArray() {
                const circumference = this.progressRadius * Math.PI * 2;
                const dash = (circumference * this.progressPercent) / 100;
                return `${dash} ${circumference - dash}`;
            },

            stop() {
                clearInterval(this.autoSubmitPid);
                this.progressPercent = 100;
                this.isAnimated = false;
            },

            start() {
                setTimeout(async () => {
                    await nextTick();
                    this.isAnimated = true;
                    await nextTick();
                    this.progressPercent = 0.001;
                }, 50);

                this.autoSubmitPid = setTimeout(() => {
                    this.$emit('isFinish');
                }, this.animationTime * 1000);
            },

            restart() {
                this.isAnimated = false;
                this.progressPercent = 100;
                this.start();
            }
        },

        beforeMount() {
            this.cssSize = `${this.progressSize}px`;
            this.transition = `all ${this.animationTime}s linear`;
        },

        mounted() {
            this.start();
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .test-timer {
        position: relative;
        z-index: 1;
        width: v-bind('cssSize');
        height: v-bind('cssSize');
        display: flex;
        align-items: center;
        justify-content: center;

        .word {
            font-family: RobotoLight;
            font-size: clamp(16px, 7vw, 90px);
            letter-spacing: 2px;
            color: #ebebed;
            cursor: pointer;
            text-align: center;
        }

        svg {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;

            circle {
                &.bg {
                    // filter: drop-shadow(0px 0px 5px rgba(235, 235, 237, 0.15));
                }

                &.animated {
                    transition: v-bind('transition');
                }
            }
        }
    }

</style>