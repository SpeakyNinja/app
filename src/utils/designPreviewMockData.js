import { createPreviewStatService } from '@/utils/engagementPreviewBootstrap.js';
import { getDesignTheme } from '@/utils/designThemes.js';

/** Sequence of statuses for brain intro animation (real addWord flow). */
export const BRAIN_INTRO_SEQUENCE = [
    'm2', 'm4', 'knows', 'm6', 'in_progress', 'm8', 'green', 'm10', 'm11', 'm13',
];

export const ADD_WORDS_MOCK = {
    word: 'beautiful',
    translate: 'красивый',
    leftWords: 6,
    totalSlots: 12,
    progressPercent: 38,
};

export const TRAINING_MOCK = {
    word: 'beautiful',
    transcription: 'ˈbjuːtɪfəl',
    memorization: 4,
    progressPercent: 55,
    hints: [
        'Синоним: <strong>pretty</strong>, <strong>lovely</strong>',
        'Antonym: ugly — «уродливый»',
    ],
    answers: [
        { text: 'красивый', isCorrect: true },
        { text: 'быстрый', isCorrect: false },
        { text: 'тихий', isCorrect: false },
    ],
};

export const STAT_WORDS_MOCK = [
    { en: 'beautiful', ru: 'красивый', memorization: 8 },
    { en: 'hello', ru: 'привет', memorization: 3 },
    { en: 'world', ru: 'мир', memorization: 11 },
];

export function brainColorThemeFromVariant(variantKey) {
    const t = getDesignTheme(variantKey);
    const fillColors = {
        in_progress: t.panel,
        knows: t.brainKnows,
        green: t.brainGreen,
        m20: t.brainWhite,
    };

    for (let i = 0; i <= 13; i += 1) {
        if (i <= 3) {
            fillColors[`m${i}`] = t.brainRed;
        } else if (i <= 7) {
            fillColors[`m${i}`] = t.brainYellow;
        } else if (i <= 11) {
            fillColors[`m${i}`] = t.brainGreen;
        } else {
            fillColors[`m${i}`] = t.brainCyan;
        }
    }

    return {
        baseColor: t.brainBase,
        activeOutlineColor: t.brainBase,
        fillColors,
    };
}

export function createDesignPreviewStatService() {
    const s = createPreviewStatService();
    s.predict = { curValue: 186, maxValue: 400, daysFromBegin: 22 };
    s.items = STAT_WORDS_MOCK.map((row) => ({ ...row, errors: 0 }));
    s.count_trainings_today = 5;
    s.regularity = {
        nonstop_days: 7,
        nonstop_days_max: 12,
        has_yesterday_training: true,
        has_today_training: true,
        total_max_nonstop_days: 18,
        percent_regularity: 84,
    };
    s.levels = [
        { memorization: 3, count: 52 },
        { memorization: 8, count: 38 },
        { memorization: 13, count: 172 },
    ];
    s.trainingsError = Array.from({ length: 10 }, () => ({ errors: 0 }));
    s.currentLevel = 6;
    s.stage = 2;
    s.count_neurons = 8420;
    s.intensity = {
        timeRecord: { seconds: 126000 },
        earnedTimeList: [
            { hours: 1, minutes: 45 },
            { hours: 2, minutes: 10 },
            { hours: 0, minutes: 55 },
        ],
    };
    return s;
}
