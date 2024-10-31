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
        });
    }

    login() {
        return this.request('/login', { email: this.email, password: this.password }, r => {
            this.setToken(r.access_token);
        });
    }

    logout() {
        return this.request('/logout', {}, r => {
            localStorage.removeItem("access_token");
        });
    }

    autoRegistration() {
        return this.request('/auto-registration', {}, r => {
            this.setToken(r.access_token);
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
}