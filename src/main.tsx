import { createApp } from 'vue'
import App from './App'
import { createRouter, createWebHashHistory } from 'vue-router'
import { PhoneDetailContainer } from './components/PhoneDetailContainer'
import { PhoneListComponent } from './components/PhoneList'

import './style/index.scss'
import { getUrl } from './utils'

const router = createRouter({
  history: createWebHashHistory(getUrl()),
  routes: [
    { path: '/phones', component: PhoneListComponent, name: 'phone-list' },
    { path: '/phones/:id', component: PhoneDetailContainer, props: true },
    { path: '/', redirect: { name: 'phone-list' } },
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
