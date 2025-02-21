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
                            value: 'Иногда слова будут запоминаться с первого раза.',
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
                    component: 'Ai',
                    title: 'Привет',
                    texts: [
                        {
                            value: 'Меня зовут Атлас.',
                            muted: false
                        }, {
                            value: 'Я буду обучать английскому нейросеть твоего мозга.',
                            muted: false
                        }, {
                            value: 'И объяснять, что к чему.',
                            muted: true
                        }
                    ]
                }, {
                    component: 'Ai',
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
                    component: 'Ai',
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

            testAfter: [
                {
                    component: 'Ai',
                    title: 'Твой уровень определен',
                    texts: [
                        {
                            value: 'Точность подстройки: 23%',
                            muted: false
                        }
                    ]
                }, {
                    component: 'Ai',
                    title: 'Буду предлагать слова',
                    texts: [
                        {
                            value: 'Учитывая их частотность и твой уровень.',
                            muted: false
                        }
                    ]
                }, {
                    component: 'Ai',
                    title: 'Выбирай',
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
                    component: 'Ai',
                    title: 'Слова выбраны',
                    texts: [
                        {
                            value: 'Точность подстройки: 39%',
                            muted: false
                        }
                    ]
                }, {
                    component: 'Ai',
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
                    component: 'Ai',
                    title: 'Слова выбраны',
                    texts: [
                        {
                            value: `Точность подстройки: ${options?.nth}%`,
                            muted: false
                        }
                    ]
                } 
            ],

            addWordsBefore: [
                {
                    component: 'Ai',
                    title: 'Время повтора изучаемых слов еще не наступило',
                    texts: [
                        {
                            value: 'Нужно выбрать новые слова.',
                            muted: false
                        }
                    ]
                } 
            ],

            trainingBefore1: [
                {
                    component: 'Ai',
                    title: 'Можешь переслушивать произношение',
                    texts: [
                        {
                            value: 'Нажимай на транскрипцию слова.',
                            muted: false
                        }
                    ]
                } 
            ],

            trainingBefore2: [
                {
                    component: 'Ai',
                    title: 'Оптимальные повторы',
                    texts: [
                        {
                            value: 'В зависимости от твоей активности, я определяю лучшее время повторения каждого слова.',
                            muted: false
                        }
                    ]
                } 
            ],

            trainingBefore4: [
                {
                    component: 'Ai',
                    title: 'Для максимального эффекта',
                    texts: [
                        {
                            value: 'читай фразы целиком',
                            muted: false
                        }
                    ]
                } 
            ],

            stagesWords: [
                {
                    component: 'Brain',
                    brainItems: [
                        {memorization: 3, count: 6},
                        {memorization: 2, count: 15},
                        {memorization: 1, count: 19}
                    ],
                    title: 'Красные',
                    texts: [
                        {
                            value: 'Этап ознакомления.',
                            muted: false
                        }, {
                            value: 'Три повтора с короткими интервалами. Внесение слов в краткосрочную память.',
                            muted: true
                        }
                    ]
                }, {
                    component: 'Brain',
                    brainItems: [
                        {memorization: 7, count: 6},
                        {memorization: 6, count: 4},
                        {memorization: 5, count: 6},
                        {memorization: 4, count: 18},
                        {memorization: 3, count: 0},
                        {memorization: 2, count: 13},
                        {memorization: 1, count: 13}
                    ],
                    title: 'Желтые',
                    texts: [
                        {
                            value: 'Этап усвоения.',
                            muted: false
                        }, {
                            value: 'Четыре повтора со средними интервалами. Перевод слов в среднесрочную память.',
                            muted: true
                        }
                    ]
                }, {
                    component: 'Brain',
                    brainItems: [
                        {memorization: 12, count: 6},
                        {memorization: 11, count: 4},
                        {memorization: 10, count: 6},
                        {memorization: 9, count: 11},
                        {memorization: 8, count: 13},
                        {memorization: 7, count: 0},
                        {memorization: 6, count: 0},
                        {memorization: 5, count: 7},
                        {memorization: 4, count: 13},
                        {memorization: 3, count: 0},
                        {memorization: 2, count: 13},
                        {memorization: 1, count: 6}
                    ],
                    title: 'Зеленые',
                    texts: [
                        {
                            value: 'Этап закрепления.',
                            muted: false
                        }, {
                            value: 'Пять повторов с длинными интервалами. Закрепление слов в долгосрочной памяти.',
                            muted: true
                        }
                    ]
                }, {
                    component: 'Brain',
                    brainItems: [
                        {memorization: 13, count: 34},
                        {memorization: 12, count: 0},
                        {memorization: 11, count: 0},
                        {memorization: 10, count: 6},
                        {memorization: 9, count: 7},
                        {memorization: 8, count: 6},
                        {memorization: 7, count: 0},
                        {memorization: 6, count: 0},
                        {memorization: 5, count: 7},
                        {memorization: 4, count: 13},
                        {memorization: 3, count: 0},
                        {memorization: 2, count: 11},
                        {memorization: 1, count: 6}
                    ],
                    title: 'Циановые',
                    texts: [
                        {
                            value: 'Выучил',
                            muted: false
                        }, {
                            value: 'Слова, которые прошли все этапы.',
                            muted: true
                        }
                    ]
                }, {
                    component: 'Brain',
                    brainItems: [
                        {memorization: 20, count: 34},
                        {memorization: 13, count: 19},
                        {memorization: 12, count: 0},
                        {memorization: 11, count: 0},
                        {memorization: 10, count: 0},
                        {memorization: 9, count: 0},
                        {memorization: 8, count: 20},
                        {memorization: 7, count: 0},
                        {memorization: 6, count: 0},
                        {memorization: 5, count: 0},
                        {memorization: 4, count: 17},
                        {memorization: 3, count: 0},
                        {memorization: 2, count: 4},
                        {memorization: 1, count: 6}
                    ],
                    title: 'Белые',
                    texts: [
                        {
                            value: 'Известные',
                            muted: false
                        }, {
                            value: 'Слова, которые знал.',
                            muted: true
                        }
                    ]
                }, {
                    component: 'Brain',
                    brainItems: [
                        {memorization: 20, count: 6},
                        {memorization: 13, count: 10},
                        {memorization: 12, count: 5},
                        {memorization: 11, count: 6},
                        {memorization: 10, count: 7},
                        {memorization: 9, count: 6},
                        {memorization: 8, count: 13},
                        {memorization: 7, count: 7},
                        {memorization: 6, count: 6},
                        {memorization: 5, count: 7},
                        {memorization: 4, count: 6},
                        {memorization: 3, count: 5},
                        {memorization: 2, count: 10},
                        {memorization: 1, count: 6}
                    ],
                    title: 'Тепловая карта уровней',
                    texts: [
                        {
                            value: 'Показывает количество слов на всех этапах усвоения.',
                            muted: false
                        }
                    ]
                }
            ],

            rating: [
                {
                    customItem: 'Rating1'
                },
                {
                    customItem: 'Rating2',
                    hideControls: true
                },
                {
                    customItem: 'Rating3'
                } 
            ],

            greenMem: [
                {
                    customItem: 'GreenMemCongratulation'
                }
            ],

            timeIsEmpty: [
                {
                    customItem: 'TimeIsEmpty',
                    options: options,
                    hideControls: true
                }
            ],

            awardByTime: [
                {
                    customItem: 'awardByTime',
                    options: options,
                    hideControls: true
                }
            ],

            awardByWords: [
                {
                    customItem: 'awardByWords',
                    options: options,
                    hideControls: true
                }
            ],

            firstLevelUp: [
                {
                    component: 'Ai',
                    title: 'Поздравляю',
                    texts: [
                        {
                            value: 'Достигнут первый уровень.',
                            muted: false
                        }
                    ]
                }, {
                    customItem: 'FirstLevelUp2'
                }, {
                    component: 'Ai',
                    title: 'Бонус уровня',
                    texts: [
                        {
                            value: 'Уровни дают бонус к создаваемому времени. Чем больше уровень, тем больше бонус.',
                            muted: false
                        },
                        {
                            value: 'Бонус уровня будет добавляться каждый день к первой тренировке.',
                            muted: false
                        }
                    ]
                }, {
                    customItem: 'FirstLevelUp4',
                    hideControls: true
                }
            ],

            levelUp: [
                {
                    customItem: 'LevelUp',
                    options: options,
                    hideControls: true
                }
            ],

        };

        return items[key];
    }
}