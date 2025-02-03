<template>
    <RouterView />

    <Preloader :isEnabled="preloader.show" />
    <Modal :show="modal.showModal" :options="modal.modalOptions" @close="modal.showModal = false" />
</template>

<script>
    import { provide } from 'vue';
    import { RouterLink, RouterView } from 'vue-router';
    import Modal from "@/components/Modal.vue";
    import Preloader from "@/components/Preloader.vue";
    import StudentService from "@/services/StudentService.js";
    import StateService from '@/services/StateService.js'

    export default {
    	components: {
    		Modal,
            Preloader
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
            }
        },

        async beforeMount() {
            if(this.student.isGuest()) {
                this.$router.push('/');
            } else {
                try {
                    this.preloader.show = true;
                    const r = await this.student.fetchData();
                    this.checkPwaVersion(r.pwaVersion);
                    localStorage.setItem('appTimezone', r.appTimezone);
                } catch(res) {
                    this.modal.show(res);
                } finally {
                    this.preloader.show = false;
                }
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