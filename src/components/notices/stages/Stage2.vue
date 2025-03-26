<template>

    <Type1>
        <template v-slot:top>
            <Brain 
                :items="statService.getLevelsForBrain(brainItems)[0]"
            />
        </template>

        <template v-slot:center>
            <div class="m-light m-size32 m-center">Желтые</div>
        </template>

        <template v-slot:bottom>
            <div class="m-light m-center">
                Этап усвоения.
            </div>

            <div class="m-light m-center muted">
                Четыре повтора со средними интервалами. Перевод слов в среднесрочную память.
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
                    {memorization: 7, count: 6},
                    {memorization: 6, count: 4},
                    {memorization: 5, count: 6},
                    {memorization: 4, count: 18},
                    {memorization: 3, count: 0},
                    {memorization: 2, count: 13},
                    {memorization: 1, count: 13}
                ]
            };
        },

        methods: {
        }
    }
</script>

<style lang="scss" scoped>
</style>