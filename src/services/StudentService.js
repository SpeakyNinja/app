import AbstractService from '@/services/AbstractService.js';
import LocalStorage from '@/services/LocalStorageService.js';
import YandexMetrika from '@/services/YandexMetrika.js';

export default class StudentService extends AbstractService {
    progress = null;
    _authenticated = false;
    _authChecked = false;

    applySession(r) {
        this._authenticated = true;
        this._authChecked = true;

        if (r.id !== undefined) {
            LocalStorage.store('student_data', 'id', r.id);
        }
        if (r.email !== undefined) {
            LocalStorage.store('student_data', 'email', r.email);
        }
        if (r.autoReg !== undefined) {
            LocalStorage.store('student_data', 'isAutoReg', r.autoReg);
        }
        LocalStorage.store('student_data', 'isExtAuth', false);
    }

    sendMagicLink(email) {
        return this.request('/magic-link/send', { email, pd_consent: true });
    }

    verifyMagicLink(token) {
        return this.request('/magic-link/verify', { token }, r => {
            this.applySession(r);
        });
    }

    async checkAuth() {
        if (this._authChecked) {
            return this._authenticated;
        }

        try {
            await this.request('/get-student-data', {}, r => {
                this.applySession(r);
            });
            this._authenticated = true;
        } catch (e) {
            if (e?.response?.status === 401) {
                this._authenticated = false;
            } else if (e?.success === false) {
                this._authenticated = false;
            } else {
                throw e;
            }
        }

        this._authChecked = true;
        return this._authenticated;
    }

    async ensureGuestChallenge() {
        const r = await this.request('/guest/challenge', {});
        return r.challenge;
    }

    registration() {
        const data = {
            name: '',
            email: this.email,
            password: this.password,
        };

        return this.request('/register', data, r => {
            this.applySession(r);
            YandexMetrika.sendUserParams(r.id);
            YandexMetrika.sendReachGoal('registration');
        });
    }

    login() {
        return this.request('/login', { email: this.email, password: this.password }, r => {
            this.applySession(r);
            YandexMetrika.sendUserParams(r.id);
        });
    }

    logout() {
        return this.request('/logout', {}, () => {
            this.clearData();
        });
    }

    deleteAccount() {
        return this.request('/student/delete-account', {}, () => {
            this.clearData();
        });
    }

    sendRecoveryLink(email) {
        return this.request('/recovery/send-link', { email });
    }

    changePassword(password, password2, token) {
        return this.request('/recovery/change-password', {
            password,
            password2,
            token,
        });
    }

    async autoRegistration() {
        const challenge = await this.ensureGuestChallenge();

        return this.request('/auto-registration', { challenge, pd_consent: true }, r => {
            this.applySession(r);
            YandexMetrika.sendUserParams(r.id);
        });
    }

    postRegistration(data) {
        return this.request('/post-registration', data, r => {
            this.applySession({ ...r, email: data.email, autoReg: false });
        });
    }

    googleAuthHandler(token) {
        return this.request('/auth/google', { token }, r => {
            this.applySession(r);
            LocalStorage.store('student_data', 'isExtAuth', true);
            YandexMetrika.sendUserParams(r.id);
        });
    }

    vkAuthHandler(vkAccessToken) {
        return this.request('/auth/vk', { vkAccessToken }, r => {
            this.applySession(r);
            LocalStorage.store('student_data', 'isExtAuth', true);
            YandexMetrika.sendUserParams(r.id);
        });
    }

    fetchProgress() {
        return this.request('/get-progress', {}, r => {
            this.progress = r.progress;
        });
    }

    fetchData() {
        return this.request('/get-student-data', {}, r => {
            this.applySession(r);
        });
    }

    rateApp(rating) {
        return this.request('/student/rate', { rating });
    }

    isGuest() {
        return !this._authenticated;
    }

    isAutoReg() {
        return this._authenticated && LocalStorage.get('student_data', 'isAutoReg');
    }

    getId() {
        return LocalStorage.get('student_data', 'id');
    }

    getEmail() {
        return LocalStorage.get('student_data', 'email');
    }

    clearData() {
        this._authenticated = false;
        this._authChecked = true;
        LocalStorage.clear('student_data');
        localStorage.removeItem('sn_consent_v1');
        LocalStorage.clear('options');
    }
}
