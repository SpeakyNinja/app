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
            name: '',
            email: this.email,
            password: this.password
        };

        return this.request('/register', data, r => {
            this.setToken(r.access_token);
            this.setId(r.id);
        });
    }

    login() {
        return this.request('/login', { email: this.email, password: this.password }, r => {
            this.setToken(r.access_token);
            this.setId(r.id);
        });
    }

    logout() {
        return this.request('/logout', {}, r => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("student_id");
        });
    }

    autoRegistration() {
        return this.request('/auto-registration', {}, r => {
            this.setToken(r.access_token);
            this.setId(r.id);
        });
    }

    isGuest() {
        return !this.getToken();
    }

    getToken() {
        return localStorage.getItem("access_token");
    }

    setToken(token) {
        localStorage.setItem("access_token", token);
    }

    getId() {
        return localStorage.getItem("student_id");
    }

    setId(id) {
        localStorage.setItem("student_id", id);
    }
}