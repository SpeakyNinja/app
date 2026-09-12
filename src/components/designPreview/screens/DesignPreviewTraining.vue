<template>
    <DesignPreviewShell :variant="variant">
        <div class="dp-screen dp-training">
            <div class="dp-training__top dp-enter">
                <div class="row">
                    <Memorization :mem="mock.memorization" />
                    <div class="dp-real-progress" style="flex:1">
                        <ProgressBar :settings="progress" />
                    </div>
                </div>
                <div class="transcription">{{ mock.transcription }}</div>
            </div>

            <div class="dp-training__hints">
                <PrismTrainingEcho v-if="variant === 'prism_flow'" />
                <div v-for="(hint, i) in mock.hints" :key="i" class="hint" v-html="hint" />
            </div>

            <div class="dp-real-sheet dp-enter-delay-1">
                <ButtonsSticked>
                    <template #items>
                        <div
                            v-for="answer in mock.answers"
                            :key="answer.text"
                            class="item no-select"
                        >
                            {{ answer.text }}
                        </div>
                    </template>
                </ButtonsSticked>
            </div>
        </div>
    </DesignPreviewShell>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue';
import Memorization from '@/components/Memorization.vue';
import ButtonsSticked from '@/components/ButtonsSticked.vue';
import DesignPreviewShell from '@/components/designPreview/DesignPreviewShell.vue';
import PrismTrainingEcho from '@/components/designPreview/prism/PrismTrainingEcho.vue';
import { TRAINING_MOCK } from '@/utils/designPreviewMockData.js';

export default {
    name: 'DesignPreviewTraining',

    components: {
        ProgressBar,
        Memorization,
        ButtonsSticked,
        DesignPreviewShell,
        PrismTrainingEcho,
    },

    props: {
        variant: { type: String, default: 'prism_flow' },
    },

    data() {
        return {
            mock: TRAINING_MOCK,
            progress: {
                width: '250px',
                widthFilled: `${TRAINING_MOCK.progressPercent}%`,
            },
        };
    },
};
</script>
