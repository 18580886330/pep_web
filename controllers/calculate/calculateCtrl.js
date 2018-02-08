define(['app', '../../services/writeReport/writeReportServices','../../controllers/calculate/defaultData','../../content/lib/base/toolFuns','../../content/lib/layer/laydate/laydate.dev'], function(app, writeReportServices, defaultData, toolFuns) {
    app.controller('calculateCtrl', ['$scope', '$rootScope', '$timeout', '$location', '$filter', 'writeReportServices', function($scope, $rootScope, $timeout, $location, $filter, writeReportServices) {
    // 估价对象
    $scope.GuJiaDuiXiangData = defaultData.GuJiaDuiXiangData;
    $scope.GuJiaDuiXiangData = defaultData.GuJiaDuiXiangData;
    $scope.GuJiaDuiXiangData = defaultData.GuJiaDuiXiangData;
    $scope.ImportCaseData = defaultData.ImportCaseData;
    $scope.KeBiShiLi1Data = defaultData.KeBiShiLi1Data;
    $scope.KeBiShiLi2Data = defaultData.KeBiShiLi2Data;
    $scope.KeBiShiLi3Data = defaultData.KeBiShiLi3Data;
    $scope.ShiChangJiaGeQueDingData = defaultData.ShiChangJiaGeQueDingData;
    $scope.DiYaJiaGeQueDingData = defaultData.DiYaJiaGeQueDingData;
    $scope.FangFaLiYouData = defaultData.FangFaLiYouData;
    $scope.ShouYiFaData = defaultData.ShouYiFaData;
    $scope.ChengBenFaData = defaultData.ChengBenFaData;
    $scope.XianChangKanChaData = defaultData.XianChangKanChaData;
    $scope.QuanYiZhuangKuangData = defaultData.QuanYiZhuangKuangData;
    $scope.JiChuXinXiData = defaultData.JiChuXinXiData;
    $scope.GuJiaShiShengMingData = defaultData.GuJiaShiShengMingData;
    $scope.GuJiaShiJiaSheData = defaultData.GuJiaShiJiaSheData;
    $scope.XianZhiTiaoJianData = defaultData.XianZhiTiaoJianData;
    $scope.QiTaShuoMingShiXiangData = defaultData.QiTaShuoMingShiXiangData;
    
    /**
     * 公共部分 js
     */
    var run = (function(){
        var _this = null;
        return {
            /**
             * 默认加载的数据
             */
            init:function(){
                _this = this;
                getLocalData();
                _this.loadScope();
                _this.fixFixedNav();
                run = null;
            },
            loadScope:function(){
                /**
                 * 根据当前页面的路由来进行下一个路由跳转
                 * 需要严格按照页面的跳转顺序来定数组中路由的顺序
                 * 页面中对应的url地址
                 */
                var locationArr = [
                    '/writeReport/baseInfo',
                    '/writeReport/interestsInfo',
                    '/writeReport/exploration',
                    '/writeReport/marketApproach',
                    '/writeReport/costApproach',
                    '/writeReport/incomeApproach',
                    '/writeReport/computedResult',
                    '/writeReport/appraiserStatement',
                    '/writeReport/photoMap',
                    '/writeReport/reportResult'
                ]; // 存储计算法中所有跳转的路由
                $scope.getHref = function(){
                    return {
                        nextHref:function(){
                            return (function(){
                                for (var i = 0; i < locationArr.length; i++) {
                                    if(locationArr[i]==$location.path()){
                                        return locationArr[i+1];
                                    }
                                }
                            })();
                        },
                        prevHref:function(){
                            return (function(){
                                for (var i = 0; i < locationArr.length; i++) {
                                    if(locationArr[i]==$location.path()){
                                        return locationArr[i-1];
                                    }
                                }
                            })();
                        },
                        currentHref:function(){
                            return $location.path();
                        }
                    }
                }
                
                // 选保存报告,再生成报告
                $scope.createReport = function() {
                    _this.saveReport(getMarketReqData(),'save');
                }
                // 下载报告
                $scope.downLoadReport = function() {
                    _this.createReport(function(){
                        window.location.href='/pep_java_server/createReport/downLoadFile.do?reportId=120';
                    });
                }
                
                // 上一步
                $scope.prevStep = function(){
                    _this.prevStep();
                }
                // 下一步
                $scope.nextStep = function(){
                    _this.nextStep();
                }
                // 完成报告
                $scope.finishReport = function(){
                    _this.finishReport();
                }
            },
            /**
             * 底部悬浮导航
             */
            fixFixedNav:function(){
                $scope.isShowMethod = true; // 市场法结果值浮动显示
                //$scope.isShowCosting = false; // 成本法计算结果是否显示
                //$scope.isShowIncome = false; // 收益法计算结果是否显示
                //$scope.incomeResult = $scope.ShouYiFaData.n0_ShouYiFa_FangDiChanJiaZhiCeSuanJieGuo; // 收益法计算结果值
                $scope.n0_ShouYiFa_FangDiChanJiaZhiCeSuanJieGuo = 0; // 收益法计算结果值
                $scope.n0_ChengBenFa_FangDiChanDanJia = 0;

                $scope.costingResult = 0; // $scope.ChengBenFaData. // 成本法计算结果

                $scope.locationHref = $location.path();
                $scope.isFinishReport = false; // 默认隐藏完成报告按钮
                $scope.isHideFixcontent = true; // 默认显示悬浮导航

                $scope.isShowPrev = true; // 隐藏上一步()
                $scope.isShowNext = true; // 显示下一步(在生成报告结果页的时候不需要显示下一步按钮)

                if($scope.locationHref.search('baseInfo')>-1){
                    $scope.isShowPrev = false; // 隐藏上一步
                }else if($scope.locationHref.search('reportResult')>-1){
                    $scope.isShowNext = false; // 隐藏下一步按钮
                    $scope.isHideFixcontent = false; // 隐藏悬浮导航
                }
                if($scope.locationHref.search('marketApproach')==-1){
                    $scope.isShowMethod = false; // 市场法结果值浮动显示
                    $scope.isShowPrev = true;
                }
                $scope.prevStepUrl = $scope.getHref().prevHref();//'/writeReport/computedResult';
                $scope.nextStepUrl = $scope.getHref().nextHref();//'/writeReport/marketApproach';
            },
            prevStep:function(){
                $location.path($scope.prevStepUrl);
            },
            nextStep:function(){
                //$location.path($scope.nextStepUrl);
                // 市场法
                //if($scope.locationHref.indexOf('marketApproach')>-1){
                    // 保存市场法,进入计算结果页
                    this.saveReport(getMarketReqData(),'next');
                //}
            },
            /**
             * 完成报告
             */
            finishReport:function(){
                this.saveReport(getMarketReqData(),'success');
            },
            /**
             * 保存报告
             * 每次下一步的时候都需要保存报告
             */
            saveReport: function(reqData,stepStr) {
                console.log(reqData)
                if(reqData==undefined){
                    layer.msg('服务器请求失败',{shade:false,time:3000},function(){});
                    return;
                }
                // 市场法
                localStorage.setItem('PEP_GuJiaDuiXiangData',JSON.stringify($scope.GuJiaDuiXiangData));
                localStorage.setItem('PEP_KeBiShiLi1Data',JSON.stringify($scope.KeBiShiLi1Data));
                localStorage.setItem('PEP_KeBiShiLi2Data',JSON.stringify($scope.KeBiShiLi2Data));
                localStorage.setItem('PEP_KeBiShiLi3Data',JSON.stringify($scope.KeBiShiLi3Data));
                // 收益法|成本法
                localStorage.setItem('PEP_ShouYiFaData',JSON.stringify($scope.ShouYiFaData));
                localStorage.setItem('PEP_ChengBenFaData',JSON.stringify($scope.ChengBenFaData));
                // 计算结果
                localStorage.setItem('PEP_ShiChangJiaGeQueDingData',JSON.stringify($scope.ShiChangJiaGeQueDingData));
                localStorage.setItem('PEP_DiYaJiaGeQueDingData',JSON.stringify($scope.DiYaJiaGeQueDingData));
                localStorage.setItem('PEP_FangFaLiYouData',JSON.stringify($scope.FangFaLiYouData));
                // 现场勘查
                localStorage.setItem('PEP_XianChangKanChaData',JSON.stringify($scope.XianChangKanChaData));
                // 基础信息
                localStorage.setItem('PEP_JiChuXinXiData',JSON.stringify($scope.JiChuXinXiData));
                // 权益信息
                localStorage.setItem('PEP_QuanYiZhuangKuangData',JSON.stringify($scope.QuanYiZhuangKuangData));

                
                if($location.path().indexOf('marketApproach')>-1){
                    if($scope.GuJiaDuiXiangData.n0_GuJiaDuiXiang_BiJiaoFaPingGuDanJia == ''){
                        layer.msg('可比实例不满足三条数据，你不能进行其他操作',{shade:[0.2,'#000'],time:3000},function(){
                            layer.close(l);
                        });
                        return;
                    }
                }
                var _this = this;
                var l = layer.load(2);
                writeReportServices.saveReport(reqData).
                success(function(data) {
                    //console.log(data);
                    if (data.code != 10000) {
                        layer.msg('保存失败',{shade:[0.2,'#000'],time:3000},function(){
                            layer.close(l);
                        });
                        return;
                    }
                    layer.close(l);
                    // 市场法
                    localStorage.setItem('PEP_GuJiaDuiXiangData',JSON.stringify($scope.GuJiaDuiXiangData));
                    localStorage.setItem('PEP_KeBiShiLi1Data',JSON.stringify($scope.KeBiShiLi1Data));
                    localStorage.setItem('PEP_KeBiShiLi2Data',JSON.stringify($scope.KeBiShiLi2Data));
                    localStorage.setItem('PEP_KeBiShiLi3Data',JSON.stringify($scope.KeBiShiLi3Data));
                    // 收益法|成本法
                    localStorage.setItem('PEP_ShouYiFaData',JSON.stringify($scope.ShouYiFaData));
                    localStorage.setItem('PEP_ChengBenFaData',JSON.stringify($scope.ChengBenFaData));
                    // 计算结果
                    localStorage.setItem('PEP_ShiChangJiaGeQueDingData',JSON.stringify($scope.ShiChangJiaGeQueDingData));
                    localStorage.setItem('PEP_DiYaJiaGeQueDingData',JSON.stringify($scope.DiYaJiaGeQueDingData));
                    localStorage.setItem('PEP_FangFaLiYouData',JSON.stringify($scope.FangFaLiYouData));
                    // 现场勘查
                    localStorage.setItem('PEP_XianChangKanChaData',JSON.stringify($scope.XianChangKanChaData));
                    // 基础信息
                    localStorage.setItem('PEP_JiChuXinXiData',JSON.stringify($scope.JiChuXinXiData));
                    // 权益信息
                    localStorage.setItem('PEP_QuanYiZhuangKuangData',JSON.stringify($scope.QuanYiZhuangKuangData));

                    layer.msg('数据保存成功',{shade:[0.2,'#000'],time:1000},function(){});

                    // 暂定为估价师声明页为完成报告的前一页
                    if($scope.locationHref.indexOf('appraiserStatement')!=-1){
                        if(stepStr=='success'){
                            // 计算结果页中,进行生成报告
                            _this.createReport(function(){
                                $location.path('writeReport/reportResult');
                            });
                        }
                    }
                    if(stepStr=='next'){
                        $location.path($scope.nextStepUrl);
                        $scope.$apply();
                    }
                }).error(function() {
                    p.servicesError();
                });
            },
            /**
             * 生成报告(完成报告的时候再生成报告并跳转)
             */
            createReport: function(callBack) {
                var reqData = {
                    reportId: 120
                }
                writeReportServices.createReport(reqData).
                success(function(data) {
                    //console.log(data);
                    if (data.code != 10000) {
                        layer.msg('服务器请求失败');
                        return;
                    }
                    // 清空数据
                    /*localStorage.clear('PEP_GuJiaDuiXiangData');
                    localStorage.clear('PEP_KeBiShiLi1Data');
                    localStorage.clear('PEP_KeBiShiLi2Data');
                    localStorage.clear('PEP_KeBiShiLi3Data');
                    localStorage.clear('PEP_ShiChangJiaGeQueDingData');
                    localStorage.clear('PEP_DiYaJiaGeQueDingData');
                    localStorage.clear('PEP_FangFaLiYouData');*/
                    //$location.path('writeReport/reportResult');
                    callBack&&callBack();
                }).error(function() {
                    p.servicesError();
                });
            }
        }
    }());

    /**
     * 市场法、成本法、收益法、计算结果 js
     */
    var calculationMethod = (function() {
        var _this = this;
        return {
            init: function() {
                _this = this;
                _this.loadTab();
                _this.loadScope();
                _this.paramsByKeyVal('AnLiLaiYuan,ChaoXiang,HuXing,ZhuangXiuQingKuang'); // 字典信息
                _this.getFormulas();
                // 市场法坐标数组
                $scope.coordsArr = [];
                calculationMethod = null;
            },
            loadTab:function() {
                var _this = this;
                /**
                 * 市场法、成本法、收效法选项卡
                 */
                var currnetHref = $scope.getHref().currentHref();

                // 市场法
                if(currnetHref.search('/writeReport/marketApproach')!=-1){
                    $scope.isShowMethod = true;
                    _this.allFormAddEvent('calculateContent');
                }
                // 成本法
                if(currnetHref.search('/writeReport/costApproach')!=-1){
                    $scope.isShowCosting = true;
                    _this.allFormAddEvent('costingContent');
                    _this.bindTips('costingContent');
                }
                // 收益法
                if(currnetHref.search('/writeReport/incomeApproach')!=-1){
                    $scope.isShowIncome = true;
                    _this.allFormAddEvent('incomeContent');
                    _this.bindTips('incomeContent');
                }
                // 计算结果
                if(currnetHref.search('/writeReport/computedResult')!=-1){
                    _this.allFormAddEvent('computedResult');
                }
            },
            /**
             * 对成本法、收益法 绑定提示信息
             */
            bindTips:function(domId){
                var tipsIndex = null;
                var resultNumber = $('#'+domId).find('.result-number');
                var aInputs = $('#'+domId).find('input[type="text"]');
                var aSelect = $('#'+domId).find('select');
                var aLabel = $('#'+domId).find('label');
                var bindHover = function(elms){
                    elms.each(function(index,elm){
                        $(elm).hover(function(){
                            if($(elm).attr('data-type')=='showpic'){
                                tipsIndex = layer.tips($('#popEquation').html(), $(elm),{tips: [4,'#fff'],area:['190px','80px'],time:false});
                                return;
                            }
                            if(!$(elm).attr('data-text')){ return; }
                            // 枚举类型转换
                            $scope.n0_ChengBenFa_JiZhunDiJiaJiBieCh = p.numberToCh[$scope.ChengBenFaData.n0_ChengBenFa_JiZhunDiJiaJiBie];
                            $scope.n0_ChengBenFa_PianQuBianHaoRoman = p.roman[$scope.ChengBenFaData.n0_ChengBenFa_JiZhunDiJiaJiBie];

                            $timeout(function(){
                                $scope.$apply();
                                tipsIndex = layer.tips($(elm).attr('data-text'), $(elm),{tips: [4,'#fff'],time:false});
                            },10);
                        },function(){
                            tipsIndex&&layer.close(tipsIndex);
                        });
                    });

                }
                
                $('#useFactor').hover(function(){
                    if(!$(this).attr('data-type')){ return; }
                    tipsIndex = layer.tips($('#popTable').html(), $(this),{tips: [4,'#fff'],area:['452px'],time:false});
                },function(){
                    tipsIndex&&layer.close(tipsIndex);
                });

                $('#spaceFactor').hover(function(){
                    if(!$(this).attr('data-type')){ return; }
                    tipsIndex = layer.tips($('#popTable2').html(), $(this),{tips: [4,'#fff'],area:['452px'],time:false});
                },function(){
                    tipsIndex&&layer.close(tipsIndex);
                });
                // 用途修正系数或地下空间修正系数提示框
                /*aLabel.each(function(index,elm){
                    $(elm).hover(function(){
                        if(!$(elm).attr('data-type')){ return; }
                        tipsIndex = layer.tips($('#popTable').html(), $(elm),{tips: [4,'#fff'],area:['452px'],time:false});
                    },function(){
                        tipsIndex&&layer.close(tipsIndex);
                    });
                });*/

                $('body').click(function(){
                    if(tipsIndex){
                        layer.close(tipsIndex);
                    }
                });
                bindHover(resultNumber);
                bindHover(aInputs);
                bindHover(aSelect);
            },
            /**
             *  给市场法、成本法、收益法、计算结果页中的涉及到计算公式的元素绑定runRole方法
             *  domId: 对应domId
             */
            allFormAddEvent:function(domId){
                // domId: calculateContent
                var aInputText = $('#'+domId+' input[type="text"]');
                var aTextarea = $('#'+domId+' textarea');
                var aSelect = $('#'+domId+' select');
                aInputText.each(function(index,elm){
                    $(elm).on('blur',function(){
                        console.log();
                        $timeout(function(){
                            $scope.runRole(""+$(elm).attr('ng-model').split('.')[1]+"");
                        },1);
                    })
                });
                aTextarea.each(function(index,elm){
                    $(elm).on('keyup',function(){
                        $scope.runRole(""+$(this).attr('ng-model').split('.')[1]+"");
                    })
                });
                aSelect.each(function(index,elm){
                    $(elm).change(function(){
                        $timeout(function(){
                            $scope.runRole(""+$(elm).attr('ng-model').split('.')[1]+"");
                        },1);
                    });
                });
            },
            // 加载$scope方法
            loadScope: function() {
                var closeBtn;

                // 对比案例弹窗
                $scope.contrastCase = function() {
                    _this.getAutomaticList();
                };

                // 可比实例数据对换
                $scope.kbslChangeData = function(l,n){
                    // ps: 1=>2  2=>1
                    $scope.KeBiShiLiTempData={};
                    _this.kebishiliCopy("Temp",l);
                    _this.kebishiliCopy(l,n);
                    _this.kebishiliCopy(n,"Temp");
                }

                // 市场法查看实例位置方法
                $scope.getResidentialArea = function(type){
                    _this.getResidentialArea(type);
                }
                
                // 导航案例配置数据
                var casePopObj = {
                    wHeight: window.screen.height,
                    itemsPerPage: 8,
                    caseHeight: '615px',
                    resultDataH: '307px'
                }
                if(casePopObj.wHeight>=900){
                    casePopObj.itemsPerPage = 10;
                    casePopObj.caseHeight = '683px';
                    casePopObj.resultDataH = '375px';
                }
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
                $scope.paginationConf = {
                    currentPage: 1,
                    totalItems: 0,
                    itemsPerPage: 0,
                    pagesLength: 0,
                    isShowHome: false,
                    isShowLast: false,
                    //perPageOptions: [10, 20, 30, 40, 50],
                    rememberPerPage: 'test',
                    onChange: function() {}
                }

                /**
                 * 市场法=>添加案例
                 */
                $scope.importCase = function(importObjType,e) {
                    var target = e.target;
                    // 保存可比实例TID
                    var TIDArr = [$scope.KeBiShiLi1Data.n0_KeBiShiLi1_TID,$scope.KeBiShiLi2Data.n0_KeBiShiLi2_TID,$scope.KeBiShiLi3Data.n0_KeBiShiLi3_TID];
                    $scope.importObjType = importObjType;
                    var countParamsLen = []; // 统计筛选条件个数
                    layer.open({
                        area: ['1000px', casePopObj.caseHeight],
                        type: 1,
                        closeBtn: false,
                        title: false,
                        shade: [.6, '#000'],
                        content: $('#contrastPop'),
                        success: function() {
                            var count = 0;
                            var popContent = $('#contrastPop');
                            var closeBtn = popContent.find('.close-pop');
                            var aVals = popContent.find('.vals');
                            var oReqParams = $('#reqParams');
                            var aClears = oReqParams.find('.clear');
                            var clearAll = $('#clearAllParam');
                            var aInputPanel = $('.input-panel');
                            popContent.find('.result-data').css({'height':casePopObj.resultDataH});
                            /**
                             * 统计已选条件数量
                             */
                            var countParams = function(){
                                countParamsLen = [];
                                $timeout(function(){
                                    var aParams = oReqParams.find('span');
                                    aParams.each(function(i,elm){
                                        if($(elm).hasClass('on')){
                                            countParamsLen.push('1');
                                        }
                                    });
                                    if(countParamsLen.length>0){
                                        $scope.nullData = true;
                                        $scope.reqDataGrid({
                                            pageIndex: 1,
                                            pageSize: casePopObj.itemsPerPage
                                        });
                                    }else if(!countParamsLen.length){
                                        $scope.nullData = false;
                                    }
                                },50);
                            }
                            /**
                             * 请求列表数据
                             */
                            $scope.reqDataGrid = function(pageObj){
                                $scope.caseDataIsNull = false; // 是否有数据
                                var reqData = {
                                    //cityName: 'beijing',
                                    residentialAreaName: $scope.paramData.projectName.split('--')[0], // 小区名称
                                    pageIndex: pageObj.pageIndex, // 页码
                                    pageSize: pageObj.pageSize, // 每页数量，默认值50
                                    caseFrom: $scope.paramData.caseSource, // 案例来源
                                    caseType: $scope.paramData.caseType, // 案例类型
                                    minArea: $scope.paramData.gjStartArea, // 最小面积
                                    maxArea: $scope.paramData.gjEndArea, // 最大面积
                                    minTotalPrice: !$scope.paramData.gjStartPrice?'':$scope.paramData.gjStartPrice*10000, // 最小总价
                                    maxTotalPrice: !$scope.paramData.gjEndPrice?'':$scope.paramData.gjEndPrice*10000, // 最大总价
                                    unitShape: $scope.paramData.houseType, // 户型
                                    toward: $scope.paramData.orientation, // 朝向
                                    decoration: $scope.paramData.decorateTtype, // 装修类型
                                    buildingCompletedYear: $scope.paramData.year, // 建成年代
                                    beginTime: $scope.paramData.gjStartDate, //开始时间
                                    endTime: $scope.paramData.gjEndDate // 结束时间
                                }
                                _this.getAutomaticPageList(reqData,function(data){
                                    if(!data.ResultData){
                                        // 暂无数据
                                        $scope.caseDataIsNull = true;
                                    }
                                    $scope.caseTableListData = data.ResultData;
                                    $scope.dataPaging = data.Paging;
                                    $timeout(function(){
                                        // 请求案例分页数据
                                        var caseTableList = document.getElementById('caseTableList');
                                        var aTrs = caseTableList.children;
                                        for (var i = 0; i < aTrs.length; i++) {
                                            aTrs[i].onclick = function(){
                                                if(this.className.indexOf('on')!=-1){
                                                    return;
                                                }
                                                for (var i = 0; i < aTrs.length; i++) {
                                                    p.removeClass(aTrs[i],'active');
                                                }
                                                p.addClass(this,'active');
                                            }
                                            for (var j = 0; j < TIDArr.length; j++) {
                                                if(aTrs[i].children[0].getAttribute('data-id')==TIDArr[j]){
                                                    p.addClass(aTrs[i],'on');
                                                }
                                            }
                                        }
                                        /**
                                         * 调用分页功能
                                         * $scope: 作用域
                                         * paginationConf: 分页请求数据配置
                                         * casePopObj.itemsPerPage: 每页的数量
                                         * [10]: 每页加载的数量
                                         * $scope.dataPaging: 接收后台返回的分页数据
                                         * callBack: 执行下次数据请求,获得最新分页数据
                                         */
                                        p.resetPageList($scope,'paginationConf',casePopObj.itemsPerPage,[10],$scope.dataPaging,function(obj){
                                            // 自定义请求回调
                                            if(typeof $scope.reqDataGrid=='function'){
                                                $scope.reqDataGrid({
                                                    pageIndex: obj.currentPage,
                                                    pageSize: obj.itemsPerPage
                                                });
                                            }
                                        });

                                    },50);
                                });
                            }

                            /**
                             * 导入案例=>更新数据
                             */
                            var importCaseData = function(i,data,$scope){
                                var tempGuJiaDuiXiangData = $scope.GuJiaDuiXiangData;
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_XiangMuMingChen = data.ResidentialAreaName");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_ZongJia = parseInt((data.TotalPrice/10000).toFixed(0))");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_DanJia = data.UnitPrice");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_JiaoYiRiQi = data.CaseTime.substring(0,10)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_ShiChangZhuangKuang = _this.transform('','n0_GuJiaDuiXiang_ShiChangZhuangKuang',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_JiaoYiZhuangKuang = _this.transform('','n0_GuJiaDuiXiang_JiaoYiZhuangKuang',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_ChaoXiang = data.Toward");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_JiaoTongZhuangKuang = _this.transform('','n0_GuJiaDuiXiang_JiaoTongZhuangKuang',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_HuanJingZhuangKuang = _this.transform('','n0_GuJiaDuiXiang_HuanJingZhuangKuang',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_JiChuSheShiPeiTao = _this.transform('','n0_GuJiaDuiXiang_JiChuSheShiPeiTao',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_GongGongFuWuSheShi = _this.transform('','n0_GuJiaDuiXiang_GongGongFuWuSheShi',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_JianZhuMianJi = data.BuildingArea");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_CheWei = _this.transform('','n0_GuJiaDuiXiang_CheWei',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_WuYeGuanLi = _this.transform('','n0_GuJiaDuiXiang_WuYeGuanLi',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_XiaoQuHuanJing = _this.transform('','n0_GuJiaDuiXiang_XiaoQuHuanJing',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_JianZhuLeiBie = _this.transform(data.BuildingCategory,'n0_GuJiaDuiXiang_JianZhuLeiBie',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_JianZhuJieGou = _this.transform('','n0_GuJiaDuiXiang_JianZhuJieGou',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_JianChengNianDai = data.BuildingCompletedYear");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_SheShiSheBei = _this.transform('','n0_GuJiaDuiXiang_SheShiSheBei',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_HuXing = data.UnitShape==undefined?'其他':data.UnitShape");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_SuoZaiCengZongLouCeng = data.FloorCount+'/'+data.Floors");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_ZhuangXiuZhuangKuang = data.Decoration==undefined?'其他':data.Decoration");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_QiTaYinSu = _this.transform('','n0_GuJiaDuiXiang_QiTaYinSu',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_QuanYiZhuangKuang = _this.transform('','n0_GuJiaDuiXiang_QuanYiZhuangKuang',tempGuJiaDuiXiangData)");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_XiuZhengXiShu = 1");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_BiZhunJiaZhi = data.UnitPrice");
                                eval("$scope.KeBiShiLi"+ (i) +"Data.n0_KeBiShiLi"+ (i) +"_TID = data.TID");
                                layer.closeAll();
                                //target.parentNode.style = '';
                                $scope.runRole('n0_KeBiShiLi'+i+'_DanJia');
                            }

                            /**
                             * 导航对比案例
                             */
                            $scope.importCaseDataFn = function(){
                                var caseTableList = document.getElementById('caseTableList');
                                var aTrs = caseTableList.children;
                                for (var i = 0; i < aTrs.length; i++) {
                                    if(p.hasClass(aTrs[i],'active')){
                                        // 根据点击对应可比实例对象导入新的数据
                                        var data = eval('('+aTrs[i].children[0].getAttribute('data-data')+')');
                                        //console.log(data);
                                        switch($scope.importObjType){
                                            case 'KeBiShiLi1Data':
                                                importCaseData('1',data,$scope);
                                            break;
                                            case 'KeBiShiLi2Data':
                                                importCaseData('2',data,$scope);
                                            break;
                                            case 'KeBiShiLi3Data':
                                                importCaseData('3',data,$scope);
                                            break;
                                        }
                                        break;
                                    }else{
                                        layer.msg('请先选择导入案例名称');
                                    }
                                }
                            }

                            !(function(){
                                // 导入案例匹配查询条件
                                var reqData = {
                                    cityName: 'beijing',
                                    residentialareaName: '五栋大楼',
                                    radius: 1,
                                    number: 20
                                }
                                // 项目名称
                                _this.getProjectName(reqData,function(data){
                                    $scope.ImportCaseData.n0_ImportCase_projectNameS = data;
                                    $scope.ImportCaseData.n0_ImportCase_projectName = data[0];
                                    $scope.paramData.projectName = data[0];
                                    countParams();
                                });
                                
                                var defaultDate = function(){
                                    return $scope.paramData = {
                                        projectName: $scope.ImportCaseData.n0_ImportCase_projectName, // 项目名称
                                        caseType: '二手房成交案例', // 案例类型
                                        caseSource: '', // 案例来源
                                        houseType: '', // 户型
                                        orientation: '',// 朝向
                                        totalPrice: '', // 总价
                                        decorateTtype: '', // 装修类型
                                        gujiaDate: '', // 估价时间
                                        area: '', // 面积
                                        totalPrice: '', // 总价
                                        year: '', // 年代
                                        gjStartDate: '', // 开始时间
                                        gjEndDate: '', // 结束时间
                                        gjStartArea: '', // 开始面积
                                        gjEndArea: '', // 结束面积
                                        gjStartPrice: '', // 开始价格
                                        gjEndPrice: '', // 结束价格
                                        gjStartYear: '' // 建成年代
                                    }
                                }
                                var logData = function(data){
                                    // 历史记录数据
                                    /*return $scope.paramData = {
                                        projectName: data.projectName, // 项目名称
                                        caseType: data.caseType, // 案例类型
                                        caseSource: data.caseSource, // 案例来源
                                        houseType: data.houseType, // 户型
                                        orientation: data.orientation,// 朝向
                                        totalPrice: data.totalPrice, // 总价
                                        decorateTtype: data.decorateTtype, // 装修类型
                                        gujiaDate: data.gujiaDate, // 估价时间
                                        area: data.area, // 面积
                                        totalPrice: data.totalPrice, // 总价
                                        year: data.year, // 年代
                                        gjStartDate: data.gjStartDate, // 开始时间
                                        gjEndDate: data.gjEndDate, // 结束时间
                                        gjStartArea: data.gjStartArea, // 开始面积
                                        gjEndArea: data.gjEndArea, // 结束面积
                                        gjStartPrice: data.gjStartPrice, // 开始价格
                                        gjEndPrice: data.gjEndPrice, // 结束价格
                                        gjStartYear: data.gjStartYear // 建成年代
                                    }*/
                                    // 模拟历史数据
                                    return $scope.paramData = {
                                        projectName: $scope.ImportCaseData.n0_ImportCase_projectName, // 项目名称
                                        caseType: '二手房成交案例', // 案例类型
                                        caseSource: '', // 案例来源
                                        houseType: '', // 户型
                                        orientation: '西南',// 朝向
                                        totalPrice: '', // 总价
                                        decorateTtype: '精装修', // 装修类型
                                        gujiaDate: '', // 估价时间
                                        area: '', // 面积
                                        totalPrice: '', // 总价
                                        year: '', // 年代
                                        gjStartDate: '', // 开始时间
                                        gjEndDate: '', // 结束时间
                                        gjStartArea: '', // 开始面积
                                        gjEndArea: '', // 结束面积
                                        gjStartPrice: '', // 开始价格
                                        gjEndPrice: '', // 结束价格
                                        gjStartYear: '' // 建成年代
                                    }
                                }
                                // 是否有历史记录查询
                                false?logData():defaultDate();
                                // 清空按钮是否可用
                                $scope.nullData = true;
                                
                            })();

                            /**
                             * 估价时间
                             */
                            !(function(){
                                var start = {
                                    elem: '#gjStartDate',
                                    format: 'YYYY-MM-DD',
                                    min: false, //laydate.now(), //设定最小日期为当前日期
                                    max: '2099-06-16 23:59:59', //最大日期
                                    istime: false,
                                    istoday: false,
                                    choose: function(datas) {
                                        $scope.paramData.gjStartDate = datas;
                                        end.min = datas; //开始日选好后，重置结束日的最小日期
                                        end.start = datas //将结束日的初始值设定为开始日
                                        $scope.$apply();
                                    }
                                };
                                var end = {
                                    elem: '#gjEndDate',
                                    format: 'YYYY-MM-DD',
                                    min: false, //laydate.now(),
                                    max: '2099-06-16 23:59:59',
                                    istime: false,
                                    istoday: false,
                                    choose: function(datas) {
                                        $scope.paramData.gjEndDate = datas;
                                        $scope.$apply();
                                        //start.max = datas; //结束日选好后，重置开始日的最大日期
                                    }
                                }
                                $('#gjStartDate').click(function(){
                                    laydate(start);
                                });
                                $('#gjEndDate').click(function(){
                                    laydate(end);
                                });
                            })();

                            /**
                             * 添加文本框筛选条件
                             * type: [gjDate,gjArea,gjTotalPrice,gjYear]
                             */
                            var addparamsFn = function(result,start,end){
                                if(arguments.length==2){
                                    $scope.paramData[result] = $scope.paramData[start]==''?'':$scope.paramData[start];
                                }else if(arguments.length==3){
                                    if($scope.paramData[start]!='' && $scope.paramData[end]!=''){
                                        $scope.paramData[result] = $scope.paramData[start]+'-'+$scope.paramData[end];
                                    }else if($scope.paramData[start]!='' && $scope.paramData[end]==''){
                                        $scope.paramData[result] = $scope.paramData[start];
                                    }else if($scope.paramData[start]=='' && $scope.paramData[end]!=''){
                                        $scope.paramData[result] = $scope.paramData[end];
                                    }else if($scope.paramData[start]=='' && $scope.paramData[end]==''){
                                        $scope.paramData[result] = '';
                                    }
                                }
                                countParams();
                                $timeout(function(){ $scope.$apply(); },10);
                            }
                            /**
                             * 下拉框绑定change事件
                             */
                            $scope.bindReqParams = function(scopeVal){
                                var key = scopeVal.split('_')[2];
                                eval("$scope.paramData."+key+'=$scope.'+scopeVal);
                                //countParamsLen.push(key)
                                $scope.nullData = true;
                                countParams();
                                $timeout(function(){
                                    $scope.$apply();
                                },10);
                            }
                            /**
                             * 搜索按钮点击添加筛选条件
                             */
                            $scope.addParams = function(type){
                                switch(type){
                                    case 'gjDate':
                                        addparamsFn('gujiaDate','gjStartDate','gjEndDate');
                                    break;
                                    case 'gjArea':
                                        addparamsFn('area','gjStartArea','gjEndArea');
                                    break;
                                    case 'gjTotalPrice':
                                        addparamsFn('totalPrice','gjStartPrice','gjEndPrice');
                                    break;
                                    case 'gjStartYear':
                                        addparamsFn('year','gjStartYear');
                                    break;
                                }
                            }

                            /**
                             * 默认清空active状态
                             */
                            !(function(){
                                aVals.each(function(i,elm){
                                    $(elm).find('.param-item').each(function(i,elm){
                                        $(elm).removeClass('active');
                                    });
                                });
                            })();


                            /**
                             * 根据历史记录标记状态色
                             */
                            ~(function(){
                                var aParams = oReqParams.find('span');
                                var val = '';
                                aParams.each(function(i,elm){
                                    val = eval('$scope.'+$(elm).attr('ng-show'));
                                    if(val!=''){
                                        var attr = $(elm).attr('ng-show').split('.')[1];
                                        aVals.each(function(i,elm){
                                            $(elm).find('.param-item').each(function(i,elm){
                                                if($(elm).attr('data-type')==attr && val==$(elm).text()){
                                                    $(this).addClass('active').siblings('.param-item').removeClass('active');
                                                }
                                            });
                                        });
                                    }
                                });
                            })();

                            /**
                             * 根据文本框中的内容进行搜索
                             */
                            !(function(){
                                var oScreeningInput = $('#screeningInputs');
                                var aInputs = oScreeningInput.find('input');
                                aInputs.each(function(index,elm){
                                    $(elm).focus(function(){
                                        aInputs.siblings('.btn').hide();
                                        $(this).siblings('.btn').show();
                                    });
                                    $(elm).siblings('.btn').unbind().bind('click',function(){
                                        /**
                                         * 范围限制
                                         */
                                        var aInput = $(this).parent().find('.input');
                                        var startVal = parseInt(eval('$scope.'+$(aInput).eq(0).attr('ng-model')));
                                        var endVal = parseInt(eval('$scope.'+$(aInput).eq(1).attr('ng-model')));
                                        if (startVal > endVal) {
                                            layer.msg('输入范围有误');
                                            return;
                                        }
                                        // 搜索
                                        $scope.addParams($(this).attr('data-type'));
                                        $(this).hide();
                                    })
                                });
                            })();

                            /**
                             * 添加查询条件
                             */
                            aVals.each(function(index,elm){
                                $(elm).find('.param-item').click(function(){
                                    eval("$scope.paramData."+$(this).attr('data-type')+'=$(this).html()');
                                    $(this).addClass('active').siblings('.param-item').removeClass('active');
                                    countParams();
                                    $scope.$apply();
                                });
                            });

                            // 清除某一个查询条件值
                            aClears.each(function(index,elm){
                                $(elm).click(function(){
                                    eval("$scope."+$(this).parent('.param-item').attr('ng-show')+'=""');
                                    var dataType = $(this).parent('.param-item').attr('ng-show').substring($(this).parent('.param-item').attr('ng-show').indexOf('.')+1,$(this).parent('.param-item').attr('ng-show').length);
                                    var aParamItem = $('a[data-type="'+dataType+'"]');
                                    aParamItem.each(function(index,elm){
                                        if($(elm).hasClass('active')){
                                            $(elm).removeClass('active');
                                        }
                                    });
                                    // 根据获取父元素的属性来验证是否要清空文本框中的默认数据
                                    var ngShowType = $(this).parent().attr('ng-show').split('.')[1];
                                    aInputPanel.each(function(i,_elm){
                                        if($(_elm).attr('data-type')==ngShowType){
                                            $(_elm).find('input').each(function(j,iElm){
                                                eval("$scope."+$(iElm).attr('ng-model')+" = ''");
                                            });
                                        }
                                    });
                                    countParams();
                                    $scope.$apply();
                                });
                            });

                            // 清空所有查询条件
                            clearAll.click(function(){
                                if($(this).hasClass('null')){
                                    return;
                                }
                                $scope.paramData = {
                                    projectName: $scope.paramData.projectName, // 项目名称
                                    caseType: '二手房成交案例', // 案例类型
                                    caseSource: '', // 案例来源
                                    houseType: '', // 户型
                                    orientation: '',// 朝向
                                    totalPrice: '', // 总价
                                    decorateTtype: '', // 装修类型
                                    gujiaDate: '', // 估价时间
                                    area: '', // 面积
                                    totalPrice: '', // 总价
                                    year: '', // 年代
                                    gjStartDate: '', // 开始时间
                                    gjEndDate: '', // 结束时间
                                    gjStartArea: '', // 开始面积
                                    gjEndArea: '', // 结束面积
                                    gjStartPrice: '', // 开始价格
                                    gjEndPrice: '', // 结束价格
                                    gjStartYear: '' // 建成年代
                                }
                                countParamsLen.length = 0; // 清空数据
                                $scope.nullData = false;
                                // 请求默认数据
                                $scope.reqDataGrid({
                                    pageIndex: 1,
                                    pageSize: casePopObj.itemsPerPage
                                });
                                aVals.each(function(index,elm){
                                    if($(elm).find('.param-item').hasClass('active') && $(elm).find('.param-item').attr('class').indexOf('default')<0){
                                        $(elm).find('.param-item').removeClass('active');
                                    }
                                });
                                $scope.$apply();
                            });

                            p.closePop(closeBtn);
                        },
                        end: function() {
                            // 关闭后要做的事情
                        }
                    });
                }
            },
            /**
             * 获取估价对象坐标数据
             */
            getGjdxArea:function(xqname,callBack){
                for(var i=0;i<$scope.coordsArr.length;i++){
                    if(xqname==$scope.coordsArr[i].name){
                        callBack&&callBack($scope.coordsArr[i]);
                        return; 
                    }
                }
                var reqData = {
                    cityName: 'beijing',
                    residentialareaName: xqname
                }
                writeReportServices.getResidentialArea(reqData).
                success(function(data){
                    if(data.code!=10000){
                        //layer.msg('服务器请求失败',{shade:[0.2,'#000'],time:3000},function(){});
                        console.log('服务器请求失败');
                        callBack&&callBack(null);
                        return;
                    }
                    var resultData = data.data;
                    if(resultData==null){
                        //layer.msg('服务器请求失败',{shade:[0.2,'#000'],time:3000},function(){});
                        console.log('服务器请求失败');
                        callBack&&callBack(null);
                        return;
                    }
                    for (var i = 0; i < resultData.length; i++) {
                        if(resultData[i].MapType=='百度地图'){
                            resultData[i].name = xqname;
                            $scope.coordsArr.push(resultData[i]);
                            callBack&&callBack(resultData[i]);
                            break;
                        }
                    }
                }).error(function(){
                    p.servicesError();
                });
            },
            /**
             * 查看实例位置
             * type: [KeBiShiLi1,KeBiShiLi2,KeBiShiLi3]
             */
            getResidentialArea:function(type){
                var gjdxObj = $scope.GuJiaDuiXiangData.n0_GuJiaDuiXiang_XiangMuMingChen;
                var typeName = eval('$scope.'+type+'Data.n0_'+type+'_XiangMuMingChen');
                if(typeName==''){
                    layer.msg('请先选择项目名称',{shade:[0.2,'#000'],time:3000},function(){});
                    return;
                }
                var obj1 = null,obj2 = null,objArr = [];
                _this.getGjdxArea(gjdxObj,function(data){
                    obj1 = data;
                    _this.getGjdxArea(typeName,function(data){
                        obj2 = data;
                        if(obj1==null&&obj2==null){
                            layer.msg('小区坐标获取失败',{shade:[0.2,'#000'],time:3000},function(){});
                            return;
                        }
                        layer.open({
                            area: ['801px', '440px'],
                            type: 2,
                            closeBtn: true,
                            title: false,
                            shade: [.6, '#000'],
                            content: '../../views/writeReport/caseMap.html',
                            success: function(layero, index){
                                var body = layer.getChildFrame('body', index);
                                var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                                //console.log(body.html()) //得到iframe页的body内容

                                body.find('#obj1').val(obj1.XLongitude+','+obj1.YLatitude+','+gjdxObj);
                                body.find('#obj2').val(obj2.XLongitude+','+obj2.YLatitude+','+typeName);
                                //body.find('input').val('Hi，我是从父页来的')
                            }
                        });
                    });
                });
            },
            /**
             * 获取周边小区(添加案例=>项目名称)
             */
            getProjectName:function(reqData,callBack){
                writeReportServices.getProjectName(reqData).
                success(function(data){
                    var aProjectNames = new Array();
                    if(data.code!=10000){
                        //yer.msg('服务器请求失败',{shade:[0.2,'#000'],time:3000},function(){});
                        console.log('服务器请求失败');
                        return;
                    }
                    var resultData = data.data;
                    for (var i = 0; i < resultData.length; i++) {
                        aProjectNames.push(resultData[i].ResidentialAreaName+'--'+resultData[i].distance+'米');
                    }
                    aProjectNames.unshift(reqData.residentialareaName+'--0米');
                    callBack&&callBack(aProjectNames);
                }).error(function(){
                    p.servicesError();
                });
            },
            /**
             * 获取自动案例弹窗列表信息
             */
            getAutomaticPageList:function(reqData,callBack){
                var l = layer.load(2,{shade:false});
                writeReportServices.getAutomaticPageList(reqData).
                success(function(data){
                    //console.log(data)
                    if(data.code!=10000){
                        layer.close(l);
                        layer.msg('服务器请求失败',{shade:[0.2,'#000'],time:3000},function(){});
                        console.log('服务器请求失败');
                        return;
                    }
                    layer.close(l);
                    callBack&&callBack(data.data);
                }).error(function(){
                    p.servicesError();
                });
            },
            /**
             * 赋值字典信息
             */
            paramsByKeyVal: function(sReqStr) {
                var reqData = {
                    sReqStr: sReqStr
                }
                writeReportServices.getParamsByKeyVal(reqData)
                .success(function(data) {
                    if(data.code!=10000){
                        //layer.msg('服务器请求失败',{shade:[0.2,'#000'],time:3000},function(){});
                        console.log('服务器请求失败');
                        return;
                    }
                    var resultData = data.data;
                    // AnLiLaiYuan,ChaoXiang,HuXing,ZhuangXiuQingKuang
                    for (var i = 0; i < resultData.length; i++) {
                        if (resultData[i]['name'].indexOf('AnLiLaiYuan') != -1) {
                            $scope.ImportCaseData.n0_ImportCase_AnLiLaiYuanS = resultData[i].data;
                        }else if (resultData[i]['name'].indexOf('ChaoXiang') != -1) {
                            $scope.ImportCaseData.n0_ImportCase_ChaoXiangS = resultData[i].data;
                        }else if (resultData[i]['name'].indexOf('HuXing') != -1) {
                            $scope.ImportCaseData.n0_ImportCase_HuXingS = resultData[i].data;
                        }else if (resultData[i]['name'].indexOf('ZhuangXiuQingKuang') != -1) {
                            $scope.ImportCaseData.n0_ImportCase_ZhuangXiuQingKuangS = resultData[i].data;
                        }
                    }
                }).error(function() {
                    p.servicesError();
                });
            },
            /**
             * 通过模板ID获取数据模板公式
             */
            getFormulas: function() {
                /**
                 * 获取公式
                 */
                var reqData = {
                    reportId: 120
                }
                writeReportServices.getFormulas(reqData).
                success(function(data) {
                    if(data.code!=10000){
                        //yer.msg('服务器请求失败',{shade:[0.2,'#000'],time:3000},function(){});
                        console.log('服务器请求失败');
                        return;
                    }

                    $scope.formulasArr = data.data;
                    // 获取字典唯一标识
                    var tempArr = data.data;
                    var aTempFields = [];
                    var rTempArr = [];
                    for(var i=0;i<tempArr.length;i++){
                        aTempFields = tempArr[i].fields;
                        for (var j = 0; j < aTempFields.length; j++) {
                            // 取唯一标识
                            if(aTempFields[j].dataDictionary!='' && aTempFields[j].dataDictionary!=undefined){
                                rTempArr.push(aTempFields[j]);
                            }
                        };
                    }
                    // 获取字典信息
                    loadServices(rTempArr);

                    // 
                    var Afields = [];
                    for (var i = 0; i < data.data.length; i++) {
                        Afields = Afields.concat(data.data[i].fields);
                    }
                    var aInputs = document.querySelectorAll('input');
                    for(var i=0;i<aInputs.length;i++){
                        aInputs[i].onfocus = function(){
                            $scope.inputTempVal = eval('$scope.'+this.getAttribute('ng-model'));
                        }
                    }
                    /**
                     * 运行公式
                     */
                    $rootScope.runRole = function(name) {
                        /**
                         * 涉及到百分比做特殊处理
                         */
                        var tempVal = eval("$scope."+name.split('_')[1]+'Data.'+name);
                        var t = new Date();
                        var s = t.getTime();
                        var param = name;
                        //console.log(Afields.length)
                        for (var i = 0; i < Afields.length; i++) {
                            try {
                                var temp  = eval("$scope."+(Afields[i].param.split("_")[1])+"Data."+Afields[i].param);
                                Afields[i].value = temp==undefined?'':temp;
                            }catch(e){}
                        }

                        for (var i = 0; i < Afields.length; i++) {
                            if(Afields[i].param==name){
                                //console.log(Afields[i].type)
                                switch(Afields[i].type){
                                    case 'varchar':
                                        if(tempVal.length>Afields[i].length){
                                            layer.tips('您输入的字符超长', $('input[ng-model="'+name.split('_')[1]+'Data.'+name+'"]')[0],{tips: 1});
                                            eval("$scope."+name.split('_')[1]+'Data.'+name+'='+tempVal.substring(0,tempVal.length-1));
                                        }
                                    break;
                                    case 'int':
                                        if(tempVal==''){
                                            eval("$scope."+name.split("_")[1]+"Data."+name+"=0");
                                        }else if(!/^[0-9]*$/.test(tempVal)){
                                            layer.tips('您只能输入整数', $('input[ng-model="'+name.split('_')[1]+'Data.'+name+'"]')[0],{tips: 1});
                                            eval("$scope."+name.split("_")[1]+"Data."+name+"="+$scope.inputTempVal);
                                        }
                                    break;
                                    case 'double':
                                        if(tempVal==''){
                                            eval("$scope."+name.split("_")[1]+"Data."+name+"=0");
                                        }else if(!eval("/^\\d{1,"+(Afields[i].length.split(',')[0]-Afields[i].length.split(',')[1])+"}(\\.\\d{0,"+Afields[i].length.split(',')[1]+"})?$/.test('"+tempVal+"')")){
                                            layer.tips('你输入的不是数字类型或字符超长', $('input[ng-model="'+name.split('_')[1]+'Data.'+name+'"]')[0],{tips: 1});
                                            eval("$scope."+name.split("_")[1]+"Data."+name+"="+$scope.inputTempVal) ;
                                        }
                                    break;
                                    case 'dataTime':
                                        
                                    break;
                                }
                            }
                        }
                        startRecursiveRun(param);
                    }

                    function recursiveRun(param,recursiveData,returnArr) {
                        //console.log(recursiveData);
                        if(returnArr==null){
                            returnArr = [];
                        }
                        //return false;
                        for (var i = 0; i < recursiveData.length; i++) {
                            //寻找公式中试用该字段的字段
                            if (recursiveData[i].expression != null && recursiveData[i].expression.indexOf("$"+param+"$") > -1) {
                                var flag = true;
                                for(var j=0;j<returnArr.length;j++){
                                    if(returnArr[j].param == recursiveData[i].param){
                                        flag = false;
                                        break;
                                    }
                                }
                                if(flag){
                                    returnArr.push(recursiveData[i]);
                                    recursiveRun(recursiveData[i].param,recursiveData,returnArr);
                                }
                            }
                        }
                        return returnArr;
                    }

                    function arrSort(dataArr,returnArr){
                        if(returnArr==null){
                            returnArr = [];
                        }
                        var flag = true;var flagFind = true;
                        for(var i = dataArr.length-1; i >=0 ; i--){
                            flag = true;
                            for(var j = dataArr.length-1; j >= 0; j--){
                                if(dataArr[i].expression.indexOf("$"+dataArr[j].param+"$")>-1){
                                    flag = false;
                                    break;
                                }
                            }
                            if(flag){
                                flagFind = false;
                                returnArr.push(dataArr[i]);
                                dataArr.splice(i,1);
                            }
                        }

                        //存在循环时，试着断开一个口子，如果可以继续了就是拆出了循环一部分，这一部分即为顺序一部分
                        if(flagFind){
                            var dataArrTemp = null;var dataArrTempFlag  = false;
                            for(var n=0;n<dataArr.length;n++){
                                dataArr[n].isCle = true;
                            }
                            for(var n=0;n<dataArr.length;n++){
                                dataArrTemp = jQuery.parseJSON(JSON.stringify(dataArr)).splice(n,1);
                                for(var i = dataArrTemp.length-1; i >=0 ; i--){
                                       flag = true;
                                       for(var j = dataArrTemp.length-1; j >= 0; j--){
                                           if(dataArrTemp[i].expression.indexOf("$"+dataArrTemp[j].param+"$")>-1){
                                               flag = false;
                                               break;
                                           }
                                       }
                                       if(flag){
                                           
                                           dataArrTempFlag = true;
                                           break;
                                       }
                                   }
                                if(dataArrTempFlag){
                                    returnArr.push(dataArr[n]);
                                    dataArr.splice(n,1);
                                    break;
                                }
                            }
                        }

                        if(dataArr==null||dataArr.length==0){
                            return returnArr;
                        }else{
                            return arrSort(dataArr,returnArr);    
                        }
                    }

                    // aafds testAdd(11+(1+1)+(1+1)+11111) fds()afdsa testAdd(11+(1+1)+(1+1)+11111)
                    // 运行自定义方法
                    function calculateFunResult(expression){
                        var funArr = toolFuns.arr; // 来源于toolFuns.js
                        var expressionLen = expression;
                        for(var j=0;j<funArr.length;j++){
                            var funName = funArr[j]+'(';
                            if (expressionLen.indexOf(funName) > -1) {
                                j--;//当不包含函数时才退出循环
                                var funStartLen = "";
                                funStartLen = expressionLen.substring(expressionLen.indexOf(funName), expressionLen.length);
                                var arr = funStartLen.split("");
                                var a = 0;
                                var funResult = "";
                                var flag = false;
                                for (var i = 0; i < arr.length; i++) {
                                    if(arr[i]=="("){
                                        flag = true;
                                        a++;
                                    }else if(arr[i]==")"){
                                        a--;
                                    }
                                    if(flag){if(a<=0){
                                        funStartLen = funStartLen.substring(0,i+1);
                                        //console.log(funStartLen);
                                        var valueTemp = funStartLen;
                                        try{
                                            //console.log(funName);

                                            var resultVal = funStartLen.replace(funName,'');
                                            resultVal = resultVal.substring(0,resultVal.length-1);
                                            //运行前查看是否包含自定义公式需要运行
                                            //console.log(resultVal)
                                            valueTemp = (new CalcEval).eval(calculateFunResult(resultVal));
                                            if(typeof valueTemp=='string'){
                                                resultVal = '"' + resultVal + '"';
                                            }
                                            funStartLen.replace(valueTemp,"("+resultVal+")");
                                        }catch(e){

                                        }
                                        funResult = eval(funStartLen);
                                        //console.log(funResult);
                                        break;
                                    }}
                                }
                                if(flag){
                                    expressionLen = expressionLen.replace(funStartLen, funResult);
                                }
                            }
                        }
                        return expressionLen;
                    }

                    function startRecursiveRun(param){
                        //var d = new Date();
                        var recursiveData = jQuery.parseJSON(JSON.stringify(Afields));
                        var resultData = jQuery.parseJSON(JSON.stringify(recursiveRun(param,recursiveData,null)));
                        var str = "";
                        resultData = arrSort(resultData,null);
                        //resultData.reverse();
                        //console.log(resultData);
                        for(var i=0;i<resultData.length;i++){
                            //console.log('运算公式：'+resultData[i].expression);
                            //将公式替换成值
                            var arrTemp = resultData[i].expression.split("$");
                            //var expressionTemp = recursiveData[i].expression;
                            for (var j = 0; j < arrTemp.length; j++) {
                                if (j % 2 == 1) { //寻找第1，3，5，7。。。
                                    for (var m = 0; m < recursiveData.length; m++) {
                                        if(recursiveData[m].value!=undefined){
                                            if(arrTemp[j]==recursiveData[m].param){
                                                if(recursiveData[m].type=='varchar'){
                                                    //expressionTemp = expressionTemp.replace("$" + recursiveData[m].param + "$", '"'+recursiveData[m].value+'"');
                                                    resultData[i].expression = resultData[i].expression.replace("$" + recursiveData[m].param + "$", '"'+recursiveData[m].value+'"');
                                                }else{
                                                    //expressionTemp = expressionTemp.replace("$" + recursiveData[m].param + "$", recursiveData[m].value);
                                                    resultData[i].expression = resultData[i].expression.replace("$" + recursiveData[m].param + "$", "("+recursiveData[m].value+")");
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            try {
                                eval(resultData[i].expression);
                                resultData[i].expression = calculateFunResult(resultData[i].expression);
                                var valueTemp = (new CalcEval).eval(resultData[i].expression);
                                if (isNaN(valueTemp) || valueTemp == Infinity) {
                                    valueTemp = 0;
                                }
                                /*console.log("======================================");
                                console.log('运算字段：'+resultData[i].param);
                                console.log('运算公式：'+resultData[i].expressionCN);
                                console.log('计算公式：'+resultData[i].expression);
                                console.log('计算结果：'+valueTemp);*/
                                if(resultData[i].type=='double' || resultData[i].type=='int'){
                                    resultData[i].value = valueTemp.toFixed(parseInt(resultData[i].length.indexOf(',')<0?0:resultData[i].length.split(',')[1]));
                                }else{
                                    resultData[i].value = valueTemp;
                                }
                                for (var m = 0; m < recursiveData.length; m++) {
                                    if(resultData[i].param == recursiveData[m].param){
                                        recursiveData[m].value= resultData[i].value; 
                                        break;
                                    }
                                }
                                eval("$scope."+resultData[i].param.split('_')[1]+"Data."+resultData[i].param+" = "+resultData[i].value);
                                eval("$scope."+resultData[i].param+" = "+resultData[i].value);

                                //$scope.incomeResult = $scope.ShouYiFaData.n0_ShouYiFa_FangDiChanJiaZhiCeSuanJieGuo; // 收益法计算结果值

                                $timeout(function(){
                                    $scope.$apply();
                                },10);
                            } catch (e) {
                                //console.log(e)
                            }
                        }
                    }

                    $scope.runRole('n0_GuJiaDuiXiang_JianZhuMianJi');
                    $scope.runRole('n0_GuJiaDuiXiang_XiangMuMingChen');
                    $scope.runRole('n0_GuJiaDuiXiang_JiaoYiRiQi');
                    $scope.runRole('n0_GuJiaDuiXiang_ChaoXiang');
                    $scope.runRole('n0_GuJiaDuiXiang_JiaoTongZhuangKuang');
                    $scope.runRole('n0_GuJiaDuiXiang_HuanJingZhuangKuang');
                    $scope.runRole('n0_GuJiaDuiXiang_JiChuSheShiPeiTao');
                    $scope.runRole('n0_GuJiaDuiXiang_GongGongFuWuSheShi');
                    $scope.runRole('n0_GuJiaDuiXiang_JianZhuMianJi');
                    $scope.runRole('n0_GuJiaDuiXiang_CheWei');
                    $scope.runRole('n0_GuJiaDuiXiang_WuYeGuanLi');
                    $scope.runRole('n0_GuJiaDuiXiang_XiaoQuHuanJing');
                    $scope.runRole('n0_GuJiaDuiXiang_JianZhuLeiBie');
                    $scope.runRole('n0_GuJiaDuiXiang_JianZhuJieGou');
                    $scope.runRole('n0_GuJiaDuiXiang_JianChengNianDai');
                    $scope.runRole('n0_GuJiaDuiXiang_SheShiSheBei');
                    $scope.runRole('n0_GuJiaDuiXiang_HuXing');
                    $scope.runRole('n0_GuJiaDuiXiang_SuoZaiCengZongLouCeng');
                    $scope.runRole('n0_GuJiaDuiXiang_ZhuangXiuZhuangKuang');
                    $scope.runRole('n0_GuJiaDuiXiang_QiTaYinSu');
                    $scope.runRole('n0_GuJiaDuiXiang_QuanYiZhuangKuang');
                    $scope.runRole('n0_ShiChangJiaGeQueDing_QuanZhong1');

                    $scope.runRole('n0_ShouYiFa_YueZuJin');
                    $scope.runRole('n0_ChengBenFa_TuDiShiYongQuanLouMianShuDiJia');

                }).error(function() {
                    p.servicesError();
                });
            },
            /**
             * 对返回的数据为空的状态进行转换,取估价对象中的数据
             * this.transform(kbsl1Data.CaseTime,'n0_KeBiShiLi1_','ShiChangZhuangKuang',tempGuJiaDuiXiangData);
             */
            transform: function(str, objName, tempData) {
                if (!str) {
                    str = tempData[objName];
                }
                return str;
            },
            /**
             * 获取对比案例  =''表示没有返回字段数据,需要取估价对象中的数据
             */
            getAutomaticList: function() {
                var l = layer.load(2);
                writeReportServices.getAutomaticList($scope.GuJiaDuiXiangData)
                    .success(function(data) {
                        if (data.code != 10000) {
                            layer.msg(data.message,{shade:[0.2,'#000'],time:3000},function(){
                                layer.close(l);
                            });
                            return;
                        }
                        layer.close(l);
                        _this.defaultKbalData();
                        var kbsl1Data = data.data[0];
                        var kbsl2Data = data.data[1];
                        var kbsl3Data = data.data[2];
                        // 清除可比实例的默认数据
                        var tempGuJiaDuiXiangData = $scope.GuJiaDuiXiangData;
                        for (var i = 0; i < data.data.length; i++) {
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_XiangMuMingChen = kbsl" + (i + 1) + "Data.ResidentialAreaName");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_ZongJia = kbsl" + (i + 1) + "Data.TotalPrice/10000");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_DanJia = kbsl" + (i + 1) + "Data.UnitPrice");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_JiaoYiRiQi = kbsl" + (i + 1) + "Data.CaseTime.substring(0,10)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_ShiChangZhuangKuang = _this.transform('','n0_GuJiaDuiXiang_ShiChangZhuangKuang',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_JiaoYiZhuangKuang = _this.transform('','n0_GuJiaDuiXiang_JiaoYiZhuangKuang',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_ChaoXiang = kbsl" + (i + 1) + "Data.Toward");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_JiaoTongZhuangKuang = _this.transform('','n0_GuJiaDuiXiang_JiaoTongZhuangKuang',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_HuanJingZhuangKuang = _this.transform('','n0_GuJiaDuiXiang_HuanJingZhuangKuang',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_JiChuSheShiPeiTao = _this.transform('','n0_GuJiaDuiXiang_JiChuSheShiPeiTao',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_GongGongFuWuSheShi = _this.transform('','n0_GuJiaDuiXiang_GongGongFuWuSheShi',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_JianZhuMianJi = kbsl" + (i + 1) + "Data.BuildingArea");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_CheWei = _this.transform('','n0_GuJiaDuiXiang_CheWei',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_WuYeGuanLi = _this.transform('','n0_GuJiaDuiXiang_WuYeGuanLi',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_XiaoQuHuanJing = _this.transform('','n0_GuJiaDuiXiang_XiaoQuHuanJing',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_JianZhuLeiBie = _this.transform(kbsl" + (i + 1) + "Data.BuildingCategory,'n0_GuJiaDuiXiang_JianZhuLeiBie',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_JianZhuJieGou = _this.transform('','n0_GuJiaDuiXiang_JianZhuJieGou',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_JianChengNianDai = kbsl" + (i + 1) + "Data.BuildingCompletedYear");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_SheShiSheBei = _this.transform('','n0_GuJiaDuiXiang_SheShiSheBei',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_HuXing = kbsl" + (i + 1) + "Data.UnitShape==undefined?'其他':kbsl" + (i + 1) + "Data.UnitShape");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_SuoZaiCengZongLouCeng = kbsl" + (i + 1) + "Data.Floor+'/'+kbsl" + (i + 1) + "Data.Floors");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_ZhuangXiuZhuangKuang = kbsl" + (i + 1) + "Data.Decoration==undefined?'其他':kbsl" + (i + 1) + "Data.Decoration");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_QiTaYinSu = _this.transform('','n0_GuJiaDuiXiang_QiTaYinSu',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_QuanYiZhuangKuang = _this.transform('','n0_GuJiaDuiXiang_QuanYiZhuangKuang',tempGuJiaDuiXiangData)");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_XiuZhengXiShu = 1");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_BiZhunJiaZhi = kbsl" + (i + 1) + "Data.UnitPrice");
                            eval("$scope.KeBiShiLi" + (i + 1) + "Data.n0_KeBiShiLi" + (i + 1) + "_TID = kbsl" + (i + 1) + "Data.TID");
                        }
                        // 存在一条数据的情况下就需要计算平均价格的公式
                        if(data.data.length==1){
                            $rootScope.runRole('n0_KeBiShiLi1_ShiChangZhuangKuangv');
                        }
                        // 不满足3条记录的情况下，清空 比较法评估单价 的价格
                        if(data.data.length!=3){
                            $scope.GuJiaDuiXiangData.n0_GuJiaDuiXiang_BiJiaoFaPingGuDanJia = '';
                        }
                        $rootScope.runRole('n0_KeBiShiLi1_ZongJia');
                        $rootScope.runRole('n0_KeBiShiLi2_ZongJia');
                        $rootScope.runRole('n0_KeBiShiLi3_ZongJia');
                        $rootScope.runRole('n0_KeBiShiLi1_Danjia');
                        $rootScope.runRole('n0_KeBiShiLi2_Danjia');
                        $rootScope.runRole('n0_KeBiShiLi3_Danjia');
                    }).error(function(data) {
                        p.servicesError();
                    });
            },
            /**
             * 复制可比实例数据
             */
            kebishiliCopy: function(l, n) {
                // 可比实例
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_XiangMuMingChen = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_XiangMuMingChen");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_ZongJia = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_ZongJia");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_DanJia = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_DanJia");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JiaoYiRiQi = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JiaoYiRiQi");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JiaoYiRiQiv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JiaoYiRiQiv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_ShiChangZhuangKuang = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_ShiChangZhuangKuang");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JiaoYiZhuangKuang = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JiaoYiZhuangKuang");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_ShiChangZhuangKuangv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_ShiChangZhuangKuangv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JiaoYiZhuangKuangv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JiaoYiZhuangKuangv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_ChaoXiang = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_ChaoXiang");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_ChaoXiangv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_ChaoXiangv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JiaoTongZhuangKuang = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JiaoTongZhuangKuang");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JiaoTongZhuangKuangv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JiaoTongZhuangKuangv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_HuanJingZhuangKuang = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_HuanJingZhuangKuang");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_HuanJingZhuangKuangv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_HuanJingZhuangKuangv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JiChuSheShiPeiTao = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JiChuSheShiPeiTao");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JiChuSheShiPeiTaov = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JiChuSheShiPeiTaov");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_GongGongFuWuSheShi = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_GongGongFuWuSheShi");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_GongGongFuWuSheShiv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_GongGongFuWuSheShiv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JianZhuMianJi = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JianZhuMianJi");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JianZhuMianJiv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JianZhuMianJiv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_CheWei = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_CheWei");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_CheWeiv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_CheWeiv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_WuYeGuanLi = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_WuYeGuanLi");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_WuYeGuanLiv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_WuYeGuanLiv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_XiaoQuHuanJing = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_XiaoQuHuanJing");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_XiaoQuHuanJingv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_XiaoQuHuanJingv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JianZhuLeiBie = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JianZhuLeiBie");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JianZhuLeiBiev = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JianZhuLeiBiev");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JianZhuJieGou = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JianZhuJieGou");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JianZhuJieGouv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JianZhuJieGouv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JianChengNianDai = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JianChengNianDai");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_JianChengNianDaiv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_JianChengNianDaiv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_SheShiSheBei = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_SheShiSheBei");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_SheShiSheBeiv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_SheShiSheBeiv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_HuXing = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_HuXing");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_HuXingv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_HuXingv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_SuoZaiCengZongLouCeng = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_SuoZaiCengZongLouCeng");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_SuoZaiCengZongLouCengv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_SuoZaiCengZongLouCengv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_ZhuangXiuZhuangKuang = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_ZhuangXiuZhuangKuang");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_ZhuangXiuZhuangKuangv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_ZhuangXiuZhuangKuangv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_QiTaYinSu = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_QiTaYinSu");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_QiTaYinSuv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_QiTaYinSuv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_QuanYiZhuangKuang = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_QuanYiZhuangKuang");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_QuanYiZhuangKuangv = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_QuanYiZhuangKuangv");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_XiuZhengXiShu = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_XiuZhengXiShu");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_BiZhunJiaZhi = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_BiZhunJiaZhi");
                eval("$scope.KeBiShiLi" + l + "Data.n0_KeBiShiLi" + l + "_TID = $scope.KeBiShiLi" + n + "Data.n0_KeBiShiLi" + n + "_TID");
            },
            /**
             * 查询对比案例时还原默认数据
             */
            defaultKbalData: function(){
                // 可比实例1
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_XiangMuMingChen = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_ZongJia = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_DanJia = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JiaoYiRiQi = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JiaoYiRiQiv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_ShiChangZhuangKuang = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JiaoYiZhuangKuang = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_ShiChangZhuangKuangv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JiaoYiZhuangKuangv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_ChaoXiang = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_ChaoXiangv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JiaoTongZhuangKuang = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JiaoTongZhuangKuangv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_HuanJingZhuangKuang = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_HuanJingZhuangKuangv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JiChuSheShiPeiTao = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JiChuSheShiPeiTaov = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_GongGongFuWuSheShi = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_GongGongFuWuSheShiv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JianZhuMianJi = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JianZhuMianJiv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_CheWei = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_CheWeiv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_WuYeGuanLi = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_WuYeGuanLiv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_XiaoQuHuanJing = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_XiaoQuHuanJingv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JianZhuLeiBie = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JianZhuLeiBiev = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JianZhuJieGou = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JianZhuJieGouv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JianChengNianDai = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JianChengNianDaiv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_SheShiSheBei = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_SheShiSheBeiv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_HuXing = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_HuXingv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_SuoZaiCengZongLouCeng = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_SuoZaiCengZongLouCengv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_ZhuangXiuZhuangKuang = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_ZhuangXiuZhuangKuangv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_QiTaYinSu = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_QiTaYinSuv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_QuanYiZhuangKuang = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_QuanYiZhuangKuangv = 100;
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_XiuZhengXiShu = '';
                $scope.KeBiShiLi1Data.n0_KeBiShiLi1_BiZhunJiaZhi = '';

                // 可比实例2
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_XiangMuMingChen = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_ZongJia = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_DanJia = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JiaoYiRiQi = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JiaoYiRiQiv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_ShiChangZhuangKuang = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JiaoYiZhuangKuang = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_ShiChangZhuangKuangv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JiaoYiZhuangKuangv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_ChaoXiang = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_ChaoXiangv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JiaoTongZhuangKuang = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JiaoTongZhuangKuangv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_HuanJingZhuangKuang = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_HuanJingZhuangKuangv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JiChuSheShiPeiTao = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JiChuSheShiPeiTaov = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_GongGongFuWuSheShi = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_GongGongFuWuSheShiv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JianZhuMianJi = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JianZhuMianJiv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_CheWei = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_CheWeiv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_WuYeGuanLi = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_WuYeGuanLiv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_XiaoQuHuanJing = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_XiaoQuHuanJingv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JianZhuLeiBie = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JianZhuLeiBiev = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JianZhuJieGou = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JianZhuJieGouv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JianChengNianDai = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JianChengNianDaiv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_SheShiSheBei = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_SheShiSheBeiv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_HuXing = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_HuXingv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_SuoZaiCengZongLouCeng = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_SuoZaiCengZongLouCengv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_ZhuangXiuZhuangKuang = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_ZhuangXiuZhuangKuangv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_QiTaYinSu = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_QiTaYinSuv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_QuanYiZhuangKuang = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_QuanYiZhuangKuangv = 100;
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_XiuZhengXiShu = '';
                $scope.KeBiShiLi2Data.n0_KeBiShiLi2_BiZhunJiaZhi = '';

                // 可比实例3
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_XiangMuMingChen = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_ZongJia = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_DanJia = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JiaoYiRiQi = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JiaoYiRiQiv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_ShiChangZhuangKuang = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JiaoYiZhuangKuang = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_ShiChangZhuangKuangv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JiaoYiZhuangKuangv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_ChaoXiang = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_ChaoXiangv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JiaoTongZhuangKuang = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JiaoTongZhuangKuangv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_HuanJingZhuangKuang = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_HuanJingZhuangKuangv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JiChuSheShiPeiTao = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JiChuSheShiPeiTaov = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_GongGongFuWuSheShi = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_GongGongFuWuSheShiv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JianZhuMianJi = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JianZhuMianJiv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_CheWei = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_CheWeiv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_WuYeGuanLi = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_WuYeGuanLiv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_XiaoQuHuanJing = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_XiaoQuHuanJingv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JianZhuLeiBie = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JianZhuLeiBiev = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JianZhuJieGou = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JianZhuJieGouv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JianChengNianDai = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JianChengNianDaiv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_SheShiSheBei = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_SheShiSheBeiv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_HuXing = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_HuXingv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_SuoZaiCengZongLouCeng = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_SuoZaiCengZongLouCengv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_ZhuangXiuZhuangKuang = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_ZhuangXiuZhuangKuangv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_QiTaYinSu = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_QiTaYinSuv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_QuanYiZhuangKuang = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_QuanYiZhuangKuangv = 100;
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_XiuZhengXiShu = '';
                $scope.KeBiShiLi3Data.n0_KeBiShiLi3_BiZhunJiaZhi = '';
            }
        }
    }());

    /**
     * 估价师声明 js
     */
    var appraiserStatement = (function(){
        var _this = null;
        return {
            /**
             * 默认加载的数据
             */
            init:function(){
                _this = this;
                /**
                 * 查看复选项复制功能
                 */
                require(['../../content/lib/base/ZeroClipboard.min'],function(ZeroClipboard){
                    /**
                     * 查看复选项复制功能
                     */
                    $scope.checkFilterItems = function(filterNumber){
                        if(typeof $scope.checkFilterData!='function'){
                            layer.msg('服务器请求失败',{shade:[0.2,'#000'],time:3000},function(){});
                            return;
                        }
                        layer.open({
                            area: ['800px', ''],
                            type: 1,
                            closeBtn: false,
                            title: false,
                            shade: [.6, '#000'],
                            content: $('#appraiserPop'),
                            success: function() {
                                var resultData = $scope.checkFilterData(filterNumber);
                                var str = '';
                                for (var i = 0; i < resultData.arrItems.length; i++) {
                                    str+='<table class="table table-bordered text-center table-nomargin" width="100%" border="0" cellspacing="0" cellpadding="0">'+
                                    '<tbody>';
                                        for (var j = 0; j < resultData.arrItems[i].length; j++) {
                                            str+='<tr>';
                                                if(j==0){
                                                    str+='<td style="width:15px;" rowspan="'+resultData.arrItems[i].length+'">'+resultData.number[i]+'</td>';
                                                }
                                            str+='<td class="text-left" id="fe_text_'+i+'_'+j+'">'+resultData.arrItems[i][j]+'</td>'+
                                            '<td style="width:25px;"><a href="javascript:;" class="copy-btn link-blue" id="clip_button_'+i+'_'+j+'" data-clipboard-target="fe_text_'+i+'_'+j+'">复制</a></td>'+
                                            '</tr>';
                                        }
                                    '</tbody>'+
                                    '</table>';
                                }
                                $('.appraiser-con').html(str);

                                var popContent = $('#appraiserPop');
                                var closeBtn = popContent.find('.close-pop');
                                var aTrs = popContent.find('tr');
                                var clip = [];
                                for (var j = 0; j < resultData.arrItems.length; j++) {
                                    for(var i=0;i<aTrs.length;i++){
                                        // 定义一个新的复制对象
                                        clip[i] = new ZeroClipboard(document.getElementById('clip_button_'+j+'_'+i), {
                                          moviePath: "../../content/lib/base/ZeroClipboard.swf"
                                        });
                                        // 复制内容到剪贴板成功后的操作
                                        clip[i].on('complete', function(client, args) {
                                           layer.msg("复制成功",{time:1000});
                                        });
                                    }
                                }
                                p.closePop(closeBtn);
                            },
                            end: function() {
                                // 关闭后要做的事情
                            }
                        });
                    }
                });
                
                _this.requestData();
                appraiserStatement = null;
            },
            /**
             * 请求估价师声明默认或缓存数据
             */
            requestData:function(){
                /**
                 * 需要从前面传递(临时变量)
                 * tempName: 估价师姓名
                 * tempDate: 估价日期
                 */
                var tempName = 'You Name';
                var tempDate = $scope.XianChangKanChaData.n0_XianChangKanCha_ShiDiKanChaQi;

                /**
                 * 估价师声明(默认数据)
                 */
                if(localStorage.PEP_gjsStatement){
                    p.getId('gjsStatement').value = localStorage.PEP_gjsStatement;
                    //_this.getGjsStatement('gjsStatement');
                    _this.getGjsAssumptions('gjsLimiting_');
                }else{
                    // 第一次进入取数据
                    _this.getGjsStatement('gjsStatement');
                    _this.getGjsAssumptions('gjsLimiting_');
                }
                
                p.tab({
                    tabId: "appraiserTabHd",
                    contents: "appraiserTabBd",
                    callBack:function(){
                        /*if(this.index==1){
                            // 估价假设和限制条件
                            //_this.getGjsAssumptions('gjsLimiting_');
                        }*/
                    }
                });
                $scope.gjsReplaceObj = [{
                    'key':'AAA','name':tempName
                },{
                    'key':'XXXX-XX-XX','name':tempDate
                }]
                /**
                 * 替换有可能出现数据更新的值
                 */
                _this.replaceTextrea('gjsStatement',$scope.gjsReplaceObj);

                /**
                 * 保存估价师声明数据
                 */
                $scope.saveGjsData = function(obj){
                    localStorage.setItem('PEP_'+obj,document.getElementById(obj).value);
                }
            },
            /**
             * replaceTextrea 替换字符
             */
            replaceTextrea:function(objElm,object){
                var arr = [];
                var arr = p.getId(objElm).value.split(/\n+/);
                var reg;
                for (var i = 0; i < arr.length; i++) {
                    if(arr[i]==''){
                        arr.remove(arr[i]);
                        continue;
                    }
                    for (var j = 0; j < object.length; j++) {
                        reg = new RegExp('(['+object[j].key+'])','g');
                        if(arr[i].match(reg)){
                            arr[i] = arr[i].replace(object[j].key,object[j].name);
                        }
                    }
                }
                this.getGjsStatement(objElm,arr);
            },
            /**
             * 获取估价师声明数据
             */
            getGjsStatement:function(tAreaObj,arr){
                var str = '';
                //var resultData;
                var joinStr = function(tAreaObj,resultData){
                    // 取缓存数据
                    // resultData []
                    // resultData object
                    try{
                        if(resultData[0].sort==undefined){
                            for (var i = 0; i < resultData.length; i++) {
                                str+=resultData[i]+'\n';
                            }
                        }else{
                            for(var i=0;i<resultData.length;i++){
                                str+=resultData[i].sort+'.'+resultData[i].content+'\n';
                            }
                        }
                        p.getId(tAreaObj).value = str;
                        localStorage.setItem('PEP_'+tAreaObj,str);
                    }catch(e){}
                }
                if(typeof arr == 'object'){
                    joinStr(tAreaObj,arr);
                    return;
                }
                

                writeReportServices.getGjsStatement().
                success(function(data){
                    var resultData = data.data;
                    //console.log(resultData)
                    joinStr(tAreaObj,resultData);
                    _this.replaceTextrea(tAreaObj,$scope.gjsReplaceObj);
                }).error(function(){
                    p.servicesError();
                });
            },
            /**
             * 估价假设和限制条件
             */
            getGjsAssumptions:function(tAreaObj){
                var aGjsLimiting =  p.getClass(p.getId('gjsLimiting'),'gjsLimiting');
                var resultData = '';
                if(resultData!=''){ return; }
                var getGjsAssumptionsFn = function(areaObj){
                    writeReportServices.getGjsAssumptions().
                    success(function(data){
                        if(data.code!=10000){
                            //yer.msg('服务器请求失败',{shade:[0.2,'#000'],time:3000},function(){});
                            console.log('服务器请求失败');
                            return;
                        }
                        var str = '';
                        var arr = [];
                        var aChildrens = [];
                        var resultData = data.data;
                        var gjsFilterArr = [];
                        for(var i=0;i<resultData.length;i++){
                            aChildrens.push(resultData[i]);
                            var tempArr = [];
                            for(var j=0;j<resultData[i].childrens.length;j++){
                                if(resultData[i].childrens[j].length==0){
                                    continue;
                                }
                                if(resultData[i].childrens[j].contentArr.length>1){
                                    tempArr.push({
                                        key:j+1,
                                        arr:resultData[i].childrens[j].contentArr
                                    });
                                }
                            }
                            gjsFilterArr.push(tempArr);
                        }

                        $scope.checkFilterData = function(filterNumber){
                            // 取对应的编号
                            var gjsLimiting = gjsFilterArr[filterNumber];
                            var arr1 = [];
                            var arr2 = [];
                            for(var i=0;i<gjsLimiting.length;i++){
                                arr1.push(gjsLimiting[i].key);
                                arr2.push(gjsLimiting[i].arr);
                            }
                            return {
                                number: arr1,
                                arrItems: arr2
                            }
                        }
                        //console.log(aChildrens)
                        var aChildrensTitle = [];
                        // 为文本域名赋值并存储本地数据
                        for(var j=0;j<aChildrens.length;j++){
                            str = '';
                            aChildrensTitle.push(aChildrens[j].content);
                            for(var i=0;i<aChildrens[j].childrens.length;i++){
                                str += (i+1)+'.'+aChildrens[j].childrens[i].content+'\n';
                            }
                            if(!p.getId(areaObj+(j+1))){
                                break;
                            }
                            // 本地数据为空时赋值新的数据
                            if(p.getId(areaObj+(j+1)).value==''){
                                p.getId(areaObj+(j+1)).value = str;
                                localStorage.setItem('PEP_'+tAreaObj+(j+1),str);
                            }
                        }
                        $scope.gjsDataNum_1 = $scope.checkFilterData(0).number.join(',');
                        $scope.gjsDataNum_2 = $scope.checkFilterData(1).number.join(',');
                        $scope.gjsDataNum_3 = $scope.checkFilterData(2).number.join(',');
                        $scope.gjsDataTitle = aChildrensTitle.unique();
                    }).error(function(){
                        p.servicesError();
                    });
                }

                // 若已经存在数据就不进行数据请求
                for(var i=0;i<aGjsLimiting.length;i++){
                    if(localStorage['PEP_'+tAreaObj+(i+1)]){
                        p.getId(tAreaObj+(i+1)).value = localStorage['PEP_'+tAreaObj+(i+1)];
                    }else{
                        // 第一次进入取数据(从服务器取)
                        getGjsAssumptionsFn(tAreaObj);
                    }
                }
            }
        }
    }());

    /**
     * 现场勘查
     */
    var explorationRun = (function(){
        var _this = null;
        return {
            init:function(){
                _this = this;
                _this.times();
                _this.checkboxOptions();
                _this.fixNav();
                explorationRun = null;
            },
            /**
             * 时间选择
             */
            times:function(){
                var inspection = {
                    elem: '#checkDataStart',
                    format: 'YYYY-MM-DD',
                    min: false, //laydate.now(), //设定最小日期为当前日期
                    istime: false,
                    istoday: false,
                    choose: function(datas) {
                        //$scope.paramData.gjStartDate = datas;
                        //end.min = datas; //开始日选好后，重置结束日的最小日期
                        //end.start = datas //将结束日的初始值设定为开始日
                        console.log(datas)
                        //$scope.$apply();
                    }
                };
                var exploration = {
                    elem: '#checkDataEnd',
                    format: 'YYYY-MM-DD',
                    min: false, //laydate.now(), //设定最小日期为当前日期
                    istime: false,
                    istoday: false,
                    choose: function(datas) {
                        //$scope.paramData.gjStartDate = datas;
                        //end.min = datas; //开始日选好后，重置结束日的最小日期
                        //end.start = datas //将结束日的初始值设定为开始日
                        console.log(datas)
                        //$scope.$apply();
                    }
                };

                $('#inspectionDate').click(function(){
                    laydate(inspection);
                });

                $('#explorationDate').click(function(){
                    laydate(exploration);
                });
            },
            /**
             * 复选框操作,拼接七通的功能
             */
            checkboxOptions:function(){
                var checkboxArr = [];
                $scope.baseQiTong = '--';
                /**
                 * 点击复选框记录七通数量
                 */
                $scope.checkboxCick = function(e,type){
                    var node = e.target;
                    var dataModel = node.getAttribute('data-model');
                    checkboxArr = eval("$scope."+dataModel+".split('、')");
                    checkboxArr.remove('');
                    if(node.checked==true){
                        checkboxArr.push(node.value);
                    }else{
                        for (var i = 0; i < checkboxArr.length; i++) {
                            if(checkboxArr[i]==node.value){
                                checkboxArr.remove(checkboxArr[i]);
                            }
                        }
                    }
                    eval("$scope."+dataModel+" = '"+checkboxArr.join('、')+"'");
                    // 改变七通数据
                    if(type=='baseQiTong'){
                        if(!checkboxArr.length){
                            $scope.baseQiTong = '--';
                        }else{
                            $scope.baseQiTong = p.numberToCh[checkboxArr.length]+'通';
                        }
                    }
                }
                /**
                 * 选中checkbox
                 */
                $scope.isChecked = function(val,name){
                    var checkboxArr = eval("$scope."+name).split("、");
                    for (var i = 0; i < checkboxArr.length; i++) {
                        if(checkboxArr[i]==val){
                            return true;
                        }
                    }
                    return false;
                }
                /**
                 * 七通数据统计
                 */
                var timer = $timeout(function(){
                    if(!p.getId('baseQiTong')){
                        return;
                    }
                    var oBaseQiTong = p.getId('baseQiTong');
                    var aCheckbox = p.getClass(oBaseQiTong,'checkbox');
                    for (var i = 0; i < aCheckbox.length; i++) {
                        if(aCheckbox[i].checked == true){
                            checkboxArr.push(aCheckbox[i].value);
                        }
                    }
                    if(!checkboxArr.length){
                        $scope.baseQiTong = '--';
                    }else{
                        $scope.baseQiTong = p.numberToCh[checkboxArr.length]+'通';
                    }
                    timer = null;
                },50);
            },
            /**
             * 右侧悬浮定位跳转导航
             */
            fixNav: function(){
                // 1440 => min
                $scope.showFixType = 'max';
                var oFloorContent = p.getId('floorContent');
                var oContainer = p.getId('container');
                var offsetLeft = null;
                var docW = null;
                var sizeOffset = function(){
                    offsetLeft = p.getOffset(oContainer);
                    docW = document.documentElement.offsetWidth || document.body.offsetWidth;
                    oFloorContent.style.left = offsetLeft.left+oContainer.offsetWidth+10+'px';
                    if(docW<=1440){
                        $scope.showFixType = 'min';
                    }else{
                        $scope.showFixType = 'max';
                    }
                };
                var timer = $timeout(function(){
                    var aFlink = $(oFloorContent).find('.f-link');
                    aFlink.each(function(index,elm){
                        $(elm).mousemove(function(e){
                            if(e.target.nodeName.toLowerCase()!='a'){
                                $(elm).find('.text').stop().fadeOut();
                            }
                        });
                        $(elm).hover(function(){
                            var oText = $(this).find('.text');
                            if(oText){
                                $(oText).stop().fadeIn();
                            }
                        },function(){
                            var oText = $(this).find('.text');
                            if(oText){
                                $(oText).stop().fadeOut();
                            }
                        });
                        $(elm).click(function(){
                            var type = $(this).attr('data-type');
                            if(type){
                                if(type=='top'){
                                    $('html,body').animate({scrollTop:0},200);
                                    return;
                                }
                                var offset = $('#'+type).offset().top;
                                $('html,body').animate({scrollTop:offset-$('#'+type).height()},200);
                            }
                        });
                    });
                },10);
                $(window).on('resize',function(){
                    sizeOffset();
                    $scope.$apply();
                });
                sizeOffset();

                /*$(window).on('scroll',function(){
                    var s = $(window).scrollTop();
                    console.log($(window).scrollTop())
                    if(s<=$('#floor_1').offset().top){
                        $(oFloorContent).find('a[data-type="floor_2"]').addClass('on').siblings().removeClass('on');
                    }else if(s<=$('#floor_2').offset().top){
                        $(oFloorContent).find('a[data-type="floor_3"]').addClass('on').siblings().removeClass('on');
                    }else if(s<=$('#floor_3').offset().top){
                        $(oFloorContent).find('a[data-type="floor_4"]').addClass('on').siblings().removeClass('on');
                    }else if(s<=$('#floor_4').offset().top){
                        $(oFloorContent).find('a[data-type="floor_5"]').addClass('on').siblings().removeClass('on');
                    }else if(s<=$('#floor_5').offset().top){
                        $(oFloorContent).find('a[data-type="floor_6"]').addClass('on').siblings().removeClass('on');
                    }else if(s<=$('#floor_6').offset().top){
                        $(oFloorContent).find('a[data-type="floor_7"]').addClass('on').siblings().removeClass('on');
                    }else if(s<=$('#floor_7').offset().top){
                        $(oFloorContent).find('a[data-type="floor_8"]').addClass('on').siblings().removeClass('on');
                    }else if(s<=$('#floor_8').offset().top){
                        $(oFloorContent).find('a[data-type="floor_9"]').addClass('on').siblings().removeClass('on');
                    }else if(s<=189){
                        $(oFloorContent).find('a[data-type="floor_1"]').addClass('on').siblings().removeClass('on');
                    }
                });*/
                
            }
        }
    }());

    /**
     * 基础信息
     */
    var baseInfo = (function(){
        var _this = null;
        return {
            init:function(){
                _this = this;
                _this.ngModels = ['$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianHao,$scope.JiChuXinXiData.n0_JiChuXinXi_wDiZhi,$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianLeiXing,$scope.JiChuXinXiData.n0_JiChuXinXi_wXingMing',
                '$scope.JiChuXinXiData.n0_JiChuXinXi_DanWeiMingChen,$scope.JiChuXinXiData.n0_JiChuXinXi_FaDingDaiBiaoRen,$scope.JiChuXinXiData.n0_JiChuXinXi_DanWeiDiZhi',
                '$scope.JiChuXinXiData.n0_JiChuXinXi_jXingMing,$scope.JiChuXinXiData.n0_JiChuXinXi_jZhengJianLeiXing,$scope.JiChuXinXiData.n0_JiChuXinXi_jZhengJianHao',
                '$scope.JiChuXinXiData.n0_JiChuXinXi_jDanWeiMingChen',
                '$scope.QuanYiZhuangKuangData.n0_QuanYiZhuangKuang_SuoGongQuanRen,$scope.QuanYiZhuangKuangData.n0_QuanYiZhuangKuang_SuoGongQuanRenSuoZhanFenE,$scope.QuanYiZhuangKuangData.n0_QuanYiZhuangKuang_FangWuSuoGongQuanZhengHao'];

                _this.loadEvent();
                // 获取存储的记录数
                var arr = ['gjEnterpriseContent','jkEnterpriseContent','gjClientContent','jkBorrowerContent'];
                _this.getLogData(arr);
                //baseInfo = null;
            },

            loadEvent:function(){
                $scope.addClientFn = _this.addClientFn;
                $scope.removeClientFn = _this.removeClientFn;
            },

            addClientFn:function(event,status,nodeId,nodeClass){
                var arr1 = _this.ngModels[status].split(',');
                var node = event.target;

                var gjClientContent = p.getId(nodeId);
                var aChildren = p.getClass(gjClientContent,nodeClass);
                var showChilds = [];
                var hiddenChilds = [];
                for (var i = 0; i < aChildren.length; i++) {
                    if(aChildren[i].style.display == 'none'){
                        hiddenChilds.push(aChildren[i]);
                    }else{
                        showChilds.push(aChildren[i]);
                    }
                };
                var index = 0;
                for (var i = 0; i < showChilds.length; i++) {
                    if(showChilds[i]==node.parentNode){
                        index = i;
                    }
                };
                if(showChilds.length==aChildren.length){
                    layer.msg('最多能添加'+aChildren.length+'个');
                    return;
                }
                for (var i = showChilds.length - 1; i >= 0; i--) {
                    if(i>index){
                        if(i == showChilds.length-1){
                            //hiddenChilds[0] = showChilds[i];
                            for (var j = 0; j < arr1.length; j++) {
                                eval(arr1[j]+(showChilds.length+1)+'='+arr1[j]+(i+1));
                            };
                            /*eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianHao'+(showChilds.length+1)+'=$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianHao'+(i+1));
                            eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wDiZhi'+(showChilds.length+1)+'=$scope.JiChuXinXiData.n0_JiChuXinXi_wDiZhi'+(i+1));
                            eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianLeiXing'+(showChilds.length+1)+'=$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianLeiXing'+(i+1));
                            eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wXingMing'+(showChilds.length+1)+'=$scope.JiChuXinXiData.n0_JiChuXinXi_wXingMing'+(i+1));*/
                        }else{
                            //showChilds[i+1] = showChilds[i];
                            for (var j = 0; j < arr1.length; j++) {
                                eval(arr1[j]+(i+2)+'='+arr1[j]+(i+1));
                            };
                            /*eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianHao'+(i+2)+'=$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianHao'+(i+1));
                            eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wDiZhi'+(i+2)+'=$scope.JiChuXinXiData.n0_JiChuXinXi_wDiZhi'+(i+1));
                            eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianLeiXing'+(i+2)+'=$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianLeiXing'+(i+1));
                            eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wXingMing'+(i+2)+'=$scope.JiChuXinXiData.n0_JiChuXinXi_wXingMing'+(i+1));*/
                        }    
                    }else{
                        for (var j = 0; j < arr1.length; j++) {
                            eval(arr1[j]+(i+2)+'=""');
                        };
                        /*eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianHao'+(i+2)+'=""');
                        eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wDiZhi'+(i+2)+'=""');
                        eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianLeiXing'+(i+2)+'=""');
                        eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wXingMing'+(i+2)+'=""');*/
                        hiddenChilds[0].style.display = 'block';
                        break;
                    }
                };

                _this.setCount(aChildren,nodeId);

                /*n0_JiChuXinXi_wDiZhi1 = ''; // w地址1
                n0_JiChuXinXi_wZhengJianHao1 = ''; // w证件号1
                n0_JiChuXinXi_wZhengJianLeiXing1 = ''; // w证件类型1
                n0_JiChuXinXi_wXingMing1 = ''; // w姓名1*/

            },

            removeClientFn:function(event,status,nodeId,nodeClass){
                var arr1 = _this.ngModels[status].split(',');
                var node = event.target;

                var gjClientContent = p.getId(nodeId);
                var aChildren = p.getClass(gjClientContent,nodeClass);
                var showChilds = [];
                var hiddenChilds = [];
                for (var i = 0; i < aChildren.length; i++) {
                    if(aChildren[i].style.display == 'none'){
                        hiddenChilds.push(aChildren[i]);
                    }else{
                        showChilds.push(aChildren[i]);
                    }
                };
                if(showChilds.length==1){
                    layer.msg('至少保留1个');
                    return;
                }
                var index = 0;
                for (var i = 0; i < showChilds.length; i++) {
                    if(showChilds[i]==node.parentNode){
                        index = i;
                    }
                };
                for (var i = 0; i < showChilds.length; i++) {
                    if(i>index){
                        for (var j = 0; j < arr1.length; j++) {
                            eval(arr1[j]+(i)+'='+arr1[j]+(i+1));
                        };
                        /*eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianHao'+(i)+'=$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianHao'+(i+1));
                        eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wDiZhi'+(i)+'=$scope.JiChuXinXiData.n0_JiChuXinXi_wDiZhi'+(i+1));
                        eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianLeiXing'+(i)+'=$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianLeiXing'+(i+1));
                        eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wXingMing'+(i)+'=$scope.JiChuXinXiData.n0_JiChuXinXi_wXingMing'+(i+1));*/
                    }
                };

                for (var j = 0; j < arr1.length; j++) {
                    eval(arr1[j]+(showChilds.length)+'=""');
                };
                /*eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianHao'+(showChilds.length)+'=""');
                eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wDiZhi'+(showChilds.length)+'=""');
                eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wZhengJianLeiXing'+(showChilds.length)+'=""');
                eval('$scope.JiChuXinXiData.n0_JiChuXinXi_wXingMing'+(showChilds.length)+'=""');*/
                showChilds[showChilds.length-1].style.display = 'none';
                
                /*n0_JiChuXinXi_wDiZhi1 = ''; // w地址1
                n0_JiChuXinXi_wZhengJianHao1 = ''; // w证件号1
                n0_JiChuXinXi_wZhengJianLeiXing1 = ''; // w证件类型1
                n0_JiChuXinXi_wXingMing1 = ''; // w姓名1*/

                _this.setCount(aChildren,nodeId);

            },
            /**
             * 获取存储的数量
             */
            getLogData:function(arr){
                for(var j=0;j<arr.length;j++){
                    if(eval('localStorage.PEP_'+arr[j]+'_list')){
                        var count = parseInt(eval('localStorage.PEP_'+arr[j]+'_list'));
                        for (var i = 0; i < count; i++) {
                            if(p.getId(arr[j])==null){
                                continue;
                            }
                            p.getId(arr[j]).children[i].style.display = 'block';
                        };
                    }
                }
            },
            /**
             * 设置存储的数量
             */
            setCount: function(aChildren,nodeId){
                $scope.tempCount = [];
                for (var i = 0; i < aChildren.length; i++) {
                    if(aChildren[i].style.display=='block'){
                        $scope.tempCount.push(i);
                        localStorage.setItem('PEP_'+nodeId+'_list',$scope.tempCount.length);
                    }
                };
            }
        }
    }());
    
    /**
     * 权益信息
     */
    var interestsInfo = (function(){
        var _this = null;
        return {
            init:function(){
                _this = this;
                var arr = ['warrantContent'];
                baseInfo.getLogData(arr); // 获取
                _this.warrant();
                interestsInfo = null;
            },
            /**
             * 建筑物权益—共有权证
             */
            warrant:function(){
                /**
                 * 切换radio选项时改变对应的显示类型
                 */
                $scope.$watch('QuanYiZhuangKuangData.n0_QuanYiZhuangKuang_GongYouQuanZhengLeiXing', function(newValue, oldValue, scope) {
                    $scope.warrantTempText = newValue=='房屋共有权证'?'共有':'所有';
                });
                
                $scope.changeWarrant = function(event){
                    $scope.warrantTempText = $scope.QuanYiZhuangKuangData.n0_QuanYiZhuangKuang_GongYouQuanZhengLeiXing=='房屋所有权证'?'所有':'共有';
                }
            }
        }
    }());
    

    /**
     * 清除浏览器前进后退按钮时有弹出层未关闭的情况出现的阴影层
     */
    require(['../../controllers/calculate/clearDefault'],function(d){
        d.removeShade();
    });

    /**
     * 下一步保存数据的时候需要传递的所有数据
     */
    function getMarketReqData() {
        if($scope.formulasArr==undefined){
            //layer.msg('服务器请求失败',{shade:false,time:3000},function(){});
            return;
        }
        // 匹配估价师key
        var numberTemp = [
            {key:'Yi',name:1},
            {key:'Er',name:2},
            {key:'San',name:3},
            {key:'Si',name:4},
            {key:'Wu',name:5},
            {key:'Liu',name:6},
            {key:'Qi',name:7},
            {key:'Ba',name:8},
            {key:'Jiu',name:9},
            {key:'Shi',name:10},
            {key:'ShiYi',name:11},
            {key:'ShiEr',name:12},
            {key:'ShiSan',name:13},
            {key:'ShiSi',name:14},
            {key:'ShiWu',name:15},
            {key:'ShiLiu',name:16},
            {key:'ShiQi',name:17},
            {key:'ShiBa',name:18},
            {key:'ShiJiu',name:19},
            {key:'ErShi',name:20}
        ]
        //var _this = this;

        /**
         * 保存数据时获取估价师声明中的数据
         */
        var getGjsDataVal = function(objElm){
            var dataArr = [];
            // 传送数据时清除多余的换行数据
            dataArr = p.getId(objElm).value.split(/\n+/);
            for (var i = 0; i < dataArr.length; i++) {
                if(dataArr[i]==''){
                    dataArr.remove(dataArr[i]);
                }
            }
            return dataArr;
        }
        /**
         * [returnGjxData 用于获取估价师声明中文本域中的数据]
         * @param  {[object]} gjsObjELm [对应的元素id]
         * @param  {[object]} gjsData   [获取对应元素id中对应的经常拆分过后的数据]
         * @return {[object]}           [通过eval为对象赋值]
         */
        var returnGjxData = function(gjsObjELm,gjsData,str){
            if(!p.getId(gjsObjELm)){
                return;
            }
            var gjsStatementVals = getGjsDataVal(gjsObjELm);
            for (var i = 0; i < gjsStatementVals.length; i++) {
                eval(gjsData+".n0_"+str+'_'+numberTemp[i].key+"='"+gjsStatementVals[i]+"'");
                //eval(gjsData+"."+numberTemp[i].key+"='"+gjsStatementVals[i]+"'");
                continue;
            }
        }
        returnGjxData('gjsStatement','$scope.GuJiaShiShengMingData','GuJiaShiShengMing');
        returnGjxData('gjsLimiting_1','$scope.GuJiaShiJiaSheData','GuJiaShiJiaShe');
        returnGjxData('gjsLimiting_2','$scope.XianZhiTiaoJianData','XianZhiTiaoJian');
        returnGjxData('gjsLimiting_3','$scope.QiTaShuoMingShiXiangData','QiTaShuoMingShiXiang');

        //console.log($scope.DiYaJiaGeQueDingData.n0_DiYaJiaGeQueDing_ChuRangJinKouChuHouDeDanJia);
        //console.log($filter('numberStr')($scope.DiYaJiaGeQueDingData.n0_DiYaJiaGeQueDing_ChuRangJinKouChuHouDeDanJia,2));
        
        var formulasArr = $scope.formulasArr;
        var entityArr = [];
        var fieldsArr = [];
        var fieldsTempObj = null;
        var temp = null;
        for (var i = 0; i < formulasArr.length; i++) {
            temp = {
                tableName: formulasArr[i].entityName
            }
            fieldsArr = formulasArr[i].fields;
            fieldsTempObj = {};
            for (var j = 0; j < fieldsArr.length; j++) {
                // 拼接fields
                try{
                    eval('fieldsTempObj["'+fieldsArr[j].name+'"] = $scope.'+fieldsArr[j].entityName.split('_')[1]+'Data.'+fieldsArr[j].param+'');
                }catch(e){
                    console.log(e);
                }
            };
            temp.fields = fieldsTempObj;
            entityArr.push(temp);
        };

        // 特殊处理
        for (var i = 0; i < entityArr.length; i++) {
            if(entityArr[i].tableName=='n0_GuJiaDuiXiang'){
                entityArr[i].fields.JiaoYiRiQi = $scope.GuJiaDuiXiangData.n0_GuJiaDuiXiang_JiaoYiRiQi==''?'':$scope.GuJiaDuiXiangData.n0_GuJiaDuiXiang_JiaoYiRiQi+' 00:00:00';
            }else if(entityArr[i].tableName=='n0_KeBiShiLi1'){
                entityArr[i].fields.JiaoYiRiQi = $scope.KeBiShiLi1Data.n0_KeBiShiLi1_JiaoYiRiQi==''?'':$scope.KeBiShiLi1Data.n0_KeBiShiLi1_JiaoYiRiQi+' 00:00:00';
            }else if(entityArr[i].tableName=='n0_KeBiShiLi2'){
                entityArr[i].fields.JiaoYiRiQi = $scope.KeBiShiLi2Data.n0_KeBiShiLi2_JiaoYiRiQi==''?'':$scope.KeBiShiLi2Data.n0_KeBiShiLi2_JiaoYiRiQi+' 00:00:00';
            }else if(entityArr[i].tableName=='n0_KeBiShiLi3'){
                entityArr[i].fields.JiaoYiRiQi = $scope.KeBiShiLi3Data.n0_KeBiShiLi3_JiaoYiRiQi==''?'':$scope.KeBiShiLi3Data.n0_KeBiShiLi3_JiaoYiRiQi+' 00:00:00';
            }
        };
        var dataJSON = {
            reportId: 120,
            entitys: entityArr
        }
        var reqData = {
            dataJSON: JSON.stringify(dataJSON)
        }
        return reqData;
    }
    /**
     * @$scope.paginationConf 分页对象
     * @callBack 分页onchange过后执行的回调
     * @return 根据记录数计算分页
     */
    /*function resetPageList(pageConfig,pageNumber,pagingData,callBack){
        eval('$scope.'+pageConfig+'.currentPage = pagingData.PageIndex');
        eval('$scope.'+pageConfig+'.totalItems = pagingData.RecordCount');
        eval('$scope.'+pageConfig+'.itemsPerPage = pageNumber');
        eval('$scope.'+pageConfig+'={'+
            'currentPage: pagingData.PageIndex,'+
            'totalItems: pagingData.RecordCount,'+
            'itemsPerPage: pageNumber,'+
            'pagesLength: 9,'+
            'isShowHome: false,'+
            'isShowLast: false,'+
            'perPageOptions: [10],'+
            'onChange: function() {'+
                'var me = this;'+
                'callBack&&callBack(this);'+
            '}'+
        '}');
        getPagination(); // 重新计算分页功能
    }*/


    /**
     * 获取字典信息
     */
    function loadServices(objectArr) {
        var tempArr = [];
        for (var i = 0; i < objectArr.length; i++) {
            tempArr.push(objectArr[i].dataDictionary);
        };
        var str = tempArr.unique().join(',');
        getParamsByKeyVal(str,function(resultData){
            //console.log(objectArr);
            for (var i = 0; i < objectArr.length; i++) {
                tempArr.push(objectArr[i].dataDictionary);
                for (var j = 0; j < resultData.length; j++) {
                    if(resultData[j].name==objectArr[i].dataDictionary){
                        eval('$scope.'+objectArr[i].entityName.split('_')[1]+'Data.'+objectArr[i].param+'S=resultData[j].data');
                        eval('$scope.'+objectArr[i].entityName.split('_')[1]+'Data.'+objectArr[i].param+'=resultData[j].data[0]');
                        // 特殊处理某一个字典数据默认不出现第一个选项
                        if(resultData[j].name == 'QiTong'){
                            eval('$scope.'+objectArr[i].entityName.split('_')[1]+'Data.'+objectArr[i].param+'=""');
                        }
                    }
                };
            };
            getLocalData();
        });
    }

    /**
     * 获取保存的数据
     */
    function getLocalData() {
        // 取本地存储数据
        if(localStorage.PEP_GuJiaDuiXiangData){
            $scope.GuJiaDuiXiangData = eval('('+localStorage.PEP_GuJiaDuiXiangData+')');
            $scope.KeBiShiLi1Data = eval('('+localStorage.PEP_KeBiShiLi1Data+')');
            $scope.KeBiShiLi2Data = eval('('+localStorage.PEP_KeBiShiLi2Data+')');
            $scope.KeBiShiLi3Data = eval('('+localStorage.PEP_KeBiShiLi3Data+')');
        }
        if(localStorage.PEP_ShiChangJiaGeQueDingData){
            $scope.ShiChangJiaGeQueDingData = eval('('+localStorage.PEP_ShiChangJiaGeQueDingData+')');
            $scope.DiYaJiaGeQueDingData = eval('('+localStorage.PEP_DiYaJiaGeQueDingData+')');
            $scope.FangFaLiYouData = eval('('+localStorage.PEP_FangFaLiYouData+')');
        }
        if(localStorage.PEP_ShouYiFaData){
            $scope.ShouYiFaData = eval('('+localStorage.PEP_ShouYiFaData+')');
            $scope.ChengBenFaData = eval('('+localStorage.PEP_ChengBenFaData+')');
        }
        if(localStorage.PEP_XianChangKanChaData){
            $scope.XianChangKanChaData = eval('('+localStorage.PEP_XianChangKanChaData+')');
        }
        if(localStorage.PEP_JiChuXinXiData){
            $scope.JiChuXinXiData = eval('('+localStorage.PEP_JiChuXinXiData+')');
        }
        if(localStorage.PEP_QuanYiZhuangKuangData){
            $scope.QuanYiZhuangKuangData = eval('('+localStorage.PEP_QuanYiZhuangKuangData+')');
        }
    }

    /**
     * 赋值字典信息
     */
    function getParamsByKeyVal(sReqStr,callBack) {
        //console.log(sReqStr)
        var reqData = {
            sReqStr: sReqStr
        }
        var l = layer.load(2);
        writeReportServices.getParamsByKeyVal(reqData)
        .success(function(data) {
            layer.close(l);
            //console.log(data)
            if(data.code!=10000){
                //layer.msg('服务器请求失败',{shade:[0.2,'#000'],time:3000},function(){});
                console.log('服务器请求失败');
                return;
            }
            var resultData = data.data;
            callBack&&callBack(resultData);
        }).error(function() {
            p.servicesError();
        });
    }

    /**
     * 公共部分
     */
    run.init();
    /**
     * 公共部分
     */
    /**
     * 市场法、成本法、收益法、计算结果
     */
    if($location.path().match('marketApproach') || $location.path().match('costApproach') || $location.path().match('incomeApproach') || $location.path().match('computedResult')) {
        calculationMethod.init();
    }
    /**
     * 估价师声明
     */
    if($location.path().match('appraiserStatement')) {
        appraiserStatement.init();
    }
    /**
     * 现场勘查
     */
    if($location.path().match('exploration')) {
        explorationRun.init();
    }
    /**
     * 基础信息
     * 权益信息
     */
    if($location.path().match('interestsInfo') || $location.path().match('baseInfo')) {
        baseInfo.init();
        interestsInfo.init();
        baseInfo = null;
    }

    }]);
});
