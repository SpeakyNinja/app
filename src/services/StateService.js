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

    updateCurrentLevel(level) {
        const currentLevel = LocalStorage.get(this.getStorageName(), 'currentLevel') || 0;
        if(currentLevel == level) {
            return false;
        }

        LocalStorage.store(this.getStorageName(), 'currentLevel', level);
        return true;
    }

    firstTimeLimitUpdated() {
        return LocalStorage.get(this.getStorageName(), 'firstTimeLimitUpdated') || false;
    }

    storeFirstTlUpdated() {
        LocalStorage.store(this.getStorageName(), 'firstTimeLimitUpdated', true);
    }
}