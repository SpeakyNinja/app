<template>

    <div class="form">
        <div class="wrapper no-scrollbar">

            <slot name="top">
                <div class="title mt-6">Speaky.Ninja</div>
            </slot>

            <slot name="description"></slot>

            <slot name="content"></slot>

        </div>
    </div>

</template>

<script>

    export default {
        components: {
        },

        props: {
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

    .form {
        background-color: #272733 !important;

        .wrapper {
            height: 100vh;
            height: 100dvh;
            display: flex;
            flex-direction: column;
            align-items: center;

            .title {
                font-size: 40px;
                font-family: Light;
                color: #ebebed;
            }

            .content {
                flex-grow: 2;
                padding: 10px 40px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                max-width: 500px;
                width: 100%;
            }
        }
    }

</style>