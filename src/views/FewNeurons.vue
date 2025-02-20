<template>
    <div class="few-neurons main-bg">
        
        <Ai class="ai-image" />

        <div class="title m-size32 m-light w350">Недостаточно нейронов</div>

        <div class="text m-light w350">Пополните запас нейронов в магазине или зайдите завтра, когда снова будут доступны бесплатные тренировки.</div>

        <div class="controls">
            <router-link to="/store" class="btn green">Пополнить</router-link>
            <router-link to="/statistics" class="btn gray">Назад</router-link>
        </div>

    </div>

</template>

<script>
    import Ai from '@/components/icons/Ai.vue'

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

<style lang="scss" scoped>

    .few-neurons {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        flex-grow: 2;
        padding: 120px 20px 50px 20px;

        .title {
            text-align: center;
            margin-top: 80px;
        }

        .text {
            flex-grow: 2;
            display: flex;
            align-items: center;
            text-align: center;
        }

        .controls {
            display: flex;
            flex-direction: column;
            gap: 30px;
            width: 300px;
        }

        .w350 {
            max-width: 350px;
        }
    }

</style>