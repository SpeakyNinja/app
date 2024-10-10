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
                    header: 'Извините',
                    body: res.message || 'Ошибка сервера'
                };
                this.modal.showModal = true;

                return false;
            }
        },

        beforeMount() {
            if(this.student.isGuest()) {
                this.$router.push('/');
            }
        },

        created() {
            this.student = new Student();
            provide('student', this.student);
            provide('modal', this.modal);
            provide('preloader', this.preloader);
        }
    }
</script>