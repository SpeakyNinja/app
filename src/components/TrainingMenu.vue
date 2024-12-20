<template>
    <div class="menu no-select">
        <div class="dotted-button js-button" @click="showMenu">
            <span class="js-button"></span>
            <span class="js-button"></span>
            <span class="js-button"></span>
        </div>

        <div class="menu" :class="{'active' : isActive}">
            <div class="item" @click="isLearned">Выучил это слово</div>
            <div class="item" @click="toOptions">Настройки</div>
            <div class="item" @click="$emit('showFeedbackForm')">Сообщить об ошибке</div>
        </div>
    </div>
</template>

<script>
    import { inject } from 'vue';

    export default {

        props: {
        },

        emits: ["showFeedbackForm"],

        data() {
            return {
                isActive: false
            }
        },

        methods: {
            showMenu() {
                if(!this.isActive) {
                    this.isActive = true;
                    this.initListener();
                }
            },

            isLearned(e) {
                this.$emit('isLearned');
            },

            initListener() {
                window.addEventListener("click", (e) => {
                    if(e.target.classList.contains('js-button')) {
                        this.initListener();
                    } else {
                        this.isActive = false;
                    }
                }, {once : true});
            },

            async toOptions() {
                this.$router.push('/options');
            }
        },

        beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .menu {
        position: relative;

        .dotted-button {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #525465;
            cursor: pointer;

            span {
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background-color: #525465;
            }

            &:hover {
                border: 1px solid #9091a1;

                span {
                    background-color: #9091a1;
                }
            }
        }

        .menu {
            position: absolute;
            top: 46px;
            right: 0;
            box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.5);
            display: none;

            .item {
                background-color: #d5d5dd;
                padding: 10px 15px;
                white-space: nowrap;
                font-size: 16px;
                cursor: pointer;

                &:hover {
                    background-color: #e2e2e5;
                }
            }

            &.active {
                display: flex;
                flex-direction: column;
            }
        }
    }    
</style>