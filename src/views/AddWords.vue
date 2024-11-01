<template>
    <div class="add-words main-bg" v-if="isReady">
        
        <div class="top">

            <ProgressBar :settings="progress" ref="progressBar" />

            <!-- <div class="back-button">
                <IcoArrow height="18" fill="#ebebed" />
            </div> -->
        </div>

        <div class="mt-5">
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

        <div class="words-wrapper" ref="cardWrapper">
            <div 
                class="card" 
                :class="{
                    active: isActive,
                    'i-know': isIknow, 
                    'is-to-learn': isToLearn, 
                    'fade-out-top': (isScaling && isToLearn),
                    'fade-out-bottom': (isScaling && isIknow),
                    'm-hidden': isCardHidden
                }" 
                @mousedown="startDrag"
                @mouseup="stopDrag"
                @touchstart="startDrag"
                @touchend="stopDrag"
                ref="card"
            >
                <div class="learn-lable">Учить</div>
                <div class="i-know-lable">Знаю</div>
                <div class="word">{{ addWordService.data.word }}</div>
                <div class="translate">{{ addWordService.data.translate }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { inject } from 'vue';
    import Brain from '@/components/Brain.vue';
    import ProgressBar from '@/components/ProgressBar.vue';
    import IcoArrow from '@/components/icons/IcoArrow.vue';
    import IcoNeuron from '@/components/icons/IcoNeuron.vue';
    import AddWordService from '@/services/AddWordService.js';
    import { nextTick } from "vue";

    export default {
        
        components: {
            Brain,
            ProgressBar,
            IcoArrow,
            IcoNeuron
        },

        data() {
            return {
                word: {},
                progress: {width: '300px', widthFilled: '0%'},
                isActive: false,
                isIknow: false,
                isToLearn: false,
                isScaling: false,
                isReady: false,
                isCardHidden: false,
                brainWidth: window.screen.width > 550 ? 368 : 283,
                brainHeight: window.screen.width > 550 ? 316 : 245,
                brainHexRadius: window.screen.width > 550 ? 18 : 14
            }
        },

        methods: {
            nextStep() {
                this.$router.push('/training');
            },

            startDrag(e) {
                this.isActive = true;
                this.start = this.getCursorCoords(e);
                this.moveAt(this.start.x, this.start.y);
                document.addEventListener('mousemove', this.mouseMove);
                document.addEventListener('touchmove', this.mouseMove);
            },

            stopDrag(e) {
                this.animateChoose();
                document.removeEventListener('mousemove', this.mouseMove);
                document.removeEventListener('touchmove', this.mouseMove);
            },

            mouseMove(e) {
                const { x, y } = this.getCursorCoords(e);
                this.lastCoords = {x: x, y: y};
                this.moveAt(x, y);
                this.updateCardStatus(y);
            },

            getCursorCoords(e) {
                const x = e.pageX !== undefined ? e.pageX : e.touches[0].clientX;
                const y = e.pageY !== undefined ? e.pageY : e.touches[0].clientY;
                return {x: x, y: y};
            },

            moveAt(pageX, pageY) {
                const left = pageX - this.start.x + this.$refs.cardWrapper.offsetLeft;
                const top = pageY - this.start.y + this.$refs.cardWrapper.offsetTop;
                this.$refs.card.style.left = left + 'px';
                this.$refs.card.style.top = top + 'px';
            },

            updateCardStatus(pageY) {
                const offset = pageY - this.start.y;
                if(offset > 20) {
                    this.isIknow = true;
                    this.isToLearn = false;
                } else if(offset < -20) {
                    this.isIknow = false;
                    this.isToLearn = true;
                } else {
                    this.resetCardStatus();
                }
            },

            resetCardStatus() {
                this.isIknow = false;
                this.isToLearn = false;
            },

            animateChoose() {
                let top = this.lastCoords.y - this.start.y + 'px';
                let status = 'pending';
                if(this.isIknow) {
                    this.isScaling = true;
                    status = 'ready';
                } else if(this.isToLearn) {
                    this.isScaling = true;
                    status = 'active';
                }

                this.isActive = false;
                this.$refs.card.style.top = top;

                setTimeout(() => {
                    this.isCardHidden = true;
                    
                    this.$refs.card.style.left = 0;

                    if(status == 'pending') {
                        this.restoreCard();
                    } else {
                        this.addWord(status);
                    }
                }, 400);
            },

            restoreCard() {
                this.resetCardStatus();
                this.$refs.card.style.top = 0;
                this.isScaling = false;
                this.isCardHidden = false;
            },

            async addWord(status) {
                const success = this.$refs.brain.addWord(status);

                try {
                    this.preloader.show = true;
                    const r = await this.addWordService.rateWord(status == 'active');
                    this.updateProgress();
                    this.$forceUpdate();
                    this.restoreCard();
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
                    this.$router.push('/statistics');
                } else if(res.code == 'meaning-not-found') {
                    this.$router.push('/statistics');
                } else {
                    this.modal.show(res);
                }
            },

            updateProgress() {
                const p = this.addWordService.data.scmCount * 100 / 10;
                this.progress.widthFilled = `${p}%`;

                if(this.$refs.progressBar) {
                    this.$refs.progressBar.$forceUpdate();
                }
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.addWordService = new AddWordService();
            try {
                this.preloader.show = true;
                await this.addWordService.fetchWord();
                this.updateProgress();
                this.isReady = true;
                
                await this.$nextTick();
                for(let i = 0; i < this.addWordService.data.scmCount; i++)  {
                    this.$refs.brain.addWord('active');
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

    .add-words {
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 90px;
        padding: 20px;
        padding-top: 60px;
        overflow: hidden;

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

        .words-wrapper {
            position: relative;
            width: 400px;
            height: 200px;
            position: relative;

            &:before, &:after {
                content: '';
                width: 400px;
                height: 200px;
                border-radius: 20px;
                background-color: white;
                transform: rotate(4deg);
                z-index: 1;
                position: absolute;
                top: 0;
                left: 0;
                box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.2);
            }

            &:after {
                transform: rotate(-2deg);
            }

            .card {
                width: 400px;
                height: 200px;
                border-radius: 20px;
                background-color: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;
                box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.2);
                z-index: 2;
                cursor: pointer;
                user-select: none;
                position: absolute;
                top: 0;
                left: 0;

                .word {
                    font-family: RobotoLight;
                    font-size: clamp(16px, 7.5vw, 50px);
                }

                .translate {
                    font-family: RobotoLight;
                    font-size: clamp(18px, 4vw, 20px);
                    color: #525465;
                    text-align: center;
                }

                &.active {
                    z-index: 1000;
                    position: fixed;
                }

                &.i-know {
                    background-color: #c8e8f7;

                    .i-know-lable {
                        display: block;
                    }
                }

                &.is-to-learn {
                    background-color: #ccf7c8;

                    .learn-lable {
                        display: block;
                    }
                }

                .i-know-lable, .learn-lable {
                    display: none;
                    position: absolute;
                    top: 20px;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    font-family: RobotoLight;
                    font-size: 16px;
                }
            }
        }

        .slide-out-blurred-top {
            -webkit-animation: slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
                    animation: slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
        }

        .slide-out-blurred-bottom {
            -webkit-animation: slide-out-blurred-bottom 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
                    animation: slide-out-blurred-bottom 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
        }

        .fade-out-top {
            -webkit-animation: fade-out-top 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                    animation: fade-out-top 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }

        .fade-out-bottom {
            -webkit-animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                    animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }
    }

    @media(max-width: 550px) {
        .add-words {
            gap: 40px;

            .words-wrapper {
                width: 80vw;
                height: 40vw;
                position: fixed;
                bottom: 50px;
                left: 50%;
                margin-left: -40vw;

                &:before, &:after {
                    width: 80vw;
                    height: 40vw;
                }

                .card {
                    width: 80vw;
                    height: 40vw;
                }
            }
        }
    }

    @-webkit-keyframes slide-out-blurred-top {
        0% {
            -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
            -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateY(-1000px) scaleY(2) scaleX(0.2);
            transform: translateY(-1000px) scaleY(2) scaleX(0.2);
            -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
            -webkit-filter: blur(40px);
            filter: blur(40px);
            opacity: 0;
        }
    }
    @keyframes slide-out-blurred-top {
        0% {
            -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
            -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateY(-1000px) scaleY(2) scaleX(0.2);
            transform: translateY(-1000px) scaleY(2) scaleX(0.2);
            -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
            -webkit-filter: blur(40px);
            filter: blur(40px);
            opacity: 0;
        }
    }

    @-webkit-keyframes slide-out-blurred-bottom {
        0% {
            -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateY(1000px) scaleY(2) scaleX(0.2);
            transform: translateY(1000px) scaleY(2) scaleX(0.2);
            -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
            -webkit-filter: blur(40px);
            filter: blur(40px);
            opacity: 0;
        }
    }
    @keyframes slide-out-blurred-bottom {
        0% {
            -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }

        100% {
            -webkit-transform: translateY(1000px) scaleY(2) scaleX(0.2);
            transform: translateY(1000px) scaleY(2) scaleX(0.2);
            -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
            -webkit-filter: blur(40px);
            filter: blur(40px);
            opacity: 0;
        }
    }





    @-webkit-keyframes fade-out-top {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
            opacity: 0;
        }
    }
    @keyframes fade-out-top {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
            opacity: 0;
        }
    }




    @-webkit-keyframes fade-out-bottom {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateY(50px);
            transform: translateY(50px);
            opacity: 0;
        }
    }
    @keyframes fade-out-bottom {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateY(50px);
            transform: translateY(50px);
            opacity: 0;
        }
    }


</style>