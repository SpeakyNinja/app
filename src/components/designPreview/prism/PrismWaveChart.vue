<template>
    <div class="prism-wave" :style="{ '--prism-wave-h': `${height}px` }">
        <svg
            :viewBox="`0 0 ${width} ${height}`"
            class="prism-wave__svg"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient :id="gradId" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--dp-accent)" stop-opacity="0.55" />
                    <stop offset="100%" stop-color="var(--dp-accent-alt)" stop-opacity="0.02" />
                </linearGradient>
                <filter :id="glowId">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <path
                class="prism-wave__fill"
                :d="fillPath"
                :fill="`url(#${gradId})`"
            />
            <path
                class="prism-wave__line"
                :class="{ 'prism-wave__line--animate': animate }"
                :d="linePath"
                :stroke="lineColor"
                :filter="`url(#${glowId})`"
                fill="none"
                stroke-width="3"
                stroke-linecap="round"
            />
            <g v-for="(pt, i) in markerPoints" :key="i">
                <line
                    :x1="pt.x"
                    :y1="pt.y"
                    :x2="pt.x"
                    :y2="height - 8"
                    stroke="rgba(255,255,255,0.12)"
                    stroke-width="1"
                    stroke-dasharray="3 4"
                />
                <circle
                    :cx="pt.x"
                    :cy="pt.y"
                    r="5"
                    class="prism-wave__dot"
                    :style="{ animationDelay: `${i * 0.12}s` }"
                />
            </g>
        </svg>
        <div v-if="labels.length" class="prism-wave__labels">
            <span v-for="(lb, i) in labels" :key="i">{{ lb }}</span>
        </div>
    </div>
</template>

<script>
let waveUid = 0;

export default {
    name: 'PrismWaveChart',

    props: {
        values: { type: Array, default: () => [40, 62, 48, 78, 55, 88, 72] },
        width: { type: Number, default: 300 },
        height: { type: Number, default: 120 },
        labels: { type: Array, default: () => [] },
        animate: { type: Boolean, default: true },
        lineColor: { type: String, default: 'var(--dp-accent-alt)' },
    },

    data() {
        waveUid += 1;
        return { uid: waveUid };
    },

    computed: {
        gradId() {
            return `prism-wave-grad-${this.uid}`;
        },

        glowId() {
            return `prism-wave-glow-${this.uid}`;
        },

        normalized() {
            const vals = this.values.length ? this.values : [50];
            const max = Math.max(...vals, 1);
            const pad = 14;
            const innerH = this.height - pad * 2;
            return vals.map((v, i) => ({
                x: pad + (i / Math.max(vals.length - 1, 1)) * (this.width - pad * 2),
                y: pad + innerH - (v / max) * innerH,
            }));
        },

        linePath() {
            const pts = this.normalized;
            if (pts.length < 2) {
                return '';
            }
            let d = `M ${pts[0].x} ${pts[0].y}`;
            for (let i = 1; i < pts.length; i += 1) {
                const prev = pts[i - 1];
                const cur = pts[i];
                const cx = (prev.x + cur.x) / 2;
                d += ` C ${cx} ${prev.y}, ${cx} ${cur.y}, ${cur.x} ${cur.y}`;
            }
            return d;
        },

        fillPath() {
            const pts = this.normalized;
            if (!pts.length) {
                return '';
            }
            const base = this.height - 6;
            return `${this.linePath} L ${pts[pts.length - 1].x} ${base} L ${pts[0].x} ${base} Z`;
        },

        markerPoints() {
            return this.normalized.filter((_, i) => i === 0 || i === this.normalized.length - 1);
        },
    },
};
</script>

<style scoped lang="scss">
.prism-wave {
    width: 100%;
    position: relative;
}

.prism-wave__svg {
    width: 100%;
    height: var(--prism-wave-h);
    display: block;
}

.prism-wave__line--animate {
    stroke-dasharray: 600;
    stroke-dashoffset: 600;
    animation: prism-wave-draw 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.prism-wave__dot {
    fill: var(--dp-accent-alt);
    filter: drop-shadow(0 0 6px color-mix(in srgb, var(--dp-accent-alt) 70%, transparent));
    animation: prism-dot-pop 0.5s ease both;
}

.prism-wave__labels {
    display: flex;
    justify-content: space-between;
    padding: 6px 8px 0;
    font-family: var(--dp-font-mono);
    font-size: 11px;
    color: var(--dp-muted);
}

@keyframes prism-wave-draw {
    to { stroke-dashoffset: 0; }
}

@keyframes prism-dot-pop {
    from { opacity: 0; transform: scale(0.4); }
    to { opacity: 1; transform: scale(1); }
}
</style>
