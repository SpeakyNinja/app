<template>
    <SalonScreenShell
        title="Тренировка"
        :subtitle="`Слово ${mock.index} из ${mock.total} · ${mock.memorization}%`"
    >
        <template #headAction>
            <div class="cf-salon__progress-pill">{{ mock.progressPercent }}%</div>
        </template>

        <div class="cf-salon__panel cf-salon__panel--word">
            <span class="cf-salon__word">{{ mock.word }}</span>
            <span class="cf-salon__transcription">{{ mock.transcription }}</span>
        </div>

        <div class="cf-salon__panel cf-salon__panel--context">
            <p class="cf-salon__context" v-html="mock.contextLine" />
        </div>

        <template #footer>
            <div class="cf-salon__stack-btns" role="listbox" aria-label="Варианты перевода">
                <button
                    v-for="(answer, i) in mock.answers"
                    :key="answer.text"
                    type="button"
                    class="cf-salon__stack-btn cf-salon__press-btn"
                    :class="{ 'cf-salon__stack-btn--chosen': answer.isCorrect }"
                    role="option"
                    :style="{ animationDelay: `${0.06 + i * 0.05}s` }"
                >
                    {{ answer.text }}
                </button>
            </div>
        </template>
    </SalonScreenShell>
</template>

<script>
import SalonScreenShell from '@/components/designPreview/concepts/salon/SalonScreenShell.vue';
import { SALON_TRAINING_MOCK } from '@/utils/salonMockData.js';

export default {
    name: 'ConceptSalonTraining',

    components: { SalonScreenShell },

    data() {
        return {
            mock: SALON_TRAINING_MOCK,
        };
    },
};
</script>
