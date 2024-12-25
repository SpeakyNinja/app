<template>
    <div class="layer-regularity">
        
        <div class="top glass">
            <div class="accuracy-1">{{ statService.currentLevel }}</div>
        </div>

        <div class="middle no-scrollbar">
            <div class="brains no-scrollbar" :class="brainsWrapperClass">
                <template v-for="items in brainItems">
                    <Brain 
                        ref="brain" 
                        :hexRadius="brainHexRadius"
                        :width="brainWidth"
                        :height="brainHeight"
                        :items="items"
                    />
                </template>
            </div>
        </div>

        <div class="bottom glass"></div>
         
    </div>
</template>

<script>
    import Brain from '@/components/Brain.vue'
    import StatService from '@/services/StatService.js';

    export default {

        components: {
            Brain
        },

        props: {
            statService: {
                type: StatService,
                required: true,
            }
        },

        data() {
            return {
                brainWidth: window.screen.width > 550 ? 368 : 283,
                brainHeight: window.screen.width > 550 ? 316 : 245,
                brainHexRadius: window.screen.width > 550 ? 18 : 14
            }
        },

        methods: {
            toTraining() {
                this.$router.push('/training');
            }
        },

        beforeMount() {
            this.brainItems = this.statService.getLevelsForBrain();
            this.brainsWrapperClass = this.statService.brainsCount() == 1 ? 'single' : '';
        }
    }
</script>

<style lang="scss" scoped>

    .layer-regularity {

        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;

        .top {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #4c4d57;
            height: 200px;
            min-height: 200px;

            div {
                font-size: 68px;
                font-family: Black;
                color: white;
                z-index: 2;
            }
        }

        .middle {
            background-color: #252530;
            position: relative;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-grow: 2;

            .brains {
                width: 100%;
                height: 100%;
                min-height: 100%;
                padding: 20px 0;
                overflow-y: auto;

                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;

                &.single {
                    justify-content: center;
                }
            }
        }

        .bottom {
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: 1px solid #4c4d57;
            height: 150px;
            min-height: 150px;
            padding-bottom: 70px;
        }
    }

</style>