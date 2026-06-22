<template>
    <div class="layer-accuracy dp-layer-accuracy">
        <DesignPreviewStatChrome :statService="statService" />

        <div class="dp-layer-accuracy__middle">
            <PrismXpStream
                v-if="variant === 'prism_flow'"
                :accuracy="statService.getAccuracy()"
                :items="statService.items"
            />
            <div v-else class="dp-layer-accuracy__content">
                <AccuracyWidget :accuracy="statService.getAccuracy()" />
                <LastTrainings :statService="statService" class="mt-4" />
            </div>
        </div>
    </div>
</template>

<script>
import DesignPreviewStatChrome from '@/components/designPreview/DesignPreviewStatChrome.vue';
import AccuracyWidget from '@/components/AccuracyWidget.vue';
import LastTrainings from '@/components/LastTrainings.vue';
import PrismXpStream from '@/components/designPreview/prism/PrismXpStream.vue';
import StatService from '@/services/StatService.js';

export default {
    name: 'DesignPreviewLayerAccuracy',

    components: {
        DesignPreviewStatChrome,
        AccuracyWidget,
        LastTrainings,
        PrismXpStream,
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
};
</script>
