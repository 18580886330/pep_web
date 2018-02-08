/**
 * 加载时处理可能发生的不如意的事
 */
define(function() {
	/**
	 * 1.清除浏览器前进后退按钮时有弹出层未关闭的情况出现的阴影层
	 */
	var removeShade = function(){
		var layerShade = p.getClass(document,'layui-layer-shade');
		if(layerShade){
		    for (var i = 0; i < layerShade.length; i++) {
		        document.body.removeChild(layerShade[i]);
		    }
		}
	}
	return {
		removeShade:removeShade
	}
});
