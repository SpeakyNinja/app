// Preview-only data. FIELD never submits progress or changes a student's account.
export const FIELD_SCREENS = [
    ['home', 'Маршрут дня', 'Один следующий шаг, личный ритм и карта возможностей.'],
    ['training', 'Тренировка', 'Слово в фокусе: контекст, ответ, объяснение и завершение сессии.'],
    ['dialog', 'Диалог с Talos', 'Небольшая жизненная сцена с развилками и переводом.'],
    ['session', 'Итог сессии', 'Результат без давления: что получилось и куда двигаться дальше.'],
    ['stats', 'Атлас прогресса', 'Словарь как освоенная территория, ритм и следующий пояс.'],
    ['quests', 'Задания недели', 'Три небольшие экспедиции и получение награды.'],
    ['achievements', 'Коллекция открытий', 'Памятные знаки пути с фильтрами и историей достижения.'],
    ['report', 'Письмо недели', 'Личный разбор недели и понятный следующий шаг.'],
    ['settings', 'Настройки ритма', 'Темп, звук и подсказки под контролем человека.'],
    ['account', 'Паспорт исследователя', 'Профиль, запас нейронов и личное направление.'],
];

export const FIELD_WORDS = [
    { word: 'wander', phonetic: '/ˈwɒn.dər/', context: 'Let’s wander through the city.', translation: 'Давай побродим по городу.', answers: ['Бродить', 'Торопиться', 'Удивляться'], correct: 0, note: 'Wander — идти без определённого маршрута. Иногда так и находят самое интересное.' },
    { word: 'notice', phonetic: '/ˈnəʊ.tɪs/', context: 'Did you notice the little bookshop?', translation: 'Ты заметил маленький книжный магазин?', answers: ['Забывать', 'Замечать', 'Покупать'], correct: 1, note: 'Notice — обратить внимание. Маленькое слово для маленьких открытий.' },
    { word: 'curious', phonetic: '/ˈkjʊə.ri.əs/', context: 'Stay curious about the world.', translation: 'Сохраняй любопытство к миру.', answers: ['Осторожный', 'Уставший', 'Любознательный'], correct: 2, note: 'Curious описывает человека, которому хочется узнать больше.' },
    { word: 'belong', phonetic: '/bɪˈlɒŋ/', context: 'I feel like I belong here.', translation: 'Здесь я чувствую себя на своём месте.', answers: ['Чувствовать себя своим', 'Возвращаться', 'Ждать'], correct: 0, note: 'Belong — быть частью чего-то. Не только место, но и ощущение.' },
];

export const FIELD_DIALOG = [
    { line: 'Hey! You look a little lost. Looking for something?', translation: 'Привет! Кажется, ты заблудился. Что-то ищешь?', choices: ["A quiet place to read, actually.", "Just exploring. Any recommendations?"], replies: ["Then you’ll love the bookshop around the corner.", "Absolutely. There’s a lovely bookshop nearby."] },
    { line: 'It has a tiny café upstairs. Want to check it out?', translation: 'Наверху есть маленькое кафе. Хочешь заглянуть?', choices: ["Sounds like my kind of place.", "Sure! Is it far from here?"], replies: ["I had a feeling you’d say that!", "Not at all. Just a two-minute walk."] },
    { line: 'What do you usually like to read?', translation: 'Что ты обычно любишь читать?', choices: ["Stories about people and places.", "Anything that makes me curious."], replies: ["Then we’ve found your next favourite spot.", "That’s the best way to discover something new."] },
];

export const FIELD_BADGES = [
    { id: 'first', name: 'Первый след', category: 'Слова', symbol: 'spark', detail: 'Первая завершённая тренировка. Большой путь начинается с одного слова.', unlocked: true },
    { id: 'week', name: 'В своём ритме', category: 'Ритм', symbol: 'sun', detail: 'Пять учебных дней за неделю. Ты нашёл время для себя.', unlocked: true },
    { id: 'voice', name: 'Есть контакт', category: 'Диалоги', symbol: 'chat', detail: 'Первый разговор с Talos — и первый шаг к свободному общению.', unlocked: true },
    { id: 'hundred', name: 'Сто открытий', category: 'Слова', symbol: 'map', detail: '100 знакомых слов. Теперь в мире чуть меньше незнакомого.', unlocked: true },
    { id: 'blue', name: 'Новый горизонт', category: 'Ритм', symbol: 'compass', detail: 'Синий пояс. До открытия осталось освоить 14 слов.', unlocked: false },
    { id: 'traveller', name: 'Без переводчика', category: 'Диалоги', symbol: 'arrow', detail: 'Пройди три диалога без подсказок перевода.', unlocked: false },
];
