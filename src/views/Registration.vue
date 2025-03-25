<template>
    <Form class="main-bg">

        <template v-slot:description>
            <div class="m-light m-gray mt-1">регистрация</div>
        </template>

        <template v-slot:content>

            <div class="content mt-5">
                <div>
                    <div>
                        <div class="m-light ml-1 mb-1 m-size20 m-white">E-mail</div>
                        <input class="input" type="text" v-model="student.email">
                    </div>

                    <div>
                        <div class="m-light ml-1 mb-1 mt-1 m-size20 m-white">Пароль</div>
                        <PasswordBox>
                            
                            <template v-slot:password-input>
                                <input type="password" v-model="student.password">
                            </template>

                            <template v-slot:text-input>
                                <input type="text" v-model="student.password">
                            </template>

                        </PasswordBox>

                        <div class="m-red mt-2" v-if="error">{{ error }}</div>
                    </div>

                    <div class="btn green mt-2" @click="registration">Зарегистрироваться</div>

                    <div class="ext-buttons">
                        <GoogleLogin />
                        <VkLogin />
                    </div>
                </div>

                <div class="btn transparent" @click="toHome">Вернуться</div>
                
                <div class="mt-2 m-center">
                    <div class=" m-size16 m-white">Регистрируясь, вы принимаете</div>
                    <a href="https://speaky.ninja/agreement" target="_blank" class="m-underline m-size16">данные условия</a>
                </div>
            </div>

        </template>

    </Form>
</template>

<script>
    import { inject } from 'vue';
    import PasswordBox from "@/components/PasswordBox.vue";
    import Form from "@/components/Form.vue";
    import GoogleLogin from '@/components/GoogleLogin.vue';
    import VkLogin from '@/components/VkLogin.vue';

    export default {

        components: {
            PasswordBox,
            Form,
            GoogleLogin,
            VkLogin
        },

        data() {
            return {
                error: ''
            }
        },

        methods: {
            async registration() {
                try {
                    this.preloader.show = true;
                    const r = await this.student.registration();
                    this.$router.push('/test');
                } catch(res) {
                    this.error = res.message || 'Ошибка сервера';
                } finally {
                    this.preloader.show = false;
                }
            },

            toHome() {
                localStorage.setItem('skipIndexBefore', true);
                this.$router.push('/');
            }
        },

        beforeMount() {
            this.preloader = inject('preloader');
            this.student = inject('student');
        }
    }
</script>

<style lang="scss" scoped>
    
    .ext-buttons {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
    }

</style>