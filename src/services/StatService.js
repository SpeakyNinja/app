import AbstractService from "@/services/AbstractService.js";

export default class StatService extends AbstractService {
    items;
    trainingsError;
    predict;
    regularity;

    fetch() {
        return this.request('/training/stat', {}, r => {
            this.items = r.stat;
            this.predict = r.predict;
            this.trainingsError = r.trainingsError;
            this.regularity = r.regularity;

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
}