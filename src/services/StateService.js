import AbstractService from "@/services/AbstractService.js";
import LocalStorage from '@/services/LocalStorageService.js';

export default class StateService extends AbstractService {
    student;

    constructor(student) {
        super();
        this.student = student;
    }

    getStorageName() {
        return `state-${this.student.getId()}`;
    }

    getShowFullStat() {
        return LocalStorage.get(this.getStorageName(), 'showFullStat') || false;
    }

    setShowFullStat(value) {
        LocalStorage.store(this.getStorageName(), 'showFullStat', value);
    }

    isFirstVisit() {
        const hasVisited = LocalStorage.get(this.getStorageName(), 'hasVisited') || false;
        if(hasVisited) {
            return false;
        }

        LocalStorage.store(this.getStorageName(), 'hasVisited', true);
        return true;
    }

    increaseAddWordsCount() {
        let cnt = this.getAddWordsCount();
        LocalStorage.store(this.getStorageName(), 'addWordsCount', ++cnt);
    }

    getAddWordsCount() {
        return LocalStorage.get(this.getStorageName(), 'addWordsCount') || 0;
    }
}