<template>
    <div class="test main-bg">
        <div class="ai-wrapper">
            <Ai width="500" height="75" fill="#ebebed" />
        </div>

        <div class="word-wrapper">
            <div class="word">stone</div>

            <Timer ref="timer" />
        </div>

        <div class="dialog-controls">
            <div class="item" @click="submit(variant)" v-for="variant in variants">
                {{ variant }}
            </div>
            <div class="item soft" @click="submit()">
                не знаю
            </div>
        </div> 
    </div>
</template>

<script>
    import Ai from '@/components/icons/Ai.vue'
    import Timer from '@/components/Timer.vue'

    export default {
        name: "Test",

        components: {
            Ai,
            Timer
        },

        data() {
            return {
                variants: ['журавль', 'камень', 'часть'],
            }
        },

        methods: {
            submit(variant) {
                this.$refs.timer.stop();
                // todo:
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
        justify-content: center;
        gap: 110px;
        padding: 20px;

        .ai-wrapper {
            margin: 20px auto;
        }

        .word-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 50px;

            .word {
                font-family: RobotoLight;
                font-size: 90px;
                letter-spacing: 2px;
                color: #ebebed;
            }
        }

        .dialog-controls {
            min-width: 500px;

            .item {
                &.soft {
                    color: #a94c4c;
                }
            }
        }
    }

    @media(max-width: 550px) {
        .test {
            .dialog-controls {
                min-width: unset;
            }
        }
    }

</style>