<template>
    <SalonScreenShell title="Учётная запись" :subtitle="mock.email">
        <div class="cf-salon__panel">
            <div class="cf-salon__account-card">
                <div class="cf-salon__account-avatar">SN</div>
                <div class="cf-salon__account-info">
                    <span class="cf-salon__account-email">{{ mock.email }}</span>
                    <span class="cf-salon__account-plan">{{ mock.plan }}</span>
                </div>
            </div>
            <div class="cf-salon__account-rows">
                <div class="cf-salon__account-row">
                    <span>Нейроны</span>
                    <strong>{{ mock.neurons }} 🧠</strong>
                </div>
                <div class="cf-salon__account-row">
                    <span>С нами с</span>
                    <strong>{{ mock.memberSince }}</strong>
                </div>
            </div>
        </div>

        <template #footer>
            <button type="button" class="cf-salon__stack-btn cf-salon__press-btn">
                Выйти из аккаунта
            </button>
            <button
                type="button"
                class="cf-salon__stack-btn cf-salon__press-btn cf-salon__stack-btn--danger"
            >
                Удалить аккаунт
            </button>
        </template>
    </SalonScreenShell>
</template>

<script>
import SalonScreenShell from '@/components/designPreview/concepts/salon/SalonScreenShell.vue';
import { SALON_ACCOUNT_MOCK } from '@/utils/salonMockData.js';

export default {
    name: 'ConceptSalonAccount',

    components: { SalonScreenShell },

    data() {
        return {
            mock: SALON_ACCOUNT_MOCK,
        };
    },
};
</script>
