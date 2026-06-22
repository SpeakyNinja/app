<template>
    <Transition name="cookie-slide">
        <div v-if="visible" class="cookie-consent">
            <div class="cookie-consent__panel">
                <p class="cookie-consent__text">
                    Мы используем cookie и сервисы аналитики для работы приложения и улучшения сервиса.
                    Подробнее — в
                    <router-link to="/privacy" class="cookie-consent__link">политике обработки ПДн</router-link>.
                </p>
                <div class="cookie-consent__actions">
                    <button type="button" class="btn green" @click="acceptAll">Принять все</button>
                    <button type="button" class="btn dark-gray" @click="acceptEssential">Только необходимые</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
    import ConsentService from '@/services/ConsentService.js';
    import YandexMetrika from '@/services/YandexMetrika.js';

    export default {
        data() {
            return {
                visible: false,
            };
        },

        methods: {
            acceptAll() {
                ConsentService.acceptAll();
                YandexMetrika.initIfConsented();
                this.visible = false;
            },

            acceptEssential() {
                ConsentService.acceptEssentialOnly();
                this.visible = false;
            },
        },

        mounted() {
            if (ConsentService.hasBannerAnswer()) {
                return;
            }

            window.setTimeout(() => {
                this.visible = true;
            }, 400);
        },
    };
</script>

<style lang="scss" scoped>
    .cookie-consent {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
        padding: 16px;
        pointer-events: none;

        &__panel {
            pointer-events: auto;
            width: 100%;
            max-width: min(500px, 50vh, calc(100vw - 32px));
            padding: 20px;
            border-radius: 16px;
            background: rgba(20, 20, 24, 0.96);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
            box-sizing: border-box;
        }

        &__text {
            margin: 0 0 16px;
            color: #ebebed;
            font-size: 15px;
            line-height: 1.45;
        }

        &__link {
            color: #7dd3fc;
            text-decoration: underline;
        }

        &__actions {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .btn {
                width: 100%;
            }
        }
    }

    .cookie-slide-enter-active,
    .cookie-slide-leave-active {
        transition: opacity 0.45s ease;
    }

    .cookie-slide-enter-active .cookie-consent__panel,
    .cookie-slide-leave-active .cookie-consent__panel {
        transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .cookie-slide-enter-from,
    .cookie-slide-leave-to {
        opacity: 0;
    }

    .cookie-slide-enter-from .cookie-consent__panel,
    .cookie-slide-leave-to .cookie-consent__panel {
        opacity: 0;
        transform: translateY(20px);
    }

    @media (max-width: 500px) {
        .cookie-consent__panel {
            max-width: calc(100vw - 32px);
        }
    }
</style>
