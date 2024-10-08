import AbstractModel from '@/models/AbstractModel.js';

export default class Student extends AbstractModel {
    id;
    created_at;
    updated_at;
    name = '';
    email = '';
    password = '';

    registration() {
        const data = {
            name: this.name,
            email: this.email,
            password: this.password
        };

        return this.request('/register', data);
    }

    login() {
        return this.request('/login', { email: this.email, password: this.password });
    }
}