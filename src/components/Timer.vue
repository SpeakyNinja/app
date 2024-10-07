<template>
    <div class="timer">

        <div class="time">{{ String(time).padStart(2, '0') }}</div>
        
        <svg :width="progressSize" :height="progressSize">
            <circle class="bg"
                fill="#30313f"
                stroke="#4b4c56"
                :cx="progressSize / 2"
                :cy="progressSize / 2"
                :r="progressRadius"
                :stroke-width="progressStrokeWidth"
            />
            <circle :class="{'animated' : progressPercent}"
                fill="none"
                stroke="#97f1fd"
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
    export default {
        name: "Timer",

        components: {
        },

        data() {
            return {
                progressSize: 106,
                progressRadius: 40,
                progressPercent: 0,
                progressStrokeWidth: 4,
                time: 60
            }
        },

        methods: {
            strokeDashArray() {
                const circumference = this.progressRadius * Math.PI * 2;
                const dash = (circumference * this.progressPercent) / 100;
                return `${dash} ${circumference - dash}`;
            },

            startAnimation() {
                this.progressPid = setInterval(() => {
                    let percent = this.progressPercent;
                    percent += 1;
                    this.progressPercent = percent > 100 ? 0 : percent;
                }, 600);

                this.timePid = setInterval(() => {
                    this.time -= 1;
                    if(this.time < 1) {
                        this.time = 60;
                    }
                }, 1000);
            },

            stop() {
                clearInterval(this.progressPid);
                clearInterval(this.timePid);
            },

            reset() {
                this.stop();
                this.progressPercent = 0;
                this.time = 60;
                this.startAnimation();
            }
        },

        mounted() {
            this.startAnimation();
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .timer {
        position: relative;
        z-index: 1;

        .time {
            font-family: RobotoMonoBold;
            font-size: 36px;
            color: #ebebed;
            z-index: 1;
        }

        svg {
            position: absolute;
            top: -28px;
            left: -31px;
            z-index: -1;

            circle {
                &.bg {
                    filter: drop-shadow(0px 0px 5px rgba(235, 235, 237, 0.15));
                }

                &.animated {
                    transition: all 1.2s;
                }
            }
        }
    }

</style>