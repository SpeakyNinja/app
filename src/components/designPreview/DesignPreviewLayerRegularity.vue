<template>
    <div class="layer-regularity dp-layer-regularity">
        <DesignPreviewStatChrome :statService="statService" />

        <div class="middle">
            <div class="dp-layer-regularity__streak dp-enter">
                <div class="dp-layer-regularity__days">{{ statService.getNonstopDays() }}</div>
                <div class="dp-layer-regularity__label">
                    {{ tools.plural(statService.getNonstopDays(), ['день', 'дня', 'дней']) }} подряд!
                </div>
            </div>

            <PrismStreakRiver
                v-if="variant === 'prism_flow'"
                :active-days="statService.getNonstopDays()"
                :max-days="statService.getNonstopDaysMax()"
            />
            <DesignPreviewRegularityWidget
                v-else
                :statService="statService"
                :variant="variant"
            />
        </div>

        <div class="bottom glass">
            <div>Качество регулярности: {{ getPercentRegularity() }}%</div>
        </div>
    </div>
</template>

<script>
import DesignPreviewRegularityWidget from '@/components/designPreview/DesignPreviewRegularityWidget.vue';
import DesignPreviewStatChrome from '@/components/designPreview/DesignPreviewStatChrome.vue';
import PrismStreakRiver from '@/components/designPreview/prism/PrismStreakRiver.vue';
import StatService from '@/services/StatService.js';
import ToolsService from '@/services/ToolsService.js';

export default {
    name: 'DesignPreviewLayerRegularity',

    components: {
        DesignPreviewRegularityWidget,
        DesignPreviewStatChrome,
        PrismStreakRiver,
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
            tools: new ToolsService(),
        };
    },

    methods: {
        getPercentRegularity() {
            return this.statService.regularity.percent_regularity;
        },
    },
};
</script>
