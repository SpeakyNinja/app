<template>
    <div class="dp-reg-widget" :class="`dp-reg-widget--${variant}`">
        <div v-for="(row, rowIndex) in items" :key="rowIndex" class="dp-reg-widget__row">
            <div
                v-for="(item, colIndex) in row"
                :key="`${rowIndex}-${colIndex}`"
                class="dp-reg-widget__dot"
                :class="item.className"
                :style="{ '--dot-i': item.index }"
            />
        </div>
    </div>
</template>

<script>
import StatService from '@/services/StatService.js';

export default {
    name: 'DesignPreviewRegularityWidget',

    props: {
        statService: {
            type: StatService,
            required: true,
        },
        variant: {
            type: String,
            default: 'baseline',
        },
    },

    data() {
        return {
            items: [],
        };
    },

    beforeMount() {
        this.makeItems();
    },

    methods: {
        makeItems() {
            let nonstopDays = this.statService.getNonstopDays();
            const nonstopDaysMax = this.statService.getNonstopDaysMax();
            let rowSize = Math.ceil(Math.sqrt(nonstopDaysMax));
            if (rowSize < 2) {
                rowSize = 2;
            }

            if (!this.statService.hasYesterdayTraining() && this.statService.hasTodayTraining()) {
                nonstopDays = 1;
            } else if (!this.statService.hasYesterdayTraining() && !this.statService.hasTodayTraining()) {
                nonstopDays = 0;
            }

            let pos = 0;
            let dotIndex = 0;
            const rows = [];

            for (let y = 0; y < rowSize; y += 1) {
                const row = [];
                for (let x = 0; x < rowSize; x += 1) {
                    pos += 1;
                    let className = 'empty';

                    if (pos === nonstopDays && this.statService.hasTodayTraining()) {
                        className = 'green';
                    } else if (pos <= nonstopDays) {
                        className = 'green';
                    } else if (pos <= nonstopDaysMax) {
                        className = 'pending';
                    }

                    row.push({ className, index: dotIndex });
                    dotIndex += 1;
                }
                rows.push(row);
            }

            this.items = rows;
        },
    },
};
</script>
