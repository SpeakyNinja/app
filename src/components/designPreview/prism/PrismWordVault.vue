<template>
    <div class="prism-deck">
        <div class="prism-deck__header">
            <div>
                <p class="prism-deck__title">Добор слов</p>
                <p class="prism-deck__subtitle">Оцените каждую пару</p>
            </div>
            <div class="prism-deck__progress" :aria-label="`Осталось ${remaining} из ${totalSlots}`">
                <span
                    v-for="i in totalSlots"
                    :key="i"
                    class="prism-deck__dot"
                    :class="{ 'prism-deck__dot--done': i <= doneCount }"
                />
            </div>
        </div>

        <p class="prism-deck__remaining">
            Осталось <strong>{{ remaining }}</strong> из {{ totalSlots }}
        </p>

        <div class="prism-deck__stack">
            <div class="prism-deck__card prism-deck__card--back-2" aria-hidden="true" />
            <div class="prism-deck__card prism-deck__card--back-1" aria-hidden="true" />
            <div class="prism-deck__card prism-deck__card--front dp-prism-glass">
                <span class="prism-deck__tag">EN → RU</span>
                <p class="prism-deck__en">{{ word }}</p>
                <p class="prism-deck__ru">{{ translate }}</p>
            </div>
        </div>

        <p class="prism-deck__prompt">Знаете это слово?</p>
    </div>
</template>

<script>
export default {
    name: 'PrismWordVault',

    props: {
        word: { type: String, default: '' },
        translate: { type: String, default: '' },
        filledCount: { type: Number, default: 4 },
        totalSlots: { type: Number, default: 12 },
        remaining: { type: Number, default: 6 },
    },

    computed: {
        doneCount() {
            return Math.max(0, this.totalSlots - this.remaining);
        },
    },
};
</script>

<style scoped lang="scss">
.prism-deck {
    width: min(100%, 320px);
    margin: 0 auto;
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    animation: prism-deck-in 0.6s ease both;
}

.prism-deck__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 8px;
}

.prism-deck__title {
    margin: 0;
    font-family: var(--dp-font-display);
    font-size: 18px;
    color: var(--dp-text);
}

.prism-deck__subtitle {
    margin: 4px 0 0;
    font-family: var(--dp-font-title);
    font-size: 13px;
    color: var(--dp-muted);
}

.prism-deck__progress {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    max-width: 108px;
    justify-content: flex-end;
}

.prism-deck__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.15);

    &--done {
        background: var(--dp-accent);
        border-color: transparent;
        box-shadow: 0 0 8px color-mix(in srgb, var(--dp-accent) 50%, transparent);
    }
}

.prism-deck__remaining {
    margin: 0 0 12px;
    font-family: var(--dp-font-title);
    font-size: 13px;
    color: var(--dp-muted);

    strong {
        color: var(--dp-accent-alt);
        font-family: var(--dp-font-mono);
    }
}

.prism-deck__stack {
    position: relative;
    height: 200px;
    margin: 0 auto 12px;
    width: 88%;
}

.prism-deck__card {
    position: absolute;
    left: 50%;
    width: 100%;
    max-width: 280px;
    transform: translateX(-50%);
    border-radius: var(--dp-radius-lg);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);

    &--back-2 {
        top: 14px;
        height: 168px;
        opacity: 0.25;
        background: rgba(255, 255, 255, 0.06);
        transform: translateX(-50%) scale(0.92);
    }

    &--back-1 {
        top: 8px;
        height: 176px;
        opacity: 0.45;
        background: rgba(255, 255, 255, 0.08);
        transform: translateX(-50%) scale(0.96);
    }

    &--front {
        top: 0;
        min-height: 184px;
        padding: 22px 18px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        animation: prism-card-enter 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
}

.prism-deck__tag {
    position: absolute;
    top: 14px;
    left: 14px;
    padding: 4px 10px;
    border-radius: 999px;
    font-family: var(--dp-font-mono);
    font-size: 10px;
    letter-spacing: 0.06em;
    color: var(--dp-muted);
    background: rgba(255, 255, 255, 0.08);
}

.prism-deck__en {
    margin: 0;
    font-family: var(--dp-font-display);
    font-size: clamp(24px, 7.5vw, 34px);
    line-height: 1.15;
    color: var(--dp-text);
    word-break: break-word;
    hyphens: auto;
    max-width: 100%;
}

.prism-deck__ru {
    margin: 10px 0 0;
    font-family: var(--dp-font-title);
    font-size: 18px;
    color: var(--dp-accent-alt);
    line-height: 1.3;
}

.prism-deck__prompt {
    margin: 0;
    text-align: center;
    font-family: var(--dp-font-ui);
    font-size: 15px;
    color: var(--dp-text);
}

@keyframes prism-deck-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes prism-card-enter {
    from { opacity: 0; transform: translateX(-50%) translateY(20px) rotate(-2deg); }
    to { opacity: 1; transform: translateX(-50%) translateY(0) rotate(0); }
}
</style>
