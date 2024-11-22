<template>

    <div class="speed-widget">
        <div class="scale-wrapper">
            <svg :width="progressSize" :height="progressSize" class="scale">
                <circle
                    fill="none"
                    :stroke="backgroundColor"
                    :cx="progressSize / 2"
                    :cy="progressSize / 2"
                    :r="radius"
                    :stroke-width="strokeWidth"
                    :transform="`rotate(-90 ${progressSize / 2} ${progressSize / 2})`"
                    stroke-linecap="butt"
                    :stroke-dasharray="strokeDashArray(100)"
                />

                <circle
                    fill="none"
                    :stroke="mainColor"
                    :cx="progressSize / 2"
                    :cy="progressSize / 2"
                    :r="radius"
                    :stroke-width="strokeWidth"
                    :transform="`rotate(-90 ${progressSize / 2} ${progressSize / 2})`"
                    stroke-linecap="butt"
                    :stroke-dasharray="strokeDashArray(progress)"
                />
            </svg>

            <div class="arr-wrapper">
                <Arr1 fill="white" class="arr1" />
            </div>
        </div>

        <div class="text-wrapper">
            <div class="number">
                <div class="sign">+</div>
                <div class="num">270</div>
            </div>
            <div class="text">слов/месяц</div>
        </div>
    </div>

</template>

<script>
    import { nextTick } from 'vue';
    import ToolsService from '@/services/ToolsService.js';
    import Arr1 from '@/components/icons/Arr1.vue'

    export default {
        components: {
            Arr1
        },

        props: {
            curValue: {
                type: Number,
                required: true
            },
            maxValue: {
                type: Number,
                required: true
            }
        },

        data() {
            return {
                accuracyCssClass: '',
                progressSize: 300,
                radius: 120,
                progress: 20,
                strokeWidth: 45,
                mainColor: '#ce7545',
                backgroundColor: '#3a3744'
            }
        },

        methods: {
            strokeDashArray(progress) {
                const circumference = this.radius * Math.PI * 2;
                const dash = (circumference * progress / 2) / 100;
                return `${dash} ${circumference - dash}`;
            }
        },

        beforeMount() {
            this.tools = new ToolsService();
        }
    }
</script>

<style lang="scss" scoped>

    .speed-widget {
        position: relative;
        margin-top: -40px;

        .scale-wrapper {
            position: relative;
            width: 320px;
            height: 175px;
            padding-top: 10px;
            overflow: hidden;
            display: flex;
            justify-content: center;

            .scale {
                transform: rotate(-90deg);
            }

            .arr-wrapper {
                position: absolute;
                left: 0;
                top: 85.5%;
                width: 100%;
                transform: rotate(36deg);

                .arr1 {
                    width: 100px;
                    height: 20px;
                    position: relative;
                    top: 0;
                    left: -7px;
                }
            }
        }

        .text-wrapper {
            top: 121px;
            left: 0;
            position: absolute;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 7px;
            align-items: center;

            .number {
                display: flex;
                justify-content: center;
                gap: 5px;
                color: white;

                text-shadow: 
                    0px 0px 50px rgba(240,222,0,1), 
                    0px 0px 20px rgba(240,222,0,1), 
                    0px 0px 10px rgba(240,222,0,0.25),
                    0px 0px 5px rgba(255,255,255,0.85);

                .sign {
                    font-family: RobotoLight;
                    font-size: 40px;
                    margin-left: -24px;
                }

                .num {
                    font-family: RobotoBlack;
                    font-size: 40px;
                }
            }

            .text {
                display: flex;
                justify-content: center;
                width: 100%;
                gap: 5px;
                color: white;
                font-family: RobotoLight;
                font-size: 16px;

                text-shadow: 
                    0px 0px 50px rgba(240,222,0,1), 
                    0px 0px 20px rgba(240,222,0,1), 
                    0px 0px 10px rgba(240,222,0,0.25),
                    0px 0px 5px rgba(255,255,255,0.85);
            }
        }
    }

</style>