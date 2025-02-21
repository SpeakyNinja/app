<template>

    <div class="first-level-up2">

        <div class="component">
            <Ai fill="white" class="ai-image" />
        </div>

        <div class="title m-light">Уровни</div>

        <div class="texts">
            
            <div class="text m-light">
                Каждый уровень это 100 слов словарного запаса
                <br>
                (известные и выученные)
            </div>

            <Brain 
                :hexRadius="brainHexRadius"
                :width="brainWidth"
                :height="brainHeight"
                :items="statService.getLevelsForBrain(brainItems)[0]"
            />
            
        </div>

    </div>

</template>

<script>

    import { inject } from 'vue';
    import Ai from '@/components/icons/Ai.vue';
    import ToolsService from '@/services/ToolsService.js';
    import Brain from '@/components/Brain.vue';
    import StatService from '@/services/StatService.js';

    export default {
        components: {
            Ai,
            Brain
        },

        data() {
            return {
                statService: new StatService(),
                brainWidth: window.screen.width > 550 ? 283 : 208,
                brainHeight: window.screen.width > 550 ? 245 : 180,
                brainHexRadius: window.screen.width > 550 ? 14 : 10,

                brainItems: [
                    {memorization: 20, count: 100}
                ]
            }
        },

        methods: {
        }
    }
</script>

<style lang="scss" >

    .first-level-up2 {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-grow: 2;

        .component {
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
            font-size: 32px;
            text-align: center;
        }

        .texts {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 20px;
            padding-top: 50px;
            text-align: center;

            .text {
                text-align: center;
            }
        }
    }

</style>