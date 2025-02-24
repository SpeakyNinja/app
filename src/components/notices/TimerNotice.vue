<template>

    <div class="first-level-up4">

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

        data() {
            return {
            }
        },

        methods: {
        }
    }
</script>

<style lang="scss" >

    .first-level-up4 {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-grow: 2;

        .component {
            height: 45%;
            min-height: 45%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .title {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            flex-grow: 2;
            font-size: 32px;
            text-align: center;

            &:first-child {
                flex-grow: unset;
                height: 45%;
                min-height: 45%;
                justify-content: flex-end;
                padding-bottom: 50px;
            }
        }

        .texts {
            height: 40%;
            min-height: 40%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 20px;
            padding-top: 30px;

            .text {
                text-align: center;

                &.muted {
                    color: #949494;
                }
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