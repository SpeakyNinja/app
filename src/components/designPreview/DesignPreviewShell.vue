<template>
    <div class="dp-column dp-column--prism">
        <DesignPreviewPrismBg />
        <span class="dp-badge">{{ variantLabel }}</span>
        <div class="dp-column__content">
            <slot />
        </div>
    </div>
</template>

<script>
import { DESIGN_VARIANTS } from '@/utils/designThemes.js';
import DesignPreviewPrismBg from '@/components/designPreview/prism/DesignPreviewPrismBg.vue';

export default {
    name: 'DesignPreviewShell',

    components: {
        DesignPreviewPrismBg,
    },

    props: {
        variant: { type: String, default: 'prism_flow' },
    },

    computed: {
        variantLabel() {
            const v = DESIGN_VARIANTS.find((x) => x.key === this.variant);
            return v?.labelRu || this.variant;
        },
    },
};
</script>
