define(function (require) {
	var $ = require('jquery')
	var Vue = require('vue')
	var data = require('data')

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
        el:'#app2',
        data: {
            tableData:data.tableData
        },
        methods:{
            isSelected:function(index){
                $("#app2>table>tbody>tr").removeClass("selected")
                $("#app2>table>tbody>tr:eq("+index+")").addClass("selected")
            }
        }
    })

    var example1 = new Vue({
        el:'#example-1',
        data:{
            count : 0
        }
    })
})