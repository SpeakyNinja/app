<template>

    <div class="component">
        <Ai
            fill="white"
            class="ai-image"
        />
    </div>

    <div class="title m-light mb-2">Поздравляю</div>

    <div class="texts">
        <div class="text m-light">С достижением этапа усвоения.</div>

        <div class="bottom">
            <Brain 
                ref="brain" 
                :items="statService.getLevelsForBrain(brainItems)[0]"
                class="m-center"
            />
        </div>
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
                brainItems: [
                    {memorization: 7, count: 6},
                    {memorization: 6, count: 10},
                    {memorization: 5, count: 11},
                    {memorization: 4, count: 7},
                    {memorization: 3, count: 6},
                    {memorization: 2, count: 7},
                    {memorization: 1, count: 13},
                    
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