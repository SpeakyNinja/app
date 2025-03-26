export default class NoticeService {
    getItems(key, options) {
        const items = {

            indexBefore: [
                {
                    customItem: 'Index1'
                }, {
                    customItem: 'Index2'
                }, {
                    customItem: 'Index3'
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
                            value: 'Искусственная нейросеть созданная для обучения естественных нейросетей.',
                            muted: false
                        }
                    ]
                }, {
                    component: 'Ai',
                    title: 'Привет',
                    texts: [
                        {
                            value: 'Я буду обучать тебя словам английского на досознательном уровне.',
                            muted: false
                        }, {
                            value: 'Обучая нейросеть твоего мозга.',
                            muted: true
                        }
                    ]
                }, {
                    component: 'Ai',
                    title: 'Калибровка',
                    texts: [
                        {
                            value: 'Начнем с небольшого тестирования для определения твоего уровня',
                            muted: false
                        }, {
                            value: 'чтобы определить твою зону ближайшего развития',
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
                            value: 'Знаешь слово – выбери перевод. Не знаешь – выберай “не знаю”.',
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
                    customItem: 'AddWordsBefore',
                    hideControls: true
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
                    customItem: 'Stage1'
                }, {
                    customItem: 'Stage2'
                }, {
                    customItem: 'Stage3'
                }, {
                    customItem: 'Stage4'
                }, {
                    customItem: 'Stage5'
                }, {
                    customItem: 'Stage6'
                }
            ],

            rating: [
                {
                    customItem: 'Rating1'
                },
                {
                    customItem: 'Rating2',
                    options: options,
                    hideControls: true
                },
                {
                    customItem: 'Rating3',
                    hideControls: true
                } 
            ],

            ratingShort: [
                {
                    customItem: 'Rating2',
                    hideControls: true
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
                    customItem: 'AwardByTime',
                    options: options,
                    hideControls: true
                }
            ],

            awardByWords: [
                {
                    customItem: 'AwardByWords',
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

            trainingsLimit: [
                {
                    customItem: 'TrainingsLimit',
                    hideControls: true
                }
            ],

            firstTrainingsLimitUpdated: [
                {
                    component: 'Ai',
                    title: 'Защита от перегрузки',
                    texts: [
                        {
                            value: 'Достигнут стартовый лимит тренировок на день.',
                            muted: false
                        }
                    ]
                }, {
                    component: 'Ai',
                    title: 'Защита от перегрузки',
                    texts: [
                        {
                            value: 'Чтобы защитить мозг от переутомления, количество нагрузки будет увеличиваться постепенно.',
                            muted: false
                        }
                    ]
                }, {
                    component: 'Ai',
                    title: 'Защита от перегрузки',
                    texts: [
                        {
                            value: 'Ограничение будет снижаться на 5, когда будет достигнуто прошлое значение.',
                            muted: false
                        }, {
                            value: 'Увеличение лимита происходит не чаще одного раза в сутки.',
                            muted: true
                        }
                    ]
                }
            ],

            trainingsLimitUpdated: [
                {
                    customItem: 'TrainingsLimitUpdated',
                    hideControls: true
                }
            ],

            timerNotice: [
                {
                    customItem: 'TimerNotice',
                    hideControls: true
                }
            ],

            pwaInstall: [
                {
                    customItem: 'PwaInstall',
                    hideControls: true
                }
            ],

            iosInstall: [
                {
                    customItem: 'InstallIosNotice',
                    hideControls: true
                }
            ]

        };

        return items[key];
    }
}