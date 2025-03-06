<template>

    <Form class="main-bg">

        <template v-slot:description>
            <div class="m-light m-gray mt-1">восстановление пароля</div>
        </template>

        <template v-slot:content>
            <div class="content">
                
                <template v-if="step == 1">
                    <div>
                        <div class="m-light ml-1 mb-1 m-size20 m-white">E-mail</div>
                        <input class="input" type="text" v-model="email">
                        
                        <div class="btn green mt-2" @click="submit">Получить ссылку</div>

                        <div class="m-red mt-2" v-if="error">{{ error }}</div>
                    </div>

                </template>

                <template v-else>
                    <div class="m-light ml-1 mb-1 m-size20 m-white m-center">
                        Ссылка отправлена на вашу почту, перейдите по ней и следуйте инструкциям
                    </div>
                </template>
                
                <div 
                    :class="{green: step == 2, transparent: step == 1}"
                    class="btn mt-1" 
                    @click="$router.push('/')"
                >
                    На главную страницу
                </div>
            </div>
        </template>

    </Form>

</template>

<script>
    import { inject } from 'vue';
    import Form from "@/components/Form.vue";
    
    export default {

        components: {
            Form
        },

        data() {
            return {
                email: '',
                error: '',
                step: 1
            }
        },

        methods: {
            async submit() {
                try {
                    this.preloader.show = true;
                    await this.student.sendRecoveryLink(this.email);
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