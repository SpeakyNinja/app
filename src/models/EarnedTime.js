import AbstractModel from '@/models/AbstractModel.js';

export default class EarnedTime extends AbstractModel {
    id;
    created_at;
    updated_at;
    seconds;
    student_id;
    training_id;
}