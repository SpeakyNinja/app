<template>
    <SalonScreenShell title="Статистика сессии" subtitle="Сегодня · 19:00–19:08">
        <div class="cf-salon__panel">
            <div class="cf-salon__stat-grid">
                <div class="cf-salon__stat-cell">
                    <span class="cf-salon__stat-label">Слова</span>
                    <span class="cf-salon__stat-value">{{ mock.words }}</span>
                </div>
                <div class="cf-salon__stat-cell">
                    <span class="cf-salon__stat-label">Минуты</span>
                    <span class="cf-salon__stat-value">{{ mock.minutes }}</span>
                </div>
                <div class="cf-salon__stat-cell">
                    <span class="cf-salon__stat-label">Точность</span>
                    <span class="cf-salon__stat-value">{{ mock.accuracy }}%</span>
                </div>
                <div class="cf-salon__stat-cell">
                    <span class="cf-salon__stat-label">Нейроны</span>
                    <span class="cf-salon__stat-value">{{ mock.neurons }} 🧠</span>
                </div>
            </div>
            <SalonKarateBelt
                compact
                :show-ladder="false"
                :current-index="mock.belt.currentIndex"
                :progress="mock.belt.progressToNext"
            />
        </div>

        <p class="cf-salon__screen-lead">
            Серия {{ mock.streak }} дней подряд
        </p>

        <template #footer>
            <button type="button" class="cf-salon__stack-btn cf-salon__press-btn cf-salon__stack-btn--primary">
                Открыть полную статистику
            </button>
        </template>
    </SalonScreenShell>
</template>

<script>
import SalonScreenShell from '@/components/designPreview/concepts/salon/SalonScreenShell.vue';
import SalonKarateBelt from '@/components/designPreview/concepts/salon/SalonKarateBelt.vue';
import { SALON_SESSION_MOCK } from '@/utils/salonMockData.js';

export default {
    name: 'ConceptSalonSession',

    components: { SalonScreenShell, SalonKarateBelt },

    data() {
        return {
            mock: SALON_SESSION_MOCK,
        };
    },
};
</script>
