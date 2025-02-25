<template>

    <div class="speed-widget" :style="{'margin-top': `-${progressSize * 0.13333}px`}">
        <div 
            class="scale-wrapper" 
            :style="{
                width: `${progressSize * 1.06667}px`, 
                height: `${progressSize * 0.58333}px`,
                'padding-top': `${progressSize * 0.03333}px`
            }"
        >
            <svg :width="progressSize" :height="progressSize" class="scale">
                <circle
                    fill="none"
                    :stroke="backgroundColor"
                    :cx="progressSize / 2"
                    :cy="progressSize / 2"
                    :r="radius"
                    :stroke-width="progressSize * 0.15"
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
                    :stroke-width="progressSize * 0.15"
                    :transform="`rotate(-90 ${progressSize / 2} ${progressSize / 2})`"
                    stroke-linecap="butt"
                    :stroke-dasharray="strokeDashArray(progress)"
                />
            </svg>

            <div class="arr-wrapper">
                <Arr1 
                    fill="white" 
                    class="arr1" 
                    :style="{
                        width: `${progressSize * 0.33333}px`, 
                        height: `${progressSize * 0.06667}px`, 
                        left: `-${progressSize * 0.02333}px`
                    }" 
                />
            </div>
        </div>

        <div 
            class="text-wrapper" 
            :style="{
                top: `${progressSize * 0.40333}px`, 
                gap: `${progressSize * 0.02333}px`
            }"
        >
            <div class="number" :class="{[accuracyClass]: glow}" :style="{
                gap: `${progressSize * 0.01666}px`
            }">
                <div class="sign" :style="{
                    'font-size': `${progressSize * 0.13333}px`,
                    'margin-left': `-${progressSize * 0.08}px`
                }">+</div>
                <div 
                    class="num" 
                    :style="{
                        'font-size': `${progressSize * 0.13333}px`
                    }"
                >{{ curValue }}</div>
            </div>

            <div 
                class="text" 
                :class="{[accuracySmallClass]: glow}" 
                :style="{
                    'font-size': `${progressSize * 0.05333}px`
                }"
            >
                {{ tools.plural(curValue, ['выученное', 'выученных', 'выученных']) }}
                {{ tools.plural(curValue, ['слово', 'слова', 'слов']) }}
                за месяц
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
            },
            glow: {
                type: Boolean,
                required: false,
                default: true
            },
            progressSize: {
                type: Number,
                required: false,
                default: 300
            },
            forceMainColor: {
                required: false,
                default: null
            }
        },

        data() {
            return {
                accuracyCssClass: '',
                progress: 0,
                arrowAngle: 0,
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

                if(this.forceMainColor) {
                    this.mainColor = this.forceMainColor;
                }
            }
        },

        beforeMount() {
            this.tools = new ToolsService();

            this.radius = this.progressSize * 0.4;

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

        .scale-wrapper {
            position: relative;
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
                    position: relative;
                    top: 0;
                }
            }
        }

        .text-wrapper {
            left: 0;
            position: absolute;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .number {
                display: flex;
                justify-content: center;
                color: white;

                .sign {
                    font-family: RobotoLight;
                }

                .num {
                    font-family: RobotoBlack;
                }
            }

            .text {
                display: flex;
                justify-content: center;
                width: 100%;
                color: white;
                font-family: Light;
            }
        }
    }

</style>