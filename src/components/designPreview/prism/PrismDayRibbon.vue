<template>
    <div class="prism-ribbon">
        <PrismWaveChart
            :values="chartValues"
            :height="88"
            :labels="dayLabels"
        />
        <div class="prism-ribbon__days">
            <div
                v-for="(day, i) in days"
                :key="i"
                class="prism-ribbon__day"
                :class="{
                    'prism-ribbon__day--done': day.done,
                    'prism-ribbon__day--miss': day.miss,
                    'prism-ribbon__day--today': day.today,
                }"
                :style="{ animationDelay: `${i * 0.06}s` }"
            >
                <span class="prism-ribbon__icon">{{ day.done ? '✓' : day.miss ? '×' : '·' }}</span>
                <span class="prism-ribbon__label">{{ day.label }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import PrismWaveChart from '@/components/designPreview/prism/PrismWaveChart.vue';

export default {
    name: 'PrismDayRibbon',

    components: { PrismWaveChart },

    props: {
        countDays: { type: Number, default: 7 },
    },

    computed: {
        chartValues() {
            return [30, 45, 38, 62, 55, 70, 48].slice(0, this.countDays);
        },

        dayLabels() {
            return this.days.map((d) => d.label);
        },

        days() {
            const labels = ['01', '02', '03', '04', '05', '06', '07'];
            return labels.slice(0, this.countDays).map((num, i) => ({
                label: `${num} мая`,
                done: i !== 2 && i !== 5,
                miss: i === 2 || i === 5,
                today: i === this.countDays - 2,
            }));
        },
    },
};
</script>

<style scoped lang="scss">
.prism-ribbon {
    width: 100%;
    padding: 0 8px;
}

.prism-ribbon__days {
    display: flex;
    justify-content: space-between;
    gap: 4px;
    margin-top: 10px;
}

.prism-ribbon__day {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 2px;
    border-radius: 14px;
    animation: prism-ribbon-pop 0.45s ease both;

    &--today {
        background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--dp-accent) 35%, transparent),
            transparent
        );
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--dp-accent) 40%, transparent);
    }
}

.prism-ribbon__icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.06);
    color: var(--dp-muted);
}

.prism-ribbon__day--done .prism-ribbon__icon {
    background: linear-gradient(135deg, var(--dp-accent), #2dd4bf);
    color: #051018;
    box-shadow: 0 0 10px color-mix(in srgb, var(--dp-accent) 45%, transparent);
}

.prism-ribbon__day--miss .prism-ribbon__icon {
    background: rgba(251, 113, 133, 0.25);
    color: #fb7185;
}

.prism-ribbon__label {
    font-family: var(--dp-font-mono);
    font-size: 9px;
    color: var(--dp-muted);
    text-align: center;
    line-height: 1.2;
}

@keyframes prism-ribbon-pop {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
