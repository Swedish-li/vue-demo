define([
    'Vue'
], function (Vue) {
    'use strict';
    //父组件使用属性想子组件传递数据(props down)，子组件通过事件向父组件传递数据(event up)
    //组件之间的数据传递
    Vue.component('child', {
        props: ['message'],
        template: '<h3>{{message}}</h3>'
    })

});