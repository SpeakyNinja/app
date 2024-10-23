<template>
    <div class="test main-bg" v-if="isReady">

        <div class="word-wrapper">
            <div class="word">{{testService.question.word}}</div>

            <Timer ref="timer" @isFinish="submit" />
        </div>

        <div class="dialog-controls">
            <div class="item" @click="submit(answer)" v-for="answer in testService.question.answers">
                {{ answer }}
            </div>
            <div class="item soft" @click="submit()">
                не знаю
            </div>
        </div> 
    </div>
</template>

<script>
    import { inject } from 'vue';
    import Timer from '@/components/Timer.vue'
    import TestService from '@/services/TestService.js'

    export default {
        name: "Test",

        components: {
            Timer
        },

        data() {
            return {
                question: {},
                answers: [],
                isReady: false
            }
        },

        methods: {
            async submit(text = '') {
                try {
                    this.preloader.show = true;
                    await this.testService.sendAnswer(text);
                    if(this.testService.question) {
                        this.$refs.timer.reset();
                        this.$forceUpdate();
                    } else {
                        this.$refs.timer.stop();
                        this.$router.push('/add-words');
                    }
                } catch(res) {
                    this.modal.show(res);
                } finally {
                    this.preloader.show = false;
                }
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.testService = new TestService();
            
            try {
                this.preloader.show = true;
                await this.testService.fetchQuestion();
                if(!this.testService.question) {
                    this.$router.push('/add-words');
                }
            } catch(res) {
                this.modal.show(res);
            } finally {
                this.preloader.show = false;
                this.isReady = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .test {
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 110px;
        padding: 20px;
        padding-bottom: 200px;

        .word-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 50px;

            .word {
                font-family: RobotoLight;
                font-size: clamp(16px, 7vw, 90px);
                letter-spacing: 2px;
                color: #ebebed;
            }
        }

        .dialog-controls {
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;

            .item {
                width: 500px;

                &.soft {
                    color: #a94c4c;
                }
            }
        }
    }

    @media(max-width: 500px) {
        .test {
            .dialog-controls {
                min-width: unset;
                width: 100%;
            }
        }
    }

</style>