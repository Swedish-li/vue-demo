requirejs.config({
    baseUrl: 'assets/js/lib',
    // pathsオプションの設定。"module/name": "path"を指定します。拡張子（.js）は指定しません。
    paths: {
        "jquery": "jquery.min",
        "jquery.bootstrap": "bootstrap.min",
        "Vue": "vue",
        "data": "../data/table.data"
    },
    // shimオプションの設定。モジュール間の依存関係を定義します。
    shim: {
        "jquery.bootstrap": {
            // jQueryに依存するのでpathsで設定した"module/name"を指定します。
            deps: ["jquery"]
        }
    }
});

// require(["module/name", ...], function(params){ ... });
require(["jquery", "Vue", 'data'], function($, Vue, data) {
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
});