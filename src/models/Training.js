import AbstractModel from '@/models/AbstractModel.js';

export default class Training extends AbstractModel {
    meaning_id;
    hints;
    answers;
    memorization;
    trained_at;
    text;
    errors = 0;
    isLearned = false;
    voice = null;

    deleteAnswer(answer) {
        for(let i in this.answers) {
            if(this.answers[i] == answer) {
                this.answers.splice(i, 1);
                break;
            }
        }
    }

    isCorrectAnswer(answer) {
        return this.text == answer;
    }
}