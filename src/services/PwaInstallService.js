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
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
        });
        
        window.addEventListener('appinstalled', () => {
            this.deferredPrompt = null;
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
        
        return !this.deferredPrompt;
    }

    needShowNotice(statService) {
        if(this.isPwaInstalled() || localStorage.getItem('pwaInstallNoticeShown')) {
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