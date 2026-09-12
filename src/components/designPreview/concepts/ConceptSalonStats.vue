<template>
    <SalonScreenShell
        title="Полная статистика"
        :subtitle="`${mock.wordsTotal} слов в запасе`"
    >
        <div class="cf-salon__panel">
            <SalonKarateBelt
                :current-index="mock.belt.currentIndex"
                :progress="mock.belt.progressToNext"
                :words-current="mock.belt.wordsCurrent"
                :words-required="mock.belt.wordsRequired"
            />
            <div class="cf-salon__stats-side cf-salon__stats-side--below">
                <div class="cf-salon__stats-side-row">
                    <span>Регулярность</span>
                    <strong>{{ mock.regularity }}%</strong>
                </div>
                <div class="cf-salon__stats-side-row">
                    <span>Прогноз</span>
                    <strong>+{{ mock.predict }} к июлю</strong>
                </div>
            </div>
        </div>

        <div class="cf-salon__panel">
            <span class="cf-salon__chart-title">Уровни запоминания</span>
            <div class="cf-salon__donut-wrap">
                <svg viewBox="0 0 120 120" class="cf-salon__donut" aria-hidden="true">
                    <circle
                        v-for="(seg, i) in donutSegments"
                        :key="seg.label"
                        cx="60"
                        cy="60"
                        r="44"
                        class="cf-salon__donut-seg"
                        :stroke="seg.color"
                        :stroke-dasharray="seg.dash"
                        :stroke-dashoffset="seg.offset"
                        :style="{ animationDelay: `${0.1 + i * 0.08}s` }"
                    />
                </svg>
                <ul class="cf-salon__donut-legend">
                    <li v-for="lvl in mock.levels" :key="lvl.label">
                        <span class="cf-salon__legend-dot" :style="{ background: lvl.color }" />
                        {{ lvl.label }} · {{ lvl.value }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="cf-salon__panel">
            <span class="cf-salon__chart-title">Минуты за неделю</span>
            <div class="cf-salon__bar-chart cf-salon__bar-chart--tall">
                <div
                    v-for="day in mock.weekDays"
                    :key="day.day"
                    class="cf-salon__bar-col"
                >
                    <div
                        class="cf-salon__bar cf-salon__bar--mint"
                        :style="{ height: `${(day.min / maxWeekMin) * 100}%` }"
                    />
                    <span class="cf-salon__bar-label">{{ day.day }}</span>
                </div>
            </div>
        </div>
    </SalonScreenShell>
</template>

<script>
import SalonScreenShell from '@/components/designPreview/concepts/salon/SalonScreenShell.vue';
import SalonKarateBelt from '@/components/designPreview/concepts/salon/SalonKarateBelt.vue';
import { SALON_STATS_MOCK } from '@/utils/salonMockData.js';

const DONUT_CIRC = 2 * Math.PI * 44;

export default {
    name: 'ConceptSalonStats',

    components: { SalonScreenShell, SalonKarateBelt },

    data() {
        return {
            mock: SALON_STATS_MOCK,
        };
    },

    computed: {
        maxWeekMin() {
            return Math.max(...this.mock.weekDays.map((d) => d.min), 1);
        },

        donutSegments() {
            const total = this.mock.levels.reduce((s, l) => s + l.value, 0);
            let acc = 0;

            return this.mock.levels.map((lvl) => {
                const frac = lvl.value / total;
                const dash = `${frac * DONUT_CIRC} ${DONUT_CIRC}`;
                const offset = -acc * DONUT_CIRC + DONUT_CIRC * 0.25;
                acc += frac;

                return { ...lvl, dash, offset };
            });
        },
    },
};
</script>
