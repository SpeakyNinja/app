<template>
    <div class="eyes-mood-screen main-bg">
        <div class="eyes-mood-screen__stage">
            <div class="eyes-mood-screen__eyes">
                <TalosEyes
                    :key="replayKey"
                    :mood="mood"
                    mood-transition
                    :mood-transition-ms="moodTransitionMs"
                    fill="#ebebed"
                    class="ai-image eyes-mood-screen__svg"
                />
            </div>
            <div class="eyes-mood-screen__meta">
                <p class="eyes-mood-screen__label m-light">{{ moodLabel }}</p>
                <p class="eyes-mood-screen__hint m-light">{{ moodHint }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import TalosEyes from '@/components/TalosEyes.vue';
import { ANIMATION_CONFIG_KEY, REPLAY_KEY } from '@/utils/animationPreviewConfig.js';
import { TALOS_EYES_MOOD_LABELS, normalizeTalosEyesMoodKey } from '@/utils/talosEyesMoods.js';
import { inject, unref } from 'vue';

const MOOD_HINTS = {
    neutral: 'Спокойный осмотр, два моргания за цикл.',
    thinking: 'Сначала вниз-влево, потом верхние веки широко — вверх-влево.',
    listening: 'Поочерёдно влево и вправо.',
    focused: 'Прищурен, веки сходятся, взгляд чуть вниз.',
    happy: 'Закрытая улыбка, лёгкое покачивание от удовольствия. Смена mood — плавный переход.',
    question: 'Левая бровь выше, правая ниже, взгляд чуть вверх.',
    angry: 'Внутренние углы верхних век резко вниз, прищур.',
};

export default {
    name: 'TalosEyesMoodScreen',

    components: { TalosEyes },

    setup() {
        return {
            config: inject(ANIMATION_CONFIG_KEY),
            replayKey: inject(REPLAY_KEY),
        };
    },

    computed: {
        resolvedConfig() {
            return unref(this.config) || {};
        },

        mood() {
            return normalizeTalosEyesMoodKey(this.resolvedConfig.mood);
        },

        moodTransitionMs() {
            return this.resolvedConfig.mood_transition_ms ?? 500;
        },

        moodLabel() {
            return TALOS_EYES_MOOD_LABELS[this.mood] || TALOS_EYES_MOOD_LABELS.neutral;
        },

        moodHint() {
            return MOOD_HINTS[this.mood] || MOOD_HINTS.neutral;
        },
    },
};
</script>

<style lang="scss">
.eyes-mood-screen {
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    color: #ebebed;
}

.eyes-mood-screen__stage {
    flex: 1;
    min-height: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 12vh 20px 16px;
    gap: 10px;
    overflow: visible;
}

.eyes-mood-screen__eyes {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px 0 4px;
    overflow: visible;
}

.eyes-mood-screen__eyes .eyes-mood-screen__svg {
    width: min(230px, 78vw);
    height: auto !important;
    max-height: none;
    overflow: visible;
}

.eyes-mood-screen__meta {
    flex-shrink: 0;
    width: 100%;
    max-width: 300px;
    padding: 0 6px;
    text-align: center;
}

.eyes-mood-screen__label {
    margin: 0 0 6px;
    font-family: Light, sans-serif;
    font-size: 17px;
    letter-spacing: 0.5px;
    color: #ebebed;
}

.eyes-mood-screen__hint {
    margin: 0;
    font-family: Light, sans-serif;
    font-size: 13px;
    line-height: 1.35;
    color: #9091a1;
}
</style>
