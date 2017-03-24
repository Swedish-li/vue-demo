define(function(require) {
    var $ = require('jquery')
    var Vue = require('vue')
    var data = require('data')

    //父组件使用属性想子组件传递数据(props down)，子组件通过事件向父组件传递数据(event up)
    //组件之间的数据传递
    Vue.component('child', {
        props: ['message'],
        template: '<h3>{{message}}</h3>'
    })

    new Vue({
        el: '#example-6',
        data: {
            msg: "this is parent component!"
        }
    })

    new Vue({
        el: '#example-5'
    })

    //simple counter
    Vue.component('simple-counter', {
        template: '<button @click="counter+=1">{{counter}}</button>',
        data: function() {
            return {
                counter: 0
            }
        }
    })

    new Vue({
        el: '#example-4'
    })

    //局部注册组件,这种方式也可以注册其他vue功能，如指令
    var child = {
        template: '<h1>This ia child component!</h1>'
    }

    new Vue({
            el: '#example-3',
            components: {
                'new-component': child
            }
        })
        //Vue.component(tagName, options)
        //全局注册组件
    Vue.component('my-component', {
        template: '<h1>Hello Vue component!</h1>'
    })

    //创建Vue实例
    new Vue({
        el: '#example-2'
    })

    var app = new Vue({
        el: '#app',
        data: {
            tableData: data.tableData
        },
        methods: {
            isSelected: function(event) {
                var $el = $(event.currentTarget);
                if ($el.hasClass("selected")) {
                    $el.removeClass("selected");
                } else {
                    $el.addClass("selected");
                }
            }
        }
    })

    var app2 = new Vue({
        el: '#app2',
        data: {
            tableData: data.tableData,
            classItem: {}
        },
        methods: {
            isSelected: function(index) {
                console.log(index)
                this.$set(this.classItem, index)
                    //$($el).find("table>tbody>tr").removeClass("selected")
                    //$($el).find("table>tbody>tr:eq("+index+")").addClass("selected")
            }
        }
    })

    var example1 = new Vue({
        el: '#example-1',
        data: {
            count: 0
        }
    })
})