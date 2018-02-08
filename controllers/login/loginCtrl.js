define(['app','../../services/login/loginServices'],function(app,loginServices){
    app.controller('loginCtrl',['$scope','$rootScope','$location','loginServices',function($scope,$rootScope,$location,loginServices){

        /*loginServices.test()
        .success(function(data){
            console.log(data);
        }).error(function(){
            p.servicesError();
        });*/

        ~(function(){
            $scope.userLoginData = {
                uDirty: false,              // 用户名是否错误 true:错误,false:正确
                pDirty: false,              // 密码是否错误
                userName: '',               // 用户名
                password: '',               // 密码
                utipMsg: '用户名不能为空',  // 默认提示文字
                ptipMsg: '密码不能为空'     // 默认提示文字
            }
            var checkIsNull = function(checkVal){
                if(checkVal==''){
                    return true;
                }
                return false;
            }
            return {
                init:function(){
                    this.inputColor();   // 文本框选中变色
                    this.loadScope();    // 加载$scope方法
                },
                // 加载$scope方法
                loadScope:function(){
                    // ng-blur
                    $scope.checUsername = function(){
                        if(!checkIsNull($scope.userLoginData.userName)){
                            $scope.userLoginData.uDirty = false;
                        }
                        if(checkIsNull($scope.userLoginData.userName)){
                            $scope.userLoginData.uDirty = true;
                        }
                    }
                    // ng-blur
                    $scope.checkPassword = function(){
                        if(!checkIsNull($scope.userLoginData.password)){
                            $scope.userLoginData.pDirty = false;
                        }
                        if(checkIsNull($scope.userLoginData.password)){
                            $scope.userLoginData.pDirty = true;
                        }
                    }
                    // 回车登录
                    $scope.enterKey = function($event){
                        if($event.keyCode!=13){ return; }
                        $scope.checkFormData();
                    }
                    // ng-click
                    $scope.checkFormData = function(){
                        if(checkIsNull($scope.userLoginData.userName)){
                            $scope.userLoginData.uDirty = true;
                            return;
                        }
                        if(checkIsNull($scope.userLoginData.password)){
                            $scope.userLoginData.pDirty = true;
                            return;
                        }
                        if($scope.userLoginData.userName!='admin' || $scope.userLoginData.password!='admin'){
                            layer.msg('用户名或密码错误');
                            return;
                        }
                        layer.msg('登录成功',{shade:[0.2,'#000'],time:1000},function(){
                            // 设置临时登录名
                            localStorage.setItem('rootUserName',$scope.userLoginData.userName);
                            $location.path('writeReport').search();
                            $scope.$apply();
                        });
                    }
                },
                // 文本框选中变色
                inputColor:function(){
                    var oLoginForm = p.getId('loginForm');
                    var aInputs = oLoginForm.getElementsByTagName('input');
                    for (var i = 0; i < aInputs.length; i++) {
                        aInputs[i].onfocus = function(){
                            this.style.backgroundColor = '#fff';
                            //this.style.border = '1px solid #dd5a58';
                        }
                    }
                }
            }
        })().init();
    }]);
});
