import AbstractModel from '@/models/AbstractModel.js';
import IndexedDBService from '@/services/IndexedDBService.js';

export default class Training extends AbstractModel {
    meaning_id;
    hints;
    answers;
    memorization;
    trained_at;
    text;
    errors = 0;
    isLearned = false;
    voiceIndex = null;

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

    async getNextVoice(studentId) {
        const db = new IndexedDBService(studentId);
        db.table = 'voices';
        const voices = await db.get('meaning_id', this.meaning_id);
        if(!voices) {
            return null;
        }

        if(this.voiceIndex === null || this.voiceIndex == voices.length - 1) {
            this.voiceIndex = 0;
        } else {
            this.voiceIndex++;
        }

        return voices[this.voiceIndex]?.value;
    }
}