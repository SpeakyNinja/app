import AbstractCollection from '@/collections/AbstractCollection.js';
import ToolsService from '@/services/ToolsService.js';
import Training from '@/models/Training.js';
import moment from 'moment';

export default class Trainings extends AbstractCollection {
    serverTimeDelta = 0;

    constructor(items = []) {
        super(items);
        this.tools = new ToolsService();
    }

    getObject(typeId) {
        return new Training();
    }

    fetch() {
        return this.request('/training/get', {}, r => {
            this.serverTimeDelta = Math.round(Date.now() / 1000) - r.now;
            this.reset(r.data);
            this.shuffle();
        });
    }

    getCurrent() {
        for(let i in this.models) {
            const training = this.models[i];
            if(training.trained_at === undefined) {
                return training;
            }
        }

        return null;
    }

    isFinish() {
        return !this.getCurrent();
    }

    setAnswer() {
        const training = this.getCurrent();
        training.trained_at = Math.round(Date.now() / 1000) + this.serverTimeDelta;
    }

    countError() {
        const training = this.getCurrent();
        training.errors += 1;
    }

    submitAnswers() {
        const trainings = this.models.map(item => {
            return {
                meaning_id: item.meaning_id,
                trained_at: item.trained_at,
                errors: item.errors,
                is_learned: item.isLearned
            };
        });

        return this.request('/training/set', {trainings: trainings}, r => {
            this.data = r.data;
        });
    }

    isCorrectAnswer(answer) {
        const training = this.getCurrent();
        return training.isCorrectAnswer(answer);
    }

    deleteAnswer(answer) {
        const training = this.getCurrent();
        training.deleteAnswer(answer);
    }

    getProgressInPercents() {
        let currentIndex = 0;
        for(let i in this.models) {
            const training = this.models[i];
            if(training.trained_at === undefined) {
                break;
            }
            currentIndex++;
        }

        return Math.round( currentIndex * 100 / (this.models.length - 1) );
    }

    shuffle() {
        this.models = this.tools.shuffle(this.models);
        this.models.forEach(item => {
            item.hints = this.tools.shuffle(item.hints);
        });  
    }
}