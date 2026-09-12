<template>
    <SalonScreenShell
        title="Задания недели"
        :subtitle="`${mock.weekLabel} · сброс через ${mock.resetsIn}`"
    >
        <p class="cf-salon__screen-lead">
            Выполнено {{ mock.completed }} из {{ mock.total }}
        </p>

        <div class="cf-salon__quest-list">
            <div
                v-for="(quest, i) in mock.quests"
                :key="quest.id"
                class="cf-salon__quest cf-salon__press-btn"
                :class="{ 'cf-salon__quest--done': quest.done }"
                :style="{ animationDelay: `${0.06 + i * 0.05}s` }"
            >
                <div class="cf-salon__quest-top">
                    <span class="cf-salon__quest-title">{{ quest.title }}</span>
                    <span v-if="quest.done" class="cf-salon__quest-badge">Готово</span>
                    <span v-else class="cf-salon__quest-reward">{{ quest.reward }}</span>
                </div>
                <p class="cf-salon__quest-desc">{{ quest.description }}</p>
                <div class="cf-salon__quest-progress">
                    <div class="cf-salon__quest-progress-track">
                        <div
                            class="cf-salon__quest-progress-fill"
                            :class="{ 'cf-salon__quest-progress-fill--done': quest.done }"
                            :style="{ width: `${questProgress(quest)}%` }"
                        />
                    </div>
                    <span class="cf-salon__quest-progress-label">
                        {{ quest.progress }} / {{ quest.target }}
                    </span>
                </div>
            </div>
        </div>
    </SalonScreenShell>
</template>

<script>
import SalonScreenShell from '@/components/designPreview/concepts/salon/SalonScreenShell.vue';
import { SALON_WEEKLY_QUESTS_MOCK } from '@/utils/salonMockData.js';

export default {
    name: 'ConceptSalonQuests',

    components: { SalonScreenShell },

    data() {
        return {
            mock: SALON_WEEKLY_QUESTS_MOCK,
        };
    },

    methods: {
        questProgress(quest) {
            if (quest.done) {
                return 100;
            }

            return Math.min(100, Math.round((quest.progress / quest.target) * 100));
        },
    },
};
</script>
