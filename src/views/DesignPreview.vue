<template>
    <div
        ref="pageRoot"
        class="design-preview-page"
        :class="[
            themeClass,
            {
                'design-preview-page--standalone': isStandalone,
                'design-preview-page--concept': isConceptScreen,
            },
        ]"
        :style="rootStyle"
    >
        <component :is="screenComponent" v-if="screenComponent" :variant="config.variant" />
        <div v-else class="design-preview-missing dp-column">
            <p>Модуль «{{ moduleKey }}» не найден.</p>
        </div>
    </div>
</template>

<script>
import ConceptAtelierCover from '@/components/designPreview/concepts/ConceptAtelierCover.vue';
import ConceptAtelierSpread from '@/components/designPreview/concepts/ConceptAtelierSpread.vue';
import ConceptSalonInbox from '@/components/designPreview/concepts/ConceptSalonInbox.vue';
import ConceptSalonTraining from '@/components/designPreview/concepts/ConceptSalonTraining.vue';
import ConceptSalonDialog from '@/components/designPreview/concepts/ConceptSalonDialog.vue';
import ConceptSalonSession from '@/components/designPreview/concepts/ConceptSalonSession.vue';
import ConceptSalonStats from '@/components/designPreview/concepts/ConceptSalonStats.vue';
import ConceptSalonQuests from '@/components/designPreview/concepts/ConceptSalonQuests.vue';
import ConceptSalonAchievements from '@/components/designPreview/concepts/ConceptSalonAchievements.vue';
import ConceptSalonReport from '@/components/designPreview/concepts/ConceptSalonReport.vue';
import ConceptSalonSettings from '@/components/designPreview/concepts/ConceptSalonSettings.vue';
import ConceptSalonAccount from '@/components/designPreview/concepts/ConceptSalonAccount.vue';
import ConceptGardenHome from '@/components/designPreview/concepts/ConceptGardenHome.vue';
import ConceptGardenConservatory from '@/components/designPreview/concepts/ConceptGardenConservatory.vue';
import DesignPreviewTraining from '@/components/designPreview/screens/DesignPreviewTraining.vue';
import { isConceptPreviewModule } from '@/utils/designPreviewCatalog.js';
import {
    cssVarsFromDesignTheme,
    readDesignPreviewConfig,
} from '@/utils/designThemes.js';
import { listenDesignPreviewVariant } from '@/utils/designPreviewReplay.js';
import { bindDesignPreviewPress } from '@/utils/designPreviewPress.js';
import { onMounted, onUnmounted, ref } from 'vue';

const SCREEN_MAP = {
    atelier_cover: ConceptAtelierCover,
    atelier_spread: ConceptAtelierSpread,
    salon_inbox: ConceptSalonInbox,
    salon_training: ConceptSalonTraining,
    salon_dialog: ConceptSalonDialog,
    salon_session: ConceptSalonSession,
    salon_stats: ConceptSalonStats,
    salon_quests: ConceptSalonQuests,
    salon_achievements: ConceptSalonAchievements,
    salon_report: ConceptSalonReport,
    salon_settings: ConceptSalonSettings,
    salon_account: ConceptSalonAccount,
    garden_home: ConceptGardenHome,
    garden_conservatory: ConceptGardenConservatory,
    training: DesignPreviewTraining,
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
        isStandalone() {
            if (typeof window === 'undefined') {
                return false;
            }

            return window.self === window.top;
        },

        isConceptScreen() {
            return isConceptPreviewModule(this.moduleKey);
        },

        screenComponent() {
            return SCREEN_MAP[this.moduleKey] || null;
        },

        themeClass() {
            if (this.isConceptScreen) {
                return null;
            }

            return `design-preview-theme-${this.config.variant}`;
        },

        rootStyle() {
            if (this.isConceptScreen) {
                return {};
            }

            return cssVarsFromDesignTheme(this.config.variant);
        },
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/designPreview.scss';
@import '@/assets/scss/prismFlow.scss';
@import '@/assets/scss/conceptFlows.scss';
</style>
