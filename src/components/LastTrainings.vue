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
                const countTrainings = this.statService.trainingsError.length;
                let list = [];
                list.push( this.statService.trainingsError[countTrainings - 1] );
                
                if(this.isAllPerfect()) {
                    list = this.statService.trainingsError;
                } else if(this.isFirstNotPerfect()) {
                    for( let i = countTrainings - 2; i >= 0; i-- ) {
                        if( this.statService.trainingsError[i].errors > 0 ) {
                            break;
                        }
                        list.unshift( this.statService.trainingsError[i] );
                    }
                } else {
                    let isPerfectSeries = true;
                    for( let i = countTrainings - 2; i >= 0; i-- ) {
                        if( this.statService.trainingsError[i].errors == 0 && !isPerfectSeries ) {
                            continue;
                        }

                        if( this.statService.trainingsError[i].errors > 0 ) {
                            isPerfectSeries = false;
                        }

                        list.unshift( this.statService.trainingsError[i] );
                    }
                }

                for(let i = 0; i < 10; i++) {
                    const trainingError = list[i];
                    const item = this.getItem(trainingError);
                    this.items.push(item);
                }
            },

            // Первое не идеальное прохождение после череды идеальных
            isFirstNotPerfect() {
                const countTrainings = this.statService.trainingsError.length;
                if(countTrainings < 2) {
                    return false;
                }

                const last = this.statService.trainingsError[countTrainings - 1];
                const lastButOne = this.statService.trainingsError[countTrainings - 2];

                return last.errors > 0 && lastButOne.errors == 0;
            },

            // Все идеальные прохождения
            isAllPerfect() {
                for( let i = 0; i < this.statService.trainingsError.length; i++ ) {
                    if( this.statService.trainingsError[i].errors > 0 ) {
                        return false;
                    }
                }

                return true;
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
                background-color: #7cdeff;
            }
        }
    }

</style>