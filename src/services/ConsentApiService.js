import AbstractService from '@/services/AbstractService.js';

class ConsentApiService extends AbstractService {
    policyVersion = '1.0';

    recordCookieBanner(choice) {
        return this.request('/consent/cookie-banner', {
            choice,
            policy_version: this.policyVersion,
        });
    }

    revokeAnalytics() {
        return this.request('/consent/revoke-analytics', {
            policy_version: this.policyVersion,
        });
    }
}

export default new ConsentApiService();
