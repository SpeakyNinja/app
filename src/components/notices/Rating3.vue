<template>

    <div class="rating3">

        <Ai
            fill="white"
            class="ai-image"
        />

        <div class="title m-light">
            Если что
        </div>

        <div>
            <div class="text m-light">Может отправить моим разработчикам сообщение через раздел настроек.</div>
            <div class="text m-light muted mt-2">
                Можете сообщать об ошибках, пожеланиях, рекомендациях или критике.
            </div>
        </div>

    </div>

</template>

<script>

    import { inject } from 'vue';
    import Ai from '@/components/icons/Ai.vue'

    export default {
        components: {
            Ai
        },

        data() {
            return {
            }
        },

        methods: {
            
        }
    }
</script>

<style lang="scss">

    .rating3 {
        width: 100%;
        min-width: 100%;
        height: 100%;
        padding: 100px 0 150px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        .component {
            height: 45%;
            min-height: 45%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .title {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            font-size: 32px;
            text-align: center;

            &:first-child {
                flex-grow: unset;
                height: 45%;
                min-height: 45%;
                justify-content: flex-end;
                padding-bottom: 50px;
            }
        }

        .text {
            text-align: center;
            color: white;

            &.muted {
                color: #949494;
            }
        }

        .ai-image {
            width: 300px;
            height: 50px;
            filter: drop-shadow(#0bcccf 0px 0px 5px);
        }

        .smyles {
            display: flex;
            gap: 15px;
            justify-content: center;

            .smyle {
                width: 40px;
                height: 40px;
                fill: #bebec1;

                &.active {
                    &:nth-child(1) {
                        fill: #ff4242;
                    }

                    &:nth-child(2) {
                        fill: #ff8446;
                    }

                    &:nth-child(3) {
                        fill: #fbff49;
                    }

                    &:nth-child(4) {
                        fill: #abff4e;
                    }

                    &:nth-child(5) {
                        fill: #94f2ff;
                    }
                }
            }
        }
    }

</style>