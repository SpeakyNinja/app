<template>
    <div class="options main-bg">

        <div class="options-wrapper no-scrollbar">
            <div class="block" v-if="student.isAutoReg()">
                <div class="row title">Регистрация</div>

                <div class="row">
                    <div class="subtitle mb-1">E-mail</div>
                    <input class="input" type="text" v-model="reg.email">
                </div>

                <div class="row">
                    <div class="subtitle mb-1">Пароль</div>
                    <input class="input" type="password" v-model="reg.password">
                    <div class="m-red mt-2" v-if="regError">{{ regError }}</div>
                </div>

                <div class="row">
                    <div class="btn green no-select" @click="submitRegistration">Зарегистрироваться</div>
                </div>
            </div>

            <div class="block">
                <div class="row title">Озвучивание тренировки</div>

                <div class="row toggler-wrapper">
                    <div class="subtitle">При показе карточки</div>
                    <Toggler 
                        @toggleHandler="toggle('muteTrainingVoice1')" 
                        :defaultStatus="!storage.get('options', 'muteTrainingVoice1')" 
                    />
                </div>

                <div class="row toggler-wrapper">
                    <div class="subtitle">При правильном ответе</div>
                    <Toggler 
                        @toggleHandler="toggle('muteTrainingVoice2')"
                        :defaultStatus="!storage.get('options', 'muteTrainingVoice2')" 
                    />
                </div>
            </div>

            <div class="block mb-1">
                <div class="row title">Озвучивание добора</div>

                <div class="row toggler-wrapper">
                    <div class="subtitle">При показе карточки</div>
                    <Toggler 
                        @toggleHandler="toggle('muteAddingVoice1')"
                        :defaultStatus="!storage.get('options', 'muteAddingVoice1')" 
                    />
                </div>
            </div>
        </div>

        <ButtonsSticked>
            <template v-slot:items>
                <div class="item no-select" @click="toStat()">Назад</div>
                <div class="item no-select" @click="showCloseModal = true">Выход</div>
            </template>
        </ButtonsSticked>

    </div>

    <Modal :options="closeModalOptions" :show="showCloseModal" @close="showCloseModal = false" />

</template>

<script>
    import { inject } from 'vue';
    import Modal from '@/components/Modal.vue';
    import ButtonsSticked from '@/components/ButtonsSticked.vue';
    import Toggler from '@/components/Toggler.vue';
    import LocalStorage from '@/services/LocalStorageService.js';

    export default {

        components: {
            ButtonsSticked,
            Toggler,
            Modal
        },

        data() {
            return {
                reg: {email: '', password: ''},
                regError: '',
                storage: LocalStorage,
                showCloseModal: false,
                closeModalOptions: {
                    header: 'Внимание',
                    body: 'Вы будете отключены от вашего аккаунта',
                    action: this.logout.bind(this),
                    actionButtonText: 'Выйти',
                    cancelButtonText: 'Отмена'
                }
            }
        },

        methods: {
            async logout() {
                this.showCloseModal = false;
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

            toStat() {
                this.$router.push('/statistics');
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

            toggle(key) {
                const val = !LocalStorage.get('options', key);
                LocalStorage.store('options', key, val);
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .options {
        flex-grow: 2;
        height: 100%;
        padding: 30px 0 125px 0;

        .options-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            gap: 50px;
            position: relative;
            max-height: 100%;

            .block {
                display: flex;
                flex-direction: column;
                gap: 20px;
                color: #ebebed;
                max-width: 500px;
                width: 500px;
                padding: 0 30px;

                .row {
                    &.title {
                        font-family: Bold;
                        font-size: 20px;
                    }

                    &.toggler-wrapper {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .subtitle {
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                    .subtitle {
                        font-size: 20px;
                        font-family: Light;
                    }
                }

            }
        }
        
    }

    @media(max-width: 500px) {
        .options {

            .options-wrapper {
                .block {
                    width: 100%;
                }
            }
        }
    }

</style>