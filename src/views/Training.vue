<template>
    <div class="training main-bg" v-if="isReady" ref="training">
        
        <div class="top-fixed">
            <div class="top">
                
                <Memorization :mem="trainings.getCurrent()?.memorization || 0" />
                
                <ProgressBar :settings="progress" />
                
                <TrainingMenu @isLearned="isLearned" @showFeedbackForm="showFeedbackForm" />
                
            </div>

            <div class="muted m-light m-size20 m-pointer transcription no-select" @click="playAudio">
                {{ trainings.getCurrent()?.transcription || trainings.getCurrent()?.word }}
            </div>
        </div>

        <div class="hints-wrapper no-scrollbar">
            <div class="hints" v-if="!addHint">
                <div v-for="hint in trainings.getCurrent()?.hints" class="hint">
                    <p class="m-light" v-html="hint"></p>
                </div>
            </div>

            <div class="btn no-select mt-2" @click="addHint = true" v-if="!addHint">Добавить подсказку</div>

            <div class="add-hint-layer mt-1" v-else>
                <div class="row">
                    <div class="title mb-1 m-size20">Введите подсказку</div>
                    <textarea class="input" rows="6" v-model="userHint"></textarea>
                </div>

                <div class="row mt-1">
                    <div class="btn green no-select" @click="sendUserHint">Отправить</div>
                </div>

                <div class="row mt-1">
                    <div class="btn no-select" @click="closeHintLayer">Отменить</div>
                </div>
            </div>
        </div>

        <ButtonsSticked :key="trainings.getCurrent()?.answers.length">
            <template v-slot:items>
                <div 
                    v-if="showAnswers"
                    class="item no-select"
                    :class="{transparent : highlitedAnswer && highlitedAnswer != answer }"
                    v-for="answer in trainings.getCurrent()?.answers" 
                    @click="nextStep(answer)"
                >
                    <div class="highlight" v-if="highlitedAnswer == answer"></div>
                    {{ answer }}
                </div>

                <div v-else class="look-variants item no-select m-pointer" @click="showAnswers = true">
                    Посмотреть варианты
                </div>
            </template>
        </ButtonsSticked>

    </div>

    <FeedbackForm 
        ref="feedbackForm"
        :show="showFeedback" 
        @close="showFeedback = false" 
        @callback="showFeedbackSuccessMessage"
    />

    <NoticeLayer :items="noticeItemsBefore" @closedHandler="showInterface" v-if="noticeItemsBefore?.length" />

</template>

<script>
    import { inject } from 'vue';
    import moment from 'moment';
    import ProgressBar from '@/components/ProgressBar.vue'
    import Memorization from '@/components/Memorization.vue'
    import TrainingMenu from '@/components/TrainingMenu.vue'
    import ButtonsSticked from '@/components/ButtonsSticked.vue'
    import FeedbackForm from '@/components/FeedbackForm.vue'
    import NoticeLayer from '@/components/NoticeLayer.vue'
    import Trainings from '@/collections/Trainings.js';
    import ToolsService from '@/services/ToolsService.js';
    import LocalStorage from '@/services/LocalStorageService.js';
    import NoticeService from '@/services/NoticeService.js';

    export default {

        components: {
            ProgressBar,
            Memorization,
            TrainingMenu,
            ButtonsSticked,
            FeedbackForm,
            NoticeLayer
        },

        data() {
            return {
                progress: {},
                isReady: false,
                highlitedAnswer: '',
                startTime: null,
                elapsedTime: null,
                showAnswers: true,
                addHint: false,
                userHint: null,
                showFeedback: false,
                noticeItemsBefore: []
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
                this.playAudio('muteTrainingVoice2');
                this.preloader.show = true;
                setTimeout(async () => {
                    this.stopTimer();
                    this.trainings.setAnswer(this.elapsedTime);
                    if(this.trainings.isFinish()) {
                        try {
                            this.preloader.show = true;
                            this.state.setShowFullStat(true);
                            const r = await this.trainings.submitAnswers();
                            this.$router.push('/statistics');
                        } catch(res) {
                            this.errorHandler(res);
                        } finally {
                            this.highlitedAnswer = '';
                            this.preloader.show = false;
                        }
                    } else {
                        this.$refs.training.scrollTo(0, 0);
                        this.highlitedAnswer = '';
                        this.updateShowAnswers();
                        this.updateProgress();
                        this.$forceUpdate();

                        setTimeout(() => {
                            this.playAudio('muteTrainingVoice1');
                        }, 1000);
                        
                        this.startTimer();
                        this.preloader.show = false;
                    }
                }, 1000);
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

            async playAudio(type) {
                if(!LocalStorage.get('options', type)) {
                    const training = this.trainings.getCurrent();
                    const voice = await training.getNextVoice(this.student.getId());
                    this.toolsService.playAudio(voice);
                }
            },

            startTimer() {
                this.startTime = moment();
            },

            stopTimer() {
                if(this.startTime) {
                    this.elapsedTime = moment().diff(this.startTime, 'seconds');
                }
            },

            updateShowAnswers() {
                const training = this.trainings.getCurrent();
                this.showAnswers = training.memorization < 3;
            },

            closeHintLayer() {
                this.addHint = false;
                this.userHint = null;
            },

            async sendUserHint() {
                if(!this.userHint) {
                    this.modal.show({message: 'Необходимо ввести подсказку'});
                }

                const training = this.trainings.getCurrent();
                try {
                    this.preloader.show = true;
                    const r = await this.trainings.makeHint(training.meaning_id, this.userHint);
                    this.closeHintLayer();
                } catch(res) {
                    this.errorHandler(res);
                } finally {
                    this.highlitedAnswer = '';
                    this.preloader.show = false;
                }
            },

            showFeedbackForm() {
                const training = this.trainings.getCurrent();
                this.$refs.feedbackForm.meaningId = training.meaning_id;
                this.$refs.feedbackForm.message = '';
                this.showFeedback = true;
            },

            showFeedbackSuccessMessage() {
                this.modal.show({message: 'Ваше сообщение отправлено', title: 'Спасибо'});
            },

            showInterface() {
                setTimeout(() => {
                    this.playAudio('muteTrainingVoice1');
                }, 1000);

                this.updateShowAnswers();
                this.updateProgress();
                this.startTimer();
                this.isReady = true;
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');
            this.state = inject('state');

            this.toolsService = new ToolsService();
            this.trainings = new Trainings();
            this.noticeService = new NoticeService();

            try {
                this.preloader.show = true;
                const r = await this.trainings.fetch();

                await this.trainings.fetchMissingVoices(this.student.getId());

                if([1, 2, 4].indexOf(r.countTrainings) == -1) {
                    this.showInterface();
                } else {
                    this.noticeItemsBefore = this.noticeService.getItems(`trainingBefore${r.countTrainings}`);
                }
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
        height: 100vh;

        .top-fixed {
            position: absolute;
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
                background-color: rgba(10, 10, 12, .24);
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
            width: 100%;

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

            .add-hint {
                color: #ebebed;
            }

            .add-hint-layer {
                .row {
                    .title {
                        color: #acadb2;
                    }

                    textarea {
                        height: unset;
                        resize: none;
                        padding: 10px;
                    }
                }
            }
        }

        .look-variants {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 185px;
        }
    }

</style>