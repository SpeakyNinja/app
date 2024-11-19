import { inject } from 'vue';
import AbstractService from "@/services/AbstractService.js";
import IndexedDBService from '@/services/IndexedDBService.js';

export default class AddWordService extends AbstractService {
    student;
    data;
    db;

    constructor() {
        super();
        this.student = inject('student');
        this.db = new IndexedDBService(this.student.getId());
    }

    fetchWord() {
        return this.request('/add-word/get', {}, r => {
            this.data = r.data;
        });
    }

    rateWord(status) {
        if(status == 'in_progress') {
            this.storeVoices();
        }

        const request = {
            meaning_id: this.data.meaning_id,
            status: status
        };

        return this.request('/add-word/rate', request, r => {
            this.data = r.data;
        });
    }

    voice() {
        if(this?.data?.voices && this.data.voices[0]) {
            return this.data.voices[0].base64;
        }

        return null;
    }

    storeVoices() {
        this.db.table = 'voices';
        this.data.voices.forEach(async item => {
            await this.db.save({
                id: item.id, 
                meaning_id: this.data.meaning_id, 
                value: item.base64
            });
        });
    }
}