import { createApp } from 'vue'
import { createPinia } from 'pinia'

import TDesign from 'tdesign-vue-next';
import App from './App.vue'
import router from './router'

// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';
import './styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(TDesign)


app.mount('#app')