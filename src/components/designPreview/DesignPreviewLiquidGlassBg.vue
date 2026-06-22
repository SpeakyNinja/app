<template>
    <div class="dp-liquid-bg" aria-hidden="true">
        <div class="dp-liquid-bg__base" />
        <div class="dp-liquid-bg__orb dp-liquid-bg__orb--light" />
        <div class="dp-liquid-bg__orb dp-liquid-bg__orb--mid" />
        <div class="dp-liquid-bg__orb dp-liquid-bg__orb--soft" />
        <div class="dp-liquid-bg__mesh" />
    </div>
</template>

<script>
export default {
    name: 'DesignPreviewLiquidGlassBg',
};
</script>

<style scoped lang="scss">
.dp-liquid-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
}

.dp-liquid-bg__base {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        165deg,
        #1a1b4b 0%,
        #141538 28%,
        #0e1030 62%,
        #0a0c28 100%
    );
}

.dp-liquid-bg__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(52px);
    opacity: 0.72;
    animation: dp-liquid-float 18s ease-in-out infinite alternate;
}

.dp-liquid-bg__orb--light {
    width: 58%;
    height: 42%;
    top: -6%;
    left: -12%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.24) 0%, transparent 68%);
}

.dp-liquid-bg__orb--mid {
    width: 52%;
    height: 48%;
    top: 38%;
    right: -18%;
    background: radial-gradient(circle, rgba(122, 158, 194, 0.2) 0%, transparent 70%);
    animation-delay: -6s;
}

.dp-liquid-bg__orb--soft {
    width: 44%;
    height: 36%;
    bottom: -4%;
    left: 18%;
    background: radial-gradient(circle, rgba(67, 56, 202, 0.18) 0%, transparent 72%);
    animation-delay: -11s;
}

.dp-liquid-bg__mesh {
    position: absolute;
    inset: 0;
    opacity: 0.24;
    background-image: radial-gradient(rgba(165, 180, 252, 0.14) 0.5px, transparent 0.5px);
    background-size: 20px 20px;
    mask-image: linear-gradient(to bottom, black 0%, transparent 88%);
}

@keyframes dp-liquid-float {
    from {
        transform: translate(0, 0) scale(1);
    }
    to {
        transform: translate(3%, 2%) scale(1.06);
    }
}
</style>
