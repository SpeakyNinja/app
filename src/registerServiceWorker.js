import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onNeedRefresh() {
        const answer = window.confirm('Доступна новая версия. Обновить приложение?')
        if(answer) {
            updateSW(true);
        }
    },

    onOfflineReady() {
        console.log('App ready to work offline');
    }
})
