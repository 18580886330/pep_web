require.config({
    baseUrl: "content/lib",
    paths: {
        'angular': 'angular/angular',
        //'angular': 'angular/angular.min',
        //'angularUiRouter': 'angular/angular-ui-router',
        'angularUiRouter': 'angular/angular-ui-router.min',
        'angularAMD': 'angular/angularAMD.min',
        //'wx': 'http://res.wx.qq.com/open/js/jweixin-1.0.0',
        'css': 'require/css.min',
        'jquery' : 'jquery/jquery-1.8.2.min',
        'layer': 'layer/layer',
        'base': 'base/base',
        'md5': 'md5/md5'
    },
    // 为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置。
    shim: {
        'angularAMD': {
            deps: ['angular'],
            exports: 'angularAMD'
        },
        'angularUiRouter': {
            deps: ['angular'],
            exports: 'angularUiRouter'
        },
        'layer': {
            deps: ['jquery']
        }
    },
    deps: ['css!../css/index.css','css!../lib/layer/skin/layer.css','css!../css/swiper.css', 'app']
});