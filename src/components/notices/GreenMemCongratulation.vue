<template>

    <div class="rating1">

        <Ai
            fill="white"
            class="ai-image"
        />

        <div>
            <div class="title m-light mb-2">
                Поздравляю
            </div>

            <div class="text m-light">С достижением этапа закрепления.</div>
        </div>

        <Brain 
            ref="brain" 
            :hexRadius="brainHexRadius"
            :width="brainWidth"
            :height="brainHeight"
            :items="statService.getLevelsForBrain(brainItems)[0]"
            class="mb-2"
        />

    </div>

</template>

<script>

    import { nextTick } from 'vue';
    import Brain from '@/components/Brain.vue'
    import Ai from '@/components/icons/Ai.vue'
    import StatService from '@/services/StatService.js';

    export default {
        components: {
            Brain,
            Ai
        },

        data() {
            return {
                statService: new StatService(),
                brainWidth: window.screen.width > 550 ? 283 : 241,
                brainHeight: window.screen.width > 550 ? 245 : 211,
                brainHexRadius: window.screen.width > 550 ? 14 : 12,
                brainItems: [
                    {memorization: 12, count: 6},
                    {memorization: 11, count: 4},
                    {memorization: 9, count: 11},
                    {memorization: 8, count: 19},
                    {memorization: 5, count: 7},
                    {memorization: 4, count: 13},
                    {memorization: 3, count: 13},
                    {memorization: 1, count: 6}
                ]
            }
        },

        methods: {
            
        }
    }
</script>

<style lang="scss">

    .rating1 {
        width: 100%;
        min-width: 100%;
        height: 100%;
        padding: 100px 0 50px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

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

        .text {
            text-align: center;
        }
        
        .ai-image {
            width: 300px;
            height: 50px;
            filter: drop-shadow(#0bcccf 0px 0px 5px);
        }
    }

</style>