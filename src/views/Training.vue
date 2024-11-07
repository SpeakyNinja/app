<template>
    <div class="training main-bg" v-if="isReady">
        
        <div class="top-fixed">
            <div class="top">
                
                <Memorization :mem="trainings.getCurrent()?.memorization || 0" />
                
                <ProgressBar :settings="progress" />
                
                <TrainingMenu @isLearned="isLearned" />
                
            </div>

            <div class="muted m-light m-size20 m-pointer transcription" @click="playAudio">
                {{ trainings.getCurrent()?.word }}
            </div>
        </div>

        <div class="hints-wrapper">
            <div class="hints">
                <div v-for="hint in trainings.getCurrent()?.hints" class="hint">
                    <p class="m-light" v-html="hint"></p>
                </div>
            </div>
        </div>

        <div class="dialog-controls">
            <div 
                class="item no-select"
                v-for="answer in trainings.getCurrent()?.answers" 
                @click="nextStep(answer)"
            >
                <div class="highlight" v-if="highlitedAnswer == answer"></div>
                {{ answer }}
            </div>
        </div> 
    </div>
</template>

<script>
    import { inject } from 'vue';
    import ProgressBar from '@/components/ProgressBar.vue'
    import Memorization from '@/components/Memorization.vue'
    import TrainingMenu from '@/components/TrainingMenu.vue'
    import Trainings from '@/collections/Trainings.js';
    import ToolsService from '@/services/ToolsService.js';
    import moment from 'moment';

    export default {

        components: {
            ProgressBar,
            Memorization,
            TrainingMenu
        },

        data() {
            return {
                progress: {},
                isReady: false,
                highlitedAnswer: '',
                startTime: null,
                elapsedTime: null
            }
        },

        methods: {
            nextStep(answer) {
                if(!this.trainings.isCorrectAnswer(answer)) {
                    this.trainings.countError();
                    this.trainings.deleteAnswer(answer);
                    this.$forceUpdate();
                    return false;
                }

                this.highlitedAnswer = answer;
                this.playAudio();
                this.preloader.show = true;
                setTimeout(async () => {
                    this.stopTimer();
                    this.trainings.setAnswer(this.elapsedTime);
                    if(this.trainings.isFinish()) {
                        try {
                            this.preloader.show = true;
                            const r = await this.trainings.submitAnswers();
                            this.$router.push('/statistics');
                        } catch(res) {
                            this.errorHandler(res);
                        } finally {
                            this.preloader.show = false;
                            this.highlitedAnswer = '';
                            this.preloader.show = false;
                        }
                    } else {
                        this.updateProgress();
                        this.$forceUpdate();
                        this.playAudio();
                        this.startTimer();
                        this.preloader.show = false;
                    }
                }, 1500);
            },

            errorHandler(res) {
                if(res.code == 'is-not-full') {
                    this.$router.push('/add-words');
                } else if(res.code == 'is-last-level') {
                    this.$router.push('/statistics');
                } else {
                    this.modal.show(res);
                }
            },

            updateProgress() {
                const width = document.body.clientWidth > 430 ? 250 : 200;
                const p = this.trainings.getProgressInPercents();
                this.progress = {width: `${width}px`, widthFilled: `${p}%`};
            },

            isLearned() {
                const training = this.trainings.getCurrent();
                training.isLearned = true;
                this.nextStep(training.text);
            },

            async playAudio() {
                const training = this.trainings.getCurrent();
                const voice = await training.getNextVoice(this.student.getId());
                this.toolsService.playAudio(voice);
            },

            startTimer() {
                this.startTime = moment();
            },

            stopTimer() {
                if(this.startTime) {
                    this.elapsedTime = moment().diff(this.startTime, 'seconds');
                }
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');

            this.toolsService = new ToolsService();
            this.trainings = new Trainings();

            try {
                this.preloader.show = true;
                await this.trainings.fetch();
                this.playAudio();
                this.updateProgress();
                this.startTimer();
                this.isReady = true;
            } catch(res) {
                this.errorHandler(res);
            } finally {
                this.preloader.show = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .training {
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 30px;

        .top-fixed {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 15px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            padding: 30px 0;

            .top {
                display: flex;
                align-items: center;
                gap: 20px;
                z-index: 3;
            }

            .muted {
                color: #9091a1;
                z-index: 2;
            }

            &:before {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                content: "";
                background-color: rgba(37, 38, 53, .5);
                backdrop-filter: blur(8px);
            }

            .transcription {
                letter-spacing: 1px;
            }
        }

        .hints-wrapper {
            flex-grow: 2;
            padding: 0 40px;
            padding-top: 165px;
            padding-bottom: 224px;
            background-color: #30313f;

            .hints {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                gap: 40px;

                .hint {

                    p {
                        color: #acadb2;
                        font-size: 20px;
                        line-height: 1.4;
                        letter-spacing: 1px;
                    }
                }
            }
        }

        .dialog-controls {
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            border-top: 1px solid rgba(255,255,255,0.2);

            .item {
                z-index: 2;
                width: 450px;
                letter-spacing: 1px;
                position: relative;
                overflow: hidden;

                &.soft {
                    color: #a94c4c;
                }

                .highlight {
                    content: '';
                    position: absolute;
                    left: 15%;
                    top: 40%;
                    z-index: -1;
                    width: 70%;
                    height: 20%;
                    background-color: rgba(20, 255, 0, .75);
                    filter: blur(18px);
                    border-radius: 50px;
                }
            }

            &:before {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                content: "";
                background-color: rgba(37, 38, 53, .5);
                backdrop-filter: blur(8px);
            }
        }
    }

</style>