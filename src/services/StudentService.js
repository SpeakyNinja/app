import AbstractService from "@/services/AbstractService.js";
import LocalStorage from '@/services/LocalStorageService.js';

export default class StudentService extends AbstractService {
    progress = null;

    registration() {
        const data = {
            name: '',
            email: this.email,
            password: this.password
        };

        return this.request('/register', data, r => {
            this.setToken(r.access_token);
            LocalStorage.store('student_data', 'id', r.id);
            LocalStorage.store('student_data', 'email', r.email);
            LocalStorage.store('student_data', 'isAutoReg', false);
        });
    }

    login() {
        return this.request('/login', { email: this.email, password: this.password }, r => {
            this.setToken(r.access_token);
            LocalStorage.store('student_data', 'id', r.id);
            LocalStorage.store('student_data', 'email', r.email);
            LocalStorage.store('student_data', 'isAutoReg', r.autoReg);
        });
    }

    logout() {
        return this.request('/logout', {}, r => {
            this.clearData();
        });
    }

    autoRegistration() {
        return this.request('/auto-registration', {}, r => {
            this.setToken(r.access_token);
            LocalStorage.store('student_data', 'id', r.id);
            LocalStorage.store('student_data', 'email', r.email);
            LocalStorage.store('student_data', 'isAutoReg', true);
        });
    }

    postRegistration(email, password) {
        const data = {
            email: email,
            password: password
        };

        return this.request('/post-registration', data, r => {
            this.setToken(r.access_token);
            LocalStorage.store('student_data', 'email', email);
            LocalStorage.store('student_data', 'isAutoReg', false);
        });
    }

    fetchProgress() {
        return this.request('/get-progress', {}, r => {
            this.progress = r.progress;
        });
    }

    fetchData() {
        return this.request('/get-student-data', {}, r => {
            LocalStorage.store('student_data', 'email', r.email);
            LocalStorage.store('student_data', 'isAutoReg', r.autoReg);
        });
    }

    rateApp(rating) {
        return this.request('/student/rate', {rating: rating});
    }

    isGuest() {
        return !this.getToken();
    }

    isAutoReg() {
        return !this.isGuest() && LocalStorage.get("student_data", "isAutoReg");
    }

    getToken() {
        return localStorage.getItem("access_token");
    }

    setToken(token) {
        localStorage.setItem("access_token", token);
    }

    getId() {
        return LocalStorage.get("student_data", "id")
    }

    clearData() {
        LocalStorage.clear("access_token");
        LocalStorage.clear("student_data");
    }
}