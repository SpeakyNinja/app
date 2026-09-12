import AbstractService from "@/services/AbstractService.js";

export default class YookassaService extends AbstractService {
    loaded = false;
    loadingFailed = false;
    errorMessage = null;
    widgetIsOpen = false;
    paymentId = null;
    paymentStatus = null;
    confirmationToken = null;
    scriptId = 'yookassa-widget-script';
    scriptSrc = 'https://yookassa.ru/checkout-widget/v1/checkout-widget.js';

    loadWidget() {
        if(!document.getElementById(this.scriptId)) {
            this.includeWidget();
        }
    }

    includeWidget() {
        const script = document.createElement('script');
        script.id = this.scriptId;
        script.src = this.scriptSrc;
        
        script.onload = () => {
            this.loaded = true;
        };
        
        script.onerror = () => {
            this.loadingFailed = true;
            this.errorMessage = 'Не удалось загрузить скрипт виджета YooKassa';
            console.error(this.errorMessage);
        };

        document.head.appendChild(script);
    }

    waitForScript(timeoutMs = 30000) {
        this.cancelWait();

        return new Promise((resolve, reject) => {
            const deadline = Date.now() + timeoutMs;

            this._waitInterval = setInterval(() => {
                if (this.loaded) {
                    this.cancelWait();
                    resolve();
                } else if (this.loadingFailed) {
                    this.cancelWait();
                    reject({ message: this.errorMessage });
                } else if (Date.now() >= deadline) {
                    this.cancelWait();
                    reject({ message: 'Превышено время ожидания загрузки платёжного виджета' });
                }
            }, 100);
        });
    }

    cancelWait() {
        if (this._waitInterval) {
            clearInterval(this._waitInterval);
            this._waitInterval = null;
        }
    }

    showWidget(containerId) {
        return new Promise((resolve, reject) => {
            const checkout = new window.YooMoneyCheckoutWidget({
                confirmation_token: this.confirmationToken,
                customization: {
                    modal: true
                },
                error_callback: error => {
                    console.log(error);
                }
            });

            checkout.on('success', () => {
                checkout.destroy();
                this.widgetIsOpen = false;
                resolve();
            });

            checkout.on('fail', () => {
                this.errorMessage = 'Произошла ошибка при обработке платежа виджетом YooKassa';
                checkout.destroy();
                this.widgetIsOpen = false;
                reject({ message: this.errorMessage });
            });

            checkout.on('modal_close', () => {
                this.errorMessage = 'Оплата не завершена';
                this.widgetIsOpen = false;
                reject({ message: this.errorMessage });
            });

            this.widgetIsOpen = true;
            setTimeout(() => {
                checkout.render(containerId);
            }, 50);
        });
    }

    createPayment(storeItemId, promoCode = null) {
        const payload = { id: storeItemId };
        if (promoCode) {
            payload.promo_code = promoCode;
        }
        return this.request('/payment/create', payload, r => {
            this.confirmationToken = r.confirmationToken;
            this.paymentId = r.paymentId;
        });
    }

    confirmPayment() {
        return this.request('/payment/confirm', { id: this.paymentId }, r => {
            this.paymentStatus = r.status;
        });
    }

    isSucceeded() {
        return this.paymentStatus == 'succeeded';
    }
}