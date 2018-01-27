define([
    'data',
    TEMPLATE_BASE_URL + 'single-table.html'
], function (data, template) {
    'use strict';

    return {
        template: template,
        data: function () {
            return {
                tableData: data.tableData,
                classItem: {}
            }
        },
        methods: {
            isSelected: function (index) {
                return this.tableData.indexOf(this.classItem) === index
            },
            select: function (index) {
                this.classItem = this.tableData[index]
            }
        }
    }
});