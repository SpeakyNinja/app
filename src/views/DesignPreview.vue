<template>
    <div
        ref="pageRoot"
        class="design-preview-page"
        :class="themeClass"
        :style="rootStyle"
    >
        <component :is="screenComponent" v-if="screenComponent" :variant="config.variant" />
        <div v-else class="design-preview-missing dp-column">
            <p>Модуль «{{ moduleKey }}» не найден.</p>
        </div>
    </div>
</template>

<script>
import DesignPreviewAuth from '@/components/designPreview/screens/DesignPreviewAuth.vue';
import DesignPreviewAddWords from '@/components/designPreview/screens/DesignPreviewAddWords.vue';
import DesignPreviewTraining from '@/components/designPreview/screens/DesignPreviewTraining.vue';
import DesignPreviewStatistics from '@/components/designPreview/screens/DesignPreviewStatistics.vue';
import DesignPreviewDialog from '@/components/designPreview/screens/DesignPreviewDialog.vue';
import DesignPreviewNotice from '@/components/designPreview/screens/DesignPreviewNotice.vue';
import DesignPreviewModal from '@/components/designPreview/screens/DesignPreviewModal.vue';
import {
    cssVarsFromDesignTheme,
    readDesignPreviewConfig,
} from '@/utils/designThemes.js';
import { listenDesignPreviewVariant } from '@/utils/designPreviewReplay.js';
import { bindDesignPreviewPress } from '@/utils/designPreviewPress.js';
import { onMounted, onUnmounted, ref } from 'vue';

const SCREEN_MAP = {
    auth: DesignPreviewAuth,
    add_words: DesignPreviewAddWords,
    training: DesignPreviewTraining,
    statistics: DesignPreviewStatistics,
    dialog: DesignPreviewDialog,
    notice: DesignPreviewNotice,
    modal: DesignPreviewModal,
};

export default {
    name: 'DesignPreview',

    props: {
        moduleKey: { type: String, required: true },
    },

    setup() {
        const config = ref(readDesignPreviewConfig(window.location.search));
        const pageRoot = ref(null);
        let stopVariantListener = null;
        let unbindPress = null;

        onMounted(() => {
            stopVariantListener = listenDesignPreviewVariant((variant) => {
                config.value = { ...config.value, variant };
            });
            unbindPress = bindDesignPreviewPress(pageRoot.value);
        });

        onUnmounted(() => {
            stopVariantListener?.();
            unbindPress?.();
        });

        return { config, pageRoot };
    },

    computed: {
        screenComponent() {
            return SCREEN_MAP[this.moduleKey] || null;
        },

        themeClass() {
            return `design-preview-theme-${this.config.variant}`;
        },

        rootStyle() {
            return cssVarsFromDesignTheme(this.config.variant);
        },
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/designPreview.scss';
@import '@/assets/scss/prismFlow.scss';
</style>
