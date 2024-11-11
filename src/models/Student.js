import AbstractModel from '@/models/AbstractModel.js';

export default class Student extends AbstractModel {
    progress = null;

    registration() {
        const data = {
            name: '',
            email: this.email,
            password: this.password
        };

        return this.request('/register', data, r => {
            this.setToken(r.access_token);
            this.store('id', r.id);
            this.store('email', r.email);
            this.store('isAutoReg', false);
        });
    }

    login() {
        return this.request('/login', { email: this.email, password: this.password }, r => {
            this.setToken(r.access_token);
            this.store('id', r.id);
            this.store('email', r.email);
            this.store('isAutoReg', r.autoReg);
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
            this.store('id', r.id);
            this.store('email', r.email);
            this.store('isAutoReg', true);
        });
    }

    postRegistration(email, password) {
        const data = {
            email: email,
            password: password
        };

        return this.request('/post-registration', data, r => {
            this.setToken(r.access_token);
            this.store('email', email);
            this.store('isAutoReg', false);
        });
    }

    fetchProgress() {
        return this.request('/get-progress', {}, r => {
            this.progress = r.progress;
        });
    }

    fetchData() {
        return this.request('/get-student-data', {}, r => {
            this.store('email', r.email);
            this.store('isAutoReg', r.autoReg);
        });
    }

    isGuest() {
        return !this.getToken();
    }

    isAutoReg() {
        return !this.isGuest() && this.getData('isAutoReg');
    }

    getToken() {
        return localStorage.getItem("access_token");
    }

    setToken(token) {
        localStorage.setItem("access_token", token);
    }

    getData(key = null) {
        let studentData = {};
        
        const data = localStorage.getItem("student_data");
        if(data) {
            studentData = JSON.parse(data);
        }

        return key ? studentData[key] : studentData;
    }

    store(key, value) {
        const studentData = this.getData();
        studentData[key] = value;
        localStorage.setItem( "student_data", JSON.stringify(studentData) );
    }

    clearData() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("student_data");
    }
}