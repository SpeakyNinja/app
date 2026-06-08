<template>
    <div class="modal-screen">
        <div class="modal-screen__bg">
            <Training />
        </div>

        <Transition :name="transitionName" appear>
            <div
                v-if="open"
                class="modal-screen__mask"
                :style="maskStyle"
            >
                <div class="modal-container">
                    <div class="modal-header">Подтверждение</div>
                    <div class="modal-body mt-3">
                        Продолжить тренировку?
                    </div>
                    <div class="modal-footer mt-3">
                        <span class="modal-hint">Демо: окно появляется поверх тренировки</span>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
import Training from '@/views/Training.vue';
import { sleep } from '@/utils/animPreviewDemo.js';
import { ANIMATION_CONFIG_KEY, REPLAY_KEY, durationCss, easingCss } from '@/utils/animationPreviewConfig.js';
import { inject } from 'vue';

export default {
    name: 'ModalScreen',

    components: { Training },

    setup() {
        return {
            config: inject(ANIMATION_CONFIG_KEY),
            replayKey: inject(REPLAY_KEY),
        };
    },

    data() {
        return {
            open: false,
        };
    },

    computed: {
        transitionName() {
            const map = {
                scale: 'modal-scale',
                fade: 'modal-fade',
                slide_up: 'modal-slide-up',
                slide_down: 'modal-slide-down',
            };

            return map[this.config?.preset] || map.scale;
        },

        maskStyle() {
            return {
                '--modal-duration': durationCss(this.config?.duration_ms || 300),
                '--modal-easing': easingCss(this.config?.easing || 'ease'),
                '--modal-scale-from': this.config?.scale_from || 1.1,
            };
        },
    },

    watch: {
        replayKey: {
            immediate: true,
            handler() {
                this.playOpen();
            },
        },
        config: {
            deep: true,
            handler() {
                this.playOpen();
            },
        },
    },

    methods: {
        async playOpen() {
            this.open = false;
            await sleep(80);
            this.open = true;
        },
    },
};
</script>

<style scoped lang="scss">
.modal-screen {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
}

.modal-screen__bg {
    position: absolute;
    inset: 0;
    overflow: hidden;

    :deep(.training) {
        height: 100%;
        min-height: 100%;
    }
}

.modal-screen__mask {
    position: absolute;
    inset: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    width: min(320px, 88vw);
    margin: 0 auto;
    padding: 24px 20px;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    text-align: center;
    border-radius: 10px;
    color: #111;
}

.modal-header {
    font-size: 20px;
    font-weight: 600;
}

.modal-body {
    font-size: 16px;
    margin-top: 12px;
}

.modal-hint {
    font-size: 12px;
    color: #6b7280;
}

.modal-scale-enter-active,
.modal-scale-leave-active,
.modal-fade-enter-active,
.modal-fade-leave-active,
.modal-slide-up-enter-active,
.modal-slide-up-leave-active,
.modal-slide-down-enter-active,
.modal-slide-down-leave-active {
    transition: opacity var(--modal-duration, 300ms) var(--modal-easing, ease);
}

.modal-scale-enter-active .modal-container,
.modal-scale-leave-active .modal-container {
    transition: transform var(--modal-duration, 300ms) var(--modal-easing, ease);
}

.modal-scale-enter-from,
.modal-scale-leave-to {
    opacity: 0;
}

.modal-scale-enter-from .modal-container,
.modal-scale-leave-to .modal-container {
    transform: scale(var(--modal-scale-from, 1.1));
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-slide-up-enter-active .modal-container,
.modal-slide-up-leave-active .modal-container {
    transition: transform var(--modal-duration, 300ms) var(--modal-easing, ease);
}

.modal-slide-up-enter-from,
.modal-slide-up-leave-to {
    opacity: 0;
}

.modal-slide-up-enter-from .modal-container,
.modal-slide-up-leave-to .modal-container {
    transform: translateY(24px);
}

.modal-slide-down-enter-from,
.modal-slide-down-leave-to {
    opacity: 0;
}

.modal-slide-down-enter-from .modal-container,
.modal-slide-down-leave-to .modal-container {
    transform: translateY(-24px);
}
</style>
