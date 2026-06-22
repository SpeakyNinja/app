<template>
    <div
        class="dp-speed"
        :class="`dp-speed--${variant}`"
        :style="{ width: `${size}px` }"
    >
        <svg
            class="dp-speed__svg"
            viewBox="0 0 100 58"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
        >
            <path
                ref="arcPathRef"
                class="dp-speed__track"
                :d="arcPath"
                fill="none"
                stroke-width="2.4"
                stroke-linecap="butt"
            />
            <path
                v-show="pathReady"
                class="dp-speed__progress"
                :d="arcPath"
                fill="none"
                stroke-width="2.4"
                stroke-linecap="round"
                :stroke-dasharray="progressDash"
                :stroke-dashoffset="progressOffset"
                :style="baselineStrokeStyle"
            />
        </svg>

        <div class="dp-speed__readout">
            <div class="dp-speed__value">
                <span class="dp-speed__sign">+</span>
                <span class="dp-speed__num">{{ curValue }}</span>
            </div>
            <div class="dp-speed__label">
                {{ tools.plural(curValue, ['выученное', 'выученных', 'выученных']) }}
                {{ tools.plural(curValue, ['слово', 'слова', 'слов']) }}
                за месяц
            </div>
        </div>
    </div>
</template>

<script>
import ToolsService from '@/services/ToolsService.js';

export default {
    name: 'DesignPreviewSpeedWidget',

    props: {
        curValue: { type: Number, required: true },
        maxValue: { type: Number, required: true },
        progressSize: { type: Number, default: 300 },
        variant: { type: String, default: 'baseline' },
    },

    data() {
        return {
            tools: new ToolsService(),
            cx: 50,
            cy: 50,
            radius: 42,
            pathLength: 0,
            pathReady: false,
        };
    },

    computed: {
        size() {
            return this.progressSize;
        },

        progress() {
            const pct = Math.round((this.curValue * 100) / this.maxValue);
            return Math.min(100, Math.max(0, pct));
        },

        arcPath() {
            const { cx, cy, radius: r } = this;
            return `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
        },

        visibleLength() {
            if (!this.pathLength) {
                return 0;
            }

            return (this.progress / 100) * this.pathLength;
        },

        progressDash() {
            if (!this.pathLength) {
                return '0 1';
            }

            return `${this.pathLength} ${this.pathLength}`;
        },

        progressOffset() {
            return Math.max(0, this.pathLength - this.visibleLength);
        },

        baselineStrokeStyle() {
            if (this.variant !== 'baseline') {
                return null;
            }

            return { stroke: this.baselineProgressColor };
        },

        baselineProgressColor() {
            if (this.curValue <= 200) {
                return '#fb4545';
            }

            if (this.curValue <= 400) {
                return '#fb823d';
            }

            if (this.curValue <= 600) {
                return '#f7cc0f';
            }

            if (this.curValue <= 700) {
                return '#96dd47';
            }

            return '#7cdeff';
        },
    },

    watch: {
        arcPath() {
            this.measurePath();
        },

        progressSize() {
            this.measurePath();
        },
    },

    mounted() {
        this.measurePath();
    },

    methods: {
        measurePath() {
            this.pathReady = false;
            this.pathLength = 0;

            this.$nextTick(() => {
                const path = this.$refs.arcPathRef;

                if (!path) {
                    return;
                }

                const total = path.getTotalLength();

                if (total <= 0) {
                    return;
                }

                this.pathLength = total;
                this.pathReady = true;
            });
        },
    },
};
</script>
