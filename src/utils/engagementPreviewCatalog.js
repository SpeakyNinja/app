/**
 * Соответствие module_key (админка вовлечённости) → превью в приложении.
 */
export const ENGAGEMENT_PREVIEW_CATALOG = {
    training: { kind: 'route', routeKey: 'training' },
    statistics: { kind: 'route', routeKey: 'statistics' },
    add_words: { kind: 'route', routeKey: 'add_words' },
    test: { kind: 'route', routeKey: 'test' },
    'route.few_neurons': { kind: 'route', routeKey: 'route.few_neurons' },
    'route.index': { kind: 'route', routeKey: 'route.index' },
    'route.login': { kind: 'route', routeKey: 'route.login' },
    'route.registration': { kind: 'route', routeKey: 'route.registration' },
    'route.store': { kind: 'route', routeKey: 'route.store' },
    'route.options': { kind: 'route', routeKey: 'route.options' },
    'route.feedback': { kind: 'route', routeKey: 'route.feedback' },
    'route.permanent_registration': { kind: 'route', routeKey: 'route.permanent_registration' },
    'route.forgot_password': { kind: 'route', routeKey: 'route.forgot_password' },
    'route.dialog_test_menu': { kind: 'route', routeKey: 'route.dialog_test_menu' },

    'info.rating': { kind: 'notice', noticeKey: 'rating', options: { isFirst: true } },
    'info.green_mem': { kind: 'notice', noticeKey: 'greenMem' },
    'info.stages_words': { kind: 'notice', noticeKey: 'stagesWords' },

    'notice.index_before': { kind: 'notice', noticeKey: 'indexBefore' },
    'notice.test_before': { kind: 'notice', noticeKey: 'testBefore' },
    'notice.test_after': { kind: 'notice', noticeKey: 'testAfter' },
    'notice.add_words_before': { kind: 'notice', noticeKey: 'addWordsBefore' },
    'notice.add_words_after_first': { kind: 'notice', noticeKey: 'addWordsAfterFirst' },
    'notice.add_words_after_nth': { kind: 'notice', noticeKey: 'addWordsAfterNth', options: { nth: 47 } },
    'notice.training_before_1': { kind: 'notice', noticeKey: 'trainingBefore1' },
    'notice.training_before_2': { kind: 'notice', noticeKey: 'trainingBefore2' },
    'notice.training_before_4': { kind: 'notice', noticeKey: 'trainingBefore4' },
    'notice.trainings_limit': { kind: 'notice', noticeKey: 'trainingsLimit' },
    'notice.trainings_limit_updated': { kind: 'notice', noticeKey: 'trainingsLimitUpdated' },
    'notice.first_trainings_limit_updated': { kind: 'notice', noticeKey: 'firstTrainingsLimitUpdated' },
    'notice.award_by_time': { kind: 'notice', noticeKey: 'awardByTime', options: { hours: 2 } },
    'notice.award_by_words': { kind: 'notice', noticeKey: 'awardByWords', options: { words: 15 } },
    'notice.first_level_up': { kind: 'notice', noticeKey: 'firstLevelUp' },
    'notice.level_up': { kind: 'notice', noticeKey: 'levelUp', options: { firstTrainingTimeAward: 2, currentLevel: 5 } },
    'notice.time_is_empty': { kind: 'notice', noticeKey: 'timeIsEmpty' },
    'notice.pwa_install': { kind: 'notice', noticeKey: 'pwaInstall' },
    'notice.ios_install': { kind: 'notice', noticeKey: 'iosInstall' },
    'notice.rating_short': { kind: 'notice', noticeKey: 'ratingShort' },
    'notice.timer_notice': { kind: 'notice', noticeKey: 'timerNotice' },
    'notice.stages_words': { kind: 'notice', noticeKey: 'stagesWords' },

    'stat.layer.regularity': { kind: 'stat_layer', layer: 'LayerRegularity', title: 'Регулярность' },
    'stat.layer.accuracy': { kind: 'stat_layer', layer: 'LayerAccuracy', title: 'Слова' },
    'stat.layer.predict': { kind: 'stat_layer', layer: 'LayerPredict', title: 'Прогноз' },
    'stat.layer.level': { kind: 'stat_layer', layer: 'LayerLevel', title: 'Уровень' },
    'stat.layer.dashboard': { kind: 'stat_layer', layer: 'LayerDashboard', title: 'Дашборд' },
};

/** notice.add_words_after_first → addWordsAfterFirst */
const NOTICE_SUFFIX_TO_KEY = {
    index_before: 'indexBefore',
    test_before: 'testBefore',
    test_after: 'testAfter',
    add_words_before: 'addWordsBefore',
    add_words_after_first: 'addWordsAfterFirst',
    add_words_after_nth: 'addWordsAfterNth',
    training_before_1: 'trainingBefore1',
    training_before_2: 'trainingBefore2',
    training_before_4: 'trainingBefore4',
    trainings_limit: 'trainingsLimit',
    trainings_limit_updated: 'trainingsLimitUpdated',
    first_trainings_limit_updated: 'firstTrainingsLimitUpdated',
    award_by_time: 'awardByTime',
    award_by_words: 'awardByWords',
    first_level_up: 'firstLevelUp',
    level_up: 'levelUp',
    time_is_empty: 'timeIsEmpty',
    pwa_install: 'pwaInstall',
    ios_install: 'iosInstall',
    rating_short: 'ratingShort',
    timer_notice: 'timerNotice',
    stages_words: 'stagesWords',
};

const ROUTE_SUFFIX_TO_KEY = {
    few_neurons: 'route.few_neurons',
    index: 'route.index',
    login: 'route.login',
    registration: 'route.registration',
    store: 'route.store',
    options: 'route.options',
    feedback: 'route.feedback',
    permanent_registration: 'route.permanent_registration',
    forgot_password: 'route.forgot_password',
    dialog_test_menu: 'route.dialog_test_menu',
};

const STAT_LAYER_SUFFIX = {
    regularity: 'LayerRegularity',
    accuracy: 'LayerAccuracy',
    predict: 'LayerPredict',
    level: 'LayerLevel',
    dashboard: 'LayerDashboard',
};

export function resolveEngagementPreview(moduleKey) {
    if (!moduleKey) {
        return null;
    }

    if (ENGAGEMENT_PREVIEW_CATALOG[moduleKey]) {
        return ENGAGEMENT_PREVIEW_CATALOG[moduleKey];
    }

    if (moduleKey.startsWith('canvas.')) {
        return { kind: 'canvas', slug: moduleKey.slice('canvas.'.length) };
    }

    if (moduleKey.startsWith('notice.')) {
        const suffix = moduleKey.slice('notice.'.length);
        const noticeKey = NOTICE_SUFFIX_TO_KEY[suffix];
        if (noticeKey) {
            return { kind: 'notice', noticeKey };
        }
    }

    if (moduleKey.startsWith('stat.layer.')) {
        const suffix = moduleKey.slice('stat.layer.'.length);
        const layer = STAT_LAYER_SUFFIX[suffix];
        if (layer) {
            return { kind: 'stat_layer', layer };
        }
    }

    if (moduleKey.startsWith('route.')) {
        const suffix = moduleKey.slice('route.'.length);
        const routeKey = ROUTE_SUFFIX_TO_KEY[suffix];
        if (routeKey) {
            return { kind: 'route', routeKey };
        }
    }

    return null;
}
