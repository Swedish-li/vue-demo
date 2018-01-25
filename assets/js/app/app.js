define(function (require) {
    var Vue = require('Vue')
    var data = require('data')

    require('./router')

    // 注册全局组件
    require('./component/child')
    require('./component/simple-counter')

    new Vue({
        el: '#example-5'
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

    var app = new Vue({
        el: '#app',
        data: {
            tableData: data.tableData
        },
        methods: {
            isSelected: function (event, item) {
                // https://cn.vuejs.org/v2/guide/reactivity.html
                //Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)
                if (item.selected) {
                    this.$set(item, 'selected', false)
                } else {
                    this.$set(item, 'selected', true)
                }

            },
            hasSelected: function (index) {
                let selected = this.tableData[index].selected
                if (selected === undefined) {
                    return false
                }
                return selected ? false : true;
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
            isSelected: function (index) {
                return this.tableData.indexOf(this.classItem) === index
            },
            select: function (index) {
                this.classItem = this.tableData[index]
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