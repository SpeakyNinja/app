<template>
    <div class="login main-bg">
        
        <div class="title">Speaky Ninja</div>

        <div class="m-light m-gray mt-1">вход</div>

        <div class="form">
            <div class="row">
                <div class="m-light ml-1 mb-1 m-size20">E-mail</div>
                <input class="input" type="text" v-model="student.email">
            </div>

            <div class="row">
                <div class="m-light ml-1 mb-1 m-size20">Пароль</div>
                <input class="input" type="password" v-model="student.password">
                <div class="m-red mt-2" v-if="error">{{ error }}</div>
            </div>

            <div class="btn green mt-1" @click="login">Войти</div>
            <div class="btn mt-1" @click="registration">Регистрация</div>
        </div>
        
    </div>
</template>

<script>
    import { inject } from 'vue';

    export default {

        components: {
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
                    this.$router.push('/test');
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
    @import '@/assets/scss/global.scss';

    .login {
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        padding: 60px 40px 20px 40px;
        
        .title {
            font-size: 40px;
            font-family: Light;
            color: #ebebed;
        }

        .form {
            margin-top: 80px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 420px;

            .row {
                .lable {
                }
            }
        }
    }

    @media(max-width: 500px) {
        .login {
            .form {
                min-width: 100%;
                width: unset;
            }

        }
    }

</style>