<template>
    <div class="last-trainings">
        <template v-for="item in items">
            <div class="item" :class="item"></div>
        </template>
    </div>
</template>

<script>
    import StatService from '@/services/StatService.js';
    import ToolsService from '@/services/ToolsService.js';

    export default {
        components: {
        },

        props: {
            statService: {
                type: StatService,
                required: true
            }
        },

        data() {
            return {
                items: []
            }
        },

        methods: {
            makeItems() {
                for(let i = 0; i < 10; i++) {
                    const trainingError = this.statService.trainingsError[i];
                    const item = this.getItem(trainingError);
                    this.items.push(item);
                }
            },

            getItem(trainingError) {
                if(!trainingError) {
                    return 'empty';
                }

                const accuracy = this.statService.calcAccuracy(trainingError.errors);
                return this.tools.getAccuracyClass(accuracy);
            }
        },

        beforeMount() {
            this.tools = new ToolsService();
            this.makeItems();
        }
    }
</script>

<style lang="scss" scoped>

    .last-trainings {
        display: flex;
        align-items: center;
        gap: 18px;

        .item {
            width: 10px;
            height: 10px;
            border-radius: 50%;

            &.empty {
                border: 1px solid gray;
            }

            &.accuracy-5 {
                background-color: #fa3d3d;
            }

            &.accuracy-4 {
                background-color: #fa8c3d;
            }

            &.accuracy-3 {
                background-color: #eafa3d;
            }

            &.accuracy-2 {
                background-color: #76fa3d;
            }

            &.accuracy-1 {
                background-color: #3db8fa;
            }
        }
    }

</style>