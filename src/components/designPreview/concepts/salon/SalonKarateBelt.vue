<template>
    <div class="cf-salon__belt-block" :class="{ 'cf-salon__belt-block--compact': compact }">
        <div class="cf-salon__belt-visual" aria-hidden="true">
            <div class="cf-salon__belt-tail cf-salon__belt-tail--left" :style="tailStyle(current)" />
            <div class="cf-salon__belt-knot" :style="knotStyle(current)">
                <TalosEyes
                    class="cf-salon__belt-knot-logo"
                    mood="neutral"
                    :animated="false"
                    hide-pupils
                    :fill="logoFill"
                />
            </div>
            <div class="cf-salon__belt-tail cf-salon__belt-tail--right" :style="tailStyle(current)" />
        </div>

        <div class="cf-salon__belt-rank">
            <span class="cf-salon__belt-rank-label">Текущий пояс</span>
            <span class="cf-salon__belt-rank-name" :style="{ color: current.color }">
                {{ current.name }}
            </span>
        </div>

        <div v-if="next" class="cf-salon__belt-progress">
            <div class="cf-salon__belt-progress-head">
                <span>До {{ next.name }} пояса</span>
                <span class="cf-salon__belt-progress-pct">{{ progress }}%</span>
            </div>
            <div class="cf-salon__belt-progress-track">
                <div
                    class="cf-salon__belt-progress-fill"
                    :style="{
                        width: `${progress}%`,
                        '--belt-from': current.color,
                        '--belt-to': next.color,
                    }"
                />
                <div
                    class="cf-salon__belt-progress-marker"
                    :style="{
                        left: `${progress}%`,
                        background: next.color,
                        borderColor: next.edge,
                    }"
                />
            </div>
            <div class="cf-salon__belt-progress-foot">
                <span
                    class="cf-salon__belt-swatch"
                    :style="{ background: current.color, borderColor: current.edge }"
                />
                <span v-if="wordsLabel" class="cf-salon__belt-words">{{ wordsLabel }}</span>
                <span
                    class="cf-salon__belt-swatch cf-salon__belt-swatch--next"
                    :style="{ background: next.color, borderColor: next.edge }"
                />
            </div>
        </div>

        <div v-else class="cf-salon__belt-maxed">
            Максимальный ранг достигнут
        </div>

        <div v-if="showLadder && !compact" class="cf-salon__belt-ladder">
            <div
                v-for="(rank, i) in ranks"
                :key="rank.id"
                class="cf-salon__belt-step"
                :class="{
                    'cf-salon__belt-step--done': i < currentIndex,
                    'cf-salon__belt-step--current': i === currentIndex,
                    'cf-salon__belt-step--next': i === currentIndex + 1,
                }"
                :title="rank.name"
            >
                <span
                    class="cf-salon__belt-step-bar"
                    :style="{ background: rank.color, borderColor: rank.edge }"
                />
            </div>
        </div>
    </div>
</template>

<script>
import TalosEyes from '@/components/TalosEyes.vue';
import {
    SALON_BELT_RANKS,
    getSalonBeltByIndex,
    getSalonNextBelt,
} from '@/utils/salonMockData.js';

const LIGHT_BELT_IDS = new Set(['white', 'yellow']);

export default {
    name: 'SalonKarateBelt',

    components: { TalosEyes },

    props: {
        currentIndex: { type: Number, default: 3 },
        progress: { type: Number, default: 72 },
        wordsCurrent: { type: Number, default: 0 },
        wordsRequired: { type: Number, default: 0 },
        compact: { type: Boolean, default: false },
        showLadder: { type: Boolean, default: true },
    },

    computed: {
        ranks() {
            return SALON_BELT_RANKS;
        },

        current() {
            return getSalonBeltByIndex(this.currentIndex);
        },

        next() {
            return getSalonNextBelt(this.currentIndex);
        },

        wordsLabel() {
            if (!this.wordsRequired) {
                return '';
            }

            const left = Math.max(0, this.wordsRequired - this.wordsCurrent);

            return `${this.wordsCurrent} / ${this.wordsRequired} слов · осталось ${left}`;
        },

        logoFill() {
            return LIGHT_BELT_IDS.has(this.current.id) ? '#121216' : '#f0f0f2';
        },
    },

    methods: {
        tailStyle(rank) {
            return {
                background: `linear-gradient(180deg, ${rank.color} 0%, ${rank.edge} 100%)`,
                boxShadow: `0 4px 16px ${rank.shadow}`,
            };
        },

        knotStyle(rank) {
            return {
                background: `linear-gradient(145deg, ${rank.color}, ${rank.edge})`,
                boxShadow: `0 6px 20px ${rank.shadow}`,
            };
        },
    },
};
</script>
