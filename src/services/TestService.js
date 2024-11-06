import { inject } from 'vue';
import AbstractService from "@/services/AbstractService.js";

export default class TestService extends AbstractService {
    student;
    question;
    questins;
    voice;

    constructor() {
        super();
        this.student = inject('student');
    }

    fetchQuestion() {
        return this.request('/test/question', {}, r => {
            this.question = r.question;
            this.voice = r.voice;
        });
    }

    sendAnswer(text) {
        const data = {
            meaning_id: this.question.meaning_id,
            text: text
        };

        return this.request('/test/send-answer', data, r => {
            this.question = r.question;
            this.voice = r.voice;
        });
    }

    getQuestion() {
        const i = Math.floor(Math.random() * this.questions.length);
        const item = this.questions[i];
        this.questions.splice(i, 1);
        return item;
    }
}