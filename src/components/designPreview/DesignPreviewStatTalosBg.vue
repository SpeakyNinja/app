<template>
    <div
        class="dp-stat-talos-bg"
        :class="`dp-stat-talos-bg--${variant}`"
        aria-hidden="true"
    >
        <div class="dp-stat-talos-bg__veil" />
        <div class="dp-stat-talos-bg__eyes-wrap">
            <TalosEyes
                mood="neutral"
                mood-transition
                fill="#4a5580"
                class="ai-image talos-eyes"
            />
        </div>
    </div>
</template>

<script>
import TalosEyes from '@/components/TalosEyes.vue';

export default {
    name: 'DesignPreviewStatTalosBg',

    components: {
        TalosEyes,
    },

    props: {
        variant: { type: String, default: 'baseline' },
    },
};
</script>
