<template>

    <div class="feedback main-bg">

        <TopBar title="Обратная связь" backLink="/options" />

        <div class="options-wrapper no-scrollbar">
            
            <div class="row mt-10">
                <textarea class="message-input" v-model="message"></textarea>
            </div>

            <div class="row">
                <div class="btn green no-select" @click="submit">Отправить</div>
            </div>

            <div class="row">
                <div class="btn dark-gray no-select" @click="$router.push('/options')">Назад</div>
                <div class="m-red mt-2" v-if="error">{{ error }}</div>
            </div>

        </div>

    </div>

</template>

<script>
    import { inject } from 'vue';
    import TopBar from '@/components/TopBar.vue';
    import FeedbackService from "@/services/FeedbackService.js";

    export default {

        components: {
            TopBar
        },

        data() {
            return {
                message: '',
                error: '',
            }
        },

        methods: {
            async submit() {
                try {
                    this.preloader.show = true;
                    await this.feedbackService.submit(this.message);
                    this.$router.push('/options');
                    this.modal.show({message: 'Ваше сообщение отправлено', title: 'Спасибо'});
                } catch(res) {
                    this.error = res.message || 'Ошибка сервера';
                } finally {
                    this.preloader.show = false;
                }
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.feedbackService = new FeedbackService();
        }
    }
</script>

<style lang="scss" scoped>

    .feedback {
        flex-grow: 2;
        height: 100%;
        padding-bottom: 10px;

        .options-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            gap: 30px;
            position: relative;
            max-height: 100%;

            .row {
                max-width: 500px;
                width: 500px;
                padding: 0 30px;

                .message-input {
                    width: 100%;
                    margin: 20px 0 10px 0;
                    height: 300px;
                    padding: 10px;
                }
            }
            
        }
        
    }

    @media(max-width: 500px) {
        .feedback {

            .options-wrapper {
                .row {
                    width: 100%;
                }
            }
        }
    }

</style>