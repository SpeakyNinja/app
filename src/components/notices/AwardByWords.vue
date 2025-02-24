<template>

    <div class="component">
        <Ai fill="white" class="ai-image" />
    </div>

    <div class="title m-light">Поздравляю</div>

    <div class="texts">
        
        <div class="text m-light">
            Обновлен рекорд скорости освоения. Прогноз больше {{options.words}} слов за месяц.
        </div>
        
        <div class="text m-light">Награда 20 000 нейронов.</div>

        <div class="button-wrapper">
            <div class="btn green" @click="$parent.changeItem(1)">Получить</div>
        </div>

    </div>

</template>

<script>

    import { inject } from 'vue';
    import Ai from '@/components/icons/Ai.vue'

    export default {
        components: {
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
            }
        },

        methods: {
        }
    }
</script>

<style lang="scss">
</style>