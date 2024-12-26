<template>

    <div class="accuracy-widget">
        <div class="accuracy m-center" :class="accuracyCssClass">
            Точность ответов
        </div>

        <div class="percents">
            <div :class="accuracyCssClass">{{ accuracy }}</div>
            <div class="sign" :class="accuracyCssClass">%</div>
        </div>
    </div>

</template>

<script>
    import { nextTick } from 'vue';
    import ToolsService from '@/services/ToolsService.js';

    export default {
        components: {
        },

        props: {
            accuracy: {
                type: Number,
                required: true
            }
        },

        data() {
            return {
                accuracyCssClass: ''
            }
        },

        methods: {
            makeAccuracyCssClass() {
                this.accuracyCssClass = this.tools.getAccuracyClass(this.accuracy);
            }
        },

        beforeMount() {
            this.tools = new ToolsService();
            this.makeAccuracyCssClass();
        }
    }
</script>

<style lang="scss" scoped>

    .accuracy-widget {

        .percents {
            display: flex;
            gap: 5px;
            align-items: center;
            line-height: 0.9;
            margin-top: 30px;

            >:first-child {
                font-size: 68px;
                font-family: Black;
                padding-left: 70px;
            }

            .sign {
                font-size: 56px;
                font-family: Regular;
            
                &.accuracy-1 {
                    text-shadow: 
                        0px 0px 50px rgba(9,190,255,1), 
                        0px 0px 20px rgba(9,190,255,1), 
                        0px 0px 10px rgba(9,190,255,0.25),
                        0px 0px 5px rgba(255,255,255,0.85);
                }


                &.accuracy-2 {
                    text-shadow: 
                        0px 0px 50px rgba(34,240,0,1), 
                        0px 0px 20px rgba(34,240,0,1), 
                        0px 0px 10px rgba(34,240,0,0.25),
                        0px 0px 5px rgba(255,255,255,0.85);
                }

                &.accuracy-3 {
                    text-shadow: 
                        0px 0px 50px rgba(240,222,0,1), 
                        0px 0px 20px rgba(240,222,0,1), 
                        0px 0px 10px rgba(240,222,0,0.25),
                        0px 0px 5px rgba(255,255,255,0.85);
                }

                &.accuracy-4 {
                    text-shadow: 
                        0px 0px 50px rgba(255,97,22,1), 
                        0px 0px 20px rgba(255,97,22,1), 
                        0px 0px 10px rgba(255,97,22,0.25),
                        0px 0px 5px rgba(255,255,255,0.85);
                }

                &.accuracy-5 {
                    text-shadow: 
                        0px 0px 50px rgba(240,22,0,1), 
                        0px 0px 20px rgba(240,22,0,1), 
                        0px 0px 10px rgba(240,22,0,0.25),
                        0px 0px 5px rgba(255,255,255,0.85);
                }
            }
        }
    }

</style>