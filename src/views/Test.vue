<template>
    <div class="test main-bg" v-if="isReady">

        <div class="word-wrapper">
            <div class="word">{{question.word}}</div>

            <Timer ref="timer" />
        </div>

        <div class="dialog-controls">
            <div class="item" @click="submit(answer)" v-for="answer in answers">
                {{ answer }}
            </div>
            <div class="item soft" @click="submit()">
                не знаю
            </div>
        </div> 
    </div>
</template>

<script>
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
            async submit(choice = null) {
                this.testService.addChoices({word: this.question.word, choice: choice});

                if(this.testService.choices.length >= 10) {
                    console.log(this.testService.choices);
                    this.$refs.timer.stop();
                    this.$router.push('/add-words');
                } else {
                    this.updateQuestion();
                    this.$refs.timer.reset();
                }
            },

            updateQuestion() {
                this.question = this.testService.getQuestion();
                this.answers = this.testService.getAnswers(this.question);
            }
        },

        beforeMount() {
            this.testService = new TestService();
            this.updateQuestion();
            this.isReady = true;
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
                font-size: 90px;
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