<template>

    <div class="award-by-time">

        <div class="m-center">
            <Ai fill="white" class="ai-image" />
        </div>

        <div class="title m-light">Поздравляю</div>

        <div class="texts">
            
            <div class="text m-light">
                Обновлен рекорд запаса времени: на таймере больше {{options.hours}}
                {{ tools.plural(lastDays, ['час', 'часа', 'часов']) }}.
            </div>
            
            <div class="text m-light">Награда 20 000 нейронов.</div>

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
        },

        beforeMount() {
            this.tools = new ToolsService();
        }
    }
</script>

<style lang="scss" >

    .award-by-time {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-grow: 2;
        padding: 100px 0 10px 0;

        .title {
            display: flex;
            justify-content: center;
            text-align: center;
            font-size: 32px;
            margin-top: 100px;
        }

        .texts {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 20px;
            margin-top: 32px;

            .text {
                text-align: center;
            }
        }

        .button-wrapper {
            flex-grow: 2;
            padding-bottom: 30px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }
    }

</style>