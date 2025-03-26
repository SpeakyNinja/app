<template>

    <Type1>
        <template v-slot:top>
            <Brain 
                :items="statService.getLevelsForBrain(brainItems)[0]"
            />
        </template>

        <template v-slot:center>
            <div class="m-light m-size32 m-center">Циановые</div>
        </template>

        <template v-slot:bottom>
            <div class="m-light m-center">
                Выучил.
            </div>

            <div class="m-light m-center muted">
                Слова, которые прошли все этапы.
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
                    {memorization: 13, count: 34},
                    {memorization: 12, count: 0},
                    {memorization: 11, count: 0},
                    {memorization: 10, count: 6},
                    {memorization: 9, count: 7},
                    {memorization: 8, count: 6},
                    {memorization: 7, count: 0},
                    {memorization: 6, count: 0},
                    {memorization: 5, count: 7},
                    {memorization: 4, count: 13},
                    {memorization: 3, count: 0},
                    {memorization: 2, count: 11},
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