<template>
    <Form class="main-bg">

        <template v-slot:description>
            <div class="m-light m-gray mt-1">вход</div>
        </template>

        <template v-slot:content>
            <div class="content mt-1">
                <template v-if="step === 1">
                    <div>
                        <div class="m-light ml-1 mb-1 m-size20 m-white">E-mail</div>
                        <input class="input" type="email" v-model="email" autocomplete="email">

                        <ConsentCheckbox v-model="pdConsent" :showError="consentError" class="mt-2" />

                        <div class="btn green mt-2" @click="submit">Получить ссылку для входа</div>

                        <div class="m-red mt-2" v-if="error">{{ error }}</div>
                    </div>

                    <div class="btn transparent mt-1" @click="toHome">Вернуться</div>
                </template>

                <template v-else>
                    <div class="m-light ml-1 mb-1 m-size20 m-white m-center">
                        Ссылка для входа отправлена на вашу почту. Перейдите по ней в течение 15 минут.
                    </div>

                    <div class="btn green mt-2" @click="toHome">Ок</div>
                </template>
            </div>
        </template>

    </Form>
</template>

<script>
    import { inject } from 'vue';
    import Form from '@/components/Form.vue';
    import ConsentCheckbox from '@/components/ConsentCheckbox.vue';
    import ConsentService from '@/services/ConsentService.js';

    export default {
        components: {
            Form,
            ConsentCheckbox,
        },

        data() {
            return {
                email: '',
                error: '',
                step: 1,
                pdConsent: false,
                consentError: false,
            };
        },

        methods: {
            async submit() {
                if (!this.pdConsent) {
                    this.consentError = true;
                    return;
                }

                ConsentService.setPdConsent(true);

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

            toHome() {
                localStorage.setItem('skipIndexBefore', true);
                this.$router.push('/');
            },
        },

        beforeMount() {
            this.preloader = inject('preloader');
            this.student = inject('student');
        },
    };
</script>
