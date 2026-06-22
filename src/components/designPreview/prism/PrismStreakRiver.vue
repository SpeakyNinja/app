<template>
    <div class="prism-streak">
        <div class="prism-streak__path" aria-hidden="true">
            <svg viewBox="0 0 300 48" preserveAspectRatio="none" class="prism-streak__svg">
                <path
                    d="M 8 28 C 60 8, 100 40, 150 24 S 240 8, 292 28"
                    class="prism-streak__line"
                    fill="none"
                    stroke-width="3"
                />
            </svg>
        </div>
        <div class="prism-streak__nodes">
            <div
                v-for="(node, i) in nodes"
                :key="i"
                class="prism-streak__node"
                :class="node.className"
                :style="{ animationDelay: `${i * 0.1}s` }"
            >
                <span class="prism-streak__node-num">{{ node.day }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PrismStreakRiver',

    props: {
        activeDays: { type: Number, default: 7 },
        maxDays: { type: Number, default: 12 },
    },

    computed: {
        nodes() {
            const count = Math.min(this.maxDays, 8);
            return Array.from({ length: count }, (_, i) => {
                const day = i + 1;
                let className = 'prism-streak__node--empty';
                if (day <= this.activeDays) {
                    className = 'prism-streak__node--active';
                } else if (day <= this.maxDays) {
                    className = 'prism-streak__node--pending';
                }
                return { day, className };
            });
        },
    },
};
</script>

<style scoped lang="scss">
.prism-streak {
    width: 100%;
    padding: 8px 0 16px;
}

.prism-streak__path {
    width: 100%;
    height: 48px;
    margin-bottom: -28px;
}

.prism-streak__svg {
    width: 100%;
    height: 100%;
}

.prism-streak__line {
    stroke: var(--dp-accent);
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
    filter: drop-shadow(0 0 6px color-mix(in srgb, var(--dp-accent) 50%, transparent));
    animation: prism-streak-draw 1.6s ease forwards;
}

.prism-streak__nodes {
    display: flex;
    justify-content: space-between;
    gap: 4px;
    padding: 0 4px;
}

.prism-streak__node {
    flex: 1;
    max-width: 36px;
    aspect-ratio: 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--dp-font-mono);
    font-size: 11px;
    animation: prism-node-pop 0.45s ease both;

    &--active {
        background: linear-gradient(145deg, var(--dp-accent), var(--dp-accent-alt));
        color: #051018;
        box-shadow: 0 0 14px color-mix(in srgb, var(--dp-accent) 55%, transparent);
    }

    &--pending {
        background: rgba(255, 255, 255, 0.08);
        border: 1px dashed rgba(255, 255, 255, 0.2);
        color: var(--dp-muted);
    }

    &--empty {
        background: rgba(255, 255, 255, 0.04);
        color: var(--dp-muted);
        opacity: 0.5;
    }
}

@keyframes prism-streak-draw {
    to { stroke-dashoffset: 0; }
}

@keyframes prism-node-pop {
    from { opacity: 0; transform: scale(0.5) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
