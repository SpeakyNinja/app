<template>

    <div class="component">
        <Ai fill="white" class="ai-image" />
    </div>

    <div class="title m-light">Уровни</div>

    <div class="texts mt-3">
        
        <div class="text m-light">
            Каждый уровень это 100 слов словарного запаса
            <br>
            (известные и выученные)
        </div>

        <div class="bottom">
            <Brain 
                :items="statService.getLevelsForBrain(brainItems)[0]"
                class="m-center"
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

        props: {
            options: {
                type: Object,
                required: false,
                default: {}
            }
        },

        data() {
            return {
                statService: new StatService(),
                // brainWidth: window.screen.width > 550 ? 287 : 204,
                // brainHeight: window.screen.width > 550 ? 245 : 175,
                // brainHexRadius: window.screen.width > 550 ? 28 : 20,

                brainItems: [
                    {memorization: 20, count: 100}
                ]
            }
        },

        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    
    .texts {
        padding-top: 0 !important;
        flex-grow: 3;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .bottom {
            flex-grow: 2;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

</style>