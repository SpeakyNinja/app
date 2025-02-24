<template>

    <div class="component">
        <Ai fill="white" class="ai-image" />
    </div>

    <div class="title m-light">Поздравляю</div>

    <div class="texts">
        
        <div class="text m-light">
            Достигнут уровень {{ options.currentLevel }}.
        </div>

        <div class="text m-light">
            Ежедневный бонус: 
            <br>
            {{ getBonusString() }}
        </div>
        
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
            getBonusString() {
                const seconds = this.options.firstTrainingTimeAward;
                const h = ( Math.floor(seconds / 60 / 60) + '' ).padStart(2, "0");
                const m = ( (Math.floor(seconds / 60) % 60) + '' ).padStart(2, "0");
                return `+ ${h}h ${m}m`;
            }
        }
    }
</script>

<style lang="scss" >
</style>