<template>
    <div class="buttons-sticked">
        <slot name="items"></slot>
    </div>
</template>

<script>
    export default {
        components: {
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

    .buttons-sticked {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-top: 1px solid rgba(255,255,255,0.2);
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;

        .item {
            z-index: 2;
            color: #ebebed;
            max-width: 500px;
            width: 450px;
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
                color: #838389;
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
                background-color: rgba(20, 255, 0, .75);
                filter: blur(18px);
                transform: translate3d(0, 0, 0);
                border-radius: 50px;
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

</style>