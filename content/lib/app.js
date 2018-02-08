define(['angularAMD', 'layer', 'base','angularUiRouter',
    '../../directives/DirectivesModule',
    '../../directives/FiltersModule'
    ],function(angularAMD, layer) {
    var app = angular.module('app', ['ui.router','DirectivesModule','FiltersModule']);
    
    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        /*
            viewname@statename的方式分配为绝对名称
            viewname是目标模板中的ui-view对应的名称，statename是状态的名称,状态名称对应于一个目标模板
        */
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    '': angularAMD.route({
                        templateUrl: '../views/login/login.html',
                        controller: 'loginCtrl',
                        controllerUrl: '../../controllers/login/loginCtrl'
                    })
                }
            })
            // 写报告
            .state('writeReport', {
                url: '/writeReport',
                views: {
                    '': {
                        templateUrl: '../views/writeReport/writeReport.html'
                    },
                    'leftMain@writeReport': angularAMD.route({
                        templateUrl: '../views/public/leftMain.html',
                        controller: 'leftMainCtrl',
                        controllerUrl: '../../controllers/leftMain/leftMainCtrl',
                    }),
                    'rightMain@writeReport': {
                        templateUrl: '../views/public/rightMain.html'
                    }
                }
            })
            // 基础信息
            .state('writeReport.baseInfo', {
                url: '/baseInfo',
                views: {
                    'rightMain@writeReport': angularAMD.route({
                        templateUrl: '../views/writeReport/baseInfo.html',
                        controller: 'calculateCtrl',
                        controllerUrl: '../../controllers/calculate/calculateCtrl'
                    })
                }
            })
            // 权益信息
            .state('writeReport.interestsInfo', {
                url: '/interestsInfo',
                views: {
                    'rightMain@writeReport': angularAMD.route({
                        templateUrl: '../views/writeReport/interestsInfo.html',
                        controller: 'calculateCtrl',
                        controllerUrl: '../../controllers/calculate/calculateCtrl'
                    })
                }
            })
            // 现场勘查
            .state('writeReport.exploration', {
                url: '/exploration',
                views: {
                    'rightMain@writeReport': angularAMD.route({
                        templateUrl: '../views/writeReport/exploration.html',
                        controller: 'calculateCtrl',
                        controllerUrl: '../../controllers/calculate/calculateCtrl'
                    })
                }
            })
            // 计算法
            .state('writeReport.marketApproach', {
                url: '/marketApproach',
                views: {
                    'rightMain@writeReport': angularAMD.route({
                        templateUrl: '../views/writeReport/marketApproach.html',
                        controller: 'calculateCtrl',
                        controllerUrl: '../../controllers/calculate/calculateCtrl'
                    })
                }
            })
            // 成本法
            .state('writeReport.costApproach', {
                url: '/costApproach',
                views: {
                    'rightMain@writeReport': angularAMD.route({
                        templateUrl: '../views/writeReport/costApproach.html',
                        controller: 'calculateCtrl',
                        controllerUrl: '../../controllers/calculate/calculateCtrl'
                    })
                }
            })
            // 收益法
            .state('writeReport.incomeApproach', {
                url: '/incomeApproach',
                views: {
                    'rightMain@writeReport': angularAMD.route({
                        templateUrl: '../views/writeReport/incomeApproach.html',
                        controller: 'calculateCtrl',
                        controllerUrl: '../../controllers/calculate/calculateCtrl'
                    })
                }
            })
            // 计算结果
            .state('writeReport.computedResult', {
                url: '/computedResult',
                views: {
                    'rightMain@writeReport': angularAMD.route({
                        templateUrl: '../views/writeReport/computedResult.html',
                        controller: 'calculateCtrl',
                        controllerUrl: '../../controllers/calculate/calculateCtrl'
                    })
                }
            })
            // 估价师声明
            .state('writeReport.appraiserStatement', {
                url: '/appraiserStatement',
                views: {
                    'rightMain@writeReport': angularAMD.route({
                        templateUrl: '../views/writeReport/appraiserStatement.html',
                        controller: 'calculateCtrl',
                        controllerUrl: '../../controllers/calculate/calculateCtrl'
                    })
                }
            })
            // 照片地图
            .state('writeReport.photoMap', {
                url: '/photoMap',
                views: {
                    'rightMain@writeReport': angularAMD.route({
                        templateUrl: '../views/writeReport/photoMap.html',
                        controller: 'calculateCtrl',
                        controllerUrl: '../../controllers/calculate/calculateCtrl'
                    })
                }
            })
            // 生成报告
            .state('writeReport.reportResult', {
                url: '/reportResult',
                views: {
                    'rightMain@writeReport': angularAMD.route({
                        templateUrl: '../views/writeReport/reportResult.html',
                        controller: 'calculateCtrl',
                        controllerUrl: '../../controllers/calculate/calculateCtrl'
                    })
                }
            })
            // 报告列表
            .state('writeReport.reportList', {
                url: '/reportList',
                views: {
                    'rightMain@writeReport': angularAMD.route({
                        templateUrl: '../reportList/views/reportList.html',
                        controller: 'reportListCtrl',
                        controllerUrl: '../../reportList/controllers/reportListCtrl'
                    })
                }
            })

            


        // 这里只是测试,测试,测试
        .state('writeReport.marketApproach.test', {
            url: '/test',
            views: {
                'rightMain@writeReport': {
                    templateUrl: '../views/writeReport/test.html'
                }
            }
        })



        .state('index', {
                url: '/index',
                views: {
                    '': {
                        templateUrl: '../views/tpls3/index.html'
                    },
                    'topbar@index': {
                        templateUrl: '../views/tpls3/topbar.html'
                    },
                    'main@index': {
                        templateUrl: '../views/tpls3/home.html'
                    }
                }
            })
            .state('index.usermng', {
                url: '/usermng',
                views: {
                    'main@index': {
                        templateUrl: '../views/tpls3/usermng.html',
                        controller: function($scope, $state) {
                            $scope.addUserType = function() {
                                $state.go("index.usermng.addusertype");
                            }
                        }
                    }
                }
            })
            .state('index.usermng.highendusers', {
                url: '/highendusers',
                templateUrl: '../views/tpls3/highendusers.html'
            })
            .state('index.usermng.normalusers', {
                url: '/normalusers',
                templateUrl: '../views/tpls3/normalusers.html'
            })
            .state('index.usermng.lowusers', {
                url: '/lowusers',
                templateUrl: '../views/tpls3/lowusers.html'
            })
            .state('index.usermng.addusertype', {
                url: '/addusertype',
                templateUrl: '../views/tpls3/addusertypeform.html',
                controller: function($scope, $state) {
                    $scope.backToPrevious = function() {
                        window.history.back();
                    }
                }
            })
            .state('index.permission', {
                url: '/permission',
                views: {
                    'main@index': {
                        template: '这里是权限管理'
                    }
                }
            })
            .state('index.report', {
                url: '/report',
                views: {
                    'main@index': {
                        template: '这里是报表管理'
                    }
                }
            })
            .state('index.settings', {
                url: '/settings',
                views: {
                    'main@index': {
                        template: '这里是系统设置'
                    }
                }
            })
    })
    return angularAMD.bootstrap(app);
});