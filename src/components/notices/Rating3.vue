<template>

    <div class="component">
        <Ai
            fill="white"
            class="ai-image"
        />
    </div>

    <div class="title m-light">Обратная связь</div>

    <div class="texts">
        <div class="text m-light">Можешь отправлять сообщения моим разработчикам через раздел настроек.</div>
        <div class="text m-light muted mt-2">
            Сообщай об ошибках, пожеланиях и рекомендациях.
        </div>
    </div>

</template>

<script>

    import { inject } from 'vue';
    import Ai from '@/components/icons/Ai.vue'

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

<style lang="scss">
</style>