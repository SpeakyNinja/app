import { inject } from 'vue';
import AbstractService from "@/services/AbstractService.js";

export default class AddWordService extends AbstractService {
    student;
    data;

    constructor() {
        super();
        this.student = inject('student');
    }

    fetchWord() {
        return this.request('/add-word/get', {}, r => {
            this.data = r.data;
        });
    }

    rateWord(inProgress) {
        const request = {
            meaning_id: this.data.meaning_id,
            status: inProgress ? 'in_progress' : 'knows'
        };

        return this.request('/add-word/rate', request, r => {
            this.data = r.data;
        });
    }
}