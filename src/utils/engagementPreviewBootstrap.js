import Trainings from '@/collections/Trainings.js';
import StatService from '@/services/StatService.js';
import {
    applyStatParamsToService,
    num,
    readModuleTestState,
    str,
} from '@/utils/moduleTestPreviewState.js';

function hasParam(state, key) {
    return Object.prototype.hasOwnProperty.call(state, key);
}

const SAMPLE_TRAINING = {
    meaning_id: 1,
    hints: ['<p>Пример подсказки</p>'],
    answers: [
        { text: 'ответ 1', isCorrect: true },
        { text: 'ответ 2', isCorrect: false },
    ],
    memorization: 4,
    text: 'hello',
    word: 'hello',
    transcription: 'həˈloʊ',
};

export function isEngagementPreviewActive(route, injected) {
    return injected || route?.query?.preview === '1';
}

function previewState(route) {
    return readModuleTestState(route);
}

/** Полноценный StatService с демо-данными для превью слоёв статистики. */
export function createPreviewStatService(route = null) {
    const s = new StatService();
    s.items = [
        { en: 'hello', ru: 'привет', memorization: 3, errors: 0 },
        { en: 'world', ru: 'мир', memorization: 8, errors: 1 },
        { en: 'example', ru: 'пример', memorization: 11, errors: 0 },
    ];
    s.predict = { curValue: 24, maxValue: 40, daysFromBegin: 14 };
    s.regularity = {
        nonstop_days: 5,
        nonstop_days_max: 8,
        has_yesterday_training: true,
        has_today_training: true,
        total_max_nonstop_days: 12,
        percent_regularity: 72,
    };
    s.levels = [
        { memorization: 3, count: 42 },
        { memorization: 8, count: 28 },
        { memorization: 13, count: 156 },
    ];
    s.trainingsError = Array.from({ length: 10 }, () => ({ errors: 0 }));
    s.intensity = {
        timeRecord: { seconds: 99999 },
        earnedTimeList: [{ hours: 2 }],
    };
    s.currentLevel = 5;
    s.firstTrainingTimeAward = 7200;
    s.max_count_trainings_per_day = 5;
    s.count_trainings_today = 1;
    s.stage = 1;
    s.count_neurons = 8420;
    s.count_game_overs = 0;

    if (route) {
        applyStatParamsToService(s, previewState(route));
    }

    return s;
}

/** Как в Training.vue: варианты сразу только при memorization < 3. */
export function resolveTrainingShowAnswers(memorization) {
    return (memorization ?? 0) < 3;
}

export function bootstrapTrainingPreview(vm, route = null) {
    const ps = previewState(route || vm.$route);
    const memorization = num(ps, 'memorization', 4);
    const word = str(ps, 'word', 'hello');
    const transcription = str(ps, 'transcription', 'həˈloʊ');
    const progressPercent = num(ps, 'progress_percent', 35);

    vm.countTrainings = 1;
    vm.trainings = new Trainings([
        {
            ...SAMPLE_TRAINING,
            memorization,
            word,
            text: word,
            transcription,
        },
        { ...SAMPLE_TRAINING, meaning_id: 2 },
    ]);
    vm.progress = { width: '250px', widthFilled: `${progressPercent}%` };
    vm.showAnswers = resolveTrainingShowAnswers(memorization);
    vm.isReady = true;
}

export function bootstrapTestPreview(vm, route = null) {
    const ps = previewState(route || vm.$route);
    const word = str(ps, 'word', 'example');
    const progressPercent = num(ps, 'progress_percent', 40);

    vm.isReady = true;
    vm.progress = { width: '300px', widthFilled: `${progressPercent}%` };
    vm.testService = {
        question: {
            word,
            meaning_id: 1,
            answers: ['пример', 'образец', 'случай'],
        },
    };
}

export function bootstrapAddWordsPreview(vm, route = null) {
    const ps = previewState(route || vm.$route);
    const word = str(ps, 'word', 'example');
    const translate = str(ps, 'translate', 'пример');
    const leftWords = num(ps, 'left_words', 8);
    const progressPercent = hasParam(ps, 'progress_percent')
        ? num(ps, 'progress_percent', 20)
        : null;

    vm.isReady = true;
    vm.countSteps = Math.max(leftWords, 2);
    vm.progress = {
        width: '300px',
        widthFilled: progressPercent !== null
            ? `${progressPercent}%`
            : `${Math.round((vm.countSteps - leftWords) * 100 / Math.max(vm.countSteps - 1, 1))}%`,
    };
    vm.addWordService = {
        data: {
            word,
            translate,
            meaning_id: 1,
            leftWords,
        },
        voice: () => null,
    };
}

export function bootstrapFewNeuronsPreview(vm) {
    vm.noticeItemsBefore = [];
}

const STAT_LAYER_TITLES = {
    LayerDashboard: '',
    LayerAccuracy: 'Слова',
    LayerPredict: 'Прогноз',
    LayerRegularity: 'Регулярность',
    LayerLevel: 'Уровень',
};

export function bootstrapStatisticsPreview(vm, layerComponent = 'LayerDashboard', route = null) {
    const layer = layerComponent || 'LayerDashboard';
    const r = route || vm.$route;
    vm.statService = createPreviewStatService(r);
    if (!vm.state?.getShowFullStat) {
        vm.state = {
            getShowFullStat: () => layer === 'LayerAccuracy',
            setShowFullStat: () => {},
        };
    }
    vm.noticeService = vm.noticeService || null;
    vm.layers = [{ component: layer, title: STAT_LAYER_TITLES[layer] ?? '' }];
    vm.curIndex = 0;
    vm.isReady = true;
}

/** Два и более слоя для теста анимации смены слоя статистики. */
export function bootstrapStatisticsAnimPreview(vm, layerComponents, route = null) {
    const r = route || vm.$route;
    vm.statService = createPreviewStatService(r);
    vm.state = {
        getShowFullStat: () => false,
        setShowFullStat: () => {},
    };
    vm.noticeService = vm.noticeService || null;
    vm.layers = (layerComponents || ['LayerRegularity', 'LayerDashboard']).map((component) => ({
        component,
        title: STAT_LAYER_TITLES[component] ?? '',
    }));
    vm.curIndex = 0;
    vm.isReady = true;
}

export function bootstrapIndexPreview(vm) {
    vm.isReady = true;
}

export function bootstrapLoginPreview(vm) {
    vm.isReady = true;
}

export { readModuleTestState, noticeOptionsFromState, previewStateKey } from '@/utils/moduleTestPreviewState.js';
