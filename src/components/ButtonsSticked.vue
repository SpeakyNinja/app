<template>
    <div class="buttons-sticked">
        <slot name="items"></slot>
    </div>
</template>

<script>
    export default {
        components: {
        },

        props: {
            options: {
                type: Object,
                required: false,
                default: {}
            }
        },

        data() {
            return {
                startHighlightTime: null
            }
        },

        methods: {
            highlightStart(answer = -1) {
                this.options.highlightedItem = answer;
                this.startHighlightTime = (new Date()).getTime();
            },

            highlightStop() {
                const elapsedTime = (new Date()).getTime() - this.startHighlightTime;
                let timeout = this.options.maxHighlightInterval * 1000 - elapsedTime;

                if(timeout < 0) {
                    timeout = 0;
                }

                setTimeout(() => {
                    this.options.highlightedItem = null;
                    this.startHighlightTime = null;
                }, timeout);
            }
        }
    }
</script>

<style lang="scss">

    .buttons-sticked {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-top: 1px solid rgba(255,255,255,0.2);
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;

        .item {
            z-index: 2;
            color: #ebebed;
            width: 100%;
            display: flex;
            justify-content: center;
            text-align: center;
            padding: 20px 50px;
            cursor: pointer;
            border-top: 1px solid #ebebed;
            border-image: linear-gradient(to right, transparent 15%, #69696d, transparent 85%);
            border-image-slice: 1;
            flex-grow: 2;
            letter-spacing: 1px;
            position: relative;
            overflow: hidden;

            &:first-child {
                border-top: none;
            }

            &.soft {
                background-color: #30313f;
                color: white;
            }

            &.top-border {
                border-top: 1px solid rgba(255,255,255,0.2);
                border-image: none;
            }

            &.full-width {
                width: 100%;
                max-width: unset;
            }

            .highlight {
                content: '';
                position: absolute;
                left: 15%;
                top: 40%;
                z-index: -1;
                width: 70%;
                height: 20%;
                background-color: rgba(121, 179, 231, 1);
                filter: blur(13px);
                transform: translate3d(0, 0, 0);
                border-radius: 50px;

                -webkit-box-shadow: 0px 0px 22px 0px rgba(49, 138, 206, 1);
                -moz-box-shadow: 0px 0px 22px 0px rgba(49, 138, 206, 1);
                box-shadow: 0px 0px 22px 0px rgba(49, 138, 206, 1);
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
            background-color: rgba(10, 10, 12, .24);
            backdrop-filter: blur(8px);
        }
    }

    @media(max-width: 450px) {
        .buttons-sticked {
            .item {
                &.full-width {
                    width: 450px;
                }
            }
        }
    }

</style>