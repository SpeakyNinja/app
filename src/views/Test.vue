<template>
    <div class="test main-bg" v-if="isReady">

        <ProgressBar :settings="progress" class="mt-5" />

        <TestTimer 
            ref="timer" 
            @isFinish="submit" 
            :word="testService?.question?.word"
            @wordClick="playAudio"
        />

        <ButtonsSticked :key="testService?.question?.meaning_id">
            <template v-slot:items>
                <div 
                    class="item m-light m-upper-first no-select" 
                    @click="submit(answer)" 
                    v-for="answer in testService?.question?.answers"
                >
                    {{ answer }}
                </div>
                <div class="item soft top-border full-width m-light no-select" @click="submit()">
                    не знаю
                </div>
            </template>
        </ButtonsSticked>

        <div></div>
    </div>
</template>

<script>
    import { inject } from 'vue';
    import TestTimer from '@/components/TestTimer.vue'
    import ButtonsSticked from '@/components/ButtonsSticked.vue'
    import ProgressBar from '@/components/ProgressBar.vue'
    import TestService from '@/services/TestService.js'
    import ToolsService from '@/services/ToolsService.js';

    export default {
        components: {
            TestTimer,
            ButtonsSticked,
            ProgressBar
        },

        data() {
            return {
                progress: {},
                question: {},
                answers: [],
                isReady: false
            }
        },

        methods: {
            async submit(text = '') {
                try {
                    this.preloader.show = true;
                    const r = await this.testService.sendAnswer(text);
                    this.countAnswers++;
                    this.updateProgress();
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

            updateProgress() {
                const width = document.body.clientWidth > 430 ? 320 : 280;
                const p = Math.round( this.countAnswers * 100 / (this.maxWords - 1) );
                this.progress = {width: `${width}px`, widthFilled: `${p}%`};
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
                const r = await this.testService.fetchQuestion();
                this.maxWords = r.max_words;
                this.countAnswers = 0;
                this.updateProgress();
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
        justify-content: space-between;
        gap: 20px;
        padding: 20px;
        padding-bottom: 248px;
    }

</style>