<template>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path :d="paths[name] || paths.spark" />
    </svg>
</template>
<script setup>
defineProps({ name: { type: String, default: 'spark' } });
const paths = {
    spark: 'M12 2 14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5Z',
    sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    map: 'm3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2ZM9 3v16m6-14v16',
    chat: 'M20 11a8 8 0 0 1-8 8H4l-2 3V11a9 9 0 0 1 18 0ZM7 10h8m-8 4h5',
    compass: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Zm-6-4-2 6-6 2 2-6Z',
    arrow: 'M5 12h14m-6-6 6 6-6 6',
    back: 'M19 12H5m6-6-6 6 6 6',
    check: 'm5 12 4 4L19 6',
    close: 'm6 6 12 12M6 18 18 6',
    sound: 'm3 9 5 0 5-5v16l-5-5H3Zm14-2a7 7 0 0 1 0 10m3-13a11 11 0 0 1 0 16',
    person: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-2a8 8 0 0 1 16 0v2',
    settings: 'M4 7h16M4 17h16M9 4v6m6 4v6',
};
</script>
