<template>
    <DesignPreviewShell :variant="variant">
        <div class="dp-screen dp-modal-screen">
            <div class="dp-add-words" style="opacity:0.12;pointer-events:none;padding-bottom:100px">
                <div class="dp-add-words__brain">
                    <Brain
                        :width="200"
                        :height="170"
                        :hex-radius="20"
                        :color-theme="brainTheme"
                        :items="['m3', 'm7', 'green']"
                    />
                </div>
            </div>

            <div class="dp-modal-backdrop" aria-hidden="true" />
            <div
                class="dp-modal-overlay"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dp-modal-title"
                aria-describedby="dp-modal-desc"
            >
                <div class="dp-card dp-modal-card" style="width:100%;max-width:320px;text-align:center">
                    <div id="dp-modal-title" style="font-size:18px;font-family:var(--dp-font-accent);margin-bottom:12px;color:var(--dp-text)">
                        Ошибка сети
                    </div>
                    <div id="dp-modal-desc" class="dp-muted" style="font-size:15px;margin-bottom:20px">
                        Проверьте подключение и попробуйте снова
                    </div>
                    <div style="display:flex;flex-direction:column;gap:10px">
                        <div class="dp-btn dp-btn--primary">Повторить</div>
                        <div class="dp-btn dp-btn--ghost">Закрыть</div>
                    </div>
                </div>
            </div>
        </div>
    </DesignPreviewShell>
</template>

<script>
import Brain from '@/components/Brain.vue';
import DesignPreviewShell from '@/components/designPreview/DesignPreviewShell.vue';
import { brainColorThemeFromVariant } from '@/utils/designPreviewMockData.js';

export default {
    name: 'DesignPreviewModal',

    components: {
        Brain,
        DesignPreviewShell,
    },

    props: {
        variant: { type: String, default: 'baseline' },
    },

    computed: {
        brainTheme() {
            return brainColorThemeFromVariant(this.variant);
        },
    },
};
</script>
