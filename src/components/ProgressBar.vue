<template>
    <div class="progress-bar">
        <div class="progress"></div>
    </div>
</template>

<script>
    export default {

        components: {
        },

        props: {
            settings: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                
            }
        },

        methods: {
            
        },

        befoureMount() {
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .progress-bar {
        display: flex;
        justify-content: center;

        .progress {
            width: v-bind('settings.width');
            height: 2px;
            border-radius: 2px;
            background-color: #525465;
            position: relative;

            &:before {
                content: '';
                position: absolute;
                height: 100%;
                width: v-bind('settings.widthFilled');
                background-color: #ebebed;
                border-radius: 2px;
            }
        }
    }

</style>