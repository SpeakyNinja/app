/** Каратэ-пояса: порядок рангов для концепта Salon. */
export const SALON_BELT_RANKS = [
    {
        id: 'white',
        name: 'Белый',
        color: '#ece8e1',
        edge: '#b8b4ac',
        shadow: 'rgba(236, 232, 225, 0.35)',
    },
    {
        id: 'yellow',
        name: 'Жёлтый',
        color: '#f5d547',
        edge: '#c9a227',
        shadow: 'rgba(245, 213, 71, 0.35)',
    },
    {
        id: 'orange',
        name: 'Оранжевый',
        color: '#e8913a',
        edge: '#b86b22',
        shadow: 'rgba(232, 145, 58, 0.35)',
    },
    {
        id: 'green',
        name: 'Зелёный',
        color: '#4caf6e',
        edge: '#2d7a48',
        shadow: 'rgba(76, 175, 110, 0.4)',
    },
    {
        id: 'blue',
        name: 'Синий',
        color: '#4a7fd4',
        edge: '#2f5599',
        shadow: 'rgba(74, 127, 212, 0.4)',
    },
    {
        id: 'brown',
        name: 'Коричневый',
        color: '#8b5a3c',
        edge: '#5c3a24',
        shadow: 'rgba(139, 90, 60, 0.35)',
    },
    {
        id: 'black',
        name: 'Чёрный',
        color: '#2a2a2e',
        edge: '#0a0a0c',
        shadow: 'rgba(42, 42, 46, 0.5)',
    },
];

export const SALON_INBOX_THREADS = [
    {
        id: 'training',
        name: 'Тренировка',
        preview: 'late · /leɪt/ · выберите перевод',
        time: 'сейчас',
        active: true,
        unread: 1,
        talos: true,
    },
    {
        id: 'dialog',
        name: 'Talos',
        preview: 'Вступительный диалог · Привет',
        time: 'сейчас',
        unread: 1,
        talos: true,
        canvas: 'Вступительный диалог · v4',
    },
    {
        id: 'session',
        name: 'Статистика сессии',
        preview: '14 слов · 8 мин · 240 🧠',
        time: 'сегодня',
        initials: 'Σ',
    },
    {
        id: 'stats',
        name: 'Полная статистика',
        preview: 'Зелёный пояс · 72% до синего',
        time: 'вчера',
        initials: '◎',
    },
    {
        id: 'quests',
        name: 'Задания недели',
        preview: '2 из 3 · осталось 2 д 14 ч',
        time: 'сб',
        unread: 1,
        initials: '✦',
    },
    {
        id: 'achievements',
        name: 'Достижения',
        preview: '12 из 24 · «Неделя огня»',
        time: 'чт',
        initials: '🏅',
    },
    {
        id: 'report',
        name: 'Еженедельный отчёт',
        preview: 'Регулярность 84% · рекорд серии',
        time: 'пн',
        initials: 'W',
    },
    {
        id: 'settings',
        name: 'Настройки',
        preview: 'Уведомления, язык, звук',
        time: '',
        initials: '⚙',
    },
    {
        id: 'account',
        name: 'Учётная запись',
        preview: 'dev@speakyninja.com',
        time: '',
        initials: 'SN',
    },
];

export const SALON_HUB_MOCK = {
    streakDays: 5,
    neurons: 240,
    beltSummary: 'Зелёный пояс · 72% до синего',
    training: {
        label: 'Продолжить тренировку',
        meta: 'late · 14 / 40',
    },
    talos: {
        label: 'Talos',
        meta: 'Вступительный диалог',
        unread: 1,
    },
    sections: [
        {
            id: 'progress',
            title: 'Прогресс',
            items: [
                { id: 'stats', icon: '◎', label: 'Статистика', meta: '847 слов' },
                { id: 'session', icon: 'Σ', label: 'Итог сессии', meta: 'сегодня · 8 мин' },
                { id: 'report', icon: 'W', label: 'Отчёт недели', meta: '84% регулярность' },
            ],
        },
        {
            id: 'motivation',
            title: 'Мотивация',
            items: [
                { id: 'quests', icon: '✦', label: 'Задания недели', meta: '1 / 3', badge: '1' },
                { id: 'achievements', icon: '🏅', label: 'Достижения', meta: '12 / 24' },
            ],
        },
    ],
    footer: [
        { id: 'settings', icon: '⚙', label: 'Настройки' },
        { id: 'account', icon: 'SN', label: 'Учётная запись', meta: 'dev@speakyninja.com' },
    ],
};

export const SALON_TRAINING_MOCK = {
    index: 4,
    total: 14,
    memorization: 6,
    progressPercent: 38,
    word: 'late',
    transcription: '/leɪt/',
    contextLine: 'Он пришёл слишком <strong>late</strong>.',
    answers: [
        { text: 'поздно', isCorrect: true },
        { text: 'уничтожать', isCorrect: false },
        { text: 'клавиша', isCorrect: false },
    ],
};

