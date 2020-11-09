import { createApp } from 'vue'
import App from './App'
import { createRouter, createWebHashHistory } from 'vue-router'

import './style/index.scss'
import { getUrl } from './utils'
import { PhoneDetailView } from './view/PhoneDetailView'
import { PhoneListView } from './view/PhoneListView'

const router = createRouter({
  history: createWebHashHistory(getUrl()),
  routes: [
    { path: '/phones', component: PhoneListView, name: 'phone-list' },
    { path: '/phones/:id', component: PhoneDetailView, props: true },
    { path: '/', redirect: { name: 'phone-list' } },
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
