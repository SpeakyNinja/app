<template>
    <DesignPreviewShell :variant="variant">
        <div
            class="dp-auth-intro"
            :class="{
                'dp-auth-intro--layout': layoutReady,
                'dp-auth-intro--neon': variant === 'neon_noir',
                'dp-auth-intro--liquid': variant === 'liquid_glass',
                'dp-auth-intro--prism': variant === 'prism_flow',
            }"
        >
            <div class="dp-auth-intro__stack">
                <div class="dp-auth-intro__eyes-layer">
                    <div
                        class="dp-auth-intro__eyes"
                        :class="{
                            'dp-auth-intro__eyes--visible': showEyes,
                            'dp-auth-intro__eyes--opening': eyesOpening,
                            'dp-auth-intro__eyes--docked': layoutReady,
                        }"
                    >
                        <TalosEyes
                            :animated="eyesAnimated"
                            mood="neutral"
                            mood-transition
                            fill="var(--dp-mascot-fill)"
                            class="ai-image"
                        />
                    </div>
                </div>

                <div
                    class="dp-auth-intro__ui"
                    :class="{ 'dp-auth-intro__ui--visible': layoutReady }"
                >
                    <div class="dp-auth-intro__glass">
                        <div class="dp-auth__title">Speaky.Ninja</div>
                        <div class="dp-auth__tagline">слова запомнятся сами</div>

                        <div class="dp-auth__buttons">
                            <div class="dp-btn dp-btn--outline">Войти</div>
                            <div class="dp-btn dp-btn--outline">Зарегистрироваться</div>
                            <div class="dp-btn dp-btn--primary">Пропустить</div>
                        </div>
                    </div>

                    <div class="dp-auth__legal">
                        <div>Продолжая, вы принимаете</div>
                        <span class="dp-auth__terms" tabindex="0" role="link">данные условия</span>
                    </div>
                </div>
            </div>
        </div>
    </DesignPreviewShell>
</template>

<script>
import TalosEyes from '@/components/TalosEyes.vue';
import DesignPreviewShell from '@/components/designPreview/DesignPreviewShell.vue';

const EMPTY_MS = 420;
const OPEN_MS = 680;
const HOLD_MS = 1500;
const UI_REVEAL_MS = 620;

export default {
    name: 'DesignPreviewAuth',

    components: { TalosEyes, DesignPreviewShell },

    props: { variant: { type: String, default: 'baseline' } },

    data() {
        return {
            showEyes: false,
            eyesOpening: false,
            eyesAnimated: false,
            layoutReady: false,
            introTimers: [],
        };
    },

    watch: {
        variant() {
            this.restartIntro();
        },
    },

    mounted() {
        this.restartIntro();
    },

    beforeUnmount() {
        this.clearIntroTimers();
    },

    methods: {
        clearIntroTimers() {
            this.introTimers.forEach(clearTimeout);
            this.introTimers = [];
        },

        schedule(ms, fn) {
            this.introTimers.push(setTimeout(fn, ms));
        },

        restartIntro() {
            this.clearIntroTimers();
            this.showEyes = false;
            this.eyesOpening = false;
            this.eyesAnimated = false;
            this.layoutReady = false;

            if (typeof window !== 'undefined'
                && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.showEyes = true;
                this.eyesOpening = true;
                this.eyesAnimated = true;
                this.layoutReady = true;
                return;
            }

            this.schedule(EMPTY_MS, () => {
                this.showEyes = true;
                this.$nextTick(() => {
                    this.eyesOpening = true;
                });
            });

            this.schedule(EMPTY_MS + OPEN_MS + HOLD_MS, () => {
                this.layoutReady = true;
            });

            this.schedule(EMPTY_MS + OPEN_MS + HOLD_MS + UI_REVEAL_MS, () => {
                this.eyesAnimated = true;
            });
        },
    },
};
</script>

<style scoped lang="scss">
.dp-auth-intro--neon {
    background: transparent;
}
</style>
