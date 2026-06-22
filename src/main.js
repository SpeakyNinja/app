// import './assets/main.css'
import '@/assets/scss/global.scss'

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import YandexMetrika from './services/YandexMetrika.js'
import ConsentService from './services/ConsentService.js'

if (ConsentService.hasAnalyticsConsent()) {
    YandexMetrika.initIfConsented();
}

const app = createApp(App)

app.use(router)

app.mount('#app')
