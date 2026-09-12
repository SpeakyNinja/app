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
                <div class="row title">Конфиденциальность</div>

                <div class="row toggler-wrapper">
                    <div class="subtitle">Аналитика (Yandex Metrika)</div>
                    <Toggler
                        @toggleHandler="toggleAnalytics"
                        :defaultStatus="analyticsEnabled"
                    />
                </div>
            </div>

            <div class="block">
                <div class="row title">Реферальная программа</div>
                <div class="row subtitle" v-if="referralLoading">Загрузка…</div>
                <template v-else-if="referralEnabled">
                    <div class="row subtitle">Ваш код для друзей</div>
                    <div class="row referral-code" @click="copyReferral">
                        {{ referralCode || '—' }}
                        <span class="copy-hint">{{ referralCopied ? 'Скопировано' : 'Нажмите, чтобы скопировать' }}</span>
                    </div>
                    <div class="row subtitle" v-if="referralSettings.referrer_neurons">
                        Вы получите {{ formatNeurons(referralSettings.referrer_neurons) }} нейронов,
                        друг — {{ formatNeurons(referralSettings.referee_neurons) }}
                        ({{ referralSettings.reward_on === 'signup' ? 'при регистрации' : 'после первой покупки' }})
                    </div>
                    <div class="row apply-row" v-if="!student.isAutoReg()">
                        <input
                            v-model.trim="friendCode"
                            type="text"
                            class="referral-input"
                            placeholder="Код друга / партнёра"
                        />
                        <button type="button" class="btn dark-gray apply-btn" :disabled="applyBusy" @click="applyFriendCode">
                            {{ applyBusy ? '…' : 'Применить' }}
                        </button>
                    </div>
                    <div class="row subtitle" v-if="applyHint" :class="{ error: applyError }">{{ applyHint }}</div>
                </template>
                <div class="row subtitle" v-else>Программа временно выключена</div>
            </div>

            <div class="block">

                <div
                    v-if="dialogTestEnabled"
                    class="btn dark-gray no-select"
                    @click="$router.push('/dialog-test')"
                >
                    Тест диалогов
                </div>

                <div class="btn dark-gray no-select" @click="$router.push('/feedback')">
                    Обратная связь
                </div>

                <div class="btn dark-gray no-select" v-if="student.isAutoReg()" @click="$router.push('/link-email')">
                    Привязать e-mail
                </div>

                <div class="btn dark-gray no-select" @click="showCloseModal = true">
                    Выйти
                </div>

                <div class="btn dark-gray no-select privacy-link" @click="$router.push('/privacy')">
                    Политика обработки ПДн
                </div>

                <div
                    class="btn dark-gray no-select delete-account"
                    @click="showDeleteModal = true"
                >
                    Удалить аккаунт и данные
                </div>

            </div>
        </div>

    </div>

    <Modal :options="closeModalOptions" :show="showCloseModal" @close="showCloseModal = false" />
    <Modal :options="deleteModalOptions" :show="showDeleteModal" @close="showDeleteModal = false" />

</template>

