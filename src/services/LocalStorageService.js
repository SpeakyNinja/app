class LocalStorageService {
    get(storageName, key) {
        const data = this.getAll(storageName);
        return data[key];
    }

    getAll(storageName) {
        let data = {};
        
        const storage = localStorage.getItem(storageName);
        if(storage) {
            data = JSON.parse(storage);
        }

        return data;
    }

    store(storageName, key, value) {
        const data = this.getAll(storageName);
        data[key] = value;
        localStorage.setItem( storageName, JSON.stringify(data) );
    }

    delete(storageName, key) {
        const data = this.getAll(storageName);
        if(data[key] !== undefined) {
            delete data[key];
            localStorage.setItem( storageName, JSON.stringify(data) );
        }
    }

    clear(storageName) {
        localStorage.removeItem(storageName);
    }
}

export default new LocalStorageService();