<template>
    <div class="dp-stat-pult" v-if="curIndex < layers.length - 1">
        <button
            type="button"
            class="dp-stat-pult__arrow"
            :class="{ 'dp-stat-pult__arrow--muted': curIndex === 0 }"
            aria-label="Предыдущий слой"
            @click="$emit('toggle', -1)"
        >
            <IcoArrow />
        </button>

        <div class="dp-stat-pult__text">{{ layers[curIndex].title }}</div>

        <button
            type="button"
            class="dp-stat-pult__arrow dp-stat-pult__arrow--next"
            aria-label="Следующий слой"
            @click="$emit('toggle', 1)"
        >
            <IcoArrow />
        </button>
    </div>
</template>

<script>
import IcoArrow from '@/components/icons/IcoArrow.vue';

export default {
    name: 'DesignPreviewStatPult',

    components: {
        IcoArrow,
    },

    emits: ['toggle'],

    props: {
        layers: {
            type: Array,
            required: true,
        },
        curIndex: {
            type: Number,
            required: true,
        },
    },
};
</script>
