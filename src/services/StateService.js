import AbstractService from "@/services/AbstractService.js";
import LocalStorage from '@/services/LocalStorageService.js';

export default class StateService extends AbstractService {
    storageName;

    constructor(studentId) {
        super();
        this.storageName = `state-${studentId}`;
    }

    getShowFullStat() {
        return LocalStorage.get(this.storageName, 'showFullStat') || false;
    }

    setShowFullStat(value) {
        LocalStorage.store(this.storageName, 'showFullStat', value);
    }

    checkPwaVersion(version) {
        const oldVersion = LocalStorage.get(this.storageName, 'pwaVersion') || 0;
        if(!version || oldVersion == version) {
            return true;
        }

        LocalStorage.store(this.storageName, 'pwaVersion', version);
        setTimeout(() => {
            window.location.reload();
        });

        return false;
    }

    isFirstVisit() {
        const hasVisited = LocalStorage.get(this.storageName, 'hasVisited') || false;
        if(hasVisited) {
            return false;
        }

        LocalStorage.store(this.storageName, 'hasVisited', true);
        return true;
    }

    increaseAddWordsCount() {
        let cnt = this.getAddWordsCount();
        LocalStorage.store(this.storageName, 'addWordsCount', ++cnt);
    }

    getAddWordsCount() {
        return LocalStorage.get(this.storageName, 'addWordsCount') || 0;
    }
}