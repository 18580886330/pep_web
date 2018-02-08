define(['app'],function(app){
	app.factory('loginServices',['$http','$rootScope',
		function($http,$rootScope){

			var test = function(){
				var params = {
					cityName: 'beijing',
					residentialAreaName:'五栋大楼',
					mianji: 280
				}
				return $http({
					method: 'post',
	                params: params,
	                url: '/pep_java_server/calculation/getAutomaticList.do'
				});
			}

			return {
				test:function(){
					return test();
				}
			}

		}

	]);
});
