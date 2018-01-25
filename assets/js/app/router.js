define([
    'require',
    'Vue',
    'vue-router'
], function (require, Vue) {
    'use strict';
    const VueRouter = require('vue-router')
    Vue.use(VueRouter)

    const Foo = { template: '<div>foo</div>' }
    const Bar = { template: '<div>bar</div>' }


    const routes = [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar }
    ]

    const router = new VueRouter({
        routes
    })

    const app = new Vue({
        router
    }).$mount('#routeApp')
});