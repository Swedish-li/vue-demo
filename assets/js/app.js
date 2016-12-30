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

requirejs(['../app/main'])