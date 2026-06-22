<template>
    <div class="dp-prism-bg" aria-hidden="true">
        <div class="dp-prism-bg__base" />
        <div class="dp-prism-bg__orb dp-prism-bg__orb--teal" />
        <div class="dp-prism-bg__orb dp-prism-bg__orb--coral" />
        <div class="dp-prism-bg__orb dp-prism-bg__orb--gold" />
        <div class="dp-prism-bg__beam" />
        <div class="dp-prism-bg__grain" />
    </div>
</template>

<script>
export default {
    name: 'DesignPreviewPrismBg',
};
</script>

<style scoped lang="scss">
.dp-prism-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
}

.dp-prism-bg__base {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        168deg,
        #0a2838 0%,
        #071824 35%,
        #051018 68%,
        #030c12 100%
    );
}

.dp-prism-bg__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(56px);
    animation: dp-prism-drift 22s ease-in-out infinite alternate;
}

.dp-prism-bg__orb--teal {
    width: 62%;
    height: 46%;
    top: -8%;
    left: -14%;
    background: radial-gradient(circle, rgba(20, 184, 166, 0.32) 0%, transparent 68%);
}

.dp-prism-bg__orb--coral {
    width: 48%;
    height: 42%;
    top: 42%;
    right: -16%;
    background: radial-gradient(circle, rgba(251, 113, 133, 0.26) 0%, transparent 70%);
    animation-delay: -7s;
}

.dp-prism-bg__orb--gold {
    width: 38%;
    height: 32%;
    bottom: 6%;
    left: 22%;
    background: radial-gradient(circle, rgba(251, 191, 36, 0.18) 0%, transparent 72%);
    animation-delay: -13s;
}

.dp-prism-bg__beam {
    position: absolute;
    inset: -20% -30%;
    background: conic-gradient(
        from 210deg at 50% 40%,
        transparent 0deg,
        rgba(34, 211, 238, 0.06) 40deg,
        transparent 80deg,
        rgba(251, 113, 133, 0.05) 140deg,
        transparent 200deg
    );
    animation: dp-prism-beam 28s linear infinite;
}

.dp-prism-bg__grain {
    position: absolute;
    inset: 0;
    opacity: 0.18;
    background-image: radial-gradient(rgba(255, 255, 255, 0.08) 0.4px, transparent 0.4px);
    background-size: 18px 18px;
    mask-image: linear-gradient(to bottom, black 0%, transparent 92%);
}

@keyframes dp-prism-drift {
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(4%, 3%) scale(1.08); }
}

@keyframes dp-prism-beam {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>
