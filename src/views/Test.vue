<template>
    <div class="test main-bg" v-if="isReady">

        <TestTimer 
            ref="timer" 
            @isFinish="submit" 
            :word="testService?.question?.word"
            @wordClick="playAudio"
        />

        <div class="dialog-controls no-select">
            <div class="item" @click="submit(answer)" v-for="answer in testService?.question?.answers">
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
    import TestTimer from '@/components/TestTimer.vue'
    import TestService from '@/services/TestService.js'
    import ToolsService from '@/services/ToolsService.js';

    export default {
        components: {
            TestTimer
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
                    this.$refs.timer.stop();
                    if(this.testService.question) {
                        this.$forceUpdate();
                        this.$refs.timer.restart();
                        this.playAudio();
                    } else {
                        this.$router.push('/add-words');
                    }
                } catch(res) {
                    this.modal.show(res);
                } finally {
                    this.preloader.show = false;
                }
            },

            playAudio() {
                this.toolsService.playAudio(this.testService.voice);
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.testService = new TestService();
            this.toolsService = new ToolsService();
            
            try {
                this.preloader.show = true;
                await this.testService.fetchQuestion();
                if(this.testService.question) {
                    this.playAudio();
                } else {
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