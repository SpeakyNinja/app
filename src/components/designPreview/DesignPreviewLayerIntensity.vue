<template>
    <div class="layer-regularity dp-layer-intensity">
        <DesignPreviewStatChrome :statService="statService" />

        <div class="middle no-scrollbar">
            <PrismDayRibbon
                v-if="variant === 'prism_flow'"
                :count-days="countDays"
            />
            <Intensity
                v-else
                :dateFrom="dateFrom"
                :countDays="countDays"
                :times="times"
                :record="record"
                :lastEarnedTime="lastEarnedTime"
                :barHeight="barHeight"
                :chartWidth="chartWidth"
            />
            <div class="dp-layer-intensity__hint m-light">
                {{ variant === 'prism_flow' ? 'Ежедневные тренировки улучшают запоминание' : '(Обнови рекорд и получи награду)' }}
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import DesignPreviewStatChrome from '@/components/designPreview/DesignPreviewStatChrome.vue';
import Intensity from '@/components/Intensity.vue';
import PrismDayRibbon from '@/components/designPreview/prism/PrismDayRibbon.vue';
import StatService from '@/services/StatService.js';
import EarnedTimes from '@/collections/EarnedTimes.js';

export default {
    name: 'DesignPreviewLayerIntensity',

    components: {
        DesignPreviewStatChrome,
        Intensity,
        PrismDayRibbon,
    },

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
            times: new EarnedTimes(),
            record: 0,
            countDays: 7,
            dateFrom: moment().startOf('day').subtract(6, 'days'),
            lastEarnedTime: null,
            barHeight: 130,
            chartWidth: 260,
        };
    },

    beforeMount() {
        this.times.reset(this.statService.intensity.earnedTimeList);
        this.lastEarnedTime = this.statService.getLastEarnedTime();
    },
};
</script>
