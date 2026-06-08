/**
 * Параметры превью из query (?ps_memorization=4&ps_words_red=42).
 */

import moment from 'moment';
import ToolsService from '@/services/ToolsService.js';

function parseValue(raw) {
    if (raw === '1' || raw === 'true') {
        return true;
    }
    if (raw === '0' || raw === 'false') {
        return false;
    }
    if (raw !== '' && !Number.isNaN(Number(raw))) {
        return Number(raw);
    }

    return raw;
}

export function readModuleTestState(route) {
    const q = route?.query || {};
    const state = {};

    Object.entries(q).forEach(([key, val]) => {
        if (!key.startsWith('ps_')) {
            return;
        }
        state[key.slice(3)] = parseValue(Array.isArray(val) ? val[0] : val);
    });

    return state;
}

export function num(state, key, fallback) {
    const v = state[key];
    if (v === undefined || v === null || v === '') {
        return fallback;
    }

    return Number(v);
}

export function bool(state, key, fallback) {
    const v = state[key];
    if (v === undefined || v === null || v === '') {
        return fallback;
    }

    return Boolean(v);
}

export function str(state, key, fallback) {
    const v = state[key];
    if (v === undefined || v === null || v === '') {
        return fallback;
    }

    return String(v);
}

function hasParam(state, key) {
    return Object.prototype.hasOwnProperty.call(state, key);
}

/** Уровни словаря для countWordsByMemorizations (красный=3, жёлтый=7, зелёный=11, выучено=13). */
function buildLevelsFromCounts({ red = 0, yellow = 0, green = 0, learned = 0 }) {
    const levels = [];

    if (red > 0) {
        levels.push({ memorization: 3, count: red });
    }
    if (yellow > 0) {
        levels.push({ memorization: 7, count: yellow });
    }
    if (green > 0) {
        levels.push({ memorization: 11, count: green });
    }
    if (learned > 0) {
        levels.push({ memorization: 13, count: learned });
    }

    return levels;
}

/** Список слов внизу экрана статистики. */
function buildStatItems(state) {
    const perBandErrors = Math.max(0, Math.floor(num(state, 'training_errors', 0) / 3));
    const rows = [
        { en: 'hello', ru: 'привет', memorization: 3, errors: perBandErrors },
        { en: 'world', ru: 'мир', memorization: 8, errors: perBandErrors },
        { en: 'example', ru: 'пример', memorization: 11, errors: 0 },
        { en: 'practice', ru: 'практика', memorization: 5, errors: 0 },
        { en: 'memory', ru: 'память', memorization: 13, errors: 0 },
    ];

    const extra = num(state, 'words_red', 0) + num(state, 'words_yellow', 0) + num(state, 'words_green', 0);
    if (extra > 80) {
        rows.push({ en: 'vocabulary', ru: 'словарь', memorization: 9, errors: 0 });
    }

    return rows;
}

/** 10 последних тренировок для LayerAccuracy / LastTrainings. */
function buildTrainingsError(totalErrors) {
    const slots = 10;
    const errors = Math.max(0, Math.min(totalErrors, slots * 3));
    const result = [];
    let left = errors;

    for (let i = 0; i < slots; i += 1) {
        const chunk = i < 3 ? Math.min(left, Math.ceil(errors / 3)) : Math.min(left, 1);
        result.push({ errors: chunk });
        left -= chunk;
    }

    return result;
}

function applyTimerLeftSeconds(statService, state) {
    if (!hasParam(state, 'left_seconds')) {
        return;
    }

    const leftSec = Math.max(0, num(state, 'left_seconds', 0));
    const tools = new ToolsService();
    const serverNow = tools.getServerDate(moment().format('YYYY-MM-DD HH:mm:ss'));
    const secondsFromStartOfDay = Math.round(
        (serverNow.valueOf() - serverNow.clone().startOf('day').valueOf()) / 1000,
    );

    statService.intensity = statService.intensity || {};
    statService.intensity.timeRecord = {
        seconds: secondsFromStartOfDay + leftSec,
    };
}

/** Применить ps_* к StatService (превью). */
export function applyStatParamsToService(statService, state = {}) {
    statService.levels = buildLevelsFromCounts({
        red: num(state, 'words_red', 0),
        yellow: num(state, 'words_yellow', 0),
        green: num(state, 'words_green', 0),
        learned: num(state, 'words_learned', 0),
    });

    statService.items = buildStatItems(state);
    statService.count_neurons = num(state, 'neurons', 8420);
    statService.currentLevel = num(state, 'current_level', 5);
    statService.firstTrainingTimeAward = num(state, 'first_training_time_award', 7200);
    statService.max_count_trainings_per_day = num(state, 'max_trainings_per_day', 5);
    statService.count_trainings_today = num(state, 'count_trainings_today', 1);
    statService.predict = {
        curValue: num(state, 'predict_cur', 24),
        maxValue: num(state, 'predict_max', 40),
        daysFromBegin: num(state, 'predict_days', 14),
    };
    statService.regularity = {
        nonstop_days: num(state, 'regularity_days', 5),
        nonstop_days_max: num(state, 'regularity_days_max', 8),
        has_yesterday_training: bool(state, 'regularity_yesterday', true),
        has_today_training: bool(state, 'regularity_today', true),
        total_max_nonstop_days: num(state, 'regularity_total_max', 12),
        percent_regularity: num(state, 'regularity_percent', 72),
    };
    statService.trainingsError = buildTrainingsError(num(state, 'training_errors', 0));
    statService.stage = num(state, 'stage', 1);
    statService.count_game_overs = num(state, 'count_game_overs', 0);

    if (!statService.intensity?.timeRecord && !hasParam(state, 'left_seconds')) {
        statService.intensity = {
            timeRecord: { seconds: 99999 },
            earnedTimeList: [{ hours: num(state, 'hours', 2) }],
        };
    }

    applyTimerLeftSeconds(statService, state);

    return statService;
}

/** Опции для NoticeService.getItems в превью. */
export function noticeOptionsFromState(state, noticeKey) {
    switch (noticeKey) {
        case 'timeIsEmpty':
            return {
                statService: {
                    count_game_overs: num(state, 'count_game_overs', 0),
                    writeGameover: async () => ({ timeRecord: { seconds: 3600 } }),
                },
            };
        case 'levelUp':
            return {
                firstTrainingTimeAward: num(state, 'first_training_time_award', 2) * 3600,
                currentLevel: num(state, 'current_level', 5),
            };
        case 'awardByTime':
            return { hours: num(state, 'hours', 2) };
        case 'awardByWords':
            return { words: num(state, 'words', 15) };
        default:
            return {};
    }
}

export function previewStateKey(route) {
    return JSON.stringify(readModuleTestState(route));
}

export function hasModuleTestState(route) {
    const q = route?.query || {};

    return Object.keys(q).some((k) => k.startsWith('ps_'));
}
