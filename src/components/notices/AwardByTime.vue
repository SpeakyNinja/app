<template>

    <div class="component">
        <Ai fill="white" class="ai-image" />
    </div>

    <div class="title m-light">Поздравляю</div>

    <div class="texts">
        
        <div class="text m-light">
            Обновлен рекорд запаса времени: на таймере больше {{options.hours}}
            {{ tools.plural(options.hours, ['час', 'часа', 'часов']) }}.
        </div>
        
        <div class="text m-light">Награда 20 000 нейронов.</div>

        <div class="button-wrapper">
            <div class="btn green" @click="$parent.changeItem(1)">Получить</div>
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
        },

        beforeMount() {
            this.tools = new ToolsService();
        }
    }
</script>

<style lang="scss" >
</style>