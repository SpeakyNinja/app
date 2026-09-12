export const SALON_INTRO_DIALOG_SNAPSHOT = {
    "canvas_slug": "intro-dialog",
    "canvas_title": "Вступительный диалог",
    "starter_dialog_slug": "intro",
    "dialogs": {
        "intro": {
            "id": "3",
            "slug": "intro",
            "title": "Интро",
            "blocks": {
                "block_1780341930286": {
                    "id": "5",
                    "title": "Старт (дверь)",
                    "groups": [
                        {
                            "id": "256",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "171",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Привет"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 1,
                                    "activation_rules": null
                                },
                                {
                                    "id": "172",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Я - искусственный интеллект.\nМеня зовут Талос"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 1,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 0
                        },
                        {
                            "id": "257",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "188",
                                    "label": "Привет",
                                    "effects": [
                                        {
                                            "id": "188",
                                            "sort_order": 0,
                                            "effect_type": "set_variable",
                                            "variable_key": "intro_done",
                                            "variable_value": "1",
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 1
                        },
                        {
                            "id": "258",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "173",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Меня отправили в ваше время чтобы помочь тебе получить черный пояс владения английским"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 2
                        }
                    ],
                    "sort_order": 0,
                    "internal_key": "block_1780341930286",
                    "activation_rules": null
                }
            },
            "status": "active",
            "settings": [],
            "graph_position": {
                "x": 0,
                "y": 0
            },
            "entry_block_key": "block_1780341930286",
            "activation_rules": null,
            "deactivation_rules": null
        },
        "main-character": {
            "id": "4",
            "slug": "main-character",
            "title": "Главный герой",
            "blocks": {
                "block_1780342082928": {
                    "id": "6",
                    "title": "Старт (дверь)",
                    "groups": [
                        {
                            "id": "284",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "205",
                                    "label": "Чтобы помочь именно мне?",
                                    "effects": [
                                        {
                                            "id": "205",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 0
                        },
                        {
                            "id": "285",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "185",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Да, именно тебе"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 1
                        },
                        {
                            "id": "286",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "206",
                                    "label": "Почему именно мне?",
                                    "effects": [
                                        {
                                            "id": "206",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "7",
                                            "target_block_key": "block_1780342232832",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "207",
                                    "label": "Серьезно?",
                                    "effects": [
                                        {
                                            "id": "207",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 2
                        },
                        {
                            "id": "287",
                            "kind": "replica_group",
                            "mood": "focused",
                            "replicas": [
                                {
                                    "id": "186",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Да, серьезно"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 3
                        },
                        {
                            "id": "288",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "208",
                                    "label": "Почему именно мне?",
                                    "effects": [
                                        {
                                            "id": "208",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "7",
                                            "target_block_key": "block_1780342232832",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "209",
                                    "label": "Что, правда?",
                                    "effects": [
                                        {
                                            "id": "209",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 4
                        },
                        {
                            "id": "289",
                            "kind": "replica_group",
                            "mood": "angry",
                            "replicas": [
                                {
                                    "id": "187",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Да, правда"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 5
                        },
                        {
                            "id": "290",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "210",
                                    "label": "Почему тебя отправили помочь именно мне?",
                                    "effects": [
                                        {
                                            "id": "210",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "7",
                                            "target_block_key": "block_1780342232832",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 6
                        }
                    ],
                    "sort_order": 0,
                    "internal_key": "block_1780342082928",
                    "activation_rules": null
                },
                "block_1780342232832": {
                    "id": "7",
                    "title": "Почему именно мне?",
                    "groups": [
                        {
                            "id": "291",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "188",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Если никто не явился из будущего, чтобы предостеречь нас,\nзначит ничего ужасного мы не делаем"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0.5,
                                    "activation_rules": null
                                },
                                {
                                    "id": "189",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "знаешь такую поговорку?"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 1,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 0
                        },
                        {
                            "id": "292",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "211",
                                    "label": "Да, знаю",
                                    "effects": [
                                        {
                                            "id": "211",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "212",
                                    "label": "Теперь знаю",
                                    "effects": [
                                        {
                                            "id": "212",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 1
                        },
                        {
                            "id": "293",
                            "kind": "replica_group",
                            "mood": "focused",
                            "replicas": [
                                {
                                    "id": "190",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Так вот\nСообщаю:"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "191",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "от твоих действий зависит будущее"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 1,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 2
                        },
                        {
                            "id": "294",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "213",
                                    "label": "Будущее? От меня?",
                                    "effects": [
                                        {
                                            "id": "213",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 3
                        },
                        {
                            "id": "295",
                            "kind": "replica_group",
                            "mood": "focused",
                            "replicas": [
                                {
                                    "id": "192",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Именно"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 4
                        },
                        {
                            "id": "296",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "214",
                                    "label": "Это что, шутка?",
                                    "effects": [
                                        {
                                            "id": "214",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 5
                        },
                        {
                            "id": "297",
                            "kind": "replica_group",
                            "mood": "angry",
                            "replicas": [
                                {
                                    "id": "193",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "При разговоре об этом никому не до шуток"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 6
                        },
                        {
                            "id": "298",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "215",
                                    "label": "Тогда объясни, как будущее зависит от меня",
                                    "effects": [
                                        {
                                            "id": "215",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 7
                        },
                        {
                            "id": "299",
                            "kind": "replica_group",
                            "mood": "surprised",
                            "replicas": [
                                {
                                    "id": "194",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Говорит ли тебе о чем нибудь фраза\n\"Аннушка уже разлила масло?\""
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 8
                        },
                        {
                            "id": "300",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "216",
                                    "label": "Да",
                                    "effects": [
                                        {
                                            "id": "216",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "217",
                                    "label": "Нет",
                                    "effects": [
                                        {
                                            "id": "217",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 9
                        },
                        {
                            "id": "301",
                            "kind": "replica_group",
                            "mood": "surprised",
                            "replicas": [
                                {
                                    "id": "195",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "А знаешь что такое \"эффект бабочки\"\nКоторый еще называют \"эффектом домино\"?"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 10
                        },
                        {
                            "id": "302",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "218",
                                    "label": "Да, знаю.",
                                    "effects": [
                                        {
                                            "id": "218",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "12",
                                            "target_block_key": "block_1780343411353",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "219",
                                    "label": "Объясни",
                                    "effects": [
                                        {
                                            "id": "219",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 11
                        },
                        {
                            "id": "303",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "196",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Эффект бабочки - это когда небольшие действия\nв настоящем запукают такую цепь событий,\nкоторая приводит к большим последствиям."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 12
                        },
                        {
                            "id": "304",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "220",
                                    "label": "Понятно",
                                    "effects": [
                                        {
                                            "id": "220",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "12",
                                            "target_block_key": "block_1780343411353",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "221",
                                    "label": "Например?",
                                    "effects": [
                                        {
                                            "id": "221",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 13
                        },
                        {
                            "id": "305",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "197",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Не было гвоздя – подкова отвалилась. \nНе было подковы – лошадь захромала. \nЛошадь захромала – командир убит. \nКонница разбита – армия бежит."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0.5,
                                    "activation_rules": null
                                },
                                {
                                    "id": "198",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Враг вступает в город, \nПленных не щадя. \nОттого, что в кузнице \nНе было гвоздя."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 1,
                                    "delay_seconds": 0.5,
                                    "activation_rules": null
                                },
                                {
                                    "id": "199",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Суть понятна?"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 2,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 14
                        },
                        {
                            "id": "306",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "222",
                                    "label": "Понятно",
                                    "effects": [
                                        {
                                            "id": "222",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "11",
                                            "target_block_key": "block_1780343336425",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "223",
                                    "label": "А есть реальные примеры из жизни?",
                                    "effects": [
                                        {
                                            "id": "223",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 15
                        },
                        {
                            "id": "307",
                            "kind": "replica_group",
                            "mood": "listening",
                            "replicas": [
                                {
                                    "id": "200",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Конечно."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0.5,
                                    "activation_rules": null
                                },
                                {
                                    "id": "201",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Вот примеры из прошлого:"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 1,
                                    "delay_seconds": 0.5,
                                    "activation_rules": null
                                },
                                {
                                    "id": "202",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Знаешь историю о том, как 14 волков\nменяли русла рек?"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 2,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 16
                        },
                        {
                            "id": "308",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "224",
                                    "label": "Да",
                                    "effects": [
                                        {
                                            "id": "224",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "8",
                                            "target_block_key": "block_1780342930629",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "225",
                                    "label": "Нет",
                                    "effects": [
                                        {
                                            "id": "225",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 17
                        },
                        {
                            "id": "309",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "203",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "В начале 20-го века, из Йеллоустонского парка были вытеснены волки.\nЭто привело к увеличению популяции оленей. \nОлени съедали молодые деревья и кусты у берегов рек. \nЭто привело к уменьшению популяции птиц, бобров и других животных. \nОт чего берега рек стали менее прочными. \nВ итоге, реки расширялись и меняли свои каналы."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0.5,
                                    "activation_rules": null
                                },
                                {
                                    "id": "204",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "А в 1995 году в парк вернули 14 волков. \nОни начали охотиться на оленей \nЧисленность оленей уменьшилась. \nСтали активно расти молодые деревья и кусты. \nПоявились бобры, которые начали создавать запруды, и менять течения рек.\nВ итоге, реки сужались и меняли свои каналы."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 1,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 18
                        },
                        {
                            "id": "310",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "226",
                                    "label": "Да уж",
                                    "effects": [
                                        {
                                            "id": "226",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "8",
                                            "target_block_key": "block_1780342930629",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "227",
                                    "label": "Надо же",
                                    "effects": [
                                        {
                                            "id": "227",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "8",
                                            "target_block_key": "block_1780342930629",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                },
                                {
                                    "id": "228",
                                    "label": "Удивительно",
                                    "effects": [
                                        {
                                            "id": "228",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "8",
                                            "target_block_key": "block_1780342930629",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 2,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 19
                        }
                    ],
                    "sort_order": 0,
                    "internal_key": "block_1780342232832",
                    "activation_rules": null
                },
                "block_1780342930629": {
                    "id": "8",
                    "title": "Убийство собаки",
                    "groups": [
                        {
                            "id": "311",
                            "kind": "replica_group",
                            "mood": "surprised",
                            "replicas": [
                                {
                                    "id": "205",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "А знаешь о том \nкак из-за убийства собаки \nпоявились террористические организации?"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 0
                        },
                        {
                            "id": "312",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "229",
                                    "label": "Да",
                                    "effects": [
                                        {
                                            "id": "229",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "9",
                                            "target_block_key": "block_1780343123151",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "230",
                                    "label": "Нет",
                                    "effects": [
                                        {
                                            "id": "230",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 1
                        },
                        {
                            "id": "313",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "206",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "городского советника Чарльза Хазарда\nМальчишка - Чарли Уилсон\n\nВ 1933 году, \nна клумбы члена городского совета Техаса\nзачастила с походами в туалет одна собака. \n\nЧлену совет это не нравилось настолько\nчто он накормил собаку едой с толченым стеклом.\n\nЭто была собака соседского мальчишки Чарли Уилсона.\n\nЧарли было всего 13 лет. \nОн воспринял мучительную смерть собаки тяжело.\nИ поклялся отомстить. \n\nЧарли прошелся по округе и рассказал всем, \nчто член городского совета сделал с его собакой.\n\nИз-за чего\nчлен городского совета \nпроиграл следующие выборы.\n\nА Чарли получил опыт влияния на политику.\n\nПовзрослев, Чарли стал представителем Конгресса.\nА во времена афганской войны \nЧарли Уилсон проводил кампанию помощи моджахедам.\nВ результате чего появились \nтакие террористические организации \nкак «Талибан» и «Аль-Каида». \n\nИ началась современная эпоха терроризма."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 2
                        },
                        {
                            "id": "314",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "231",
                                    "label": "Вот те на",
                                    "effects": [
                                        {
                                            "id": "231",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "9",
                                            "target_block_key": "block_1780343123151",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "232",
                                    "label": "Вот это поворот",
                                    "effects": [
                                        {
                                            "id": "232",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "9",
                                            "target_block_key": "block_1780343123151",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 3
                        }
                    ],
                    "sort_order": 0,
                    "internal_key": "block_1780342930629",
                    "activation_rules": null
                },
                "block_1780343123151": {
                    "id": "9",
                    "title": "Война с воробьями",
                    "groups": [
                        {
                            "id": "315",
                            "kind": "replica_group",
                            "mood": "surprised",
                            "replicas": [
                                {
                                    "id": "207",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "А знаешь как воюя с воробьями умерли десятки миллионов человек?"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 0
                        },
                        {
                            "id": "316",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "233",
                                    "label": "Да, знаю",
                                    "effects": [
                                        {
                                            "id": "233",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "10",
                                            "target_block_key": "block_1780343206247",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "234",
                                    "label": "Нет и не хочу знать",
                                    "effects": [
                                        {
                                            "id": "234",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "10",
                                            "target_block_key": "block_1780343206247",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                },
                                {
                                    "id": "235",
                                    "label": "Нет",
                                    "effects": [
                                        {
                                            "id": "235",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 2,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 1
                        },
                        {
                            "id": "317",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "208",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "=рассказ про воробьев="
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 2
                        },
                        {
                            "id": "318",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "236",
                                    "label": "=вау=",
                                    "effects": [
                                        {
                                            "id": "236",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "10",
                                            "target_block_key": "block_1780343206247",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 3
                        }
                    ],
                    "sort_order": 0,
                    "internal_key": "block_1780343123151",
                    "activation_rules": null
                },
                "block_1780343206247": {
                    "id": "10",
                    "title": "Ученый убил миллион человек",
                    "groups": [
                        {
                            "id": "319",
                            "kind": "replica_group",
                            "mood": "surprised",
                            "replicas": [
                                {
                                    "id": "209",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "А знаешь как ученый случайно убил миллионы человек?"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 0
                        },
                        {
                            "id": "320",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "237",
                                    "label": "Да, знаю",
                                    "effects": [
                                        {
                                            "id": "237",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "11",
                                            "target_block_key": "block_1780343336425",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "238",
                                    "label": "Нет, и не хочу знать",
                                    "effects": [
                                        {
                                            "id": "238",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "11",
                                            "target_block_key": "block_1780343336425",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                },
                                {
                                    "id": "239",
                                    "label": "Нет",
                                    "effects": [
                                        {
                                            "id": "239",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 2,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 1
                        },
                        {
                            "id": "321",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "210",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "=рассказ про свинец в бензине="
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 2
                        },
                        {
                            "id": "322",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "240",
                                    "label": "=вау=",
                                    "effects": [
                                        {
                                            "id": "240",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 3
                        },
                        {
                            "id": "323",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "211",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Если интересно,можешь  поискать и другие случаи сам,\nнапример по запросу \"примеры эффекта бабочки в реальности\"."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 4
                        },
                        {
                            "id": "324",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "241",
                                    "label": "Ок",
                                    "effects": [
                                        {
                                            "id": "241",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "11",
                                            "target_block_key": "block_1780343336425",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 5
                        }
                    ],
                    "sort_order": 0,
                    "internal_key": "block_1780343206247",
                    "activation_rules": null
                },
                "block_1780343336425": {
                    "id": "11",
                    "title": "Другая сторона",
                    "groups": [
                        {
                            "id": "325",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "212",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Но у этой медали есть и другая сторона\nс положительным эффектом"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 0
                        },
                        {
                            "id": "326",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "242",
                                    "label": "Например?",
                                    "effects": [
                                        {
                                            "id": "242",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 1
                        },
                        {
                            "id": "327",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "213",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "=="
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 2
                        },
                        {
                            "id": "328",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "243",
                                    "label": "=вау=",
                                    "effects": [
                                        {
                                            "id": "243",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 3
                        },
                        {
                            "id": "329",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "214",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Вообще, подобных случаев эффекта бабочки очень много. \nИ мелких и эпохальных."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 4
                        },
                        {
                            "id": "330",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "244",
                                    "label": "Надо же",
                                    "effects": [
                                        {
                                            "id": "244",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "12",
                                            "target_block_key": "block_1780343411353",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "245",
                                    "label": "Да уж",
                                    "effects": [
                                        {
                                            "id": "245",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "12",
                                            "target_block_key": "block_1780343411353",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                },
                                {
                                    "id": "246",
                                    "label": "Удивительно",
                                    "effects": [
                                        {
                                            "id": "246",
                                            "sort_order": 0,
                                            "effect_type": "goto_block",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": "12",
                                            "target_block_key": "block_1780343411353",
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 2,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 5
                        }
                    ],
                    "sort_order": 0,
                    "internal_key": "block_1780343336425",
                    "activation_rules": null
                },
                "block_1780343411353": {
                    "id": "12",
                    "title": "Так вот",
                    "groups": [
                        {
                            "id": "271",
                            "kind": "replica_group",
                            "mood": "focused",
                            "replicas": [
                                {
                                    "id": "177",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Так вот."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "178",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Некоторые из твоих действий в настоящем, \u2028оказывают критическое влияние на будущее.\nХотя и кажутся тебе незначительными."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 1,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 0
                        },
                        {
                            "id": "272",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "198",
                                    "label": "И на что же влияют мои действия?",
                                    "effects": [
                                        {
                                            "id": "198",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 1
                        },
                        {
                            "id": "273",
                            "kind": "replica_group",
                            "mood": "angry",
                            "replicas": [
                                {
                                    "id": "179",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "На будущее, я же говорил."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 2
                        },
                        {
                            "id": "274",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "199",
                                    "label": "А на что именно?",
                                    "effects": [
                                        {
                                            "id": "199",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 3
                        },
                        {
                            "id": "275",
                            "kind": "replica_group",
                            "mood": "listening",
                            "replicas": [
                                {
                                    "id": "180",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "На его наличие"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 4
                        },
                        {
                            "id": "276",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "200",
                                    "label": "Что?",
                                    "effects": [
                                        {
                                            "id": "200",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                },
                                {
                                    "id": "201",
                                    "label": "Как это?",
                                    "effects": [
                                        {
                                            "id": "201",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 1,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 5
                        },
                        {
                            "id": "277",
                            "kind": "replica_group",
                            "mood": "angry",
                            "replicas": [
                                {
                                    "id": "181",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Пока могу сказать только то, что \nна кону многое\nа для человечества – всё."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 6
                        },
                        {
                            "id": "278",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "202",
                                    "label": "Хотя бы скажи чем я влияю?",
                                    "effects": [
                                        {
                                            "id": "202",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 7
                        },
                        {
                            "id": "279",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "182",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Освоением английского языка."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 8
                        },
                        {
                            "id": "280",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "203",
                                    "label": "Вот как",
                                    "effects": [
                                        {
                                            "id": "203",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 9
                        },
                        {
                            "id": "281",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "183",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Тебе нужно получить черный пояс. \nЧтобы раскрыть твой потенциал.\nЧтобы ты смог исполнить своё предназначение"
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 10
                        },
                        {
                            "id": "282",
                            "kind": "reaction_group",
                            "mood": "neutral",
                            "reactions": [
                                {
                                    "id": "204",
                                    "label": "И как моё освоение английского влияет на наличие будущего?",
                                    "effects": [
                                        {
                                            "id": "204",
                                            "sort_order": 0,
                                            "effect_type": "advance",
                                            "variable_key": null,
                                            "variable_value": null,
                                            "target_block_id": null,
                                            "target_block_key": null,
                                            "target_dialog_slug": null
                                        }
                                    ],
                                    "hide_rules": null,
                                    "sort_order": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 11
                        },
                        {
                            "id": "283",
                            "kind": "replica_group",
                            "mood": "neutral",
                            "replicas": [
                                {
                                    "id": "184",
                                    "content": [
                                        {
                                            "payload": {
                                                "plain": "Увидишь после первой тренировки."
                                            },
                                            "block_type": "text"
                                        }
                                    ],
                                    "sort_order": 0,
                                    "delay_seconds": 0,
                                    "activation_rules": null
                                }
                            ],
                            "sort_order": 12
                        }
                    ],
                    "sort_order": 0,
                    "internal_key": "block_1780343411353",
                    "activation_rules": null
                }
            },
            "status": "active",
            "settings": [],
            "graph_position": {
                "x": 300,
                "y": 0
            },
            "entry_block_key": "block_1780342082928",
            "activation_rules": {
                "logic": "and",
                "rules": [
                    {
                        "type": "variable_compare",
                        "params": {
                            "key": "intro_done",
                            "value": "1",
                            "operator": "eq"
                        }
                    }
                ]
            },
            "deactivation_rules": null
        }
    }
};
