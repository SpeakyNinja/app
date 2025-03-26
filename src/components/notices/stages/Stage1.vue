<template>

    <Type1>
        <template v-slot:top>
            <Brain 
                :items="statService.getLevelsForBrain(brainItems)[0]"
            />
        </template>

        <template v-slot:center>
            <div class="m-light m-size32 m-center">Красные</div>
        </template>

        <template v-slot:bottom>
            <div class="m-light m-center">
                Этап ознакомления.
            </div>

            <div class="m-light m-center muted">
                Три повтора с короткими интервалами. Внесение слов в краткосрочную память.
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
                    {memorization: 3, count: 6},
                    {memorization: 2, count: 15},
                    {memorization: 1, count: 19}
                ]
            };
        },

        methods: {
        }
    }
</script>

<style lang="scss" scoped>
</style>