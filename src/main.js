import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import 'normalize.css'
import '@/assets/css/app.scss'

const app = createApp(App)

app
    .use(router)
    .use(store)
    .mount('#app')
