<template>
    <div class="training main-bg" v-if="isReady">
        
        <div class="top-fixed">
            <div class="top">
                
                <Memorization :mem="trainings.getCurrent().memorization" />
                
                <ProgressBar :settings="progress" />
                
                <div class="dotted-button">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="muted">[part]</div>
        </div>

        <div class="hints-wrapper">
            <div class="hints">
                <div v-for="hint in trainings.getCurrent().hints" class="hint">
                    <p v-html="hint"></p>
                </div>
            </div>
        </div>

        <div class="dialog-controls">
            <div 
                class="item" 
                v-for="answer in trainings.getCurrent().answers" 
                @click="nextStep(answer)"
            >
                {{ answer }}
            </div>
        </div> 
    </div>
</template>

<script>
    import { inject } from 'vue';
    import ProgressBar from '@/components/ProgressBar.vue'
    import Memorization from '@/components/Memorization.vue'
    import Trainings from '@/collections/Trainings.js';

    export default {

        components: {
            ProgressBar,
            Memorization
        },

        data() {
            return {
                progress: {},
                isReady: false
            }
        },

        methods: {
            async nextStep(answer) {
                if(!this.trainings.isCorrectAnswer(answer)) {
                    this.trainings.deleteAnswer(answer);
                    this.$forceUpdate();
                    return false;
                }

                this.trainings.setAnswer();
                if(this.trainings.isFinish()) {
                    try {
                        this.preloader.show = true;
                        const r = await this.trainings.submitAnswers();
                        this.$router.push('/statistics');
                    } catch(res) {
                        this.errorHandler(res);
                    } finally {
                        this.preloader.show = false;
                    }
                } else {
                    this.updateProgress();
                    this.$forceUpdate();
                }
            },

            errorHandler(res) {
                if(res.code == 'is-not-full') {
                    this.$router.push('/add-words');
                } else {
                    this.modal.show(res);
                }
            },

            updateProgress() {
                const p = this.trainings.getProgressInPercents();
                this.progress = {width: '250px', widthFilled: `${p}%`};
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');

            this.trainings = new Trainings();

            try {
                this.preloader.show = true;
                await this.trainings.fetch();
                this.updateProgress();
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
            gap: 30px;

            padding: 30px 0;

            .top {
                display: flex;
                align-items: center;
                gap: 20px;
                z-index: 2;
            }

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
                background-color: rgba(48, 49, 63, .75);
                backdrop-filter: blur(6px);
            }
        }

        .hints-wrapper {
            flex-grow: 2;
            padding: 0 20px;
            padding-top: 160px;
            padding-bottom: 224px;
            background-color: #30313f;

            .hints {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                gap: 30px;

                .hint {

                    p {
                        color: #d5d5dd;
                        font-size: 20px;
                    }
                }
            }
        }

        .dialog-controls {
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;

            .item {
                z-index: 2;
                width: 450px;

                &.soft {
                    color: #a94c4c;
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
                background-color: rgba(48, 49, 63, .75);
                backdrop-filter: blur(6px);
            }
        }
    }

</style>