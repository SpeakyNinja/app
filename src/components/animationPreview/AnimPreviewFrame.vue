<template>
    <div class="anim-preview-frame">
        <div class="anim-preview-stage">
            <slot />
        </div>
        <button type="button" class="anim-preview-replay" @click="$emit('replay')">
            ↻ Повторить
        </button>
    </div>
</template>

<script>
export default {
    name: 'AnimPreviewFrame',
    emits: ['replay'],
};
</script>

<style lang="scss">
.anim-preview-frame {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: #ebebed;
}

.anim-preview-stage {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    position: relative;
}

.anim-preview-replay {
    flex-shrink: 0;
    margin: 12px 16px 20px;
    padding: 10px 16px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(39, 39, 51, 0.95);
    color: #ebebed;
    font-size: 14px;
    cursor: pointer;

    &:active {
        opacity: 0.85;
    }
}

@keyframes ap-slide-up {
    from {
        opacity: 0;
        transform: translateY(var(--ap-distance, 10px));
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes ap-slide-down {
    from {
        opacity: 0;
        transform: translateY(calc(-1 * var(--ap-distance, 10px)));
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes ap-slide-left {
    from {
        opacity: 0;
        transform: translateX(var(--ap-distance, 10px));
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes ap-slide-right {
    from {
        opacity: 0;
        transform: translateX(calc(-1 * var(--ap-distance, 10px)));
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes ap-fade {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes ap-scale-in {
    from {
        opacity: 0;
        transform: scale(var(--ap-scale-from, 1.1));
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes ap-blur-in {
    from {
        opacity: 0;
        filter: blur(6px);
        transform: translateY(var(--ap-distance, 10px));
    }

    to {
        opacity: 1;
        filter: blur(0);
        transform: translateY(0);
    }
}

.ap-anim-line-slide-up {
    animation: ap-slide-up var(--ap-duration) var(--ap-easing) forwards;
}

.ap-anim-line-fade {
    animation: ap-fade var(--ap-duration) var(--ap-easing) forwards;
}

.ap-anim-line-slide-left {
    animation: ap-slide-left var(--ap-duration) var(--ap-easing) forwards;
}

.ap-anim-line-slide-right {
    animation: ap-slide-right var(--ap-duration) var(--ap-easing) forwards;
}

.ap-anim-line-scale {
    animation: ap-scale-in var(--ap-duration) var(--ap-easing) forwards;
}

.ap-anim-line-blur {
    animation: ap-blur-in var(--ap-duration) var(--ap-easing) forwards;
}
</style>
