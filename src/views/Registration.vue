<template>
    <div class="registration main-bg">
        
        <div class="title">Speaky Ninja</div>

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

            <div class="btn green mt-1" @click="registration">Зарегистрироваться</div>
        </div>
        
    </div>
</template>

<script>
    import Student from '@/models/Student.js'

    export default {

        components: {
        },

        data() {
            return {
                error: ''
            }
        },

        methods: {
            async registration() {
                try {
                    const r = await this.student.registration();
                    this.$router.push('/login');
                } catch(res) {
                    this.error = res.message || 'Ошибка сервера';
                } finally {
                }
            }
        },

        beforeMount() {
            this.student = new Student();
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .registration {
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        padding: 60px 40px 20px 40px;
        
        .title {
            font-size: 40px;
            font-family: RobotoLight;
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
        .registration {
            .form {
                min-width: 100%;
                width: unset;
            }

        }
    }

</style>