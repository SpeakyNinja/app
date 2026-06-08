<template>
    <Training ref="trainingRef" />
</template>

<script>
import { nextTick } from 'vue';
import Trainings from '@/collections/Trainings.js';
import Training from '@/views/Training.vue';
import { demoButtonPress, sleep } from '@/utils/animPreviewDemo.js';
import { ANIMATION_CONFIG_KEY, REPLAY_KEY, durationCss, easingCss } from '@/utils/animationPreviewConfig.js';
import { waitForRefReady } from '@/utils/animationPreviewReplay.js';
import { inject } from 'vue';

const SAMPLE = {
    meaning_id: 1,
    hints: ['<p>Пример подсказки</p>'],
    answers: [
        { text: 'ответ 1', isCorrect: true },
        { text: 'ответ 2', isCorrect: false },
    ],
    memorization: 2,
    text: 'hello',
    word: 'hello',
    transcription: 'həˈloʊ',
};

export default {
    name: 'TrainingButtonScreen',

    components: { Training },

    setup() {
        return {
            config: inject(ANIMATION_CONFIG_KEY),
            replayKey: inject(REPLAY_KEY),
        };
    },

    watch: {
        replayKey: {
            immediate: true,
            handler() {
                this.playDemo();
            },
        },
        config: {
            deep: true,
            handler() {
                this.applyButtonStyle();
            },
        },
    },

    methods: {
        async ensureTraining() {
            let training = this.$refs.trainingRef;
            if (!training) {
                await nextTick();
                training = this.$refs.trainingRef;
            }

            if (!training?.isReady) {
                training.countTrainings = 1;
                training.trainings = new Trainings([{ ...SAMPLE }, { ...SAMPLE, meaning_id: 2, word: 'world' }]);
                training.progress = { width: '250px', widthFilled: '35%' };
                training.showAnswers = false;
                training.isReady = true;
            } else {
                training.showAnswers = false;
                const current = training.trainings?.getCurrent?.();
                if (current) {
                    current.memorization = 2;
                }
            }

            await waitForRefReady(
                () => this.$refs.trainingRef,
                (ref) => ref?.$el?.querySelector('.look-variants'),
            );

            return this.$refs.trainingRef;
        },

        applyButtonStyle() {
            const btn = this.$refs.trainingRef?.$el?.querySelector('.look-variants');
            if (!btn) {
                return;
            }

            const scale = this.config?.scale_press ?? 0.88;
            btn.style.transition = `transform ${durationCss(this.config?.duration_ms || 120)} ${easingCss(this.config?.easing || 'ease')}, opacity ${durationCss(this.config?.duration_ms || 120)} ${easingCss(this.config?.easing || 'ease')}`;
            btn.style.transformOrigin = 'center center';

            const reset = () => {
                btn.style.transform = 'scale(1)';
                btn.style.opacity = '1';
            };
            const press = () => {
                btn.style.transform = `scale(${scale})`;
                btn.style.opacity = '0.72';
            };

            btn.onmousedown = press;
            btn.onmouseup = reset;
            btn.onmouseleave = reset;
            btn.ontouchstart = press;
            btn.ontouchend = reset;
        },

        async playDemo() {
            const training = await this.ensureTraining();
            if (!training) {
                return;
            }

            this.applyButtonStyle();
            await sleep(400);

            const btn = training.$el.querySelector('.look-variants');
            const scale = this.config?.scale_press ?? 0.88;
            const duration = this.config?.duration_ms || 120;
            await demoButtonPress(btn, scale, duration);
        },
    },
};
</script>

<style scoped lang="scss">
:deep(.training) {
    height: 100%;
    min-height: 100%;
}
</style>
