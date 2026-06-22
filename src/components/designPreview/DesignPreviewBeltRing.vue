<template>
    <div
        class="dp-belt-ring"
        :class="`dp-belt-ring--${variant}`"
        :style="{ width: `${size}px`, height: `${size}px` }"
    >
        <svg
            class="dp-belt-ring__svg"
            :width="size"
            :height="size"
            :viewBox="`0 0 ${size} ${size}`"
            aria-hidden="true"
        >
            <circle
                class="dp-belt-ring__track"
                :cx="center"
                :cy="center"
                :r="radius"
                :stroke-width="strokeWidth"
            />
            <circle
                class="dp-belt-ring__progress"
                :cx="center"
                :cy="center"
                :r="radius"
                :stroke-width="strokeWidth"
                fill="none"
                :stroke="progressStroke"
                :transform="`rotate(-90 ${center} ${center})`"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="progressOffset"
                stroke-linecap="round"
            />
            <line
                v-for="(tick, index) in ticks"
                :key="index"
                class="dp-belt-ring__tick"
                :x1="tick.x1"
                :y1="tick.y1"
                :x2="tick.x2"
                :y2="tick.y2"
                :style="{ '--tick-i': index }"
            />
        </svg>

        <div class="dp-belt-ring__content">
            <slot />
        </div>
    </div>
</template>

<script>
import { getDesignTheme } from '@/utils/designThemes.js';

export default {
    name: 'DesignPreviewBeltRing',

    props: {
        progress: {
            type: Number,
            default: 0,
        },
        beltColor: {
            type: String,
            default: '#feffc5',
        },
        tickCount: {
            type: Number,
            default: 7,
        },
        radius: {
            type: Number,
            default: 100,
        },
        strokeWidth: {
            type: Number,
            default: 6,
        },
        variant: {
            type: String,
            default: 'baseline',
        },
    },

    computed: {
        center() {
            return this.size / 2;
        },

        size() {
            return this.radius * 2 + this.strokeWidth + 8;
        },

        circumference() {
            return 2 * Math.PI * this.radius;
        },

        progressOffset() {
            const clamped = Math.min(100, Math.max(0, this.progress));
            return this.circumference * (1 - clamped / 100);
        },

        progressStroke() {
            const theme = getDesignTheme(this.variant);
            if (this.variant === 'neon_noir') {
                return theme.accentAlt;
            }
            if (this.variant === 'liquid_glass') {
                return theme.accent;
            }
            if (this.variant === 'warm_sand') {
                return theme.accent;
            }
            if (this.variant === 'terminal') {
                return theme.accent;
            }

            return this.beltColor;
        },

        ticks() {
            const marks = [];
            const inner = this.radius - this.strokeWidth / 2 - 2;
            const outer = this.radius + this.strokeWidth / 2 + 5;
            const step = 360 / Math.max(this.tickCount, 1);

            for (let angle = 0; angle < 360; angle += step) {
                const rad = (angle * Math.PI) / 180;
                marks.push({
                    x1: this.center + Math.cos(rad) * inner,
                    y1: this.center + Math.sin(rad) * inner,
                    x2: this.center + Math.cos(rad) * outer,
                    y2: this.center + Math.sin(rad) * outer,
                });
            }

            return marks;
        },
    },
};
</script>
