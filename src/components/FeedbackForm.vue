<template>
    <Modal :show="show" @close="$emit('close')" :options="modalOptions" class="feedback-form">
        <template v-slot:body>
            <textarea class="message-input" v-model="message"></textarea>

            <div class="m-red" v-if="error">{{ error }}</div>
        </template>
        
        <template v-slot:footer>
            <div class="btn" @click="submit">Отправить</div>
        </template>
    </Modal>
</template>

<script>
    import { inject } from 'vue';
    import Modal from "@/components/Modal.vue";
    import FeedbackService from "@/services/FeedbackService.js";

    export default {

        components: {
            Modal
        },

        props: {
            show: {
                type: Boolean,
                required: true
            }
        },

        emits: ['close', 'callback'],

        data() {
            return {
                modalOptions: {header: 'Сообщить об ошибке', alignTop: true},
                message: '',
                error: '',
                meaningId: null
            }
        },

        methods: {
            async submit() {
                this.error = '';

                if(!this.message) {
                    this.error = 'Введите сообщение';
                    return false;
                }

                try {
                    this.preloader.show = true;
                    await this.feedbackService.submit(this.message, this.meaningId);
                    this.$emit('close');
                    this.$emit('callback');
                } catch(res) {
                    this.error = res.message || 'Ошибка сервера';
                } finally {
                    this.preloader.show = false;
                }
            }
        },

        async beforeMount() {
            this.preloader = inject('preloader');
            this.feedbackService = new FeedbackService();
        }
    }
</script>

<style lang="scss" scoped>
    
    .feedback-form {

        .message-input {
            width: 100%;
            margin: 20px 0 10px 0;
            height: 300px;
        }

        .btn {
            margin-top: 10px;
        }
    }

</style>