<template>
    <div class="training main-bg">
        
        <div class="top-fixed">
            <div class="top">
                <div class="hexagon"></div>
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
                <div v-for="hint in hints" class="hint">
                    <p v-html="hint.text"></p>
                </div>
            </div>
        </div>

        <div class="dialog-controls">
            <div class="item" v-for="variant in variants" @click="nextStep">
                {{ variant }}
            </div>
        </div> 
    </div>
</template>

<script>
    import ProgressBar from '@/components/ProgressBar.vue'

    export default {

        components: {
            ProgressBar
        },

        data() {
            return {
                progress: {width: '250px', widthFilled: '30%'},
                hints: [
                    {
                        text: 'Главная <b>part</b> в пьессе.'
                    }, {
                        text: 'Он сыграл не последнюю <b>part</b> в этой истории.'
                    }, {
                        text: 'Твоя <b>part</b> в пьессе была очень важна.'
                    }, {
                        text: 'Каждый играет свою <b>part</b>.'
                    }, {
                        text: 'Он получил главную <b>part</b> в фильме.'
                    }, {
                        text: 'Она играла очень большую <b>part</b> в его жизни.'
                    }, {
                        text: 'Главная <b>part</b> в пьессе.'
                    }, {
                        text: 'Он сыграл не последнюю <b>part</b> в этой истории.'
                    }, {
                        text: 'Твоя <b>part</b> в пьессе была очень важна.'
                    }, {
                        text: 'Каждый играет свою <b>part</b>.'
                    }, {
                        text: 'Он получил главную <b>part</b> в фильме.'
                    }, {
                        text: 'Она играла очень большую <b>part</b> в его жизни.'
                    }
                ],
                variants: ['точно', 'роль, участие', 'приятно, хорошо'],
            }
        },

        methods: {
            nextStep() {
                this.$router.push('/statistics');
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

                .hexagon {
                    height: 36px;
                }
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