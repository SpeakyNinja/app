<template>
    <div class="dp-neon-bg" aria-hidden="true">
        <div class="dp-neon-bg__base" />
        <div class="dp-neon-bg__wash dp-neon-bg__wash--top" />
        <div class="dp-neon-bg__wash dp-neon-bg__wash--bottom" />
        <div class="dp-neon-bg__column-glow" />
        <div class="dp-neon-bg__dots" />
        <div class="dp-neon-bg__horizon" />
    </div>
</template>

<script>
export default {
    name: 'DesignPreviewNeonBg',
};
</script>

<style scoped lang="scss">
.dp-neon-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
}

.dp-neon-bg__base {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        168deg,
        #15171d 0%,
        #111318 42%,
        #0d0e12 100%
    );
}

.dp-neon-bg__wash {
    position: absolute;
    filter: blur(40px);
    opacity: 0.85;
    animation: dp-neon-wash 16s ease-in-out infinite alternate;
}

.dp-neon-bg__wash--top {
    width: 120%;
    height: 45%;
    top: -8%;
    left: -10%;
    background: radial-gradient(ellipse at 50% 80%, rgba(154, 164, 184, 0.11) 0%, transparent 68%);
}

.dp-neon-bg__wash--bottom {
    width: 110%;
    height: 42%;
    bottom: -10%;
    left: -5%;
    background: radial-gradient(ellipse at 50% 20%, rgba(184, 160, 120, 0.07) 0%, transparent 65%);
    animation-delay: -6s;
}

.dp-neon-bg__column-glow {
    position: absolute;
    inset: 8% 12% 12%;
    background: radial-gradient(ellipse 80% 55% at 50% 38%, rgba(120, 130, 150, 0.06) 0%, transparent 70%);
}

.dp-neon-bg__dots {
    position: absolute;
    inset: 0;
    opacity: 0.28;
    background-image: radial-gradient(rgba(255, 255, 255, 0.12) 0.6px, transparent 0.6px);
    background-size: 22px 22px;
    mask-image: linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.35) 100%);
}

.dp-neon-bg__horizon {
    position: absolute;
    left: 5%;
    right: 5%;
    top: 32%;
    height: 1px;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(154, 164, 184, 0.28) 35%,
        rgba(184, 160, 120, 0.18) 65%,
        transparent 100%
    );
    box-shadow: 0 0 18px rgba(154, 164, 184, 0.1);
    animation: dp-neon-horizon 12s ease-in-out infinite alternate;
}

@keyframes dp-neon-wash {
    from { opacity: 0.7; transform: scale(1); }
    to { opacity: 1; transform: scale(1.04); }
}

@keyframes dp-neon-horizon {
    from { opacity: 0.4; transform: scaleX(0.94); }
    to { opacity: 0.75; transform: scaleX(1); }
}
</style>
