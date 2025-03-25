import metricaScriptUrl from '../assets/yMetrika.js?url';

class YandexMetrika {

    counterNumber = 100027261;
    
    init() {
        if(import.meta.env.VITE_YANDEX_METRIKA_OFF !== 'true') {
            // Добавление скрипта в head
            const script = document.createElement('script');
            script.src = metricaScriptUrl;
            document.head.appendChild(script);

            // Добавление iframe в noscript в body
            const noscriptElement = document.createElement('noscript');
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = `https://mc.yandex.ru/watch/${this.counterNumber}`;
            img.style.position = 'absolute';
            img.style.left = '-9999px';
            img.style.alt = '';

            div.appendChild(img);
            noscriptElement.appendChild(div);
            document.body.appendChild(noscriptElement);
        }
    }

    sendUserParams(userId) {
        if(import.meta.env.VITE_YANDEX_METRIKA_OFF !== 'true') {
            ym(this.counterNumber, 'userParams', {
                UserID: userId
            });
        }
    }

    sendReachGoal(goalId, params = null) {
        if(import.meta.env.VITE_YANDEX_METRIKA_OFF !== 'true') {
            if(params) {
                ym(this.counterNumber, 'reachGoal', goalId, params);
            } else {
                ym(this.counterNumber, 'reachGoal', goalId);
            }
        }
    }
}

export default new YandexMetrika();