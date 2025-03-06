<template>
    <Form class="main-bg">

        <template v-slot:description>
            <div class="m-light m-gray mt-1">вход</div>
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

                        <div class="mt-1 m-right">
                            <router-link to="/forgot-password" class="m-underline m-size16">
                                Забыли пароль?
                            </router-link>
                        </div>

                        <div class="m-red mt-2" v-if="error">{{ error }}</div>
                    </div>

                    <div class="btn green mt-2" @click="login">Войти</div>
                </div>

                <div class="btn transparent mt-1" @click="registration">Регистрация</div>
                
                <div class="m-center">
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

    export default {

        components: {
            PasswordBox,
            Form
        },

        data() {
            return {
                error: ''
            }
        },

        methods: {
            async login() {
                try {
                    this.preloader.show = true;
                    const r = await this.student.login();
                    this.$router.push('/training');
                } catch(res) {
                    this.error = res.message;
                } finally {
                    this.preloader.show = false;
                }
            },

            registration() {
                this.$router.push('/registration');
            }
        },

        beforeMount() {
            this.preloader = inject('preloader');
            this.student = inject('student');
        }
    }
</script>

<style lang="scss" scoped>
</style>