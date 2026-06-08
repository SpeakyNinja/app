<template>
    <Training ref="trainingRef" />
</template>

<script>
import { nextTick } from 'vue';
import Trainings from '@/collections/Trainings.js';
import Training from '@/views/Training.vue';
import { highlightTarget, sleep } from '@/utils/animPreviewDemo.js';
import {
    ANIMATION_CONFIG_KEY,
    REPLAY_KEY,
    durationCss,
    easingCss,
} from '@/utils/animationPreviewConfig.js';
import { waitForRefReady } from '@/utils/animationPreviewReplay.js';
import { inject } from 'vue';

export default {
    name: 'TrainingProgressScreen',

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
                this.playProgress();
            },
        },
        config: {
            deep: true,
            handler() {
                this.playProgress();
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
                training.trainings = new Trainings([
                    {
                        meaning_id: 1,
                        hints: ['<p>Пример подсказки</p>'],
                        answers: [{ text: 'привет', isCorrect: true }],
                        memorization: 4,
                        word: 'hello',
                        transcription: 'həˈloʊ',
                    },
                ]);
                training.progress = { width: '250px', widthFilled: '0%' };
                training.showAnswers = true;
                training.isReady = true;
            }

            await waitForRefReady(
                () => this.$refs.trainingRef,
                (ref) => ref?.isReady && ref.$el?.querySelector('.progress'),
            );

            return this.$refs.trainingRef;
        },

        async playProgress() {
            const training = await this.ensureTraining();
            if (!training) {
                return;
            }

            const from = this.config?.from_percent ?? 0;
            const to = this.config?.to_percent ?? 65;
            const bar = training.$el.querySelector('.progress');

            highlightTarget(bar);

            training.progress = { width: '250px', widthFilled: `${from}%` };
            await nextTick();
            await sleep(150);

            training.progress = { width: '250px', widthFilled: `${to}%` };
        },
    },
};
</script>

<style scoped lang="scss">
:deep(.training) {
    height: 100%;
    min-height: 100%;
}

:deep(.progress::before) {
    transition: width var(--ap-duration) var(--ap-easing) !important;
}
</style>
