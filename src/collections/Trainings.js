import AbstractCollection from '@/collections/AbstractCollection.js';
import ToolsService from '@/services/ToolsService.js';
import Training from '@/models/Training.js';

export default class Trainings extends AbstractCollection {
    constructor(items = []) {
        super(items);
        this.tools = new ToolsService();
    }

    getObject(typeId) {
        return new Training();
    }

    fetch() {
        return this.request('/training/get', {}, r => {
            this.reset(r.data);
            this.shuffle();
        });
    }

    getCurrent() {
        for(let i in this.models) {
            const training = this.models[i];
            if(training.elapsed_time === undefined) {
                return training;
            }
        }

        return null;
    }

    isFinish() {
        return !this.getCurrent();
    }

    setAnswer(elapsedTime) {
        const training = this.getCurrent();
        training.elapsed_time = elapsedTime;
    }

    countError() {
        const training = this.getCurrent();
        training.errors += 1;
    }

    submitAnswers() {
        const trainings = this.models.map(item => {
            return {
                meaning_id: item.meaning_id,
                elapsed_time: item.elapsed_time,
                errors: item.errors,
                is_learned: item.isLearned
            };
        });

        return this.request('/training/set', {trainings: trainings.reverse()}, r => {
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
            if(training.elapsed_time === undefined) {
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