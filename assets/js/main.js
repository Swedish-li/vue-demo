const TEMPLATE_BASE_URL = 'text!/assets/js/app/template/'

requirejs.config({
    // //  配置成每次请求都从服务器拉取JS文件，避免浏览器缓存
    urlArgs: "v=" + (new Date()).getTime(),
    baseUrl: 'assets/js/lib',
    // pathsオプションの設定。"module/name": "path"を指定します。拡張子（.js）は指定しません。
    paths: {
        "text": "text",
        "jquery": "jquery.min",
        "jquery.bootstrap": "bootstrap.min",
        "Vue": "http://cdn.bootcss.com/vue/2.5.13/vue",
        "data": "../data/table.data",
        "vue-router": "http://cdn.bootcss.com/vue-router/2.5.3/vue-router"
    },
    // shimオプションの設定。モジュール間の依存関係を定義します。
    shim: {
        "jquery.bootstrap": {
            // jQueryに依存するのでpathsで設定した"module/name"を指定します。
            deps: ["jquery"]
        }
    }
});

requirejs(['../app/app'])