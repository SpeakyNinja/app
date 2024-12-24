<template>
    <RouterView />

    <Preloader :isEnabled="preloader.show" />
    <Modal :show="modal.showModal" :options="modal.modalOptions" @close="modal.showModal = false" />
</template>

<script>
    import { provide } from 'vue';
    import { RouterLink, RouterView } from 'vue-router';
    import Student from '@/models/Student.js'
    import Modal from "@/components/Modal.vue";
    import Preloader from "@/components/Preloader.vue";
    import StateService from "@/services/StateService.js";

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
                    body: res.message || 'Ошибка сервера'
                };
                this.modal.showModal = true;

                return false;
            }
        },

        async beforeMount() {
            if(this.student.isGuest()) {
                this.$router.push('/');
            } else {
                try {
                    this.preloader.show = true;
                    await this.student.fetchData();
                } catch(res) {
                    this.modal.show(res);
                } finally {
                    this.preloader.show = false;
                }
            }
        },

        created() {
            this.student = new Student();
            const state = new StateService();
            
            provide('student', this.student);
            provide('modal', this.modal);
            provide('preloader', this.preloader);
            provide('state', state);
        }
    }
</script>