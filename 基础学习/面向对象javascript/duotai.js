// 多态
// 多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句

// 编写一个地图应用
// 突然需求改变，需要增加一个百度地图
// 以下是常规写法
var googleMap={
	show:function (argument) {
		console.log("谷歌地图");
	}
}
var baiduMap={
	show:function (argument) {
		console.log("百度地图");
	}
}

var renderMap=function(type){
	if(type==='google'){
		googleMap.show();
	}else if(type === 'baidu'){
		baiduMap.show();
	}
}

renderMap('google');//谷歌地图
renderMap('baidu');//百度地图

// 改写以上的代码,避免renderMap里面过多的条件语句
var renderMap=function(map){
	if(map.show instanceof Function){
		map.show();
	}
}
// 如果增加个搜狗地图就会很方便
var sosoMap={
	show:function(){
		console.log('搜狗地图');
	}
}
renderMap(sosoMap);//搜狗地图
renderMap(googleMap);//谷歌地图
renderMap(baiduMap);//百度地图