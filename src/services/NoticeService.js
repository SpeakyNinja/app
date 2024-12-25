export default class NoticeService {
    getItems(key, options) {
        const items = {

            indexBefore: [
                {
                    component: 'Rainbow',
                    title: 'Легко',
                    texts: [
                        {
                            value: 'Слова английского<br>будут запоминаться сами.',
                            muted: false
                        }, {
                            value: 'Как words родного языка.',
                            muted: true
                        }
                    ]
                }, {
                    component: 'SpeedWidget',
                    title: 'Быстро',
                    texts: [
                        {
                            value: 'За счет досознательного усвоения.',
                            muted: false
                        }, {
                            value: 'Иногда слова будут запомниться с первого раза.',
                            muted: true
                        }
                    ]
                }, {
                    image: new URL('@/images/brain.svg', import.meta.url).href,
                    title: 'Эффективно',
                    texts: [
                        {
                            value: 'Методика использует врожденные механики усвоения языков мозгом.',
                            muted: false
                        }, {
                            value: 'Удивись своей способности запоминать слова.',
                            muted: true
                        }
                    ]
                }
            ],

            testBefore: [
                {
                    title: 'Калибровка',
                    texts: [
                        {
                            value: 'Для начала, нужно определить твой текущий уровень словарного запаса.',
                            muted: false
                        }, {
                            value: 'Чтобы определить твою зону ближайшего развития.',
                            muted: true
                        }
                    ]
                }, {
                    title: 'Как проходить тестирование',
                    texts: [
                        {
                            value: 'Всё просто.',
                            muted: false
                        }, {
                            value: 'Знаешь слово – выбери перевод.<br>Не знаешь – выбери “не знаю”.',
                            muted: false
                        }, {
                            value: 'Стараться угадывать не нужно.',
                            muted: true
                        }
                    ]
                }
            ],

            addWordsBefore: [
                {
                    title: 'Твой уровень определен',
                    texts: [
                        {
                            value: 'Точность подстройки: 23%',
                            muted: false
                        }
                    ]
                }, {
                    title: 'Выбери слова для запоминания',
                    texts: [
                        {
                            value: 'Я буду предлагать слова, учитывая их частотность и твой уровень.',
                            muted: false
                        }
                    ]
                }, {
                    title: 'Выбери слова для запоминания',
                    texts: [
                        {
                            value: 'Отмечай, которые знаешь и которые хочешь выучить.',
                            muted: false
                        }, {
                            value: 'Если не хочешь учить сейчас, можешь отложить на потом.',
                            muted: true
                        }
                    ]
                }
            ],

            addWordsAfterFirst: [
                {
                    title: 'Слова выбраны',
                    texts: [
                        {
                            value: 'Точность подстройки: 39%',
                            muted: false
                        }
                    ]
                }, {
                    title: 'Не старайся запоминать',
                    texts: [
                        {
                            value: 'Просто читай специально подобранные фразы и выбирай подходящий перевод.',
                            muted: false
                        }, {
                            value: 'Остальное мозг сделает сам.',
                            muted: true
                        }
                    ]
                }
            ],

            addWordsAfterNth: [
                {
                    title: 'Слова выбраны',
                    texts: [
                        {
                            value: `Точность подстройки: ${options?.nth}%`,
                            muted: false
                        }
                    ]
                } 
            ]
        };

        return items[key];
    }
}