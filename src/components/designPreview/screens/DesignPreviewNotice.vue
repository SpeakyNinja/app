<template>
    <DesignPreviewShell :variant="variant">
        <div class="dp-screen dp-notice-bg">
            <div class="dp-add-words dp-notice-bg__ghost" style="opacity:0.15;pointer-events:none;padding-bottom:120px">
                <div class="dp-add-words__top">
                    <div class="dp-real-progress">
                        <ProgressBar :settings="{ width: '300px', widthFilled: '30%' }" />
                    </div>
                </div>
                <div class="dp-add-words__brain">
                    <Brain
                        :width="220"
                        :height="188"
                        :hex-radius="22"
                        :color-theme="brainTheme"
                        :intro-sequence="[]"
                        :items="brainItems"
                        :glass-cells="variant === 'liquid_glass'"
                    />
                </div>
            </div>

            <div class="dp-notice-fade" aria-hidden="true" />
            <div
                class="dp-notice-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dp-notice-title"
            >
                <div class="dp-card" style="width:100%;text-align:center">
                    <div class="dp-mascot" style="margin-bottom:16px">
                        <TalosEyes
                            mood="happy"
                            mood-transition
                            fill="var(--dp-mascot-fill)"
                            class="ai-image"
                        />
                    </div>
                    <p
                        id="dp-notice-title"
                        style="font-size:16px;font-family:var(--dp-font-title);line-height:1.4;margin:0 0 16px;color:var(--dp-text)"
                    >
                        Отлично! Словарь пополнился — можно тренироваться.
                    </p>
                    <div class="dp-btn dp-btn--primary">Продолжить</div>
                </div>
            </div>
        </div>
    </DesignPreviewShell>
</template>

<script>
import Brain from '@/components/Brain.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import TalosEyes from '@/components/TalosEyes.vue';
import DesignPreviewShell from '@/components/designPreview/DesignPreviewShell.vue';
import { brainColorThemeFromVariant } from '@/utils/designPreviewMockData.js';

export default {
    name: 'DesignPreviewNotice',

    components: {
        Brain,
        ProgressBar,
        TalosEyes,
        DesignPreviewShell,
    },

    props: {
        variant: { type: String, default: 'baseline' },
    },

    data() {
        return {
            brainItems: ['m4', 'm6', 'knows', 'green', 'm9', 'm11'],
        };
    },

    computed: {
        brainTheme() {
            return brainColorThemeFromVariant(this.variant);
        },
    },
};
</script>
