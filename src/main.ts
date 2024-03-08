import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from '@/stores'
import '@/assets/styles/tailwind.css'
import '@/assets/styles/global.css'

const app = createApp(App)

console.log('test log')
app.use(pinia)
app.use(router)

app.mount('#app')
