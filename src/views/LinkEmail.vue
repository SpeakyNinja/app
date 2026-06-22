<template>
    <div class="link-email main-bg">

        <TopBar title="Привязать e-mail" backLink="/options" />

        <div class="options-wrapper no-scrollbar">
            <template v-if="step === 1">
                <div class="row mt-10">
                    <div class="subtitle mb-1">E-mail</div>
                    <input class="input" type="email" v-model="email" autocomplete="email">
                    <div class="m-red mt-2" v-if="error">{{ error }}</div>
                </div>

                <div class="row">
                    <div class="btn green no-select" @click="submit">Получить ссылку</div>
                </div>
            </template>

            <template v-else>
                <div class="row mt-10">
                    <div class="subtitle m-center">
                        Ссылка отправлена на вашу почту. Перейдите по ней, чтобы привязать e-mail к аккаунту.
                    </div>
                </div>

                <div class="row">
                    <div class="btn green no-select" @click="$router.push('/options')">Ок</div>
                </div>
            </template>

            <div class="row">
                <div class="btn dark-gray no-select" @click="$router.push('/options')">Назад</div>
            </div>
        </div>

    </div>
</template>

<script>
    import { inject } from 'vue';
    import TopBar from '@/components/TopBar.vue';

    export default {
        components: {
            TopBar,
        },

        data() {
            return {
                email: '',
                error: '',
                step: 1,
            };
        },

        methods: {
            async submit() {
                try {
                    this.preloader.show = true;
                    await this.student.sendMagicLink(this.email);
                    this.step = 2;
                } catch (res) {
                    this.error = res.message || 'Ошибка сервера';
                } finally {
                    this.preloader.show = false;
                }
            },
        },

        beforeMount() {
            this.preloader = inject('preloader');
            this.student = inject('student');

            if (!this.student.isAutoReg()) {
                this.$router.push('/statistics');
            }
        },
    };
</script>

<style lang="scss" scoped>
    .link-email {
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
                width: 100%;
                padding: 0 30px;

                .subtitle {
                    color: #ebebed;
                }
            }
        }
    }
</style>
