<template>

    <div class="regularity-widget">
        <div class="item" :class="item" v-for="item in items"></div>
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
                items: [
                    'green', 'green', 'green', 'green', 'green',
                    'green', 'green', 'green', 'green', 'green',
                    'green', 'green', 'green', 'green', 'green',
                    'green', 'green', 'green', 'green', 'green',
                    'green', 'green', 'blue', 'pending', ''
                ]
            }
        },

        methods: {
            
        },

        beforeMount() {
            
        }
    }
</script>

<style lang="scss" scoped>

    .regularity-widget {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        width: 123px;

        .item {
            width: 15px;
            height: 15px;
            border: 1px solid gray;
            border-radius: 50%;

            &.green {
                border: 1px solid #76fa3d;
                background-color: #76fa3d;
            }

            &.blue {
                border: 1px solid #7cdeff;
                background-color: #7cdeff;
            }

            &.pending {
                border: 1px solid #5fad3e;
                background-color: rgba(118, 250, 61, 0.16);
            }
        }
    }

</style>