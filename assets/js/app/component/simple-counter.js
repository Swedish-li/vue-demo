define([
    'Vue'
], function (Vue) {
    'use strict';
    //simple counter
    Vue.component('simple-counter', {
        template: '<button class="btn btn-danger" @click="counter+=1">{{counter}}</button>',
        data: function () {
            return {
                counter: 0
            }
        }
    })
});