<template>

    <Form class="main-bg">

        <template v-slot:description>
            <div class="m-light m-gray mt-1">слова запомнятся сами</div>
        </template>

        <template v-slot:content>

            <div class="content mt-1">
                <div class="buttons">
                    <div>
                        <div class="btn blue outline" @click="toLogin">Войти по e-mail</div>
                    </div>

                    <div>
                        <div class="btn blue mt-2" @click="toTest">Пропустить</div>
                    </div>
                </div>

                <ConsentCheckbox v-model="pdConsent" :showError="consentError" class="mt-2" />
            </div>


            <NoticeLayer 
                :items="noticeItems" 
                v-if="showNotice" 
                @closedHandler="showNotice = false"
                :fade="false"
            />

        </template>

    </Form>

</template>

<script>
    import { inject } from 'vue';
    import { isEngagementPreviewActive } from '@/utils/engagementPreviewBootstrap.js';
    import NoticeLayer from '@/components/NoticeLayer.vue';
    import Form from '@/components/Form.vue';
    import ConsentCheckbox from '@/components/ConsentCheckbox.vue';
    import ConsentService from '@/services/ConsentService.js';
    import NoticeService from '@/services/NoticeService.js';

    export default {

        components: {
            NoticeLayer,
            Form,
            ConsentCheckbox,
        },

        data() {
            return {
                showNotice: false,
                noticeItems: [],
                pdConsent: false,
                consentError: false,
            }
        },

        methods: {
            ensureConsent() {
                if (!this.pdConsent) {
                    this.consentError = true;
                    return false;
                }

                ConsentService.setPdConsent(true);
                return true;
            },

            async toTest() {
                if (!this.ensureConsent()) {
                    return;
                }

                try {
                    this.preloader.show = true;
                    await this.student.autoRegistration();
                    this.$router.push('/test');
                } catch(res) {
                    this.modal.show(res);
                } finally {
                    this.preloader.show = false;
                }
            },

            toLogin() {
                if (!this.ensureConsent()) {
                    return;
                }

                this.$router.push('/login');
            },
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');

            if (inject('animationPreview', false)) {
                return;
            }

            if (isEngagementPreviewActive(this.$route, inject('engagementPreview', false))) {
                this.noticeService = new NoticeService();
                this.noticeItems = this.noticeService.getItems('indexBefore');
                this.showNotice = true;
                return;
            }

            const authenticated = await this.student.checkAuth();
            if (authenticated) {
                const route = await this.student.resolvePostLoginRoute();
                this.$router.push(route);
                return;
            }

            if (localStorage.getItem('skipIndexBefore')) {
                localStorage.removeItem('skipIndexBefore');
            } else {
                this.noticeService = new NoticeService();
                this.noticeItems = this.noticeService.getItems('indexBefore');
                this.showNotice = true;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .buttons {
        flex-grow: 2;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>