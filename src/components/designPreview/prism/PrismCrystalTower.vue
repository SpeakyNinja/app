<template>
    <div class="prism-path">
        <div class="prism-path__head">
            <p class="prism-path__kicker">Уровень запоминания</p>
            <p class="prism-path__level">
                <span class="prism-path__level-num">{{ displayLevel }}</span>
                <span class="prism-path__level-tier">{{ tierLabel }}</span>
            </p>
        </div>

        <div class="prism-path__track dp-prism-glass">
            <div class="prism-path__rail" aria-hidden="true">
                <div class="prism-path__rail-fill" :style="{ width: `${pathProgress}%` }" />
            </div>
            <div class="prism-path__nodes">
                <div
                    v-for="node in nodes"
                    :key="node.level"
                    class="prism-path__node"
                    :class="{
                        'prism-path__node--done': node.level < displayLevel,
                        'prism-path__node--current': node.level === displayLevel,
                        'prism-path__node--future': node.level > displayLevel,
                    }"
                    :style="{ animationDelay: `${node.level * 0.05}s` }"
                >
                    <span class="prism-path__node-num">{{ node.level }}</span>
                </div>
            </div>
        </div>

        <p class="prism-path__explain">
            Чем выше уровень — тем реже слова возвращаются в тренировку
        </p>
    </div>
</template>

<script>
const TIERS = [
    { max: 3, label: 'Начальный' },
    { max: 6, label: 'Средний' },
    { max: 9, label: 'Уверенный' },
    { max: 10, label: 'Мастер' },
];

export default {
    name: 'PrismCrystalTower',

    props: {
        level: { type: Number, default: 1 },
        maxBlocks: { type: Number, default: 10 },
    },

    data() {
        return {
            displayLevel: 0,
            animFrame: null,
        };
    },

    computed: {
        nodes() {
            return Array.from({ length: this.maxBlocks }, (_, i) => ({
                level: i + 1,
            }));
        },

        pathProgress() {
            if (this.maxBlocks <= 1) {
                return 0;
            }
            return ((this.displayLevel - 1) / (this.maxBlocks - 1)) * 100;
        },

        tierLabel() {
            const tier = TIERS.find((t) => this.displayLevel <= t.max);
            return tier?.label || 'Мастер';
        },
    },

    watch: {
        level: {
            immediate: true,
            handler(v) {
                this.animateLevel(v);
            },
        },
    },

    beforeUnmount() {
        cancelAnimationFrame(this.animFrame);
    },

    methods: {
        animateLevel(target) {
            cancelAnimationFrame(this.animFrame);
            const start = performance.now();
            const from = this.displayLevel;
            const duration = 900;

            const tick = (now) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - (1 - t) ** 3;
                this.displayLevel = Math.round(from + (target - from) * eased);
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
.prism-path {
    width: 100%;
    padding: 8px 12px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: prism-path-in 0.6s ease both;
}

.prism-path__head {
    text-align: center;
    margin-bottom: 16px;
}

.prism-path__kicker {
    margin: 0 0 6px;
    font-family: var(--dp-font-title);
    font-size: 14px;
    color: var(--dp-muted);
}

.prism-path__level {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.prism-path__level-num {
    font-family: var(--dp-font-display);
    font-size: clamp(48px, 15vw, 64px);
    line-height: 1;
    color: var(--dp-text);
    text-shadow: 0 0 24px color-mix(in srgb, var(--dp-accent) 40%, transparent);
}

.prism-path__level-tier {
    padding: 4px 14px;
    border-radius: 999px;
    font-family: var(--dp-font-ui);
    font-size: 14px;
    color: var(--dp-text);
    background: color-mix(in srgb, var(--dp-accent) 22%, transparent);
    border: 1px solid color-mix(in srgb, var(--dp-accent) 35%, transparent);
}

.prism-path__track {
    width: 100%;
    max-width: 320px;
    padding: 20px 12px 16px;
    border-radius: var(--dp-radius-lg);
    position: relative;
}

.prism-path__rail {
    position: absolute;
    left: 24px;
    right: 24px;
    top: 38px;
    height: 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
}

.prism-path__rail-fill {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--dp-accent), var(--dp-accent-alt));
    box-shadow: 0 0 10px color-mix(in srgb, var(--dp-accent) 45%, transparent);
    transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.prism-path__nodes {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
}

.prism-path__node {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    animation: prism-node-in 0.4s ease both;

    &--done {
        background: linear-gradient(135deg, var(--dp-accent), #2dd4bf);
        border-color: transparent;
        color: #051018;
    }

    &--current {
        width: 40px;
        height: 40px;
        margin-top: -4px;
        background: linear-gradient(135deg, var(--dp-accent-alt), #f97316);
        border: 2px solid rgba(255, 255, 255, 0.45);
        box-shadow:
            0 0 20px color-mix(in srgb, var(--dp-accent-alt) 55%, transparent),
            0 8px 20px rgba(0, 0, 0, 0.3);
        animation: prism-node-current 2s ease-in-out infinite alternate;
    }

    &--future {
        opacity: 0.45;
    }
}

.prism-path__node-num {
    font-family: var(--dp-font-mono);
    font-size: 11px;
    color: inherit;
}

.prism-path__node--done .prism-path__node-num,
.prism-path__node--current .prism-path__node-num {
    color: #fff;
    font-weight: bold;
}

.prism-path__explain {
    margin: 14px 8px 0;
    text-align: center;
    font-family: var(--dp-font-title);
    font-size: 13px;
    line-height: 1.4;
    color: var(--dp-muted);
    max-width: 280px;
}

@keyframes prism-path-in {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes prism-node-in {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
}

@keyframes prism-node-current {
    from { transform: scale(1); }
    to { transform: scale(1.06); }
}
</style>
