import metricaScriptUrl from '../assets/yMetrika.js?url';
import ConsentService from '@/services/ConsentService.js';

class YandexMetrika {
    counterNumber = 100027261;
    initialized = false;

    isEnabled() {
        return import.meta.env.VITE_YANDEX_METRIKA_OFF !== 'true';
    }

    canTrack() {
        return this.isEnabled() && ConsentService.hasAnalyticsConsent() && typeof ym === 'function';
    }

    initIfConsented() {
        if (this.initialized || !this.isEnabled() || !ConsentService.hasAnalyticsConsent()) {
            return;
        }

        const script = document.createElement('script');
        script.src = metricaScriptUrl;
        document.head.appendChild(script);

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

        this.initialized = true;
    }

    sendUserParams(userId) {
        if (!this.canTrack()) {
            return;
        }

        ym(this.counterNumber, 'userParams', {
            UserID: userId,
        });
    }

    sendReachGoal(goalId, params = null) {
        if (!this.canTrack()) {
            return;
        }

        if (params) {
            ym(this.counterNumber, 'reachGoal', goalId, params);
        } else {
            ym(this.counterNumber, 'reachGoal', goalId);
        }
    }
}

export default new YandexMetrika();
