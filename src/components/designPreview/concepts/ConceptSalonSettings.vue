<template>
    <SalonScreenShell title="Настройки" subtitle="Уведомления и интерфейс">
        <div class="cf-salon__settings-list">
            <button
                v-for="(item, i) in items"
                :key="item.id"
                type="button"
                class="cf-salon__setting-row cf-salon__press-btn"
                :style="{ animationDelay: `${0.06 + i * 0.05}s` }"
            >
                <span class="cf-salon__setting-icon" aria-hidden="true">{{ item.icon }}</span>
                <span class="cf-salon__setting-body">
                    <span class="cf-salon__setting-label">{{ item.label }}</span>
                    <span class="cf-salon__setting-value">{{ item.value }}</span>
                </span>
                <span class="cf-salon__setting-chevron" aria-hidden="true">›</span>
            </button>
        </div>
    </SalonScreenShell>
</template>

<script>
import SalonScreenShell from '@/components/designPreview/concepts/salon/SalonScreenShell.vue';
import { SALON_SETTINGS_MOCK } from '@/utils/salonMockData.js';

export default {
    name: 'ConceptSalonSettings',

    components: { SalonScreenShell },

    data() {
        return {
            items: SALON_SETTINGS_MOCK,
        };
    },
};
</script>
