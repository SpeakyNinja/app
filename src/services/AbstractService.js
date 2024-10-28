import axios from 'axios';

export default class AbstractService {
    baseUrl = import.meta.env.VITE_API_BASE_URL;

    request(url, data = {}, successHandler = () => {}) {

        const headers = {
            'Content-Type': 'application/json'
        };

        const token = localStorage.getItem('access_token');
        if(token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return axios.post(this.baseUrl + url, data, {headers: headers}).then(res => {
            return this.responseHandler(res.data, successHandler);
        }).catch(e => {
            this.csrfMismatchHandler(e);
        });
    }

    responseHandler(res, successHandler = () => {}) {
        return new Promise(async (resolve, reject) => {
            if(res.success) {
                successHandler(res);
                resolve(res);
            } else {
                reject(res);
            }
        });
    }

    csrfMismatchHandler(e) {
        if(e?.response?.status == 419 && e?.response?.data?.message == 'CSRF token mismatch.') {
            window.location.reload();
        } else if(e?.response?.status == 401) {
            localStorage.removeItem('access_token');
            window.location.reload();
        } else {
            throw e;
        }
    }
}