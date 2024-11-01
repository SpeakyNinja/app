import AbstractService from "@/services/AbstractService.js";

export default class StatService extends AbstractService {
    items;

    fetch() {
        return this.request('/training/stat', {}, r => {
            this.items = r.stat;
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

        const maxErrors = this.items.length * 2;
        return 100 - Math.round(errors * 100 / maxErrors);
    }
}