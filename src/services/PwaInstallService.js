class PwaInstallService {
    static instance;
    deferredPrompt = null;

    constructor() {
        if(PwaInstallService.instance) {
            return PwaInstallService.instance;
        }

        PwaInstallService.instance = this;
        this.initEventListeners();
    }

    initEventListeners() {
        if(this.isPwaInstalled()) {
            return false;
        }

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
        });
        
        window.addEventListener('appinstalled', () => {
            this.deferredPrompt = null;
            localStorage.setItem('pwaInstalled', true);
        });
    }

    isPwaInstalled() {
        if(
            window.matchMedia('(display-mode: standalone)').matches || 
            window.matchMedia('(display-mode: fullscreen)').matches || 
            window.navigator.standalone === true
        ) {
            return true;
        }
        
        return localStorage.getItem('pwaInstalled');
    }

    needShowNotice(statService) {
        if(
            !this.deferredPrompt || 
            this.isPwaInstalled() || 
            localStorage.getItem('pwaInstallNoticeShown')
        ) {
            return false;
        }

        return statService.countWordsByMemorizations([4]) > 11;
    }

    setPwaInstallNoticeShown(value) {
        localStorage.setItem('pwaInstallNoticeShown', value);
    }

    install() {
        if (!this.deferredPrompt) {
            return false;
        }
        
        this.deferredPrompt.prompt();
        return this.deferredPrompt.userChoice;
    }
}

export default new PwaInstallService();