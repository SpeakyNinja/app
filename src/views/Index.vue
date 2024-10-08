<template>
    <div class="index main-bg">
        
        <div class="title">Speaky Ninja</div>
        <div class="mt-2 title2">слова запомнятся сами</div>

        <div class="buttons">
            <div class="btn green" @click="toRegistration">Зарегистрироваться</div>
            <div class="btn blue" @click="toLogin">Войти</div>
            <div class="btn gray" @click="toTest">Пропустить</div>
        </div>
        
    </div>
</template>

<script>

    export default {

        components: {
        },

        data() {
            return {
            }
        },

        methods: {
            toTest() {
                this.$router.push('/test');
            },

            toLogin() {
                this.$router.push('/login');
            },

            toRegistration() {
                this.$router.push('/registration');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .index {
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        padding: 60px 40px 20px 40px;
        
        .title {
            font-size: 40px;
            font-family: RobotoLight;
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

    @media(max-width: 500px) {
        .index {
            .buttons {
                min-width: 100%;
                width: unset;
            }

        }
    }

</style>