<template>

    <div class="component">
        <Ai fill="white" class="ai-image" />
    </div>

    <div class="title m-light">Таймер</div>

    <div class="texts">
        
        <div class="text m-light">
            Показывает запас оставшегося времени.
        </div>

        <div class="text muted m-light">
            Таймер нельзя доводить до 0.
        </div>
        
        <div class="button-wrapper">
            <div class="btn green" @click="$parent.changeItem(1)">Ок</div>
        </div>

    </div>

</template>

<script>

    import { inject } from 'vue';
    import Ai from '@/components/icons/Ai.vue';
    import ToolsService from '@/services/ToolsService.js';

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

<style lang="scss" scoped>
</style>