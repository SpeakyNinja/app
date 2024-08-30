<template>
    <div class="ai-dialog main-bg">
        <div class="ai-wrapper">
            <Ai width="500" height="75" fill="#ebebed" />
        </div>

        <div class="text-wrapper">
            <div class="text m-bold">
                Привет!
            </div>

            <div class="text">
                Со мной, английские слова будут запоминаться также быстро и легко, как слова родного языка.
            </div>
        </div>

        <div class="dialog-controls">
            <div class="item" @click="submit">
                Хорошо
            </div>
        </div> 
    </div>
</template>

<script>
    import Ai from '@/components/icons/Ai.vue'

    export default {
        name: "AiDialog",

        components: {
            Ai
        },

        data() {
            return {
                
            }
        },

        methods: {
            submit() {
                this.$router.push('/test');    
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .ai-dialog {
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 135px;
        padding: 20px;

        .ai-wrapper {
            margin: 20px auto;
        }

        .text-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            width: 700px;

            .text {
                color: #ebebed;
                text-align: left;
                width: 100%;
            }
        }

        .dialog-controls {
            min-width: 500px;
        }
    }

    @media(max-width: 750px) {
        .ai-dialog {
            .text-wrapper {
                width: 80vw;
            }

        }
    }

    @media(max-width: 550px) {
        .ai-dialog {
            .dialog-controls {
                min-width: unset;
            }
        }
    }
</style>