<template>

    <div class="top glass">
        <router-link :to="backLink" class="back-button">
            <IcoArrow height="18" fill="#ebebed" />
        </router-link>

        <div class="title">{{ title }}</div>
    </div>

</template>

<script>
    import IcoArrow from '@/components/icons/IcoArrow.vue';

    export default {
        components: {
            IcoArrow
        },

        props: {
            title: {
                type: String,
                required: false,
                default: ''
            },
            backLink: {
                type: String,
                required: false,
                default: '/statistics'
            }
        },

        data() {
            return {
            }
        },

        methods: {
        }
    }
</script>

<style lang="scss" scoped>

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #4c4d57;
        height: 80px;
        padding: 0 50px 0 20px;
        position: absolute !important;
        top: 0;
        left: 0;
        width: 100%;

        .title {
            z-index: 1;
            color: white;
            flex-grow: 2;
            display: flex;
            justify-content: center;
            font-size: 20px;
        }

        .back-button {
            z-index: 1;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            border: 1px solid #4c4d57;
            box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
        }
    }

</style>