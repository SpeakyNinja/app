<template>
    <Statistics :preview-layer="statLayer" />
</template>

<script>
import { provide } from 'vue';
import Statistics from '@/views/Statistics.vue';

export default {
    name: 'StatisticsLayerPreview',

    components: { Statistics },

    props: {
        statLayer: { type: String, default: 'LayerDashboard' },
    },

    created() {
        provide('engagementPreviewStatLayer', this.statLayer);
    },
};
</script>
