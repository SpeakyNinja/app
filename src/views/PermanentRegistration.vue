<template>

    <div class="p-registration main-bg">

        <TopBar title="Регистрация" backLink="/options" />

        <div class="options-wrapper no-scrollbar">

            <div class="row mt-10">
                <div class="subtitle mb-1">E-mail</div>
                <input class="input" type="text" v-model="reg.email">
            </div>

            <div class="row">
                <div class="subtitle mb-1">Пароль</div>
                <PasswordBox>
                        
                    <template v-slot:password-input>
                        <input type="password" v-model="reg.password">
                    </template>

                    <template v-slot:text-input>
                        <input type="text" v-model="reg.password">
                    </template>

                </PasswordBox>
            </div>

            <div class="row">
                <div class="subtitle mb-1">Пароль повторно</div>
                <PasswordBox>
                        
                    <template v-slot:password-input>
                        <input type="password" v-model="reg.password2">
                    </template>

                    <template v-slot:text-input>
                        <input type="text" v-model="reg.password2">
                    </template>

                </PasswordBox>
                <div class="m-red mt-2" v-if="error">{{ error }}</div>
            </div>

            <div class="row">
                <div class="btn green no-select" @click="submitRegistration">Зарегистрироваться</div>
            </div>

            <div class="row">
                <div class="btn dark-gray no-select" @click="$router.push('/options')">Назад</div>
            </div>

        </div>

    </div>

</template>

<script>
    import { inject } from 'vue';
    import TopBar from '@/components/TopBar.vue';
    import PasswordBox from "@/components/PasswordBox.vue";

    export default {

        components: {
            TopBar,
            PasswordBox
        },

        data() {
            return {
                reg: {email: '', password: '', password2: ''},
                error: '',
            }
        },

        methods: {
            async submitRegistration() {
                try {
                    this.preloader.show = true;
                    await this.student.postRegistration(this.reg);
                    this.$router.push('/options');
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
            this.student = inject('student');

            if(!this.student.isAutoReg()) {
                this.$router.push('/statistics');
            }
        }
    }
</script>

<style lang="scss" scoped>

    .p-registration {
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

                .subtitle {
                    color: #ebebed;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            
        }
        
    }

    @media(max-width: 500px) {
        .p-registration {

            .options-wrapper {
                .row {
                    width: 100%;
                }
            }
        }
    }

</style>