<template>

    <div class="component">
        <Ai fill="white" class="ai-image" />
    </div>

    <div class="title m-light">Просто</div>

    <div class="texts">
        
        <div class="text m-light">
            На панели браузера выберите пункт «Поделиться»
        </div>

        <div class="text m-light">
            затем: <br>«На экран Домой»
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