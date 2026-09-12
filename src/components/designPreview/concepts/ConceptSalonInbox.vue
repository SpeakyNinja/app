<template>
    <div class="cf-screen cf-salon cf-salon--hub">
        <div class="cf-salon__ambient" aria-hidden="true" />
        <div class="cf-salon__grain" aria-hidden="true" />

        <header class="cf-salon__header cf-salon__header--hub">
            <div class="cf-salon__header-top">
                <h1 class="cf-salon__title">Speaky.Ninja</h1>
                <span class="cf-salon__hub-pill">
                    {{ hub.streakDays }} дн · {{ hub.neurons }} 🧠
                </span>
            </div>
            <p class="cf-salon__subtitle">{{ hub.beltSummary }}</p>
        </header>

        <div class="cf-salon__hub-scroll">
            <button type="button" class="cf-salon__hub-cta cf-salon__press-btn">
                <span class="cf-salon__hub-cta-label">{{ hub.training.label }}</span>
                <span class="cf-salon__hub-cta-meta">{{ hub.training.meta }}</span>
            </button>

            <section class="cf-salon__hub-block" aria-label="Диалог">
                <h2 class="cf-salon__hub-block-title">Диалог</h2>
                <button type="button" class="cf-salon__hub-row cf-salon__hub-row--dialog cf-salon__press-btn">
                    <div class="cf-salon__avatar cf-salon__avatar--talos cf-salon__avatar--sm">
                        <TalosEyes mood="neutral" fill="#8ab4ff" class="ai-image" />
                    </div>
                    <span class="cf-salon__hub-row-body">
                        <span class="cf-salon__hub-row-label">{{ hub.talos.label }}</span>
                        <span class="cf-salon__hub-row-meta">{{ hub.talos.meta }}</span>
                    </span>
                    <span
                        v-if="hub.talos.unread"
                        class="cf-salon__badge"
                        :aria-label="`${hub.talos.unread} новых`"
                    >
                        {{ hub.talos.unread }}
                    </span>
                    <span class="cf-salon__hub-row-chevron" aria-hidden="true">›</span>
                </button>
            </section>

            <section
                v-for="section in hub.sections"
                :key="section.id"
                class="cf-salon__hub-block"
            >
                <h2 v-if="section.title" class="cf-salon__hub-block-title">
                    {{ section.title }}
                </h2>
                <div class="cf-salon__hub-nav">
                    <button
                        v-for="(item, i) in section.items"
                        :key="item.id"
                        type="button"
                        class="cf-salon__hub-row cf-salon__press-btn"
                        :style="{ animationDelay: `${0.04 + i * 0.04}s` }"
                    >
                        <span class="cf-salon__hub-row-icon" aria-hidden="true">{{ item.icon }}</span>
                        <span class="cf-salon__hub-row-body">
                            <span class="cf-salon__hub-row-label">{{ item.label }}</span>
                            <span v-if="item.meta" class="cf-salon__hub-row-meta">{{ item.meta }}</span>
                        </span>
                        <span
                            v-if="item.badge"
                            class="cf-salon__badge"
                        >
                            {{ item.badge }}
                        </span>
                        <span class="cf-salon__hub-row-chevron" aria-hidden="true">›</span>
                    </button>
                </div>
            </section>

            <section class="cf-salon__hub-block cf-salon__hub-block--footer">
                <div class="cf-salon__hub-nav">
                    <button
                        v-for="(item, i) in hub.footer"
                        :key="item.id"
                        type="button"
                        class="cf-salon__hub-row cf-salon__press-btn"
                        :style="{ animationDelay: `${0.04 + i * 0.04}s` }"
                    >
                        <span class="cf-salon__hub-row-icon" aria-hidden="true">{{ item.icon }}</span>
                        <span class="cf-salon__hub-row-body">
                            <span class="cf-salon__hub-row-label">{{ item.label }}</span>
                            <span v-if="item.meta" class="cf-salon__hub-row-meta">{{ item.meta }}</span>
                        </span>
                        <span class="cf-salon__hub-row-chevron" aria-hidden="true">›</span>
                    </button>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import TalosEyes from '@/components/TalosEyes.vue';
import { SALON_HUB_MOCK } from '@/utils/salonMockData.js';

export default {
    name: 'ConceptSalonInbox',

    components: { TalosEyes },

    data() {
        return {
            hub: SALON_HUB_MOCK,
        };
    },
};
</script>
