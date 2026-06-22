<template>
    <div
        class="dp-column"
        :class="{
            'dp-column--neon': variant === 'neon_noir',
            'dp-column--liquid': variant === 'liquid_glass',
            'dp-column--prism': variant === 'prism_flow',
        }"
    >
        <DesignPreviewNeonBg v-if="variant === 'neon_noir'" />
        <DesignPreviewLiquidGlassBg v-if="variant === 'liquid_glass'" />
        <DesignPreviewPrismBg v-if="variant === 'prism_flow'" />
        <span class="dp-badge">{{ variantLabel }}</span>
        <div class="dp-column__content">
            <slot />
        </div>
    </div>
</template>

<script>
import { DESIGN_VARIANTS } from '@/utils/designThemes.js';
import DesignPreviewLiquidGlassBg from '@/components/designPreview/DesignPreviewLiquidGlassBg.vue';
import DesignPreviewNeonBg from '@/components/designPreview/DesignPreviewNeonBg.vue';
import DesignPreviewPrismBg from '@/components/designPreview/prism/DesignPreviewPrismBg.vue';

export default {
    name: 'DesignPreviewShell',

    components: {
        DesignPreviewLiquidGlassBg,
        DesignPreviewNeonBg,
        DesignPreviewPrismBg,
    },

    props: {
        variant: { type: String, default: 'baseline' },
    },

    computed: {
        variantLabel() {
            const v = DESIGN_VARIANTS.find((x) => x.key === this.variant);
            return v?.labelRu || this.variant;
        },
    },
};
</script>
