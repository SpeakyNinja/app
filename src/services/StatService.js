import AbstractService from "@/services/AbstractService.js";

export default class StatService extends AbstractService {
    items;
    trainingsError;
    predict;
    regularity;
    levels;
    currentLevel;
    chunkSize = 100;

    fetch() {
        return this.request('/training/stat', {}, r => {
            this.items = r.stat;
            this.predict = r.predict;
            this.trainingsError = r.trainingsError;
            this.regularity = r.regularity;
            this.levels = r.levels;
            this.currentLevel = r.currentLevel;

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
}