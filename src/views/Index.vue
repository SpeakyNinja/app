<template>

    <Form class="main-bg">

        <template v-slot:description>
            <div class="m-light m-gray mt-1">слова запомнятся сами</div>
        </template>

        <template v-slot:content>

            <div class="content mt-1">
                <div>
                    <div>
                        <div class="btn blue outline" @click="toLogin">Войти</div>
                    </div>

                    <div>
                        <div class="btn blue outline mt-2" @click="toRegistration">Зарегистрироваться</div>
                    </div>

                    <div>
                        <div class="btn blue mt-2" @click="toTest">Пропустить</div>
                    </div>
                </div>
            </div>

            <div class="mt-2 mb-2 m-center">
                <div class=" m-size16 m-white">Продолжая, вы принимаете</div>
                <a href="https://speaky.ninja/agreement" target="_blank" class="m-underline m-size16">данные условия</a>
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
    import NoticeLayer from '@/components/NoticeLayer.vue';
    import Form from "@/components/Form.vue";
    import NoticeService from '@/services/NoticeService.js';

    export default {

        components: {
            NoticeLayer,
            Form
        },

        data() {
            return {
                showNotice: false,
                noticeItems: []
            }
        },

        methods: {
            async toTest() {
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
                this.$router.push('/login');
            },

            toRegistration() {
                this.$router.push('/registration');
            }
        },

        beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');

            if(!this.student.isGuest()) {
                this.$router.push('/statistics');
            }

            if(localStorage.getItem('skipIndexBefore')) {
                localStorage.removeItem('skipIndexBefore');
            } else {
                this.noticeService = new NoticeService();
                this.noticeItems = this.noticeService.getItems('indexBefore');
                this.showNotice = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>