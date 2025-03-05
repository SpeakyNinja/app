<template>

    <div class="component">
        <Ai fill="white" class="ai-image" />
    </div>

    <div class="title m-light">Время повтора изучаемых слов еще не наступило</div>

    <div class="texts">
        
        <div class="text m-light">Нужно выбрать новые слова.</div>
        
        <div class="button-wrapper">
            <div class="btn green" @click="$parent.changeItem(1)">Ок</div>
        </div>

    </div>

</template>

<script>

    import { inject } from 'vue';
    import Ai from '@/components/icons/Ai.vue';

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

<style lang="scss" >
</style>