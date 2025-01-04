<template>

    <div class="regularity-widget">
        <div class="row" v-for="row in items">
            <div class="item" :class="item" v-for="item in row"></div>
        </div>
    </div>

</template>

<script>
    import StatService from '@/services/StatService.js';

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
                let nonstopDays = this.statService.getNonstopDays();
                const nonstopDaysMax = this.statService.getNonstopDaysMax();
                let rowSize = Math.ceil( Math.sqrt(nonstopDaysMax) );
                if(rowSize < 2) {
                    rowSize = 2;
                }

                if(!this.statService.hasYesterdayTraining() && this.statService.hasTodayTraining()) {
                    nonstopDays = 1;
                } else if(!this.statService.hasYesterdayTraining() && !this.statService.hasTodayTraining()) {
                    nonstopDays = 0;
                }

                let pos = 0;
                this.items = [];
                for(let y = 0; y < rowSize; y++) {
                    this.items.push([]);
                    for(let x = 0; x < rowSize; x++) {
                        pos++;
                        let item = '';
                        if(pos == nonstopDays && this.statService.hasTodayTraining()) {
                            // item = 'blue';
                            item = 'green';
                        } else if(pos <= nonstopDays) {
                            item = 'green';
                        } else if(pos <= nonstopDaysMax) {
                            item = 'pending';
                        }

                        this.items[y].push(item);
                    }
                }
            }
        },

        beforeMount() {
            this.makeItems();
        }
    }
</script>

<style lang="scss" scoped>

    .regularity-widget {
        display: flex;
        flex-direction: column;
        gap: 12px;

        .row {
            display: flex;
            gap: 12px;

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
    }

</style>