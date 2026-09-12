<template>
    <SalonScreenShell
        title="Достижения"
        :subtitle="`${mock.unlocked} из ${mock.total} открыто`"
    >
        <div class="cf-salon__panel">
            <div class="cf-salon__achieve-summary">
                <div class="cf-salon__achieve-ring-wrap">
                    <svg viewBox="0 0 80 80" class="cf-salon__achieve-ring" aria-hidden="true">
                        <circle cx="40" cy="40" r="34" class="cf-salon__ring-track" />
                        <circle
                            cx="40"
                            cy="40"
                            r="34"
                            class="cf-salon__ring-progress cf-salon__ring-progress--gold"
                            :style="{ strokeDashoffset: unlockOffset }"
                        />
                    </svg>
                    <span class="cf-salon__achieve-ring-value">{{ unlockPercent }}%</span>
                </div>
                <div>
                    <span class="cf-salon__chart-title">Коллекция</span>
                    <p class="cf-salon__achieve-recent">
                        Недавнее: <strong>{{ mock.recentTitle }}</strong>
                    </p>
                </div>
            </div>
            <div class="cf-salon__achieve-tabs" role="tablist">
                <span
                    v-for="cat in mock.categories"
                    :key="cat.id"
                    class="cf-salon__achieve-tab"
                    :class="{ 'cf-salon__achieve-tab--active': cat.id === activeCategory }"
                    role="tab"
                    @click="activeCategory = cat.id"
                >
                    {{ cat.label }}
                </span>
            </div>
        </div>

        <div class="cf-salon__achieve-grid">
            <div
                v-for="(item, i) in filteredItems"
                :key="item.id"
                class="cf-salon__achieve-card cf-salon__press-btn"
                :class="{ 'cf-salon__achieve-card--locked': !item.unlocked }"
                :style="{ animationDelay: `${0.06 + i * 0.05}s` }"
            >
                <span class="cf-salon__achieve-icon" aria-hidden="true">{{ item.icon }}</span>
                <span class="cf-salon__achieve-name">{{ item.title }}</span>
                <span class="cf-salon__achieve-desc">{{ item.description }}</span>
                <span v-if="item.unlocked" class="cf-salon__achieve-date">{{ item.date }}</span>
                <div v-else-if="item.progress" class="cf-salon__achieve-locked-bar">
                    <div
                        class="cf-salon__achieve-locked-fill"
                        :style="{ width: `${item.progress}%` }"
                    />
                    <span>{{ item.progress }}%</span>
                </div>
                <span v-else class="cf-salon__achieve-locked-label">Закрыто</span>
            </div>
        </div>
    </SalonScreenShell>
</template>

<script>
import SalonScreenShell from '@/components/designPreview/concepts/salon/SalonScreenShell.vue';
import { SALON_ACHIEVEMENTS_MOCK } from '@/utils/salonMockData.js';

const RING_CIRC = 2 * Math.PI * 34;

export default {
    name: 'ConceptSalonAchievements',

    components: { SalonScreenShell },

    data() {
        return {
            mock: SALON_ACHIEVEMENTS_MOCK,
            activeCategory: 'streak',
        };
    },

    computed: {
        unlockPercent() {
            return Math.round((this.mock.unlocked / this.mock.total) * 100);
        },

        unlockOffset() {
            return RING_CIRC * (1 - this.unlockPercent / 100);
        },

        filteredItems() {
            return this.mock.items.filter((item) => item.category === this.activeCategory);
        },
    },
};
</script>
