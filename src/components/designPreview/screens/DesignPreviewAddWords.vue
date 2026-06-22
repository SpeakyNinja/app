<template>
    <DesignPreviewShell :variant="variant">
        <div class="dp-screen dp-add-words">
            <div class="dp-add-words__top dp-enter">
                <div class="dp-real-progress">
                    <ProgressBar :settings="progress" />
                </div>
            </div>

            <div class="dp-add-words__brain">
                <PrismWordVault
                    v-if="variant === 'prism_flow'"
                    :word="mock.word"
                    :translate="mock.translate"
                    :filled-count="mock.totalSlots - mock.leftWords"
                    :total-slots="mock.totalSlots"
                    :remaining="mock.leftWords"
                />
                <Brain
                    v-else
                    ref="brain"
                    :width="brainWidth"
                    :height="brainHeight"
                    :hex-radius="brainHexRadius"
                    :color-theme="brainTheme"
                    :intro-sequence="brainIntro"
                    :glass-cells="variant === 'liquid_glass'"
                />
            </div>

            <div v-if="variant !== 'prism_flow'" class="dp-add-words__word">
                <div class="en m-upper-first">{{ mock.word }}</div>
                <div class="ru">{{ mock.translate }}</div>
            </div>

            <div class="dp-real-sheet dp-enter dp-enter-delay-2">
                <ButtonsSticked>
                    <template #items>
                        <div class="item m-light no-select">знаю</div>
                        <div class="item m-light no-select">учить</div>
                        <div class="item m-light no-select">позже</div>
                    </template>
                </ButtonsSticked>
            </div>
        </div>
    </DesignPreviewShell>
</template>

<script>
import Brain from '@/components/Brain.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import ButtonsSticked from '@/components/ButtonsSticked.vue';
import DesignPreviewShell from '@/components/designPreview/DesignPreviewShell.vue';
import PrismWordVault from '@/components/designPreview/prism/PrismWordVault.vue';
import {
    ADD_WORDS_MOCK,
    BRAIN_INTRO_SEQUENCE,
    brainColorThemeFromVariant,
} from '@/utils/designPreviewMockData.js';

export default {
    name: 'DesignPreviewAddWords',

    components: {
        Brain,
        ProgressBar,
        ButtonsSticked,
        DesignPreviewShell,
        PrismWordVault,
    },

    props: {
        variant: { type: String, default: 'baseline' },
    },

    data() {
        return {
            mock: ADD_WORDS_MOCK,
            brainWidth: 288,
            brainHeight: 246,
            brainHexRadius: 28,
            brainIntro: [...BRAIN_INTRO_SEQUENCE],
            progress: {
                width: '300px',
                widthFilled: `${ADD_WORDS_MOCK.progressPercent}%`,
            },
        };
    },

    computed: {
        brainTheme() {
            return brainColorThemeFromVariant(this.variant);
        },
    },
};
</script>
