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
                <div class="num">{{ curValue }}</div>
            </div>

            <div class="text">
                {{ tools.plural(curValue, ['слово', 'слова', 'слов']) }}/месяц
            </div>
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
            },
            backgroundColor: {
                type: String,
                required: false,
                default: '#3a3744'
            }
        },

        data() {
            return {
                accuracyCssClass: '',
                progressSize: 300,
                radius: 120,
                progress: 0,
                arrowAngle: 0,
                strokeWidth: 45,
                mainColor: '',
                accuracyClass: ''
            }
        },

        methods: {
            strokeDashArray(progress) {
                const circumference = this.radius * Math.PI * 2;
                const dash = (circumference * progress / 2) / 100;
                return `${dash} ${circumference - dash}`;
            },

            makeCssClasses() {
                if(this.curValue < 199) {
                    this.mainColor = '#fb4545';
                    this.accuracyClass = 'accuracy-5';
                    this.accuracySmallClass = 'accuracy-5';
                } else if(this.curValue < 399) {
                    this.mainColor = '#fb823d';
                    this.accuracyClass = 'accuracy-4';
                    this.accuracySmallClass = 'accuracy-4';
                } else if(this.curValue < 599) {
                    this.mainColor = '#f7cc0f';
                    this.accuracyClass = 'accuracy-3';
                    this.accuracySmallClass = 'accuracy-3';
                } else if(this.curValue < 899) {
                    this.mainColor = '#96dd47';
                    this.accuracyClass = 'accuracy-2';
                    this.accuracySmallClass = 'accuracy-2';
                } else {
                    this.mainColor = '#7cdeff';
                    this.accuracyClass = 'accuracy-1';
                    this.accuracySmallClass = 'accuracy-1';
                }
            }
        },

        beforeMount() {
            this.tools = new ToolsService();
            
            this.progress = Math.round(this.curValue * 100 / this.maxValue);
            if(this.progress > 100) {
                this.progress = 100;
            }
            
            this.arrowAngle = Math.round(this.progress * 180 / 100);
            if(this.arrowAngle > 180) {
                this.arrowAngle = 180;
            }
            this.cssArrowRotate = `rotate(${this.arrowAngle}deg)`;

            this.makeCssClasses();
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
                transform: v-bind(cssArrowRotate);
                font-size: 0;

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

                .sign {
                    font-family: Light;
                    font-size: 40px;
                    margin-left: -24px;
                }

                .num {
                    font-family: Black;
                    font-size: 40px;
                }
            }

            .text {
                display: flex;
                justify-content: center;
                width: 100%;
                gap: 5px;
                color: white;
                font-family: Light;
                font-size: 16px;
            }
        }
    }

</style>