export const SALON_DIALOG_MOCK = {
    canvasTitle: 'Оранжерея',
    timer: '00:11:42',
    lines: [
        { role: 'talos', text: 'You look like you\'ve seen a ghost.', delay: 0 },
        { role: 'talos', text: 'Ты выглядишь так, будто видел призрака.', delay: 1 },
    ],
    choices: [
        'I have, actually.',
        'What ghost?',
        'Let\'s change the subject',
    ],
};

export const SALON_SESSION_MOCK = {
    words: 14,
    minutes: 8,
    neurons: 240,
    accuracy: 86,
    streak: 5,
    belt: {
        currentIndex: 3,
        progressToNext: 72,
    },
};

export const SALON_STATS_MOCK = {
    wordsTotal: 186,
    predict: 18,
    regularity: 84,
    belt: {
        currentIndex: 3,
        progressToNext: 72,
        wordsCurrent: 36,
        wordsRequired: 50,
    },
    levels: [
        { label: 'Знаю', value: 42, color: '#5b8cff' },
        { label: 'Учу', value: 28, color: '#c9a227' },
        { label: 'Новые', value: 18, color: '#7dd3a8' },
    ],
    weekDays: [
        { day: 'Пн', min: 12 },
        { day: 'Вт', min: 8 },
        { day: 'Ср', min: 0 },
        { day: 'Чт', min: 15 },
        { day: 'Пт', min: 6 },
        { day: 'Сб', min: 18 },
        { day: 'Вс', min: 8 },
    ],
};

export const SALON_WEEKLY_QUESTS_MOCK = {
    weekLabel: '16–22 июня',
    resetsIn: '2 д 14 ч',
    completed: 1,
    total: 3,
    quests: [
        {
            id: 'train5',
            title: '5 тренировок',
            description: 'Завершите пять сессий за неделю',
            progress: 4,
            target: 5,
            reward: '80 🧠',
            done: false,
        },
        {
            id: 'dialog3',
            title: '3 диалога с Talos',
            description: 'Пройдите три опубликованных холста',
            progress: 1,
            target: 3,
            reward: 'бейдж «Собеседник»',
            done: false,
        },
        {
            id: 'regularity',
            title: 'Регулярность 80%',
            description: 'Держите ритм не ниже порога',
            progress: 84,
            target: 80,
            reward: '120 🧠',
            done: true,
        },
    ],
};

export const SALON_ACHIEVEMENTS_MOCK = {
    unlocked: 12,
    total: 24,
    recentTitle: 'Неделя огня',
    categories: [
        { id: 'streak', label: 'Серии' },
        { id: 'words', label: 'Словарь' },
        { id: 'belt', label: 'Пояса' },
        { id: 'social', label: 'Диалоги' },
    ],
    items: [
        {
            id: 'streak7',
            title: 'Неделя огня',
            description: '7 дней тренировок подряд',
            icon: '🔥',
            category: 'streak',
            unlocked: true,
            date: '18 июн',
        },
        {
            id: 'words100',
            title: 'Сотня',
            description: '100 слов в активном запасе',
            icon: '💯',
            category: 'words',
            unlocked: true,
            date: '12 июн',
        },
        {
            id: 'dialog1',
            title: 'Первый диалог',
            description: 'Завершите диалог с Talos',
            icon: '🎭',
            category: 'social',
            unlocked: true,
            date: '5 июн',
        },
        {
            id: 'belt_green',
            title: 'Зелёный пояс',
            description: 'Достигните зелёного пояса',
            icon: '🥋',
            category: 'belt',
            unlocked: true,
            date: '1 июн',
        },
        {
            id: 'belt_blue',
            title: 'Синий пояс',
            description: 'Достигните синего пояса',
            icon: '🥋',
            category: 'belt',
            unlocked: false,
            progress: 72,
        },
        {
            id: 'accuracy90',
            title: 'Снайпер',
            description: '90% точности за сессию',
            icon: '🎯',
            category: 'words',
            unlocked: false,
            progress: 86,
        },
    ],
};

export const SALON_REPORT_MOCK = {
    weekLabel: '16–22 июня',
    regularity: 84,
    regularityDelta: 12,
    wordsAdded: 24,
    bestStreak: 7,
    accuracy: 81,
    trend: [62, 68, 71, 74, 78, 82, 84],
    dailyWords: [3, 5, 0, 4, 2, 6, 4],
};

export const SALON_SETTINGS_MOCK = [
    { id: 'notify', label: 'Напоминания', value: 'Каждый день в 19:00', icon: '🔔' },
    { id: 'sound', label: 'Звук ответов', value: 'Включён', icon: '♪' },
    { id: 'lang', label: 'Язык интерфейса', value: 'Русский', icon: 'Aa' },
    { id: 'hints', label: 'Подсказки в тренировке', value: 'Авто', icon: '💡' },
];

export const SALON_ACCOUNT_MOCK = {
    email: 'dev@speakyninja.com',
    plan: 'Базовый',
    neurons: 1240,
    memberSince: 'март 2025',
};

export function getSalonBeltByIndex(index) {
    return SALON_BELT_RANKS[Math.min(Math.max(index, 0), SALON_BELT_RANKS.length - 1)];
}

export function getSalonNextBelt(index) {
    if (index >= SALON_BELT_RANKS.length - 1) {
        return null;
    }

    return SALON_BELT_RANKS[index + 1];
}
