define(['app'],function(app){
	app.factory('writeReportServices',['$http','$rootScope',
		function($http,$rootScope){
			/**
			 * 字典信息
			 */
			var getParamsByKeyVal = function(form){
				return $.ajax({
					type:'post',
					async:false,
					url:'/pep_java_server/dictionary/getParamsByKeyVal.do',
					data:{keyVals:form.sReqStr}
				});
				/*$.post("/pep_java_server/dictionary/getParamsByKeyVal.do",{keyVals:form.sReqStr},function(e){
					console.log(new Date().getTime()-s);
				});*/
				//return $.post("/pep_java_server/dictionary/getParamsByKeyVal.do",{keyVals:form.sReqStr});
			}

			/**
			 * 获取自动案例
			 */
			var getAutomaticList = function(form){
				var params = {
					cityName: 'beijing',
					residentialAreaName: form.n0_GuJiaDuiXiang_XiangMuMingChen,
					area: form.n0_GuJiaDuiXiang_JianZhuMianJi,
					unitShape: form.n0_GuJiaDuiXiang_HuXing,
					toward: form.n0_GuJiaDuiXiang_ChaoXiang,
					buildingCompletedYear: form.n0_GuJiaDuiXiang_JianChengNianDai
				}
				return $http({
					method: 'post',
	                params: params,
	                url: '/pep_java_server/calculation/getAutomaticList.do'
				});
			}

			/**
			 * 获取自动案例弹窗列表信息
			 */
			var getAutomaticPageList = function(form){
				var params = {
					cityName: 'beijing',
                    residentialAreaName: form.residentialAreaName, // 小区名称
                    pageIndex: form.pageIndex, // 页码
                    pageSize: form.pageSize, // 每页数量，默认值50
                    caseFrom: form.caseFrom, // 案例来源
                    caseType: form.caseType, // 案例类型
                    maxArea: form.maxArea, // 最大面积
                    minArea: form.minArea, // 最小面积
                    maxTotalPrice: form.maxTotalPrice, // 最大总价
                    minTotalPrice: form.minTotalPrice, // 最小总价
                    unitShape: form.unitShape, // 户型
                    toward: form.toward, // 朝向
                    decoration: form.decoration, // 装修类型
                    buildingCompletedYear: form.buildingCompletedYear, // 建成年代
                    beginTime: form.beginTime, //开始时间
                    endTime: form.endTime // 结束时间
				}
				return $http({
					method: 'post',
	                params: params,
	                url: '/pep_java_server/calculation/getAutomaticPageList.do'
				});
			}

			/**
			 * 生成报告
			 */
			var createReport = function(form){
				var params = {
					reportId: form.reportId
				}
				return $http({
					method: 'post',
	                params: params,
	                url: '/pep_java_server/createReport/createDocByTemplate.do'
				});
			}

			/**
			 * 保存报告
			 */
			var saveReport = function(form){
				return $.post("/pep_java_server/calculation/saveMould.do",{dataJSON:form.dataJSON});
			}

			/**
			 * 通过模板ID获取数据模板公式
			 */
			var getFormulas = function(form){
				var params = {
					reportId: form.reportId
				}
				return $http({
					method: 'post',
	                params: params,
	                url: '/pep_java_server/calculation/getFormulas.do'
				});
			}

			/**
			 * 估价师声明
			 */
			var getGjsStatement = function(){
				return $http({
					method: 'post',
	                url: '/pep_java_server/dictionary/getAppraiserStatement.do'
				});
			}

			/**
			 * 估价假设和限制条件
			 */
			var getGjsAssumptions = function(){
				return $http({
					method: 'post',
	                url: '/pep_java_server/dictionary/getValuationAssumptions.do'
				});
			}

			/**
			 * 周边小区(项目名称)
			 */
			var getProjectName = function(form){
				var params = {
					cityName: form.cityName,
					residentialareaName: form.residentialareaName,
					radius: form.radius,
					number: form.number
				}
				return $http({
					method: 'post',
					params: params,
					url: '/pep_java_server/calculation/getRimResidentialareaByName.do'
				});
			}

			/**
			 * 查看实例位置
			 */
			var getResidentialArea = function(form){
				var params = {
					cityName: 'beijing',
					residentialareaName: form.residentialareaName
				}
				return $http({
					method: 'post',
					params: params,
					url: '/pep_java_server/calculation/getResidentialArea.do'
				});
			}

			return {
				getParamsByKeyVal:function(form){
					return getParamsByKeyVal(form);
				},
				getAutomaticList:function(form){
					return getAutomaticList(form);
				},
				getAutomaticPageList:function(form){
					return getAutomaticPageList(form);
				},
				createReport:function(form){
					return createReport(form);
				},
				saveReport:function(form){
					return saveReport(form);
				},
				getFormulas:function(form){
					return getFormulas(form);
				},
				getGjsStatement:function(){
					return getGjsStatement();
				},
				getGjsAssumptions:function(){
					return getGjsAssumptions();
				},
				getProjectName:function(form){
					return getProjectName(form);
				},
				getResidentialArea:function(form){
					return getResidentialArea(form);
				}
			}

		}

	]);
});
