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

            <Brain />
        </div>

        <div class="words-wrapper">
            <div class=card>
                <div class="word">here</div>
                <div class="translate">здесь</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Brain from '@/components/Brain.vue'
    import ProgressBar from '@/components/ProgressBar.vue'
    import IcoArrow from '@/components/icons/IcoArrow.vue'
    import IcoNeuron from '@/components/icons/IcoNeuron.vue'

    export default {
        name: "AddWords",

        components: {
            Brain,
            ProgressBar,
            IcoArrow,
            IcoNeuron
        },

        data() {
            return {
                progress: {width: '300px', widthFilled: '20%'}
            }
        },

        methods: {
            
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
                position: relative;
                cursor: pointer;
                user-select: none;

                .word {
                    font-family: RobotoLight;
                    font-size: 50px;
                }

                .translate {
                    font-family: RobotoLight;
                    font-size: 26px;
                    color: #525465;
                }
            }
        }
    }

    @media(max-width: 550px) {
        .add-words {
            
        }
    }

</style>