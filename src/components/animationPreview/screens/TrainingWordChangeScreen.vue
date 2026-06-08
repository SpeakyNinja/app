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
import { inject } from 'vue';

export default {
    name: 'TrainingWordChangeScreen',

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
                this.runWordChange();
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
                {
                    meaning_id: 2,
                    hints: ['<p>Следующее слово</p>'],
                    answers: [{ text: 'мир', isCorrect: true }],
                    memorization: 4,
                    word: 'world',
                    transcription: 'wɜːld',
                },
            ]);
            training.progress = { width: '250px', widthFilled: '50%' };
            training.showAnswers = true;
            training.isReady = true;

            await nextTick();
            return training;
        },

        animClass(phase) {
            const preset = this.config?.preset || 'slide_up';
            if (phase === 'out') {
                return preset === 'fade' ? 'ap-fade' : 'ap-word-out';
            }
            if (preset === 'fade') {
                return 'ap-fade';
            }
            if (preset === 'slide_left') {
                return 'ap-anim-line-slide-left';
            }

            return 'ap-word-in';
        },

        async animateEl(el, phase) {
            if (!el) {
                return;
            }

            const cls = this.animClass(phase);
            el.style.setProperty('--ap-duration', durationCss(this.config?.duration_ms || 350));
            el.style.setProperty('--ap-easing', easingCss(this.config?.easing || 'ease'));
            el.style.setProperty('--ap-distance', `${this.config?.distance_px || 16}px`);

            el.classList.remove('ap-word-out', 'ap-word-in', 'ap-fade', 'ap-anim-line-slide-left');
            void el.offsetWidth;
            el.classList.add(cls);

            await sleep(this.config?.duration_ms || 350);
            el.classList.remove(cls);
        },

        async runWordChange() {
            const training = await this.ensureTraining();
            const topFixed = training.$el?.querySelector('.top-fixed');
            highlightTarget(topFixed);

            training.trainings.models.forEach((m) => {
                m.elapsed_time = undefined;
            });

            await sleep(700);

            const transEl = training.$el?.querySelector('.transcription');
            await this.animateEl(transEl, 'out');

            training.trainings.models[0].elapsed_time = 1;
            await nextTick();

            await this.animateEl(transEl, 'in');
        },
    },
};
</script>
