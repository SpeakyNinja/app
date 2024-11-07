<template>
    <div class="words-wrapper" ref="cardWrapper">
        <div 
            class="card no-select" 
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
</template>

<script>
    import AddWordService from '@/services/AddWordService.js';
    import ToolsService from '@/services/ToolsService.js';

    export default {
        components: {
        },

        props: {
            addWordService: {
                type: AddWordService,
                required: true
            }
        },

        data() {
            return {
                isActive: false,
                isIknow: false,
                isToLearn: false,
                isScaling: false,
                isCardHidden: false,
                stardDragTime: null
            }
        },

        methods: {
            startDrag(e) {
                this.stardDragTime = Date.now();
                this.isActive = true;
                this.start = this.getCursorCoords(e);
                this.moveAt(this.start.x, this.start.y);
                document.addEventListener('mousemove', this.mouseMove);
                document.addEventListener('touchmove', this.mouseMove);
            },

            stopDrag(e) {
                this.playVoice();
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
                if(!this.lastCoords) {
                    return false;
                }

                let timeout = 400;
                let status = 'pending';
                if(this.isIknow) {
                    this.isScaling = true;
                    status = 'ready';
                } else if(this.isToLearn) {
                    this.isScaling = true;
                    status = 'active';
                } else {
                    timeout = 0;
                }

                this.isActive = false;
                this.$refs.card.style.top = this.lastCoords.y - this.start.y + 'px';
                this.$refs.card.style.left = this.lastCoords.x - this.start.x + 'px';

                setTimeout(() => {
                    this.isCardHidden = true;

                    this.$refs.card.style.left = 0;

                    if(status == 'pending') {
                        this.restoreCard();
                    } else {
                        this.$emit('addWord', status);
                        this.toolsService.nextItemIndex = 0;
                    }

                    this.lastCoords = undefined;
                }, timeout);
            },

            restoreCard() {
                this.resetCardStatus();
                this.$refs.card.style.top = 0;
                this.isScaling = false;
                this.isCardHidden = false;
            },

            playVoice() {
                if(Date.now() - this.stardDragTime < 150) {
                    const voices = this.addWordService.data?.voices;
                    const voice = this.toolsService.getNextItem(voices);
                    this.toolsService.playAudio(voice?.base64);
                }
            }
        },

        beforeMount() {
            this.toolsService = new ToolsService();
            this.toolsService.nextItemIndex = 0;
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

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

    @media(max-width: 550px) {

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

    .fade-out-top {
        -webkit-animation: fade-out-top 0.35s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                animation: fade-out-top 0.35s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

    .fade-out-bottom {
        -webkit-animation: fade-out-bottom 0.35s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                animation: fade-out-bottom 0.35s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
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