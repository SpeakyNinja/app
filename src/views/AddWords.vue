<template>
    <div class="add-words main-bg" v-if="isReady">
        
        <div class="top">

            <ProgressBar :settings="progress" ref="progressBar" />

            <!-- <div class="back-button">
                <IcoArrow height="18" fill="#ebebed" />
            </div> -->
        </div>

        <div>
            <!-- <div class="scores-wrapper mb-2">
                <IcoNeuron height="30" fill="#ebebed" />
                <div class="scores">70 000</div>
            </div> -->

            <Brain 
                ref="brain" 
                :hexRadius="brainHexRadius"
                :width="brainWidth"
                :height="brainHeight"
            />

        </div>

        <div class="word-wrapper">
            <div 
                class="word no-select m-upper-first m-pointer" 
                @click="toolsService.playAudio(addWordService.voice())"
            >
                {{ addWordService.data.word }}
            </div>

            <div class="translate no-select">{{ addWordService.data.translate }}</div>
        </div>

        <div></div>

        <ButtonsSticked :key="addWordService?.data?.meaning_id" ref="buttons" :options="buttonsOptions">
            <template v-slot:items>
                
                <div class="item m-light no-select" @click="addWord('knows')">
                    <div class="highlight" v-if="buttonsOptions.highlightedItem == 'knows'"></div>
                    знаю
                </div>

                
                <div class="item m-light no-select" @click="addWord('in_progress')">
                    <div class="highlight" v-if="buttonsOptions.highlightedItem == 'in_progress'"></div>
                    учить
                </div>
                
                <div class="item soft top-border full-width m-light no-select" @click="addWord('deferred')">
                    <div class="highlight" v-if="buttonsOptions.highlightedItem == 'deferred'"></div>
                    позже
                </div>

            </template>
        </ButtonsSticked>
    </div>
</template>

<script>
    import { inject } from 'vue';
    import Brain from '@/components/Brain.vue';
    import ProgressBar from '@/components/ProgressBar.vue';
    import IcoArrow from '@/components/icons/IcoArrow.vue';
    import IcoNeuron from '@/components/icons/IcoNeuron.vue';
    import ButtonsSticked from '@/components/ButtonsSticked.vue'
    import AddWordService from '@/services/AddWordService.js';
    import ToolsService from '@/services/ToolsService.js';
    import LocalStorage from '@/services/LocalStorageService.js';
    import { nextTick } from "vue";

    export default {
        
        components: {
            Brain,
            ProgressBar,
            IcoArrow,
            IcoNeuron,
            ButtonsSticked
        },

        data() {
            return {
                word: {},
                progress: {width: '300px', widthFilled: '0%'},
                isReady: false,
                brainWidth: window.screen.width > 550 ? 368 : 283,
                brainHeight: window.screen.width > 550 ? 316 : 245,
                brainHexRadius: window.screen.width > 550 ? 18 : 14,
                buttonsOptions: { highlightedItem: null, maxHighlightInterval: 0.5 }
            }
        },

        methods: {
            nextStep() {
                this.$router.push('/training');
            },

            async addWord(status) {
                this.$refs.buttons.highlightStart(status);

                if(status != 'deferred') {
                    this.$refs.brain.addWord(status);
                }

                try {
                    this.preloader.show = true;
                    const r = await this.addWordService.rateWord(status);
                    this.playAudio();
                    this.updateProgress();
                    this.$refs.buttons.highlightStop();
                    this.$forceUpdate();
                } catch(res) {
                    this.errorHandler(res);
                } finally {
                    this.preloader.show = false;
                }
            },

            errorHandler(res) {
                if(res.code == 'scm-not-found') {
                    this.$router.push('/test');
                } else if(res.code == 'dict-is-full') {
                    this.nextStep();
                } else if(res.code == 'meaning-not-found') {
                    this.$router.push('/statistics');
                } else {
                    this.modal.show(res);
                }
            },

            updateProgress() {
                const p = (this.countSteps - this.addWordService.data.leftWords) * 100 / (this.countSteps - 1);
                this.progress.widthFilled = `${p}%`;

                if(this.$refs.progressBar) {
                    this.$refs.progressBar.$forceUpdate();
                }
            },

            playAudio() {
                if(!LocalStorage.get('options', 'muteAddingVoice1')) {
                    this.toolsService.playAudio(this.addWordService.voice());
                }
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            
            this.toolsService = new ToolsService();
            this.addWordService = new AddWordService();
            try {
                this.preloader.show = true;
                await this.addWordService.fetchWord();
                this.playAudio();
                this.countSteps = this.addWordService.data.leftWords;
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

    .add-words {
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 60px 20px 186px 20px;
        // padding: 60px 20px 124px 20px;
        overflow: hidden;
        overscroll-behavior-y: contain;

        .top {
            position: relative;

            .back-button {
                position: absolute;
                top: -18px;
                left: -70px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 1px solid #525465;
                cursor: pointer;

                svg {
                    margin-right: 1px;
                }
            }
        }

        .scores-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;

            .scores {
                font-size: 22px;
                color: #ebebed;
            }
        }

        .word-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;

            .word {
                font-family: RobotoLight;
                font-size: clamp(16px, 7.5vw, 50px);
                color: white;
            }

            .translate {
                font-family: RobotoLight;
                font-size: clamp(18px, 4vw, 20px);
                color: #bbbbbb;
                text-align: center;
            }
        }
    }

</style>