<script>
    import { inject } from 'vue';
    import Modal from '@/components/Modal.vue';
    import Toggler from '@/components/Toggler.vue';
    import LocalStorage from '@/services/LocalStorageService.js';
    import TopBar from '@/components/TopBar.vue';
    import ConsentService from '@/services/ConsentService.js';
    import YandexMetrika from '@/services/YandexMetrika.js';
    import AbstractService from '@/services/AbstractService.js';

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
                showDeleteModal: false,
                closeModalOptions: {},
                deleteModalOptions: {},
                dialogTestEnabled: import.meta.env.VITE_DIALOG_TEST_ENABLED === 'true',
                analyticsEnabled: false,
                referralLoading: true,
                referralEnabled: true,
                referralCode: '',
                referralSettings: {},
                referralCopied: false,
                friendCode: '',
                applyBusy: false,
                applyHint: '',
                applyError: false,
                api: null,
            }
        },

        methods: {
            formatNeurons(n) {
                return new Intl.NumberFormat('ru-RU').format(n || 0);
            },

            async loadReferral() {
                this.referralLoading = true;
                try {
                    const r = await this.api.request('/referral/me', {});
                    this.referralCode = r.code || '';
                    this.referralSettings = r.settings || {};
                    this.referralEnabled = r.settings?.enabled !== false;
                } catch {
                    this.referralEnabled = false;
                } finally {
                    this.referralLoading = false;
                }
            },

            async copyReferral() {
                if (!this.referralCode) return;
                try {
                    await navigator.clipboard.writeText(this.referralCode);
                    this.referralCopied = true;
                    setTimeout(() => { this.referralCopied = false; }, 2000);
                } catch {
                    this.modal.show({ message: 'Не удалось скопировать код' });
                }
            },

            async applyFriendCode() {
                this.applyHint = '';
                this.applyError = false;
                if (!this.friendCode) {
                    this.applyHint = 'Введите код';
                    this.applyError = true;
                    return;
                }
                this.applyBusy = true;
                try {
                    await this.api.request('/referral/apply', { code: this.friendCode });
                    this.applyHint = 'Код применён';
                    this.friendCode = '';
                } catch (res) {
                    this.applyHint = res?.message || 'Не удалось применить код';
                    this.applyError = true;
                } finally {
                    this.applyBusy = false;
                }
            },

            toggleAnalytics() {
                const enabled = !this.analyticsEnabled;

                if (enabled) {
                    ConsentService.enableAnalytics();
                    YandexMetrika.initIfConsented();
                } else {
                    ConsentService.revokeAnalytics();
                }

                this.analyticsEnabled = enabled;
            },

            async deleteAccount() {
                this.showDeleteModal = false;
                try {
                    this.preloader.show = true;
                    await this.student.deleteAccount();
                    this.$router.push('/');
                } catch (res) {
                    this.modal.show(res);
                } finally {
                    this.preloader.show = false;
                }
            },

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
            this.api = new AbstractService();
            this.analyticsEnabled = ConsentService.hasAnalyticsConsent();
            this.loadReferral();

            let body = 'Вы точно хотите выйти из вашего аккаунта?';
            if(this.student.isAutoReg()) {
                body = 'Если не привяжете e-mail, вы потеряете текущий прогресс — войти в этот же аккаунт снова не получится.';
            }

            this.closeModalOptions = {
                header: 'Внимание',
                body: body,
                action: this.logout.bind(this),
                actionButtonText: 'Выйти',
                cancelButtonText: 'Отмена'
            };

            let deleteBody = 'Все ваши данные и прогресс будут безвозвратно удалены. Это действие нельзя отменить.';
            if (this.student.isAutoReg()) {
                deleteBody = 'Гостевой аккаунт и весь прогресс будут безвозвратно удалены. Войти в этот же аккаунт снова не получится.';
            }

            this.deleteModalOptions = {
                header: 'Удаление аккаунта',
                body: deleteBody,
                action: this.deleteAccount.bind(this),
                actionButtonText: 'Удалить',
                cancelButtonText: 'Отмена',
            };
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

                    .delete-account {
                        color: #ff8a8a;
                    }

                    .referral-code {
                        display: flex;
                        flex-direction: column;
                        gap: 6px;
                        padding: 14px 16px;
                        border-radius: 14px;
                        background: #2f3040;
                        border: 1px solid #54546f;
                        font-family: Bold;
                        font-size: 22px;
                        letter-spacing: 0.04em;
                        cursor: pointer;

                        .copy-hint {
                            font-family: Light;
                            font-size: 13px;
                            color: #9e9ea8;
                            letter-spacing: 0;
                        }
                    }

                    .apply-row {
                        display: flex;
                        gap: 10px;
                        align-items: center;

                        .referral-input {
                            flex: 1;
                            border: 1px solid #54546f;
                            border-radius: 12px;
                            background: #2f3040;
                            color: #fff;
                            padding: 12px 14px;
                            font-size: 15px;
                            text-transform: uppercase;
                        }

                        .apply-btn {
                            margin: 0;
                            white-space: nowrap;
                        }
                    }

                    .subtitle.error {
                        color: #f07178;
                    }

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