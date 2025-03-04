// import './assets/main.css'
import '@/assets/scss/global.scss'

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Analytics from './services/Analytics.js'

Analytics.initGoogleTagManager();
const app = createApp(App)

app.use(router)

app.mount('#app')
