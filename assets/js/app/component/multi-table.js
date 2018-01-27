define([
    'data',
    TEMPLATE_BASE_URL + 'multi-table.html'
], function (data, template) {
    'use strict';

    return {
        template: template,
        data: function () {
            return { tableData: data.tableData }
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
    }

});