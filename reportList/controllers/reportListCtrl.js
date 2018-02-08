define(['app'],function(app){
    app.controller('reportListCtrl',['$scope','$rootScope','$location',function($scope,$rootScope,$location){
    	$scope.test = '2222';

    	/**
         * 属性配置：
         * currentPage:当前页,默认为1
         * totalItems：总项数totalItems:在所有页面
         * itemsPerPage：每页的数量,默认15
         * onChange:分页是改变时,它将excute函数。
         * pagesLength: 分页大小数量,默认9
         * perPageOptions: 在页面选择多少项,默认[10、15、20、30、50]
         * rememberPerPage: 在页面中使用记住多少项由用户选择。
         */
        $scope.pageConf = {
            currentPage: 1,
            totalItems: 1000,
            itemsPerPage: 10,
            pagesLength: 10,
            isShowHome: false,
            isShowLast: false,
            perPageOptions: [10, 20, 30, 40, 50],
            rememberPerPage: 'p1',
            onChange: function() {}
        }

 		// casePopObj.itemsPerPage
 		var data = {
 			PageIndex: 1,
 			RecordCount: 100
 		}
 		$scope.dataPaging = data;
 		/**
         * 调用分页功能
         * $scope: 作用域
         * pageConf: 分页请求数据配置
         * casePopObj.itemsPerPage: 每页的数量
         * $scope.pageConf.perPageOptions: 每页加载的数量
         * $scope.dataPaging: 接收后台返回的分页数据
         * callBack: 执行下次数据请求,获得最新分页数据
         */
        p.resetPageList($scope,'pageConf',$scope.pageConf.itemsPerPage,$scope.pageConf.perPageOptions,$scope.dataPaging,function(obj){
        	getPagination();
            // 自定义请求回调
            /*if(typeof $scope.reqDataGrid=='function'){
                $scope.reqDataGrid({
                    pageIndex: obj.currentPage,
                    pageSize: obj.itemsPerPage
                });
            }*/
        });


    }]);
});
