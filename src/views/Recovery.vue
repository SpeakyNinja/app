<template>

    <Form class="main-bg">

        <template v-slot:description>
            <div class="m-light m-gray mt-1">новый пароль</div>
        </template>

        <template v-slot:content>
            <div class="content">
                
                <template v-if="step == 1">
                    
                    <div>
                        <div class="m-light ml-1 mb-1 m-size20 m-white">Новый пароль</div>
                        <PasswordBox>
                            
                            <template v-slot:password-input>
                                <input type="password" v-model="password">
                            </template>

                            <template v-slot:text-input>
                                <input type="text" v-model="password">
                            </template>

                        </PasswordBox>

                        <div class="m-light ml-1 mb-1 mt-1 m-size20 m-white">Повторите пароль</div>
                        <PasswordBox>
                            
                            <template v-slot:password-input>
                                <input type="password" v-model="password2">
                            </template>

                            <template v-slot:text-input>
                                <input type="text" v-model="password2">
                            </template>

                        </PasswordBox>

                        <div class="btn green mt-2" @click="submit">Поменять пароль</div>

                        <div class="m-red mt-2" v-if="error">{{ error }}</div>
                    </div>

                    <div class="btn mt-1 transparent" @click="$router.push('/')" >Вернуться</div>

                </template>

                <template v-else>

                    <div class="m-light ml-1 mb-1 m-size20 m-white m-center">
                        Пароль успешно изменен
                    </div>

                    <div class="btn mt-1 green" @click="$router.push('/')" >Ок</div>

                </template>

            </div>
        </template>

    </Form>

</template>

<script>
    import { inject } from 'vue';
    import Form from "@/components/Form.vue";
    import PasswordBox from "@/components/PasswordBox.vue";
    
    export default {

        components: {
            Form,
            PasswordBox
        },

        data() {
            return {
                email: '',
                password: '',
                password2:'',
                error: '',
                step: 1
            }
        },

        methods: {
            async submit() {
                try {
                    this.preloader.show = true;
                    await this.student.changePassword(this.password, this.password2, this.$route.params.token);
                    this.step = 2;
                } catch(res) {
                    this.error = res.message;
                } finally {
                    this.preloader.show = false;
                }
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');

            window.scrollTo(0, 0);
        }
    }
</script>

<style lang="scss" scoped>
</style>