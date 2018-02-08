define(function() {

	//次幂函数
	var MathPow = function(num, power) {
		var returnNum = 0;
		returnNum = Math.pow(num, power);
		return returnNum.toFixed(6);
	}

	//检索地价参数表
	var getLParam = function(name, xVal, yVal) {
		var arr = [];
		$.ajax({
			type: "post",
			async: false, //同步
			url: "/pep_java_server/dictionary/getlandpriceparameter.do", //http://192.168.6.238:8080/pep_java_server/dictionary/getlandpriceparameter.do
			//url:"mould/getlandpriceparameter.do",
			data: {
				"name": name
			},
			success: function(e) {
				if (e.msg == "yes") {
					arr = JSON.parse(e.data.content);
				} else {
					alert("错误");
				}
			},
			error: function(msg) {
				flag = false;
			}
		});
		var xindex = 0;
		var yindex = 0;
		for (var i = 0; i < arr.length; i++) {
			if (xVal == arr[i][0]) {
				xindex = i;
			}
		}
		for (var i = 0; i < arr[0].length; i++) {
			if (yVal == arr[0][i]) {
				yindex = i;
			}
		}
		return arr[xindex][yindex];
	}
	//var funArr = ['MathPow','getLParam'];
	window.getLParam = function(name, xVal, yVal) {
		return getLParam(name, xVal, yVal);
	},
	window.MathPow = function(num, power) {
		return MathPow(num, power);
	}
	return {
		arr: ['MathPow', 'getLParam']
	}
});