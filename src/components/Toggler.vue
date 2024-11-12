<template>
    <div class="toggler" :class="{active : isActive}">
        <div class="toggle" @click="toggle"></div>
    </div>
</template>

<script>
    import { nextTick } from 'vue';

    export default {
        components: {
        },

        props: {
            defaultStatus: {
                type: Boolean,
                required: false,
                default: false
            }
        },

        data() {
            return {
            }
        },

        methods: {
            toggle() {
                this.isActive = !this.isActive;
                this.$forceUpdate();
                this.$emit('toggleHandler');
            }
        },

        beforeMount() {
            this.isActive = this.defaultStatus;
        }
    }
</script>

<style lang="scss" scoped>

    .toggler {
        width: 40px;
        min-width: 40px;
        height: 20px;
        background-color: #747881;
        border-radius: 30px;
        display: flex;
        align-items: center;

        .toggle {
            width: 20px;
            height: 20px;
            background-color: #1d1d27;
            border-radius: 50%;
            border: 1px solid #999999;
            transition: margin 0.1s ease-in-out;

        }

        &.active {
            background-color: #c4cad1;

            .toggle {
                margin-left: 20px;
                background-color: #2b970d;
                border: 1px solid white;
            }
        }
    }

</style>