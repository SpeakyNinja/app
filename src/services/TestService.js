export default class TestService {
    questions;
    choices;

    constructor() {
        this.questions = [
            {
                word: 'spring',
                translate: 'весна',
                wrong_answers: ['камень', 'окно', 'зима', 'светло', 'солнце', 'рука', 'стол', 'автомобиль', 'рыба', 'планета']
            }, {
                word: 'apple',
                translate: 'яблоко',
                wrong_answers: ['банан', 'стол', 'окно', 'вода', 'дерево', 'собака', 'кошка', 'машина', 'книга', 'ручка']
            }, {
                word: 'house',
                translate: 'дом',
                wrong_answers: ['улица', 'дерево', 'река', 'гора', 'птица', 'рыба', 'солнце', 'луна', 'звезда', 'небо']
            }, {
                word: 'water',
                translate: 'вода',
                wrong_answers: ['огонь', 'земля', 'воздух', 'камень', 'дерево', 'песок', 'снег', 'лед', 'дождь', 'ветер']
            }, {
                word: 'cat',
                translate: 'кошка',
                wrong_answers: ['собака', 'птица', 'рыба', 'лошадь', 'корова', 'свинья', 'овца', 'коза', 'курица', 'утка']
            }, {
                word: 'sun',
                translate: 'солнце',
                wrong_answers: ['луна', 'звезда', 'планета', 'комета', 'метеор', 'галактика', 'небо', 'облако', 'дождь', 'снег']
            }, {
                word: 'car',
                translate: 'автомобиль',
                wrong_answers: ['велосипед', 'мотоцикл', 'самолет', 'поезд', 'корабль', 'лодка', 'автобус', 'трамвай', 'метро', 'такси']
            }, {
                word: 'book',
                translate: 'книга',
                wrong_answers: ['журнал', 'газета', 'тетрадь', 'блокнот', 'ручка', 'карандаш', 'линейка', 'ластик', 'бумага', 'папка']
            }, {
                word: 'tree',
                translate: 'дерево',
                wrong_answers: ['куст', 'цветок', 'трава', 'лиана', 'папоротник', 'мох', 'гриб', 'ягода', 'фрукт', 'овощ']
            }, {
                word: 'dog',
                translate: 'собака',
                wrong_answers: ['кошка', 'птица', 'рыба', 'лошадь', 'корова', 'свинья', 'овца', 'коза', 'курица', 'утка']
            }, {
                word: 'sky',
                translate: 'небо',
                wrong_answers: ['земля', 'вода', 'огонь', 'воздух', 'камень', 'дерево', 'песок', 'снег', 'лед', 'дождь']
            }, {
                word: 'fish',
                translate: 'рыба',
                wrong_answers: ['мясо', 'птица', 'овощ', 'фрукт', 'ягода', 'гриб', 'орех', 'зерно', 'молоко', 'сыр']
            }, {
                word: 'flower',
                translate: 'цветок',
                wrong_answers: ['дерево', 'куст', 'трава', 'лиана', 'папоротник', 'мох', 'гриб', 'ягода', 'фрукт', 'овощ']
            }, {
                word: 'mountain',
                translate: 'гора',
                wrong_answers: ['холм', 'долина', 'равнина', 'плато', 'каньон', 'пещера', 'скала', 'утес', 'обрыв', 'берег']
            }, {
                word: 'river',
                translate: 'река',
                wrong_answers: ['озеро', 'море', 'океан', 'ручей', 'водопад', 'болото', 'пруд', 'канал', 'залив', 'лагуна']
            }, {
                word: 'bird',
                translate: 'птица',
                wrong_answers: ['кошка', 'собака', 'рыба', 'лошадь', 'корова', 'свинья', 'овца', 'коза', 'курица', 'утка']
            }, {
                word: 'star',
                translate: 'звезда',
                wrong_answers: ['планета', 'луна', 'солнце', 'комета', 'метеор', 'галактика', 'небо', 'облако', 'дождь', 'снег']
            }, {
                word: 'computer',
                translate: 'компьютер',
                wrong_answers: ['телефон', 'планшет', 'ноутбук', 'монитор', 'клавиатура', 'мышь', 'принтер', 'сканер', 'факс', 'копир']
            }, {
                word: 'phone',
                translate: 'телефон',
                wrong_answers: ['компьютер', 'планшет', 'ноутбук', 'монитор', 'клавиатура', 'мышь', 'принтер', 'сканер', 'факс', 'копир']
            }, {
                word: 'window',
                translate: 'окно',
                wrong_answers: ['дверь', 'стена', 'потолок', 'пол', 'крыша', 'балкон', 'терраса', 'веранда', 'гараж', 'подвал']
            }
        ];
        this.choices = [];
    }

    addChoices(choice) {
        this.choices.push(choice);
    }

    getQuestion() {
        const i = Math.floor(Math.random() * this.questions.length);
        const item = this.questions[i];
        this.questions.splice(i, 1);
        return item;
    }

    getAnswers(question) {
        const answers = [question.translate];

        [0,1].forEach(() => {
            const i = Math.floor(Math.random() * question.wrong_answers.length);
            answers.push(question.wrong_answers[i]);
            question.wrong_answers.splice(i, 1);
        });

        const shuffledAnswers = [];
        while(answers.length) {
            const i = Math.floor(Math.random() * answers.length);
            shuffledAnswers.push(answers[i]);
            answers.splice(i, 1);
        }

        return shuffledAnswers;
    }
}