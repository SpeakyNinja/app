<template>
    <div class="prism-xp">
        <div class="prism-xp__chart dp-prism-glass">
            <div class="prism-xp__chart-head">
                <span>Динамика опыта</span>
                <span class="prism-xp__pct">{{ accuracy }}%</span>
            </div>
            <PrismWaveChart
                :values="chartValues"
                :height="100"
                :labels="['1 мая', '9 мая']"
            />
        </div>
        <div class="prism-xp__list">
            <div
                v-for="(row, i) in rows"
                :key="row.en"
                class="prism-xp__row dp-prism-glass"
                :style="{ animationDelay: `${i * 0.08}s` }"
            >
                <div class="prism-xp__row-text">
                    <span class="prism-xp__en">{{ row.en }}</span>
                    <span class="prism-xp__ru"> — {{ row.ru }}</span>
                </div>
                <div class="prism-xp__row-meta">
                    <span class="prism-xp__gain">+{{ row.gain }}</span>
                    <div class="prism-xp__tube">
                        <div
                            class="prism-xp__tube-fill"
                            :style="{ width: `${row.fill}%`, '--tube-hue': row.hue }"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PrismWaveChart from '@/components/designPreview/prism/PrismWaveChart.vue';

export default {
    name: 'PrismXpStream',

    components: { PrismWaveChart },

    props: {
        accuracy: { type: Number, default: 78 },
        items: { type: Array, default: () => [] },
    },

    computed: {
        chartValues() {
            return [42, 58, 50, 72, 65, 88, 76];
        },

        rows() {
            const hues = ['#fb7185', '#2dd4bf', '#fbbf24'];
            return (this.items.length ? this.items : [
                { en: 'May', ru: 'Май', memorization: 8 },
                { en: 'Close', ru: 'Закрывать', memorization: 5 },
                { en: 'Hello', ru: 'Привет', memorization: 11 },
            ]).map((item, i) => ({
                en: item.en,
                ru: item.ru,
                gain: Math.max(3, Math.round(item.memorization * 1.2)),
                fill: Math.min(100, item.memorization * 9),
                hue: hues[i % hues.length],
            }));
        },
    },
};
</script>

<style scoped lang="scss">
.prism-xp {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 4px;
}

.prism-xp__chart {
    padding: 14px 14px 10px;
    border-radius: var(--dp-radius-lg);
}

.prism-xp__chart-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-family: var(--dp-font-title);
    font-size: 14px;
    color: var(--dp-text);
}

.prism-xp__pct {
    font-family: var(--dp-font-display);
    font-size: 18px;
    color: var(--dp-accent-alt);
}

.prism-xp__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.prism-xp__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    border-radius: var(--dp-radius-lg);
    animation: prism-row-in 0.5s ease both;
}

.prism-xp__row-text {
    min-width: 0;
    flex: 1;
    font-family: var(--dp-font-ui);
    font-size: 15px;
    color: var(--dp-text);
}

.prism-xp__ru {
    color: var(--dp-muted);
    font-family: var(--dp-font-title);
}

.prism-xp__row-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
}

.prism-xp__gain {
    font-family: var(--dp-font-mono);
    font-size: 13px;
    color: var(--dp-accent-alt);
}

.prism-xp__tube {
    width: 48px;
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
}

.prism-xp__tube-fill {
    height: 100%;
    border-radius: inherit;
    background: var(--tube-hue);
    box-shadow: 0 0 8px color-mix(in srgb, var(--tube-hue) 60%, transparent);
    transition: width 1s ease;
}

@keyframes prism-row-in {
    from { opacity: 0; transform: translateX(-12px); }
    to { opacity: 1; transform: translateX(0); }
}
</style>
