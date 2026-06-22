<template>
    <RouterView />

    <CookieConsent />
    <Preloader :isEnabled="preloader.show" />
    <Modal :show="modal.showModal" :options="modal.modalOptions" @close="modal.showModal = false" />
</template>

<script>
    import { provide } from 'vue';
    import { RouterLink, RouterView } from 'vue-router';
    import Modal from '@/components/Modal.vue';
    import Preloader from '@/components/Preloader.vue';
    import CookieConsent from '@/components/CookieConsent.vue';
    import StudentService from '@/services/StudentService.js';
    import StateService from '@/services/StateService.js'

    export default {
    	components: {
    		Modal,
            Preloader,
            CookieConsent,
        },

        data() {
            return {
            	modal: {
                    showModal: false,
                    modalOptions: {},
                    show: this.showModal
                },
                preloader: {
                    show: false
                }
            }
        },

        methods: {
        	showModal(res) {
                if(res.skipModal) {
                    return res.message;
                }

                this.modal.modalOptions = {
                    header: res.title || 'Извините',
                    body: res.message || 'Ошибка сервера',
                    cancelButtonText: res.cancelButtonText || 'Закрыть'
                };
                this.modal.showModal = true;

                return false;
            }, 

            checkPwaVersion(version) {
                const localVersion = localStorage.getItem('pwaVersion') || 0;
                if(!version || localVersion == version) {
                    return true;
                }

                localStorage.setItem('pwaVersion', version);
                setTimeout(() => {
                    window.location.reload();
                });

                return false;
            },

            isPublicArea() {
                const path = window.location.pathname;
                const public_paths = ['/login', '/privacy'];
                const isMagicLink = path.indexOf('/auth/magic/') === 0;
                const isEngagementPreview = path.indexOf('/engagement-preview/') === 0;
                const isAnimationPreview = path.indexOf('/animation-preview/') === 0;
                const isDesignPreview = path.indexOf('/design-preview/') === 0;
                return isMagicLink || isEngagementPreview || isAnimationPreview || isDesignPreview || public_paths.includes(path);
            },

            isEngagementPreviewArea() {
                const path = window.location.pathname;
                return path.indexOf('/engagement-preview/') === 0
                    || path.indexOf('/animation-preview/') === 0
                    || path.indexOf('/design-preview/') === 0;
            }
        },

        async beforeMount() {
            if (this.isEngagementPreviewArea()) {
                return;
            }

            let authenticated = false;

            try {
                this.preloader.show = true;
                authenticated = await this.student.checkAuth();

                if (authenticated) {
                    const r = await this.student.fetchData();
                    this.checkPwaVersion(r.pwaVersion);
                    localStorage.setItem('appTimezone', r.appTimezone);
                } else if (!this.isPublicArea()) {
                    this.$router.push('/');
                }
            } catch (res) {
                this.modal.show(res);
            } finally {
                this.preloader.show = false;
            }
        },

        created() {
            this.student = new StudentService();
            const state = new StateService(this.student);
            
            provide('student', this.student);
            provide('modal', this.modal);
            provide('preloader', this.preloader);
            provide('state', state);
        }
    }
</script>