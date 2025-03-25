<template>
    <div class="main-bg">
        <div class="test no-select" v-if="isReady">

            <ProgressBar :settings="progress" class="mt-5" />

            <TestTimer 
                ref="timer" 
                @isFinish="submit" 
                :word="testService?.question?.word"
                @wordClick="playAudio"
            />

            <ButtonsSticked :key="testService?.question?.meaning_id" ref="buttons" :options="buttonsOptions">
                <template v-slot:items>
                    <div 
                        class="item m-light no-select" 
                        @click="submit(answer)" 
                        v-for="answer in testService?.question?.answers"
                    >
                        <div class="highlight" v-if="buttonsOptions.highlightedItem == answer"></div>
                        {{ answer }}
                    </div>
                    <div class="item soft top-border full-width m-light no-select" @click="submit()">
                        <div class="highlight" v-if="buttonsOptions.highlightedItem == -1"></div>
                        не знаю
                    </div>
                </template>
            </ButtonsSticked>

            <div></div>

        </div>
    
        <NoticeLayer :items="noticeItemsBefore" @closedHandler="noticeBeforeClosed" v-if="noticeItemsBefore.length"/>
        <NoticeLayer :items="noticeItemsAfter" @closedHandler="noticeAfterClosed" v-if="noticeItemsAfter.length"/>
    </div>

</template>

<script>
    import { inject } from 'vue';
    import TestTimer from '@/components/TestTimer.vue';
    import ButtonsSticked from '@/components/ButtonsSticked.vue';
    import ProgressBar from '@/components/ProgressBar.vue';
    import NoticeLayer from '@/components/NoticeLayer.vue';
    import TestService from '@/services/TestService.js';
    import ToolsService from '@/services/ToolsService.js';
    import NoticeService from '@/services/NoticeService.js';
    import YandexMetrika from '@/services/YandexMetrika.js';

    export default {
        components: {
            TestTimer,
            ButtonsSticked,
            ProgressBar,
            NoticeLayer
        },

        data() {
            return {
                progress: {},
                question: {},
                answers: [],
                isReady: false,
                buttonsOptions: { highlightedItem: null, maxHighlightInterval: 0.5 },
                noticeItemsBefore: [],
                noticeItemsAfter: []
            }
        },

        methods: {
            async submit(text = '') {
                this.$refs.buttons.highlightStart( (text || -1) );

                try {
                    this.preloader.show = true;
                    const r = await this.testService.sendAnswer(text, this.countSeconds());
                    this.countAnswers++;
                    this.updateProgress();
                    this.$refs.timer.stop();
                    this.$refs.buttons.highlightStop();
                    if(this.testService.question) {
                        this.$forceUpdate();
                        this.$refs.timer.restart();
                        this.playAudio();
                    } else {
                        this.noticeItemsAfter = this.noticeService.getItems('testAfter');
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
                this.startCounter();
            },

            startCounter() {
                this.seconds = new Date().getTime();
            },

            countSeconds() {
                return Math.round((new Date().getTime() - this.seconds) / 1000);
            },

            playAudio() {
                this.toolsService.playAudio(this.testService.voice);
            },

            noticeBeforeClosed() {
                this.updateProgress();
                this.playAudio();
                this.isReady = true;
            },

            noticeAfterClosed() {
                YandexMetrika.sendReachGoal('test');
                this.$router.push('/add-words');
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.testService = new TestService();
            this.toolsService = new ToolsService();

            this.noticeService = new NoticeService();
            this.noticeItemsBefore = this.noticeService.getItems('testBefore');
            
            try {
                this.preloader.show = true;
                const r = await this.testService.fetchQuestion();
                this.maxWords = r.max_words;
                this.countAnswers = 0;
                if(!this.testService.question) {
                    this.$router.push('/add-words');
                }
                this.$forceUpdate();
            } catch(res) {
                this.modal.show(res);
            } finally {
                this.preloader.show = false;
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