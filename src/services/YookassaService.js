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

    waitForScript() {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if(this.loaded) {
                    clearInterval(interval);
                    resolve();
                } else if(this.loadingFailed) {
                    reject({ message: this.errorMessage });
                }
            }, 100);
        });
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

    createPayment(storeItemId) {
        return this.request('/payment/create', { id: storeItemId }, r => {
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