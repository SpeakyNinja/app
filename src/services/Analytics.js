import gTagManagerUrl from '../assets/gTagManager.js?url';

class Analytics {
    
    init() {
        if(import.meta.env.VITE_TAG_MANAGER_OFF !== 'true') {
            // Добавление скрипта в head
            const script = document.createElement('script');
            script.src = gTagManagerUrl;
            document.head.appendChild(script);

            // Добавление iframe в noscript в body
            const noscriptElement = document.createElement('noscript');
            const iframeElement = document.createElement('iframe');
            iframeElement.src = 'https://www.googletagmanager.com/ns.html?id=GTM-53HTK9B3';
            iframeElement.height = '0';
            iframeElement.width = '0';
            iframeElement.style.display = 'none';
            iframeElement.style.visibility = 'hidden';

            noscriptElement.appendChild(iframeElement);
            document.body.appendChild(noscriptElement);
        }
    }

}

export default new Analytics();