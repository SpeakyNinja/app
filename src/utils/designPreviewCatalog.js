import { FIELD_SCREENS } from './fieldConcept.js';

export const DESIGN_PREVIEW_GROUPS = {
    field: 'FIELD · Поле языка',
    salon: 'Salon',
    atelier: 'Atelier',
    garden: 'Glass Garden',
    prism: 'Призматический поток',
};

export const CONCEPT_MODULE_KEYS = new Set([
    ...FIELD_SCREENS.map(([key]) => `field_${key}`),
    'atelier_cover',
    'atelier_spread',
    'salon_inbox',
    'salon_training',
    'salon_dialog',
    'salon_session',
    'salon_stats',
    'salon_quests',
    'salon_achievements',
    'salon_report',
    'salon_settings',
    'salon_account',
    'garden_home',
    'garden_conservatory',
]);

export const DESIGN_PREVIEW_MODULES = [
    ...FIELD_SCREENS.map(([key, title, description]) => ({
        module_key: `field_${key}`,
        title: `FIELD · ${title}`,
        group: 'field',
        description,
        route: `/design-preview/field_${key}`,
    })),
    {
        module_key: 'salon_inbox',
        title: 'Salon · Хаб',
        group: 'salon',
        description: 'Главный экран: тренировка, Talos, прогресс, мотивация, настройки.',
        route: '/concept/salon',
    },
    {
        module_key: 'salon_training',
        title: 'Salon · Тренировка',
        group: 'salon',
        description: 'Слово, транскрипция, контекст «он пришёл слишком late», ответы столбиком.',
        route: '/concept/salon/training',
    },
    {
        module_key: 'salon_dialog',
        title: 'Salon · Диалог Talos',
        group: 'salon',
        description: 'Опубликованный холст: реплики и варианты ответа в мессенджере.',
        route: '/concept/salon/dialog',
    },
    {
        module_key: 'salon_session',
        title: 'Salon · Статистика сессии',
        group: 'salon',
        description: 'Итог сессии: слова, минуты, кольцо пояса.',
        route: '/concept/salon/session',
    },
    {
        module_key: 'salon_stats',
        title: 'Salon · Полная статистика',
        group: 'salon',
        description: 'Каратэ-пояс, прогресс до следующего ранга, графики.',
        route: '/concept/salon/stats',
    },
    {
        module_key: 'salon_quests',
        title: 'Salon · Задания недели',
        group: 'salon',
        description: 'Концепт еженедельных квестов с наградами и прогрессом.',
        route: '/concept/salon/quests',
    },
    {
        module_key: 'salon_achievements',
        title: 'Salon · Достижения',
        group: 'salon',
        description: 'Концепт коллекции бейджей: серии, словарь, пояса, диалоги.',
        route: '/concept/salon/achievements',
    },
    {
        module_key: 'salon_report',
        title: 'Salon · Еженедельный отчёт',
        group: 'salon',
        description: 'Line-chart регулярности, столбцы слов, метрики недели.',
        route: '/concept/salon/report',
    },
    {
        module_key: 'salon_settings',
        title: 'Salon · Настройки',
        group: 'salon',
        description: 'Уведомления, звук, язык — строки с press-анимацией.',
        route: '/concept/salon/settings',
    },
    {
        module_key: 'salon_account',
        title: 'Salon · Учётная запись',
        group: 'salon',
        description: 'Профиль, нейроны, выход и удаление.',
        route: '/concept/salon/account',
    },
    {
        module_key: 'atelier_cover',
        title: 'Atelier · Обложка',
        group: 'atelier',
        description: 'Редакционный выпуск: типографика, brass-акцент, журнальная сетка.',
        route: '/concept/atelier',
    },
    {
        module_key: 'atelier_spread',
        title: 'Atelier · Разворот',
        group: 'atelier',
        description: 'Крупное слово, транскрипция, CTA «В сессию».',
        route: '/concept/atelier/spread',
    },
    {
        module_key: 'garden_home',
        title: 'Glass Garden · Дом',
        group: 'garden',
        description: 'Bento-плитки на мягком градиенте, остров активности.',
        route: '/concept/garden',
    },
    {
        module_key: 'garden_conservatory',
        title: 'Glass Garden · Оранжерея',
        group: 'garden',
        description: 'Диалог в стеклянной сфере с Talos, таймер, реплики.',
        route: '/concept/garden/conservatory',
    },
    {
        module_key: 'training',
        title: 'Training · Prism Flow',
        group: 'prism',
        description: 'Progress, transcription, hints, answer sheet — призматический вариант.',
        route: '/training',
    },
];

export function findDesignPreviewModule(moduleKey) {
    return DESIGN_PREVIEW_MODULES.find((m) => m.module_key === moduleKey) || null;
}

export function isConceptPreviewModule(moduleKey) {
    return CONCEPT_MODULE_KEYS.has(moduleKey);
}
