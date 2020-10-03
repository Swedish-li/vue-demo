import { createApp } from 'vue'
import App from './App'
import './style/index.scss'
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import { PhoneDetailContainer } from './components/PhoneDetailContainer'
import { PhoneListComponent } from './components/PhoneList'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PhoneListComponent },
    { path: '/detail/:id', component: PhoneDetailContainer },
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
