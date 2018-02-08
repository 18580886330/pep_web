/**
 * Filter组件
 */
define(['app'],function(app){
    /**
     * 截取数字长度,并四舍五入
     */
    angular.module('FiltersModule', []).filter('numberStr',function(){
        return function(filterName,len){
            if(len==0){
                return filterName.toFixed(0);
            }
            if(filterName==0){
                return filterName;
            }
            if(!filterName){
                return '';
            }
            if(parseFloat(filterName)%1===0){
                return parseFloat(filterName);
            }
            return parseFloat(filterName).toFixed(len);
        }
    }).
    /**
     * 截取字符长度,多余长度添加(...)符号
     */
    filter('subStr',function(){
        return function(filterName,len){
            if(filterName.length>len){
                return filterName.substring(0,len)+'...';
            }
            return filterName;
        }
    }).
    /**
     * 首字符转大写
     */
    filter('firstUpper',function(){
        return function(filterName,len){
            return filterName.substr(0,1).toUpperCase()+filterName.substring(1,filterName.length);
        }
    });
});
