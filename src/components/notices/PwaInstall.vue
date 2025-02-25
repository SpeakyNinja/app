<template>

    <div class="component">
        <Ai fill="white" class="ai-image" />
    </div>

    <div class="title m-light">Установить приложение?</div>

    <div class="texts">
        
        <div class="text m-light">
            Чтобы запускать через иконку на рабочем столе.
        </div>
        
        <div class="button-wrapper">
            <div class="btn green" @click="installPwa()">Установить</div>
            <div class="btn transparent" @click="$parent.changeItem(1)">нет, не надо</div>
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
            installPwa() {

                this.$parent.changeItem(1);
            }
        }
    }
</script>

<style lang="scss" scoped>

    .btn.transparent {
        background-color: transparent;
    }

</style>