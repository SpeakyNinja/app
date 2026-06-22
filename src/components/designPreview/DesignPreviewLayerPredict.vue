<template>
    <div class="layer-predict dp-layer-predict">
        <DesignPreviewStatChrome :statService="statService" />

        <div class="middle">
            <div v-if="variant !== 'prism_flow'" class="dp-layer-predict__title">Ожидаемый<br>прирост</div>
            <PrismOrbGauge
                v-if="variant === 'prism_flow'"
                :cur-value="statService.predict.curValue"
                :max-value="statService.predict.maxValue"
                :current-words="statService.getLearnedWordsCount()"
                :days="lastDays"
            />
            <DesignPreviewSpeedWidget
                v-else
                :cur-value="statService.predict.curValue"
                :max-value="statService.predict.maxValue"
                :progress-size="progressSize"
                :variant="variant"
            />
        </div>

        <div class="bottom">
            <div>
                На основе темпа тренировок и точности ответов за
                {{ tools.plural(lastDays, ['последний', 'последние', 'последние']) }}
                {{ lastDays }}
                {{ tools.plural(lastDays, ['день', 'дня', 'дней']) }}
            </div>
        </div>
    </div>
</template>

<script>
import DesignPreviewSpeedWidget from '@/components/designPreview/DesignPreviewSpeedWidget.vue';
import DesignPreviewStatChrome from '@/components/designPreview/DesignPreviewStatChrome.vue';
import PrismOrbGauge from '@/components/designPreview/prism/PrismOrbGauge.vue';
import StatService from '@/services/StatService.js';
import ToolsService from '@/services/ToolsService.js';

export default {
    name: 'DesignPreviewLayerPredict',

    components: {
        DesignPreviewSpeedWidget,
        DesignPreviewStatChrome,
        PrismOrbGauge,
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
            lastDays: 30,
            progressSize: 300,
            tools: new ToolsService(),
        };
    },

    beforeMount() {
        if (this.statService?.predict?.daysFromBegin < this.lastDays) {
            this.lastDays = this.statService?.predict?.daysFromBegin;
        }

        this.progressSize = window.innerHeight * 0.34;
        if (this.progressSize > window.innerWidth * 0.78) {
            this.progressSize = window.innerWidth * 0.78;
        }
    },
};
</script>
