// import './assets/main.css'
import '@/assets/scss/global.scss'

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import YandexMetrika from './services/YandexMetrika.js'

YandexMetrika.init();
const app = createApp(App)

app.use(router)

app.mount('#app')
