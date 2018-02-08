define(['app'],function(app){
    app.controller('leftMainCtrl',['$scope','$rootScope','$location',function($scope,$rootScope,$location){
    	/**
    	 * 绑定左边菜单选中状态
    	 */
		;(function(){
			var leftMenu = p.getClass(document,'left-menu')[0];
			var elmsA = p.getClass(leftMenu,'nav-item');
	        for(var i=0;i<elmsA.length;i++){
	            if($location.$$path.indexOf(elmsA[i].getAttribute('ui-sref').replace('.','/'))!=-1){
	                p.addClass(elmsA[i],'on');
	                break;
	            }
	        }
        }());
        
    }]);
});
