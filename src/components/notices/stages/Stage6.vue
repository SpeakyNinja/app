<template>

    <Type1>
        <template v-slot:top>
            <Brain 
                :items="statService.getLevelsForBrain(brainItems)[0]"
            />
        </template>

        <template v-slot:center>
            <div class="m-light m-size32 m-center">Тепловая карта уровней</div>
        </template>

        <template v-slot:bottom>
            <div class="m-light m-center">
                Показывает количество слов на всех этапах усвоения.
            </div>
        </template>
    </Type1>

</template>

<script>
    import { nextTick } from 'vue';
    import Type1 from "@/components/notices/Type1.vue";
    import Brain from '@/components/Brain.vue';
    import StatService from '@/services/StatService.js';

    export default {
        components: {
            Type1,
            Brain
        },

        data() {
            return {
                statService: new StatService(),
                brainItems: [
                    {memorization: 20, count: 6},
                    {memorization: 13, count: 10},
                    {memorization: 12, count: 5},
                    {memorization: 11, count: 6},
                    {memorization: 10, count: 7},
                    {memorization: 9, count: 6},
                    {memorization: 8, count: 13},
                    {memorization: 7, count: 7},
                    {memorization: 6, count: 6},
                    {memorization: 5, count: 7},
                    {memorization: 4, count: 6},
                    {memorization: 3, count: 5},
                    {memorization: 2, count: 10},
                    {memorization: 1, count: 6}
                ]
            };
        },

        methods: {
        }
    }
</script>

<style lang="scss" scoped>
</style>