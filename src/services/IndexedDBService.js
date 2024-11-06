import { openDB } from 'idb';
import { inject } from 'vue';

export default class IndexedDBService {
    table;

    constructor(studentId) {
        this.dbPromise = openDB(`sn-db-${studentId}`, 1, {
            upgrade(db) {
                if(!db.objectStoreNames.contains('voices')) {
                    const objectStore = db.createObjectStore('voices', { keyPath: ['id', 'meaning_id'] });
                    objectStore.createIndex('meaning_id', 'meaning_id', { unique: false });
                }
            },
        });
    }

    async save(data) {
        const db = await this.dbPromise;
        await db.put(this.table, data);
    }

    async get(indexName, value) {
        const db = await this.dbPromise;
        const tx = db.transaction(this.table, 'readonly');
        const store = tx.objectStore(this.table);
        const index = store.index(indexName);
        const request = index.getAll(value);
        return request;
    }

    async delete(key) {
        const db = await this.dbPromise;
        await db.delete(this.table, key);
    }
}