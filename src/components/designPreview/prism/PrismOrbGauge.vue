<template>
    <div class="prism-growth">
        <div class="prism-growth__panel dp-prism-glass">
            <p class="prism-growth__badge">Прогноз · {{ days }} дней</p>

            <div class="prism-growth__flow">
                <div class="prism-growth__step">
                    <span class="prism-growth__step-label">Сейчас</span>
                    <span class="prism-growth__step-value">{{ currentWords }}</span>
                    <span class="prism-growth__step-unit">слов</span>
                </div>
                <div class="prism-growth__arrow" aria-hidden="true">
                    <span class="prism-growth__arrow-line" />
                    <span class="prism-growth__arrow-gain">+{{ displayGain }}</span>
                </div>
                <div class="prism-growth__step prism-growth__step--target">
                    <span class="prism-growth__step-label">Будет</span>
                    <span class="prism-growth__step-value">{{ displayTarget }}</span>
                    <span class="prism-growth__step-unit">слов</span>
                </div>
            </div>

            <div class="prism-growth__bars">
                <div
                    v-for="(bar, i) in weeklyBars"
                    :key="i"
                    class="prism-growth__bar-wrap"
                >
                    <div
                        class="prism-growth__bar"
                        :style="{
                            height: `${bar.h}%`,
                            animationDelay: `${i * 0.08}s`,
                        }"
                    />
                    <span class="prism-growth__bar-label">{{ bar.label }}</span>
                </div>
            </div>
        </div>

        <p class="prism-growth__hint">
            При текущем темпе и точности ответов
        </p>
    </div>
</template>

<script>
export default {
    name: 'PrismOrbGauge',

    props: {
        curValue: { type: Number, default: 0 },
        maxValue: { type: Number, default: 400 },
        currentWords: { type: Number, default: 172 },
        days: { type: Number, default: 22 },
    },

    data() {
        return {
            displayGain: 0,
            displayTarget: 0,
            animFrame: null,
        };
    },

    computed: {
        weeklyBars() {
            const base = [28, 42, 36, 55, 48, 72, 88];
            return base.map((h, i) => ({
                h,
                label: `Н${i + 1}`,
            }));
        },
    },

    watch: {
        curValue: {
            immediate: true,
            handler() {
                this.animateValues();
            },
        },
        currentWords: {
            immediate: true,
            handler() {
                this.animateValues();
            },
        },
    },

    beforeUnmount() {
        cancelAnimationFrame(this.animFrame);
    },

    methods: {
        animateValues() {
            cancelAnimationFrame(this.animFrame);
            const targetGain = this.curValue;
            const targetTotal = this.currentWords + this.curValue;
            const start = performance.now();
            const fromGain = this.displayGain;
            const fromTarget = this.displayTarget;
            const duration = 1200;

            const tick = (now) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - (1 - t) ** 3;
                this.displayGain = Math.round(fromGain + (targetGain - fromGain) * eased);
                this.displayTarget = Math.round(fromTarget + (targetTotal - fromTarget) * eased);
                if (t < 1) {
                    this.animFrame = requestAnimationFrame(tick);
                }
            };

            this.animFrame = requestAnimationFrame(tick);
        },
    },
};
</script>

<style scoped lang="scss">
.prism-growth {
    width: 100%;
    padding: 0 8px;
}

.prism-growth__panel {
    padding: 16px 14px 14px;
    border-radius: var(--dp-radius-lg);
    animation: prism-growth-in 0.65s ease both;
}

.prism-growth__badge {
    margin: 0 0 14px;
    display: inline-block;
    padding: 5px 12px;
    border-radius: 999px;
    font-family: var(--dp-font-mono);
    font-size: 11px;
    letter-spacing: 0.04em;
    color: var(--dp-text);
    background: rgba(255, 255, 255, 0.08);
}

.prism-growth__flow {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 8px;
    align-items: center;
    margin-bottom: 18px;
}

.prism-growth__step {
    padding: 12px 10px;
    border-radius: 16px;
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);

    &--target {
        border-color: color-mix(in srgb, var(--dp-accent-alt) 45%, transparent);
        box-shadow: inset 0 0 20px color-mix(in srgb, var(--dp-accent-alt) 12%, transparent);
    }
}

.prism-growth__step-label {
    display: block;
    font-family: var(--dp-font-title);
    font-size: 11px;
    color: var(--dp-muted);
    margin-bottom: 4px;
}

.prism-growth__step-value {
    display: block;
    font-family: var(--dp-font-display);
    font-size: clamp(26px, 8vw, 34px);
    line-height: 1;
    color: var(--dp-text);
}

.prism-growth__step-unit {
    display: block;
    margin-top: 2px;
    font-size: 11px;
    color: var(--dp-muted);
}

.prism-growth__arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 52px;
}

.prism-growth__arrow-line {
    width: 28px;
    height: 2px;
    background: linear-gradient(90deg, var(--dp-accent), var(--dp-accent-alt));
    position: relative;

    &::after {
        content: '';
        position: absolute;
        right: -1px;
        top: -4px;
        border: 5px solid transparent;
        border-left-color: var(--dp-accent-alt);
    }
}

.prism-growth__arrow-gain {
    font-family: var(--dp-font-display);
    font-size: 15px;
    color: var(--dp-accent-alt);
    white-space: nowrap;
    animation: prism-gain-pulse 2s ease-in-out infinite;
}

.prism-growth__bars {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 6px;
    height: 88px;
    padding-top: 4px;
}

.prism-growth__bar-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
}

.prism-growth__bar {
    width: 100%;
    max-width: 28px;
    border-radius: 8px 8px 4px 4px;
    background: linear-gradient(180deg, var(--dp-accent-alt), var(--dp-accent));
    box-shadow: 0 0 12px color-mix(in srgb, var(--dp-accent) 35%, transparent);
    transform-origin: bottom;
    animation: prism-bar-grow 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.prism-growth__bar-label {
    margin-top: 6px;
    font-family: var(--dp-font-mono);
    font-size: 9px;
    color: var(--dp-muted);
}

.prism-growth__hint {
    margin: 10px 4px 0;
    text-align: center;
    font-family: var(--dp-font-title);
    font-size: 13px;
    color: var(--dp-muted);
}

@keyframes prism-growth-in {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes prism-bar-grow {
    from { transform: scaleY(0); opacity: 0; }
    to { transform: scaleY(1); opacity: 1; }
}

@keyframes prism-gain-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.65; }
}
</style>
