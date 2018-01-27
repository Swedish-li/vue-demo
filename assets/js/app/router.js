define([
    'require',
    'Vue',
    'vue-router',
    './component/pass-data',
    './component/local-component',
    './component/multi-table',
    './component/single-table',
    './component/counter'
], function (require, Vue, VueRouter) {
    'use strict';

    const counter = require('./component/counter')
    const passingData = require('./component/pass-data')

    //局部注册组件,这种方式也可以注册其他vue功能，如指令
    const localComponent = require('./component/local-component')

    const multiTable = require('./component/multi-table')

    const singleTable = require('./component/single-table')

    const routes = [
        { path: '/', redirect: 'table' },
        { path: '/counter', component: counter },
        { path: '/passing-data', component: passingData },
        { path: '/local-component', component: localComponent },
        { path: '/multi-table', component: multiTable },
        { path: '/single-table', component: singleTable }
    ]

    Vue.use(VueRouter)

    const app = new Vue({
        router: new VueRouter({
            routes
        })
    }).$mount('#routeApp')
});