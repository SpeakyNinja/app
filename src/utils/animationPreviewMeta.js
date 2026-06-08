/** Метаданные сцен: связь с реальным UI приложения. */
export const ANIMATION_PREVIEW_META = {
    'dialog.line_in': {
        screen: 'Диалог',
        route: '/dialog-test/:slug',
        source: 'DialogTestPlay.vue',
        animates: 'Строка реплики NPC — класс .dialog-play__line',
        static: 'Шапка с таймером, маскот AI, уже показанные строки',
    },
    'dialog.answers_block': {
        screen: 'Диалог',
        route: '/dialog-test/:slug',
        source: 'DialogTestPlay.vue',
        animates: 'Кнопки ответов — .dialog-play__answer, TransitionGroup',
        static: 'Текст реплики, маскот, разделитель ответов',
    },
    'route.page': {
        screen: 'Главная → Тренировка',
        route: '/ → /training',
        source: 'App.vue RouterView',
        animates: 'Переход между полноэкранными view',
        static: 'Содержимое каждого экрана (кнопки / слово / кольцо)',
    },
    'statistics.layer': {
        screen: 'Статистика',
        route: '/statistics',
        source: 'Statistics.vue → .layers-wrapper',
        animates: 'Горизонтальный сдвиг слоя (Регулярность ↔ Дашборд)',
        static: 'Список слов внизу, StatPult, фон слоёв',
    },
    'notice.carousel': {
        screen: 'Notice поверх экрана',
        route: 'любой экран + NoticeLayer',
        source: 'NoticeLayer.vue → .dummy / .item',
        animates: 'Смена карточек notice (slide или fade)',
        static: 'Экран тренировки под затемнением',
    },
    'modal.open': {
        screen: 'Любой экран + Modal',
        route: 'App.vue → Modal.vue',
        source: 'Modal.vue → .modal-mask',
        animates: 'Появление модального окна и backdrop',
        static: 'Экран тренировки под затемнением',
    },
    'progress.bar': {
        screen: 'Тренировка',
        route: '/training',
        source: 'ProgressBar.vue → :before',
        animates: 'Заполнение полоски серии под шапкой',
        static: 'Кольцо усвоенности, слово, подсказки, кнопки',
    },
    'button.press': {
        screen: 'Тренировка',
        route: '/training',
        source: 'Training.vue → .look-variants',
        animates: 'Нажатие «Посмотреть варианты»',
        static: 'Слово, кольцо, подсказки',
    },
    'training.word_change': {
        screen: 'Тренировка',
        route: '/training',
        source: 'Training.vue → .transcription',
        animates: 'Смена слова hello → world',
        static: 'Кольцо, подсказки, кнопки',
    },
    'list.stagger': {
        screen: 'Статистика',
        route: '/statistics',
        source: 'Statistics.vue → .items .item',
        animates: 'Появление строк словаря с задержкой',
        static: 'Слой дашборда, StatPult',
    },
};

export function getAnimationPreviewMeta(scenarioKey) {
    return ANIMATION_PREVIEW_META[scenarioKey] || {
        screen: '—',
        route: '—',
        source: '—',
        animates: '—',
        static: '—',
    };
}
