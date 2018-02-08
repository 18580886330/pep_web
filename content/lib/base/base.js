/*
    工具函数
*/
define(['../../content/lib/base/CalcEval'],function(math) {
    //Tween.linear();
    var Tween = {
        linear: function (t, b, c, d){  //匀速
            return c*t/d + b;
        },
        easeIn: function(t, b, c, d){  //加速曲线
            return c*(t/=d)*t + b;
        },
        easeOut: function(t, b, c, d){  //减速曲线
            return -c *(t/=d)*(t-2) + b;
        },
        easeBoth: function(t, b, c, d){  //加速减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t + b;
            }
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInStrong: function(t, b, c, d){  //加加速曲线
            return c*(t/=d)*t*t*t + b;
        },
        easeOutStrong: function(t, b, c, d){  //减减速曲线
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t*t*t + b;
            }
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
            if (t === 0) { 
                return b; 
            }
            if ( (t /= d) == 1 ) {
                return b+c; 
            }
            if (!p) {
                p=d*0.3; 
            }
            if (!a || a < Math.abs(c)) {
                a = c; 
                var s = p/4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },    
        elasticBoth: function(t, b, c, d, a, p){
            if (t === 0) {
                return b;
            }
            if ( (t /= d/2) == 2 ) {
                return b+c;
            }
            if (!p) {
                p = d*(0.3*1.5);
            }
            if ( !a || a < Math.abs(c) ) {
                a = c; 
                var s = p/4;
            }else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            if (t < 1) {
                return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
                        Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            }
            return a*Math.pow(2,-10*(t-=1)) * 
                    Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
        },
        backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
            if (typeof s == 'undefined') {
               s = 1.70158;
            }
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        backOut: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 1.70158;  //回缩的距离
            }
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }, 
        backBoth: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 1.70158; 
            }
            if ((t /= d/2 ) < 1) {
                return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            }
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
            return c - Tween['bounceOut'](d-t, 0, c, d) + b;
        },       
        bounceOut: function(t, b, c, d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
            }
            return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
        },      
        bounceBoth: function(t, b, c, d){
            if (t < d/2) {
                return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
            }
            return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
        }
    }
    ~(function(w) {
        var _timer = function() {}
        _timer.prototype = {
            _init: function(obj, iNum, callBack) {
                this.oSecond = obj;
                this.timer = null;
                this.iSecond = 60;
                this._interval(iNum, callBack);
            },
            _interval: function(iNum, callBack) {
                var _this = this;
                this.timer && clearInterval(this.timer);
                var isec = iNum ? iNum : _this.iSecond;
                this.timer = setInterval(function() {
                    _this.oSecond.innerHTML = isec <= 10 ? "0" + --isec + "秒后可重新发送" : --isec + "秒后可重新发送";
                    if (isec <= 0) {
                        clearInterval(_this.timer);
                        p.removeClass(_this.oSecond, "disable");
                        _this.oSecond.innerHTML = "发送验证码";

                    }
                }, 1000);
            }
        }

        var _tab = function() {
            this.setings = {
                tabId: "",
                contents: "",
                offset: "" // opacity
            }
            if (this.setings.tabId == "") return;
        }
        _tab.prototype.init = function(opts) {
            var self = this;
            p._extend(this.setings, opts);
            this.setings.index = 0;
            if(!document.getElementById(this.setings.tabId)){ return; }
            this.childNode = document.getElementById(this.setings.tabId).children;
            this.childPanel = document.getElementById(this.setings.contents).children;
            !p.hasClass(this.childNode[0],'active')?p.addClass(this.childNode[0],'active'):'';
            if (this.setings.offset == 'opacity') {
                p.addClass(this.childPanel, 'none');
                p.removeClass(this.childPanel[0], 'none');
            } else {
                for (var i = 0; i < this.childPanel.length; i++) {
                    this.childPanel[i].style.display = 'none';
                }
                this.childPanel[0].style.display = 'block';
            }
            for(var i=0;i<this.childNode.length;i++){
                (function(index){
                    self.childNode[index].onclick = function(){
                        self.changeTab(this, index);
                    }
                })(i);
            }
        };
        _tab.prototype.changeTab = function(obj, index) {
            var self = this;
            for (var i = 0; i < this.childNode.length; i++) {
                p.removeClass(this.childNode[i], 'active');
            }
            p.addClass(obj, 'active');
            if (self.setings.offset == 'opacity') {
                for (var i = 0; i < this.childPanel.length; i++) {
                    p.addClass(this.childPanel[i], 'none');
                }
                p.removeClass(this.childPanel[index], 'none');
            } else {
                for (var i = 0; i < this.childPanel.length; i++) {
                    this.childPanel[i].style.display = 'none';
                }
                this.childPanel[index].style.display = 'block';
            }
            this.setings.index = index;
            this.setings.callBack && this.setings.callBack();
        }

        w.oHtml = document.querySelector("html");
        w.oBody = document.querySelector("body");

        w.p = {
            /*
            * o: obj 运动的对象
            * j: json 运动的css属性
            * d: duration 持续时间
            * f: fx 动画效果
            * c: callback 回调函数
            * move(obj, {attr:0,attr:0}, 1000, 'linear',function(){ code... });
            */
            move: function(obj, json, duration, fx, callback) {
                var oTimer = null;
                var d = duration || 1000;
                var j = {};
                for (var attr in json) {
                        j[attr] = {};
                        if (attr == 'opacity') {
                            j[attr].b = Math.round(p.css(obj, attr));
                            j[attr].c = json[attr]*100 - j[attr].b;
                        } else {
                            j[attr].b = parseInt(p.css(obj, attr));
                            j[attr].c = json[attr] - j[attr].b;
                        }
                }
                var fx = fx || 'linear';
                var t1 = new Date().getTime();
                oTimer = setInterval(function() {
                    var t = new Date().getTime() - t1;
                    if (t >= d) {
                        t = d;
                    }
                    for (var attr in json) {
                        var v = Tween[fx](t, j[attr].b, j[attr].c, d);
                        if (attr == 'opacity') {
                            obj.style[attr] = v / 100;
                            obj.style.filter = "alpha(opacity="+v+")";
                        } else {
                            obj.style[attr] = v + 'px';
                        }
                        p.css(obj,attr,v);
                    }
                    if (t == d) {
                        clearInterval(oTimer);
                        callback && callback.call(obj);
                    }
                }, 16);
            },
            css: function(obj, attr, value){
                if(!obj){
                    return false;
                }
                if(arguments.length==2){
                    if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'||attr=='rotateY'||attr=='scaleX'||attr=='scaleY'||attr=="translateZ"||attr=="translateX"||attr=="translateY"||attr=="skewY"||attr=="skewX"){
                        if(! obj.$Transform){
                            obj.$Transform={};
                        }
                        switch(attr){
                            case 'scale':
                            case 'scaleX':
                            case 'scaleY':
                            return typeof(obj.$Transform[attr])=='number'?obj.$Transform[attr]:100;
                            break;
                            default:
                                return obj.$Transform[attr]?obj.$Transform[attr]:0;
                        }
                    }
                    var sCur=obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr];
                    if(attr=='opacity'){
                        return Math.round((parseFloat(sCur)*100));
                    }else{
                        return parseInt(sCur);
                    }
                }else if(arguments.length==3){
                    switch(attr){
                        case 'scale':
                        case 'scaleX':
                        case 'scaleY':
                        case 'rotate':
                        case 'rotateX':
                        case 'rotateY':
                        case 'translateZ':
                        case 'translateX':
                        case 'translateY':
                        case 'skewY':
                        case 'skewX':
                        p.setCss3(obj, attr, value);
                        break;
                        case 'width':
                        case 'height':
                        case 'paddingLeft':
                        case 'paddingTop':
                        case 'paddingRight':
                        case 'paddingBottom':
                            value=Math.max(value,0);
                        case 'left':
                        case 'top':
                        case 'marginLeft':
                        case 'marginTop':
                        case 'marginRight':
                        case 'marginBottom':
                            if(typeof value=="string")
                            {
                                obj.style[attr]=value;
                            }
                            else
                            {
                                obj.style[attr]=value+'px';
                            }
                            break;
                        case 'opacity':
                            obj.style.filter="alpha(opacity:"+value+")";
                            obj.style.opacity=value/100;
                            break;
                        default:
                            obj.style[attr]=value;
                    }
                }
                return function (attr_in, value_in){css(obj, attr_in, value_in)};
            },
            setCss3: function(obj, attr, value){
                var sTr="";
                var sVal="";
                var arr=["Webkit","Moz","O","ms",""];
                if(! obj["$Transform"]){
                    obj["$Transform"]={};
                }
                obj["$Transform"][attr]=parseInt(value);
                for( sTr in obj["$Transform"]){
                    switch(sTr){
                        case 'scale':
                        case 'scaleX':
                        case 'scaleY':
                        sVal+=sTr+"("+(obj["$Transform"][sTr]/100)+") ";    
                        break;
                        case 'rotate':
                        case 'rotateX':
                        case 'rotateY':
                        case 'skewY':
                        case 'skewX':
                        sVal+=sTr+"("+(obj["$Transform"][sTr])+"deg) "; 
                        break;
                        case 'translateZ':
                        case 'translateX':
                        case 'translateY':
                        sVal+=sTr+"("+(obj["$Transform"][sTr])+"px) ";  
                        break;
                    }
                }
                for(var i=0;i<arr.length;i++){
                    obj.style[arr[i]+"Transform"]=sVal;
                }
            },
            getId: function(obj) {
                return document.getElementById(obj);
            },
            getClass: function(obj, className) {
                if (obj && obj.getElementsByClassName) {
                    return obj.getElementsByClassName(className);
                } else {
                    var arr = [],
                        collections = obj.getElementsByTagName('*'),
                        len = collections.length;
                    for (var i = 0; i < len; i++) {
                        if (collections[i].className.indexOf(className) > -1) {
                            if (collections[i].className == className) {
                                arr.push(collections[i]);
                            }
                        }
                    }
                    return arr;
                }
            },
            addClass: function(element, className) {
                if (!p.hasClass(element, className)) {
                    if (!element.className) {
                        element.className += className;
                    } else {
                        element.className += " " + className;
                    }
                }
            },
            removeClass: function(element, className) {
                if (p.hasClass(element, className)) {
                    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                    element.className = element.className.replace(reg, '');
                }
            },
            hasClass: function(element, className) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                return element.className.match(reg);
            },
            getStyle: function(obj, style) {
                if (!obj) {
                    return;
                }
                var css = obj.currentStyle ? obj.currentStyle[style] : getComputedStyle(obj, false)[style];
                return css;
            },
            getPrev: function(obj) {
                var prev = obj.previousSibling.nodeType != 1 ? obj.previousSibling.previousSibling : obj.previousSibling;　　
                return prev;
            },
            getNext: function(obj) {　　
                var next = obj.nextSibling.nodeType != 1 ? obj.nextSibling.nextSibling : obj.nextSibling;　　
                return next;
            },
            siblings: function(elm) {
                var a = [];
                var b = elm.parentNode.children;
                for (var i = 0; i < b.length; i++) {
                    if (b[i] != elm) {
                        a.push(b[i]);
                    }
                }
                return a;
            },
            addEvent: function(element, eventType, eventHandler) {
                eventType = eventType.replace(/^on/i, '').toLowerCase();
                if (element.addEventListener) {
                    element.addEventListener(eventType, eventHandler, false);
                } else {
                    element.attachEvent('on' + eventType, function() {
                        eventHandler(window.event);
                    });
                }
            },
            addHander: function(element, type, fn) {
                if (element.addEventListener) {
                    element.addEventListener(type, fn, false);
                } else if (element.attachEvent) {
                    element.attachEvent('on' + type, fn);
                } else {
                    element['on' + type] = fn;
                }
            },
            /*
             * @method removeHander() 删除事件监听
             */
            removeHander: function(element, type, fn) {
                if (element.removeEventListener) {
                    element.removeEventListener(type, fn, false);
                } else if (element.detachEvent) {
                    element.detachEvent('on' + type, fn);
                } else {
                    element['on' + type] = null;
                }
            },
            stopPropagation: function(e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    e.cancelBubble = true;
                }
            },
            preventDefault: function(event) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            },
            getParameterByName: function(name) {
                var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.href);
                return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
            },
            _extend: function(childObj, parentObj) {
                for (var attr in parentObj) {
                    childObj[attr] = parentObj[attr];
                }
            },
            getOffset: function(Node, offset) {
                if (!offset) {
                    offset = {
                        top: 0,
                        left: 0
                    };
                }
                //当该节点为body节点时，结束递归
                if (Node == document.body) {
                    return offset;
                }
                offset.top += Node.offsetTop;
                offset.left += Node.offsetLeft;
                //向上累加offset里的值
                return p.getOffset(Node.parentNode, offset);
            },
            servicesError: function(){
                layer.msg('服务器请求失败');
            },
            /*
            arguments: obj 需要设置的元素对象
            arguments: iNum 倒计时秒数
            */
            timer: function(obj, iNum, callback) {
                return new _timer()._init(obj, iNum, callback);
            },
            tab: function(obj) {
                return new _tab().init(obj);
            },
            // 关闭弹窗
            closePop:function(closeBtn){
                closeBtn.click(function() { layer.closeAll(); });
                $(document).keydown(function(e){ if(e.keyCode==27){ layer.closeAll(); } });
            },
            /**
             * @$scope.paginationConf 分页对象
             * @callBack 分页onchange过后执行的回调
             * @return 根据记录数计算分页
             */
            resetPageList: function ($scope,pageConfig,pageNumber,pageArr,pagingData,callBack){
                eval('$scope.'+pageConfig+'.currentPage = '+pagingData.PageIndex);
                eval('$scope.'+pageConfig+'.totalItems = '+pagingData.RecordCount);
                eval('$scope.'+pageConfig+'.itemsPerPage = '+pageNumber);
                eval('$scope.'+pageConfig+'={'+
                    'currentPage: pagingData.PageIndex,'+
                    'totalItems: pagingData.RecordCount,'+
                    'itemsPerPage: pageNumber,'+
                    'pagesLength: 9,'+
                    'isShowHome: false,'+
                    'isShowLast: false,'+
                    //'isShowPerPageOption: pageArr.length>1?true:false,'+
                    'perPageOptions: pageArr,'+
                    //'rememberPerPage: rememberPerPage,'+
                    'onChange: function() {'+
                        'var me = this;'+
                        'callBack&&callBack(this);'+
                    '}'+
                '}');
                // 如果是弹窗,再执行分页
                if(typeof getPagination == "function"){
                    getPagination(); // 重新计算分页功能
                }
            },
            // 阿拉伯数字转中文
            numberToCh: {
                '1': '一',
                '2': '二',
                '3': '三',
                '4': '四',
                '5': '五',
                '6': '六',
                '7': '七',
                '8': '八',
                '9': '九',
                '10': '十',
                '11': '十一',
                '12': '十二'
            },
            // 阿拉伯数字转罗马数字
            roman: {
                '1': 'I',
                '2': 'II',
                '3': 'III',
                '4': 'IV',
                '5': 'V',
                '6': 'VI',
                '7': 'VII',
                '8': 'VIII',
                '9': 'IX',
                '10': 'X',
                '11': 'XI',
                '12': 'XII'
            }
        }

        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        }
        // 删除数组中的某个元素
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
            return this;
        }
        // 数组去重
        Array.prototype.unique = function() {
            this.sort();
            var re=[this[0]];
            for(var i = 1; i < this.length; i++) {
                if( this[i] !== re[re.length-1]) {
                    re.push(this[i]);
                }
            }
            return re;
        }

        /**
         *
         * @param 期望截取的字数个数
         * @returns 返回截取的字符,当字符数小于等于len时直接返回该字符,否则返回带有...符号
         */
        String.prototype.substrlen = function (len) {
            var a = [];
            for(var i=0;i<this.length;i++){
                a.push(this[i]);
            }
            return this.length!=null?(this.length <= len ? a.join('') : a.join('').substring(0, len) + "..."):'';
        }

        p.REGS = {
            PHONE: /^1[3|4|5|7|8][0-9]\d{8}$/, // 手机号码
            EMAIL: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, // 邮箱地址
            PASSWORLD: /^(?!\D+$)(?![^a-zA-Z]+$)\S{8,16}$/, // 密码长度8-16位，数字与字母结合
            SPACE: /\s/, // 匹配空格
            CHINESE: /^[\u0391-\uFFE5]+$/ // 匹配中文
        }
    })(window);

    return p;
});