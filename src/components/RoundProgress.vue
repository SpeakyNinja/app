<template>
    <div class="round-progress">

        <svg :width="progressSize" :height="progressSize">
            <circle class="bg"
                fill="#30313f"
                stroke="#4b4c56"
                :cx="progressSize / 2"
                :cy="progressSize / 2"
                :r="radius"
                :stroke-width="strokeWidth"
            />
            <circle :class="{'animated' : options.progress}"
                fill="none"
                :stroke="getFill()"
                :cx="progressSize / 2"
                :cy="progressSize / 2"
                :r="radius"
                :stroke-width="strokeWidth"
                :transform="`rotate(-90 ${progressSize / 2} ${progressSize / 2})`"
                stroke-linecap="butt"
                :stroke-dasharray="strokeDashArray()"
            />
        </svg>

    </div>
</template>

<script>
    export default {

        components: {
        },

        props: {
            options: {
                type: Object,
                required: true
            },
            radius: {
                type: Number,
                required: false,
                default: 16
            },
            strokeWidth: {
                type: Number,
                required: false,
                default: 3
            }
        },

        data() {
            return {
                progressSize: this.radius * 2 + this.strokeWidth
            }
        },

        methods: {
            strokeDashArray() {
                const circumference = this.radius * Math.PI * 2;
                const dash = (circumference * this.options.progress) / 100;
                return `${dash} ${circumference - dash}`;
            },

            getFill() {
                let color = '#fa3d3d';

                if(this.options.progress == 100) {
                    color = '#3db8fa'
                } else if(this.options.progress > 50) {
                    color = '#76fa3d'
                } else if(this.options.progress > 25) {
                    color = '#eafa3d'
                }

                return color;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .round-progress {
        position: relative;

        svg {

            circle {
                &.bg {
                    // filter: drop-shadow(0px 0px 5px rgba(235, 235, 237, 0.15));
                }

                &.animated {
                    transition: all 1.2s;
                }
            }
        }
    }

</style>