/**
 * PEP所有相关指令控件
 */
define(['app'], function(app) {
    angular.module('DirectivesModule',[]).
    /**
     * 头部
     */
    directive('pepHeader', ['$location', '$timeout', function($location, $timeout) {
        return {
            restrict: 'E',
            templateUrl: '../views/directive/header.html',
            replace: true,
            link: function($scope, $element, $attr) {

            },
            controller: function($scope, $element) {
                $scope.rootUserName = localStorage.getItem('rootUserName');
            }
        }
    }]).
    /**
     * 头部步骤导航菜单
     */
    directive('stepNav', ['$location', '$timeout', function($location, $timeout) {
        return {
            restrict: 'E',
            templateUrl: '../views/directive/stepNav.html',
            replace: true,
            link: function($scope, $element, $attr) {
                var elmsA = $element.find('a');
                for(var i=0;i<elmsA.length;i++){
                    if($location.$$path.indexOf(elmsA[i].getAttribute('data-sref').replace('.','/'))!=-1){
                        p.addClass(elmsA[i],'current');
                        break;
                    }
                }
            },
            controller: function($scope, $element, $location) {
                
            }
        }
    }]).
    /**
     * 计算法可比实例number加减
     */
    directive('numberPanel', ['$timeout', '$rootScope', function($timeout, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: '../views/directive/countNumber.html',
            replace: true,
            scope: {
                v: '=',
                name: '@'
            },
            link: function(scope, element, attr) {
                var addEvent = function(elm) {
                    var oNumber = p.getClass(elm, 'number')[0];
                    var oAdd = p.getClass(elm, 'add')[0];
                    var oReduceBtn = p.getClass(elm, 'reduce')[0];
                    oNumber.onchange = function() {
                        if (scope.v >= 120) {
                            scope.v = 120;
                        } else if (scope.v <= 80) {
                            scope.v = 80;
                        }
                        scope.$apply();
                        $rootScope.runRole(scope.name);
                    }
                    oAdd.onclick = function() {
                        if (scope.v >= 120) {
                            scope.v = 120;
                            return;
                        }
                        scope.v++;
                        scope.$apply();
                        $rootScope.runRole(scope.name);
                    }
                    oReduceBtn.onclick = function() {
                        if (scope.v <= 80) {
                            scope.v = 80;
                            return;
                        }
                        scope.v--;
                        scope.$apply();
                        $rootScope.runRole(scope.name);
                    }
                }

                for (var i = 0; i < element.length; i++) {
                    addEvent(element[i]);
                }
            }
        }
    }]).
    /**
     * // 底部悬浮菜单
     */
    directive('reportNext', ['$location', '$timeout', function($location, $timeout) {
        return {
            restrict: 'E',
            templateUrl: '../views/directive/fixedNav.html',
            replace: true,
            scope: {
                createReport: '&', // 保存报告方法
                nextStep: '&', // 下一步方法
                prevStep: '&', // 上一步方法
                finishReport: '&', // 完成报告方法
                isShowPrev: '=', // 是否显示上一步
                isShowNext: '=', // 是否显示下一步
                isFinishReport: '=', // 是否保存报告
                isHideFixcontent: '=', // 控制整个fixed悬浮框显示
                isShowIncome: '=', // 是否显示收益法结果
                incomeResult: '=', // 收益法计算结果值
                isShowMethod: '=', // 计算法计算值显示
                isShowCosting: '=', // 成本法计算值显示
                costingResult: '=' // 成本法计算结果值
            },
            link: function($scope, $element, $attr) {
                //console.log($scope)
                
            },
            controller: function($scope, $element) {

            }
        }
    }]).
    /**
     * 禁用input输入
     */
    directive('disableInput',[function(){
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            link: function(scope, element, attr) {
                for (var i = 0; i < element.length; i++) {
                    element[i].className+=' disable-input';
                    element[i].onkeydown = function(e){
                        e.stopPropagation();
                        return false;
                    }
                }
            }
        }
    }]).
    /**
     * 分页组件
     */
    directive('tmPagination', ['$timeout',function($timeout) {
        return {
            restrict: 'EA',
            template: '<div class="page-list clear">' +
                '<ul class="pagination fl" ng-show="conf.totalItems > 0">' +
                '<li ng-class="{disabled: conf.currentPage == 1}" ng-show="conf.isShowHome" ng-click="pIndex()"><span>首页</span></li>' +
                '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>上一页</span></li>' +
                '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
                'ng-click="changeCurrentPage(item)">' +
                '<span>{{ item }}</span>' +
                '</li>' +
                '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>下一页</span></li>' +
                '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-show="conf.isShowLast" ng-click="pLast()"><span>尾页</span></li>' +
                '</ul>' +
                '<span class="spanel fl" ng-show="conf.isShowPerPageOption"><label>每页</label><select class="select" ng-model="conf.itemsPerPage" ng-options="option for option in conf.perPageOptions" ng-change="changeItemsPerPage()"></select></span>' +
                '<div class="page-total fl" ng-show="conf.totalItems > 0">' +
                '到第<input class="input text-center" type="text" ng-model="jumpPageNum"/>页 ' +
                '<a href="javascript:;" class="btn btn-default btn-sm" ng-click="jumpToPage($event)">GO</a>' +
                '共<strong>{{ conf.totalItems }}</strong>条' +
                '</div>' +
                '<div class="no-items" ng-show="conf.totalItems <= 0">暂无数据</div>' +
                '</div>',
            replace: true,
            scope: {
                conf: '='
            },
            link: function(scope, element, attrs) {
                // 变更当前页
                scope.changeCurrentPage = function(item) {
                    if (item == '...') {
                        return;
                    } else {
                        scope.conf.currentPage = item;
                    }
                    watchFn();
                }

                // 定义分页的长度必须为奇数 (default:9)
                scope.conf.pagesLength = parseInt(scope.conf.pagesLength) ? parseInt(scope.conf.pagesLength) : 9;
                if (scope.conf.pagesLength % 2 === 0) {
                    // 如果不是奇数的时候处理一下
                    scope.conf.pagesLength = scope.conf.pagesLength - 1;
                }

                // conf.erPageOptions
                if (!scope.conf.perPageOptions) {
                    scope.conf.perPageOptions = [10, 15, 20, 30, 50];
                }

                function watchFn(){
                    if (scope.conf.onChange) {
                        scope.conf.onChange(this);
                        /*scope.$watch('conf.itemsPerPage', function(newValue, oldValue, scope) {
                            console.log(newValue);
                            console.log(localStorage[scope.conf.rememberPerPage]);
                            if(newValue==parseInt(localStorage[scope.conf.rememberPerPage])){
                                scope.conf.itemsPerPage = parseInt(localStorage[scope.conf.rememberPerPage]);
                            }
                        });*/
                        /*$timeout(function(){
                            scope.conf.itemsPerPage = parseInt(localStorage[scope.conf.rememberPerPage]);
                        },200);*/
                    }
                }

                // pageList数组
                window.getPagination = function() {
                    // conf.currentPage
                    scope.conf.currentPage = parseInt(scope.conf.currentPage) ? parseInt(scope.conf.currentPage) : 1;
                    // conf.totalItems
                    //scope.conf.totalItems = parseInt(data.RecordCount);
                    scope.conf.totalItems = parseInt(scope.conf.totalItems);

                    // conf.itemsPerPage (default:15)
                    // 先判断一下本地存储中有没有这个值
                    // localStorage[scope.conf.rememberPerPage]
                    if (scope.conf.rememberPerPage) {
                        if (!parseInt(localStorage[scope.conf.rememberPerPage])) {
                            localStorage[scope.conf.rememberPerPage] = parseInt(scope.conf.itemsPerPage) ? parseInt(scope.conf.itemsPerPage) : 10;
                        }
                        scope.conf.itemsPerPage = parseInt(localStorage[scope.conf.rememberPerPage]);
                    } else {
                        scope.conf.itemsPerPage = parseInt(scope.conf.itemsPerPage) ? parseInt(scope.conf.itemsPerPage) : 10;
                    }
                    // numberOfPages
                    scope.conf.numberOfPages = Math.ceil(scope.conf.totalItems / scope.conf.itemsPerPage);

                    // judge currentPage > scope.numberOfPages
                    if (scope.conf.currentPage < 1) {
                        scope.conf.currentPage = 1;
                    }

                    if (scope.conf.currentPage > scope.conf.numberOfPages) {
                        scope.conf.currentPage = scope.conf.numberOfPages;
                    }

                    // jumpPageNum
                    scope.jumpPageNum = scope.conf.currentPage;

                    // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                    var perPageOptionsLength = scope.conf.perPageOptions.length;
                    // 定义状态
                    var perPageOptionsStatus;
                    for (var i = 0; i < perPageOptionsLength; i++) {
                        if (scope.conf.perPageOptions[i] == scope.conf.itemsPerPage) {
                            perPageOptionsStatus = true;
                        }
                    }
                    // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                    if (!perPageOptionsStatus) {
                        scope.conf.perPageOptions.push(scope.conf.itemsPerPage);
                    }

                    // 对选项进行sort
                    scope.conf.perPageOptions.sort(function(a, b) {
                        return a - b
                    });

                    scope.pageList = [];
                    if (scope.conf.numberOfPages <= scope.conf.pagesLength) {
                        // 判断总页数如果小于等于分页的长度，若小于则直接显示
                        for (i = 1; i <= scope.conf.numberOfPages; i++) {
                            scope.pageList.push(i);
                        }
                    } else {
                        // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                        // 计算中心偏移量
                        var offset = (scope.conf.pagesLength - 1) / 2;
                        if (scope.conf.currentPage <= offset) {
                            // 左边没有...
                            for (i = 1; i <= offset + 1; i++) {
                                scope.pageList.push(i);
                            }
                            scope.pageList.push('...');
                            scope.pageList.push(scope.conf.numberOfPages);
                        } else if (scope.conf.currentPage > scope.conf.numberOfPages - offset) {
                            scope.pageList.push(1);
                            scope.pageList.push('...');
                            for (i = offset + 1; i >= 1; i--) {
                                scope.pageList.push(scope.conf.numberOfPages - i);
                            }
                            scope.pageList.push(scope.conf.numberOfPages);
                        } else {
                            // 最后一种情况，两边都有...
                            scope.pageList.push(1);
                            scope.pageList.push('...');

                            for (i = Math.ceil(offset / 2); i >= 1; i--) {
                                scope.pageList.push(scope.conf.currentPage - i);
                            }
                            scope.pageList.push(scope.conf.currentPage);
                            for (i = 1; i <= offset / 2; i++) {
                                scope.pageList.push(scope.conf.currentPage + i);
                            }

                            scope.pageList.push('...');
                            scope.pageList.push(scope.conf.numberOfPages);
                        }
                    }
                    /*if (scope.conf.onChange) {
                        scope.conf.onChange(this);
                    }*/
                    scope.$parent.conf = scope.conf;
                }
                getPagination();

                // 首页
                scope.pIndex = function(){
                    scope.conf.currentPage = 1;
                    watchFn();
                }

                // 尾页
                scope.pLast = function(){
                    scope.conf.currentPage = scope.conf.numberOfPages?scope.conf.numberOfPages:Math.ceil(scope.conf.totalItems / scope.conf.itemsPerPage);
                    watchFn();
                }

                // prevPage
                scope.prevPage = function() {
                    if (scope.conf.currentPage > 1) {
                        scope.conf.currentPage -= 1;
                    }
                    watchFn();
                };
                // nextPage
                scope.nextPage = function() {
                    scope.conf.numberOfPages = Math.ceil(scope.conf.totalItems / scope.conf.itemsPerPage);
                    if (scope.conf.currentPage < scope.conf.numberOfPages) {
                        scope.conf.currentPage += 1;
                    }
                    watchFn();
                };

                // 跳转页
                scope.jumpToPage = function() {
                    scope.conf.numberOfPages = Math.ceil(scope.conf.totalItems / scope.conf.itemsPerPage);
                    try{
                        scope.jumpPageNum = scope.jumpPageNum.replace(/[^0-9]/g, '');
                        if (scope.jumpPageNum !== '') {
                            
                            if(scope.jumpPageNum>=scope.conf.numberOfPages) {
                               scope.conf.currentPage = scope.conf.numberOfPages;
                            }else{
                                scope.conf.currentPage = scope.jumpPageNum;
                            }
                        }
                    }catch(e){}
                    watchFn();
                };

                // 修改每页显示的条数
                scope.changeItemsPerPage = function() {
                    // 清除本地存储的值方便重新设置
                    localStorage[scope.conf.rememberPerPage] = parseInt(scope.conf.itemsPerPage) ? parseInt(scope.conf.itemsPerPage) : 10;
                    scope.conf.itemsPerPage = parseInt(localStorage[scope.conf.rememberPerPage]);
                    watchFn();
                    /*$timeout(function(){
                        scope.conf.itemsPerPage = parseInt(localStorage[scope.conf.rememberPerPage]);
                    },200);*/
                };
            }
        };
    }]);
});