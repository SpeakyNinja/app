<template>
    <div class="prism-lexicon dp-prism-glass">
        <div class="prism-lexicon__today">
            <span class="prism-lexicon__today-label">Сегодня</span>
            <span class="prism-lexicon__today-value">+{{ bonusXp }}</span>
        </div>

        <div class="prism-lexicon__hero">
            <p class="prism-lexicon__kicker">Словарный запас</p>
            <p class="prism-lexicon__count">
                <span v-if="wordsDisplay.muted" class="prism-lexicon__count-muted">{{ wordsDisplay.muted }}</span>
                <span>{{ wordsDisplay.main }}</span>
            </p>
            <p class="prism-lexicon__count-sub">выученных слов</p>
        </div>

        <div class="prism-lexicon__lanes">
            <div
                v-for="lane in lanes"
                :key="lane.key"
                class="prism-lexicon__lane"
            >
                <div class="prism-lexicon__lane-head">
                    <span class="prism-lexicon__lane-dot" :style="{ background: lane.color }" />
                    <span class="prism-lexicon__lane-title">{{ lane.label }}</span>
                    <span class="prism-lexicon__lane-num">{{ lane.value }}</span>
                </div>
                <div class="prism-lexicon__lane-track">
                    <div
                        class="prism-lexicon__lane-fill"
                        :style="{ width: `${lane.fill}%`, background: lane.gradient }"
                    />
                </div>
            </div>
        </div>

        <div class="prism-lexicon__belt">
            <span>Прогресс пояса</span>
            <span class="prism-lexicon__belt-pct">{{ beltPercent }}%</span>
        </div>
        <div class="prism-lexicon__belt-bar">
            <div class="prism-lexicon__belt-fill" :style="{ width: `${beltPercent}%` }" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PrismVocabOrb',

    props: {
        words: { type: Number, default: 0 },
        red: { type: Number, default: 0 },
        yellow: { type: Number, default: 0 },
        green: { type: Number, default: 0 },
        progress: { type: Number, default: 0 },
        bonusXp: { type: Number, default: 85 },
    },

    computed: {
        beltPercent() {
            return Math.round(Math.min(100, Math.max(0, this.progress * 100)));
        },

        wordsDisplay() {
            const formatted = this.words.toString().padStart(5, '0');
            const withSpace = `${formatted.slice(0, 2)}\u00a0${formatted.slice(2)}`;
            let highlighted = false;
            let muted = '';
            let main = '';
            withSpace.split('').forEach((char) => {
                if (!highlighted && char > '0') {
                    highlighted = true;
                }
                if (highlighted) {
                    main += char;
                } else {
                    muted += char;
                }
            });
            return { muted, main };
        },

        laneTotal() {
            return Math.max(1, this.red + this.yellow + this.green);
        },

        lanes() {
            return [
                {
                    key: 'red',
                    label: 'Новые',
                    value: this.red,
                    color: '#fb7185',
                    gradient: 'linear-gradient(90deg, #fb7185, #f97316)',
                    fill: (this.red / this.laneTotal) * 100,
                },
                {
                    key: 'yellow',
                    label: 'Учу',
                    value: this.yellow,
                    color: '#fbbf24',
                    gradient: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                    fill: (this.yellow / this.laneTotal) * 100,
                },
                {
                    key: 'green',
                    label: 'Знаю',
                    value: this.green,
                    color: '#2dd4bf',
                    gradient: 'linear-gradient(90deg, #2dd4bf, #14b8a6)',
                    fill: (this.green / this.laneTotal) * 100,
                },
            ];
        },
    },
};
</script>

<style scoped lang="scss">
.prism-lexicon {
    width: min(100%, 320px);
    margin: 0 auto;
    padding: 18px 16px 16px;
    border-radius: var(--dp-radius-lg);
    position: relative;
    animation: prism-lexicon-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.prism-lexicon__today {
    position: absolute;
    top: -10px;
    right: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 14px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--dp-accent-alt), #f97316);
    box-shadow: 0 10px 28px rgba(249, 115, 22, 0.35);
    animation: prism-lexicon-float 3s ease-in-out infinite alternate;
}

.prism-lexicon__today-label {
    font-family: var(--dp-font-title);
    font-size: 10px;
    opacity: 0.9;
    color: #fff;
}

.prism-lexicon__today-value {
    font-family: var(--dp-font-display);
    font-size: 20px;
    line-height: 1.1;
    color: #fff;
}

.prism-lexicon__hero {
    text-align: center;
    padding: 8px 0 16px;
}

.prism-lexicon__kicker {
    margin: 0 0 6px;
    font-family: var(--dp-font-title);
    font-size: 14px;
    color: var(--dp-muted);
}

.prism-lexicon__count {
    margin: 0;
    font-family: var(--dp-font-display);
    font-size: clamp(40px, 13vw, 56px);
    line-height: 1;
    color: var(--dp-text);
    letter-spacing: 0.02em;
}

.prism-lexicon__count-muted {
    opacity: 0.28;
}

.prism-lexicon__count-sub {
    margin: 6px 0 0;
    font-family: var(--dp-font-title);
    font-size: 13px;
    color: var(--dp-muted);
}

.prism-lexicon__lanes {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.prism-lexicon__lane-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 5px;
}

.prism-lexicon__lane-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
}

.prism-lexicon__lane-title {
    flex: 1;
    font-family: var(--dp-font-ui);
    font-size: 14px;
    color: var(--dp-text);
}

.prism-lexicon__lane-num {
    font-family: var(--dp-font-mono);
    font-size: 14px;
    color: var(--dp-text);
}

.prism-lexicon__lane-track {
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
}

.prism-lexicon__lane-fill {
    height: 100%;
    border-radius: inherit;
    transition: width 1.1s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.12);
}

.prism-lexicon__belt {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
    font-family: var(--dp-font-title);
    font-size: 13px;
    color: var(--dp-muted);
}

.prism-lexicon__belt-pct {
    color: var(--dp-accent-alt);
    font-family: var(--dp-font-mono);
}

.prism-lexicon__belt-bar {
    height: 6px;
    margin-top: 6px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
}

.prism-lexicon__belt-fill {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--dp-accent), var(--dp-accent-alt));
    transition: width 1.2s ease;
}

@keyframes prism-lexicon-in {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes prism-lexicon-float {
    from { transform: translateY(0); }
    to { transform: translateY(-6px); }
}
</style>
