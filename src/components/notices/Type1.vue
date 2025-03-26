<template>

    <div class="type1">

        <div class="top">
            <slot name="top"></slot>
        </div>

        <div class="center">
            <slot name="center"></slot>
        </div>

        <div class="bottom">
            <slot name="bottom"></slot>
        </div>

    </div>

</template>

<script>

    import { nextTick } from 'vue';

    export default {
        components: {
        },

        data() {
            return {
            };
        },

        methods: {
        }
    }
</script>

<style lang="scss">

    .type1 {
        background-color: #272733;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        
        .top {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 40%;
            width: 100%;
        }

        .center {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex-grow: 2;
            width: 100%;
        }

        .bottom {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding-top: 30px;
            height: 40%;
            width: 100%;
        }

        .muted {
            color: #949494;
        }
    }
    
</style>