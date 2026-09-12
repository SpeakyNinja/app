import axios from 'axios';

axios.defaults.withCredentials = true;

axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

export default class AbstractService {
    baseUrl = import.meta.env.VITE_API_BASE_URL;

    request(url, data = {}, successHandler = () => {}) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        };

        return axios.post(this.baseUrl + url, data, { headers, withCredentials: true }).then(res => {
            return this.responseHandler(res.data, successHandler);
        }).catch(e => {
            return this.csrfMismatchHandler(e);
        });
    }

    responseHandler(res, successHandler = () => {}) {
        return new Promise(async (resolve, reject) => {
            if (res.success) {
                successHandler(res);
                resolve(res);
            } else {
                reject(res);
            }
        });
    }

    csrfMismatchHandler(e) {
        if (e?.response?.status == 419 && e?.response?.data?.message == 'CSRF token mismatch.') {
            window.location.reload();
        } else if (e?.response?.status == 401) {
            if (window.location.pathname.indexOf('/engagement-preview/') === 0) {
                throw e;
            }
            throw {
                message: 'Сессия истекла. Войдите снова.',
            };
        } else if (e?.response?.status == 429) {
            throw {
                message: 'Слишком много запросов. Подождите минуту и попробуйте снова.',
            };
        } else if (!e?.response) {
            throw {
                message: 'Нет соединения с сервером. Проверьте интернет и попробуйте снова.',
            };
        } else {
            throw e;
        }
    }
}
