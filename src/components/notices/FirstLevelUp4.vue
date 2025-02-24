<template>

    <div class="component">
        <Ai fill="white" class="ai-image" />
    </div>

    <div class="title m-light">Бонус уровня</div>

    <div class="texts">
        
        <div class="text m-light">
            Текущий ежедневный бонус:
            <br>
            + 01h 00m
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

<style lang="scss" >
</style>