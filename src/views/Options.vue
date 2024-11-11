<template>
    <div class="options main-bg">

        <div class="progress">
            <div class="row">
                <div class="m-size20">пройдено тренировок</div>
                <div class="m-size40 m-black">{{ student?.progress?.trainingCount }}</div>
            </div>

            <div class="row">
                <div class="m-size20">слов выучено</div>
                <div class="m-size40 m-black">{{ student?.progress?.learnedWordsCount }}</div>
            </div>

            <div class="row">
                <div class="m-size20">слов изучается</div>
                <div class="m-size40 m-black">{{ student?.progress?.inProgressWordsCount }}</div>
            </div>
        </div>
        
        <div class="dialog-controls">
            <div class="item no-select" @click="toTraining()">Тренировка</div>
            <div class="item no-select" @click="registration()" v-if="student.isAutoReg()">Регистрация</div>
            <div class="item no-select" @click="soundSettings()">Звук</div>
            <div class="item no-select" @click="logout()">Разлогиниться</div>
        </div>

    </div>

    <Modal 
        :show="showRegistration" 
        :options="registrationOptions"
        @close="showRegistration = false"
    >
        <template v-slot:body>
            <div class="form">
                <div class="row">
                    <div class="m-light ml-1 mb-1 m-size20">E-mail</div>
                    <input class="input" type="text" v-model="reg.email">
                </div>

                <div class="row mt-3">
                    <div class="m-light ml-1 mb-1 m-size20">Пароль</div>
                    <input class="input" type="password" v-model="reg.password">
                    <div class="m-red mt-2" v-if="regError">{{ regError }}</div>
                </div>
            </div>
        </template>
        <template v-slot:footer>
            <div class="btn green mt-1 no-select" @click="submitRegistration">Зарегистрироваться</div>
        </template>
    </Modal>

</template>

<script>
    import { inject } from 'vue';
    import Modal from '@/components/Modal.vue'

    export default {

        components: {
            Modal
        },

        data() {
            return {
                showRegistration: false,
                registrationOptions: {header: 'Регистрация'},
                reg: {email: '', password: ''},
                regError: ''
            }
        },

        methods: {
            async logout() {
                try {
                    this.preloader.show = true;
                    await this.student.logout();
                    this.$router.push('/');
                } catch(res) {
                    this.modal.show(res);
                } finally {
                    this.preloader.show = false;
                }
            },

            toTraining() {
                this.$router.push('/training');
            },

            registration() {
                this.showRegistration = true;
            },

            async submitRegistration() {
                
                try {
                    this.preloader.show = true;
                    const r = await this.student.postRegistration(this.reg.email, this.reg.password);
                    this.showRegistration = false;
                } catch(res) {
                    this.regError = res.message || 'Ошибка сервера';
                } finally {
                    this.preloader.show = false;
                }
            },

            soundSettings() {

            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');

            if(!this.student.progress) {
                try {
                    this.preloader.show = true;
                    await this.student.fetchProgress();
                    this.$forceUpdate();
                } catch(res) {
                    this.modal.show(res);
                } finally {
                    this.preloader.show = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .options {
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 30px;

        .progress {
            text-align: center;
            margin-top: 60px;
            color: #959595;

            .row {
                margin-bottom: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;

                .m-black {
                    color: #ebebed;
                }
            }
        }

        .dialog-controls {
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            border-top: 1px solid rgba(255,255,255,0.2);

            .item {
                z-index: 2;
                width: 450px;
                letter-spacing: 1px;
                position: relative;
                overflow: hidden;
            }

            &:before {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                content: "";
                background-color: rgba(10, 10, 12, .24);
                backdrop-filter: blur(8px);
            }
        }
    }

</style>