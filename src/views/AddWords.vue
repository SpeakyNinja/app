<template>
    <div class="add-words main-bg">
        
        <div class="top">

            <ProgressBar :settings="progress" />

            <div class="back-button">
                <IcoArrow height="18" fill="#ebebed" />
            </div>
        </div>

        <div>
            <div class="scores-wrapper mb-2">
                <IcoNeuron height="30" fill="#ebebed" />
                <div class="scores">70 000</div>
            </div>

            <Brain ref="brain" />
        </div>

        <div class="words-wrapper" ref="cardWrapper">
            <div 
                class="card" 
                :class="{
                    active: isActive,
                    'i-know': isIknow, 
                    'is-to-learn': isToLearn, 
                    'scale-down-center' : isScaling
                }" 
                @mousedown="startDrag"
                @mouseup="stopDrag"
                ref="card"
            >
                <div class="learn-lable">Учить</div>
                <div class="i-know-lable">Знаю</div>
                <div class="word">{{ word.word }}</div>
                <div class="translate">{{ word.translate }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Brain from '@/components/Brain.vue';
    import ProgressBar from '@/components/ProgressBar.vue';
    import IcoArrow from '@/components/icons/IcoArrow.vue';
    import IcoNeuron from '@/components/icons/IcoNeuron.vue';
    import TestService from '@/services/TestService.js';

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
                progress: {width: '300px', widthFilled: '20%'},
                isActive: false,
                isIknow: false,
                isToLearn: false,
                isScaling: false
            }
        },

        methods: {
            nextStep() {
                this.$router.push('/training');
            },

            startDrag(e) {
                this.isActive = true;
                this.start = {x: e.pageX, y: e.pageY};
                this.moveAt(e.pageX, e.pageY);
                document.addEventListener('mousemove', this.mouseMove);
            },

            stopDrag() {
                this.animateChoose();
                document.removeEventListener('mousemove', this.mouseMove);
            },

            mouseMove(e) {
                this.moveAt(e.pageX, e.pageY);
                this.updateCardStatus(e.pageY);
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
                let top = 0;
                let status = 'pending';
                if(this.isIknow) {
                    this.isScaling = true;
                    top = '200px';
                    status = 'ready';
                } else if(this.isToLearn) {
                    this.isScaling = true;
                    top = '-300px';
                    status = 'active';
                }

                this.isActive = false;
                this.$refs.card.style.left = 0;
                this.$refs.card.style.top = top;

                setTimeout(() => {
                    this.resetCardStatus();
                    this.$refs.card.style.top = 0;
                    this.isScaling = false;

                    if(status != 'pending') {
                        this.addWord(status);
                    }
                }, 400);
            },

            addWord(status) {
                const success = this.$refs.brain.addWord(status);
                const word = this.testService.getQuestion();

                if(success && word) {
                    this.word = word;
                } else {
                    this.nextStep();
                }
            }
        },

        beforeMount() {
            this.testService = new TestService();
            this.word = this.testService.getQuestion();
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
                    font-size: 50px;
                }

                .translate {
                    font-family: RobotoLight;
                    font-size: 26px;
                    color: #525465;
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

        .scale-down-center {
            -webkit-animation: scale-down-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                    animation: scale-down-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }
    }

    @media(max-width: 550px) {
        .add-words {
            
        }
    }

    @-webkit-keyframes scale-down-center {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        100% {
            -webkit-transform: scale(0.2);
            transform: scale(0.2);
        }
    }

    @keyframes scale-down-center {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        100% {
            -webkit-transform: scale(0.2);
            transform: scale(0.2);
        }
    }

</style>