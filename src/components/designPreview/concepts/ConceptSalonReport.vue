<template>
    <SalonScreenShell title="Еженедельный отчёт" :subtitle="mock.weekLabel">
        <p class="cf-salon__screen-lead">
            +{{ mock.wordsAdded }} новых слов · регулярность {{ mock.regularity }}%
        </p>

        <div class="cf-salon__panel">
            <div class="cf-salon__chart-head">
                <span class="cf-salon__chart-title">Регулярность</span>
                <span class="cf-salon__chart-delta">+{{ mock.regularityDelta }}%</span>
            </div>
            <div class="cf-salon__chart-value">{{ mock.regularity }}%</div>
            <svg
                class="cf-salon__line-chart"
                viewBox="0 0 280 72"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="salonLineFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="rgba(91, 140, 255, 0.35)" />
                        <stop offset="100%" stop-color="rgba(91, 140, 255, 0)" />
                    </linearGradient>
                </defs>
                <path :d="areaPath" fill="url(#salonLineFill)" />
                <polyline :points="linePoints" class="cf-salon__line-stroke" />
            </svg>
            <div class="cf-salon__chart-labels">
                <span v-for="d in dayLabels" :key="d">{{ d }}</span>
            </div>
        </div>

        <div class="cf-salon__panel">
            <div class="cf-salon__chart-head">
                <span class="cf-salon__chart-title">Слова за неделю</span>
            </div>
            <div class="cf-salon__bar-chart">
                <div
                    v-for="(val, i) in mock.dailyWords"
                    :key="i"
                    class="cf-salon__bar-col"
                >
                    <div
                        class="cf-salon__bar"
                        :style="{ height: `${(val / maxDaily) * 100}%` }"
                    />
                    <span class="cf-salon__bar-label">{{ dayLabels[i] }}</span>
                </div>
            </div>
        </div>

        <div class="cf-salon__panel">
            <div class="cf-salon__report-metrics">
                <div class="cf-salon__report-metric">
                    <span class="cf-salon__stat-label">Лучшая серия</span>
                    <span class="cf-salon__stat-value">{{ mock.bestStreak }} дн</span>
                </div>
                <div class="cf-salon__report-metric">
                    <span class="cf-salon__stat-label">Точность</span>
                    <span class="cf-salon__stat-value">{{ mock.accuracy }}%</span>
                </div>
                <div class="cf-salon__report-metric">
                    <span class="cf-salon__stat-label">Новых слов</span>
                    <span class="cf-salon__stat-value">+{{ mock.wordsAdded }}</span>
                </div>
            </div>
        </div>
    </SalonScreenShell>
</template>

<script>
import SalonScreenShell from '@/components/designPreview/concepts/salon/SalonScreenShell.vue';
import { SALON_REPORT_MOCK } from '@/utils/salonMockData.js';

const DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default {
    name: 'ConceptSalonReport',

    components: { SalonScreenShell },

    data() {
        return {
            mock: SALON_REPORT_MOCK,
            dayLabels: DAY_LABELS,
        };
    },

    computed: {
        maxDaily() {
            return Math.max(...this.mock.dailyWords, 1);
        },

        linePoints() {
            const w = 280;
            const h = 56;
            const pad = 8;
            const vals = this.mock.trend;
            const max = Math.max(...vals);
            const min = Math.min(...vals) - 4;

            return vals
                .map((v, i) => {
                    const x = pad + (i / (vals.length - 1)) * (w - pad * 2);
                    const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
                    return `${x},${y}`;
                })
                .join(' ');
        },

        areaPath() {
            const points = this.linePoints.split(' ').map((p) => p.split(',').map(Number));
            if (!points.length) {
                return '';
            }

            const first = points[0];
            const last = points[points.length - 1];
            const line = points.map((p) => `L ${p[0]} ${p[1]}`).join(' ');

            return `M ${first[0]} 64 L ${first[0]} ${first[1]} ${line} L ${last[0]} 64 Z`;
        },
    },
};
</script>
