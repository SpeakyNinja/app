<template>

    <div class="component">
        <Ai fill="white" class="ai-image" />
    </div>

    <div class="title m-light">
        Поздравляю
    </div>

    <div class="texts">
        <div class="text m-light">С достижением этапа закрепления.</div>

        <Brain 
            ref="brain" 
            :hexRadius="brainHexRadius"
            :width="brainWidth"
            :height="brainHeight"
            :items="statService.getLevelsForBrain(brainItems)[0]"
            class="m-center"
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
                brainWidth: window.screen.width > 550 ? 288 : 246,
                brainHeight: window.screen.width > 550 ? 245 : 211,
                brainHexRadius: window.screen.width > 550 ? 28 : 24,
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

<style lang="scss" scoped>

    .texts {
        padding-top: 0 !important;
        flex-grow: 3;
    }

</style>