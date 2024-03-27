import { createApp } from 'vue'
import './assets/css/global.less'
import App from './App.vue'
import pinia from './store'
import router from './router'
import elementIcon from '@/components/elementIcon.ts'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App)
  .use(pinia)
  .use(router)
  .use(elementIcon)
  .mount('#app')
