<template>
    <div class="options main-bg">

        <TopBar title="Настройки" />

        <div class="options-wrapper no-scrollbar">
            <div class="block mt-10">
                <div class="row">{{ userId() }}</div>
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

            <div class="block">
                <div class="row title">Озвучивание добора</div>

                <div class="row toggler-wrapper">
                    <div class="subtitle">При показе карточки</div>
                    <Toggler 
                        @toggleHandler="toggle('muteAddingVoice1')"
                        :defaultStatus="!storage.get('options', 'muteAddingVoice1')" 
                    />
                </div>
            </div>

            <div class="block">

                <div class="btn dark-gray no-select" @click="$router.push('/feedback')">
                    Обратная связь
                </div>

                <div class="btn dark-gray no-select" v-if="student.isAutoReg()" @click="$router.push('/permanent-registration')">
                    Регистрация
                </div>

                <div class="btn dark-gray no-select" @click="showCloseModal = true">
                    Выйти
                </div>

            </div>
        </div>

    </div>

    <Modal :options="closeModalOptions" :show="showCloseModal" @close="showCloseModal = false" />

</template>

<script>
    import { inject } from 'vue';
    import Modal from '@/components/Modal.vue';
    import Toggler from '@/components/Toggler.vue';
    import LocalStorage from '@/services/LocalStorageService.js';
    import TopBar from '@/components/TopBar.vue';

    export default {

        components: {
            Toggler,
            Modal,
            TopBar
        },

        data() {
            return {
                storage: LocalStorage,
                showCloseModal: false,
                closeModalOptions: {}
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

            toggle(key) {
                const val = !LocalStorage.get('options', key);
                LocalStorage.store('options', key, val);
            },

            userId() {
                if( this.student.isAutoReg() ) {
                    return `Id: ${this.student.getEmail().split('@').shift()}`;
                }

                return `E-mail: ${this.student.getEmail()}`;
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');

            let body = 'Вы точно хотите выйти из вашего аккаунта?';
            if(this.student.isAutoReg()) {
                body = 'Если не зарегистрируетесь вы потеряете текущий прогресс, так как не сможете снова войти в этот же аккаунт.';
            }

            this.closeModalOptions = {
                header: 'Внимание',
                body: body,
                action: this.logout.bind(this),
                actionButtonText: 'Выйти',
                cancelButtonText: 'Отмена'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .options {
        flex-grow: 2;
        height: 100%;
        padding-bottom: 10px;

        .options-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            gap: 40px;
            position: relative;
            max-height: 100%;
            width: 100%;

            .block {
                display: flex;
                flex-direction: column;
                gap: 20px;
                color: #ebebed;
                max-width: 500px;
                width: 100%;
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