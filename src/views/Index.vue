<template>
    <div class="index main-bg">
        
        <div class="wrapper no-scrollbar">
            <div class="title">Speaky.Ninja</div>
            <div class="mt-2 title2">слова запомнятся сами</div>

            <div class="buttons">
                <div class="btn green" @click="toRegistration">Зарегистрироваться</div>
                <div class="btn blue" @click="toLogin">Войти</div>
                <div class="btn transparent" @click="toTest">Пропустить</div>
            </div>

            <div class="mt-2 mb-2 m-center">
                <div class=" m-size16">Продолжая, вы принимаете</div>
                <a href="https://speaky.ninja/agreement" target="_blank" class="m-underline m-size16">данные условия</a>
            </div>

            <GoogleLogin />

        </div>
        
        <NoticeLayer 
            :items="noticeItems" 
            v-if="showNotice" 
            @closedHandler="showNotice = false"
            :fade="false"
        />

    </div>
</template>

<script>
    import { inject } from 'vue';
    import NoticeLayer from '@/components/NoticeLayer.vue';
    import GoogleLogin from '@/components/GoogleLogin.vue';
    import NoticeService from '@/services/NoticeService.js';

    export default {

        components: {
            NoticeLayer,
            GoogleLogin
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

            this.noticeService = new NoticeService();
            this.noticeItems = this.noticeService.getItems('indexBefore');
            this.showNotice = true;
        }
    }
</script>

<style lang="scss" scoped>

    .index {
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: #272733 !important;
        height: 100vh;
        height: 100dvh;

        .wrapper {
            padding: 60px 40px 20px 40px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .title {
                font-size: 40px;
                font-family: Light;
                color: #ebebed;
            }

            .title2 {
                font-size: 16px;
                color: #ebebed;
                letter-spacing: 2px;
            }

            .buttons {
                margin-top: 140px;
                display: flex;
                flex-direction: column;
                gap: 20px;
                width: 420px;
            }
        }
        
    }

    @media(max-width: 500px) {
        .index {
            .wrapper {
                .buttons {
                    min-width: 100%;
                    width: unset;
                }

            }
        }
    }

</style>