import ConsentApiService from '@/services/ConsentApiService.js';

const STORAGE_KEY = 'sn_consent_v1';

export default class ConsentService {
    static load() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
        } catch {
            return null;
        }
    }

    static save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            ...data,
            updatedAt: new Date().toISOString(),
        }));
    }

    static hasBannerAnswer() {
        return ConsentService.load()?.bannerAnswered === true;
    }

    static hasPdConsent() {
        return ConsentService.load()?.pdConsent === true;
    }

    static hasAnalyticsConsent() {
        return ConsentService.load()?.analyticsConsent === true;
    }

    static acceptAll() {
        ConsentService.save({
            bannerAnswered: true,
            analyticsConsent: true,
        });

        ConsentApiService.recordCookieBanner('all').catch(() => {});
    }

    static acceptEssentialOnly() {
        ConsentService.save({
            bannerAnswered: true,
            analyticsConsent: false,
        });

        ConsentApiService.recordCookieBanner('essential').catch(() => {});
    }

    static setPdConsent(value) {
        const current = ConsentService.load() || {};
        ConsentService.save({
            ...current,
            pdConsent: value,
            bannerAnswered: current.bannerAnswered ?? false,
            analyticsConsent: current.analyticsConsent ?? false,
        });
    }

    static revokeAnalytics() {
        const current = ConsentService.load() || {};
        ConsentService.save({
            ...current,
            analyticsConsent: false,
        });

        ConsentApiService.revokeAnalytics().catch(() => {});
    }

    static enableAnalytics() {
        const current = ConsentService.load() || {};
        ConsentService.save({
            ...current,
            bannerAnswered: true,
            analyticsConsent: true,
        });

        ConsentApiService.recordCookieBanner('all').catch(() => {});
    }

    static clearLocal() {
        localStorage.removeItem(STORAGE_KEY);
    }
}
