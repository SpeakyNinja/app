import AbstractService from "@/services/AbstractService.js";

export default class StatService extends AbstractService {
    items;
    trainingsError;
    predict;
    regularity;
    levels;
    currentLevel;
    chunkSize = 100;
    max_count_trainings_per_day;

    fetch() {
        return this.request('/training/stat', {}, r => {
            this.items = r.stat;
            this.predict = r.predict;
            this.trainingsError = r.trainingsError;
            this.regularity = r.regularity;
            this.levels = r.levels;
            this.currentLevel = r.currentLevel;
            this.max_count_trainings_per_day = r.max_count_trainings_per_day;
            this.count_trainings_today = r.count_trainings_today;

            this.items.sort((a, b) => {
                if(a.memorization < b.memorization) {
                    return 1;
                }
                if(a.memorization > b.memorization) {
                    return -1;
                }
                return 0;
            });
        });
    }

    getAccuracy() {
        let errors = 0;
        this.items.forEach(item => {
            errors += item.errors;
        });

        return this.calcAccuracy(errors);
    }

    calcAccuracy(errors) {
        const maxErrors = this.items.length * 2;
        return 100 - Math.round(errors * 100 / maxErrors);
    }

    getNonstopDays() {
        return this.regularity.nonstop_days || 0;
    }

    getNonstopDaysMax() {
        return this.regularity.nonstop_days_max || 0;
    }

    getTotalMaxnonstopDays() {
        return this.regularity.total_max_nonstop_days || 0;
    }

    hasYesterdayTraining() {
        return this.regularity.has_yesterday_training;
    }

    hasTodayTraining() {
        return this.regularity.has_today_training;
    }

    getLevelsForBrain() {
        const levels = [];
        this.levels.forEach(item => {
            for(let i = 0; i < item.count; i++) {
                levels.push(`m${item.memorization}`);
            }
        });

        const chunkSize = this.chunkSize;
        const brainsCount = Math.ceil(levels.length / chunkSize);
        const result = [];
        for(let i = 0; i < brainsCount; i++) {
            const chunk = new Array(chunkSize).fill(undefined);

            for(let pos = 0; pos < chunkSize; pos++) {
                const item = levels[ i * chunkSize + pos ];
                if(item === undefined) {
                    break;
                }

                chunk[pos] = item;
            }

            result.unshift( chunk.reverse() );
        }

        return result;
    }

    brainsCount() {
        let cnt = 0;

        this.levels.forEach(item => {
            cnt += item.count;
        });

        return Math.ceil(cnt / this.chunkSize);
    }

    // показывать при рекордах 
    // показывать при заполнении линии 10 безошибочных тренировок
    showPredictLayer() {
        if(this.count_trainings_today >= this.max_count_trainings_per_day) {
            return true;
        }

        let isAllPerfect = true;
        this.trainingsError.forEach(item => {
            if(item.errors > 0) {
                isAllPerfect = false;
            }
        });

        return this.trainingsError.length == 10 && isAllPerfect;
    }

    // начинать показывать со второго дня первой непрерывной серии
    // показывать один раз в день
    // не показывать до первой тренировки внутри дня
    showRegularityLayer() {
        return this.regularity.nonstop_days_max > 1 && this.count_trainings_today == 1 && this.regularity.has_today_training;
    }

    // Первое появление – Когда появились первые 5 зеленых блоков слов (8й уровень)  
    // После первой тренировки внутри дня 
    // Каждые 20 тренировок
    showLevelLayer() {
        const level = this.getLevel();
        if(level < 8) {
            return false;
        }

        if(this.count_trainings_today == 1) {
            return true;
        }

        if(this.count_trainings_today % 20 == 0) {
            return true;
        }

        return true;
    }

    getLevel() {
        let countLearned = this.getLearnedWordsCount();
        return Math.floor(countLearned / this.chunkSize);
    }

    countWordsByMemorizations(memorizations) {
        let count = 0;
        this.levels.forEach(item => {
            if(memorizations.indexOf(item.memorization) > -1) {
                count += item.count;
            }
        });

        return count;
    }

    getLearnedWordsCount() {
        return this.countWordsByMemorizations([12, 13]);
    }

    belts() {
        return [
            {
                level: 1,
                words: 0,
                color: '#ffffff'
            }, {
                level: 2,
                words: 200,
                color: '#ffa498'
            }, {
                level: 5,
                words: 500,
                color: '#ff0000'
            },  {
                level: 9,
                words: 900,
                color: '#feffc5'
            }, {
                level: 14,
                words: 1400,
                color: '#faff00'
            }, {
                level: 21,
                words: 2100,
                color: '#e0ffbd'
            },  {
                level: 30,
                words: 3000,
                color: '#87ff00'
            },  {
                level: 42,
                words: 4200,
                color: '#ccccff'
            },  {
                level: 57,
                words: 5700,
                color: '#366efe'
            },  {
                level: 75,
                words: 7500,
                color: '#c2c2c2'
            },  {
                level: 100,
                words: 10000,
                color: '#000000'
            }
        ];
    }

    getBelt() {
        const level = this.getLevel();
        const belts = this.belts();
        let belt = belts[0];
        belts.forEach(item => {
            if(level >= item.level) {
                belt = item;
            }
        });

        return belt;
    }

    getBeltColor() {
        return this.getBelt().color;
    }

    getCountLevelsInBelt(belt) {
        const nextBelt = this.belts().find(item => item.level > belt.level);
        return nextBelt ? nextBelt.level - belt.level : 1;
    }

    getProgressInBelt() {
        const belt = this.getBelt();
        const learnedWords = this.getLearnedWordsCount();
        const learnedWordsInBelt = learnedWords - belt.words;
        const totalWordsInBelt = this.countWordsInsideBelt(belt);
        return Math.round(learnedWordsInBelt * 100 / totalWordsInBelt);
    }

    countWordsInsideBelt(belt) {
        const levels = this.getCountLevelsInBelt(belt);
        return levels * this.chunkSize;
    }
}