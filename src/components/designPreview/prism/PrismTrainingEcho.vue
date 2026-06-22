<template>
    <div class="prism-echo" aria-hidden="true">
        <span v-for="i in 4" :key="i" class="prism-echo__ring" :style="{ '--ring-i': i }" />
        <div class="prism-echo__core" />
    </div>
</template>

<script>
export default {
    name: 'PrismTrainingEcho',
};
</script>

<style scoped lang="scss">
.prism-echo {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 16px;
}

.prism-echo__ring {
    position: absolute;
    inset: calc(var(--ring-i) * 8px);
    border-radius: 50%;
    border: 1px solid color-mix(in srgb, var(--dp-accent) calc(50% - var(--ring-i) * 8%), transparent);
    animation: prism-echo-pulse 2.4s ease-out infinite;
    animation-delay: calc(var(--ring-i) * 0.25s);
}

.prism-echo__core {
    position: absolute;
    inset: 36%;
    border-radius: 50%;
    background: radial-gradient(circle, var(--dp-accent-alt), var(--dp-accent));
    box-shadow: 0 0 24px color-mix(in srgb, var(--dp-accent) 55%, transparent);
    animation: prism-echo-core 1.8s ease-in-out infinite alternate;
}

@keyframes prism-echo-pulse {
    0% { opacity: 0.7; transform: scale(0.85); }
    100% { opacity: 0; transform: scale(1.15); }
}

@keyframes prism-echo-core {
    from { transform: scale(1); }
    to { transform: scale(1.08); }
}
</style>
