// 定义一个对象
var duck={
	speak:function(){
		console.log("叫声...");
	}
};
var dog={
	speak:function(){
		console.log("叫声...");
	}
};
// 定义一个收集集合变量
var shouji=[];

// 定义一个方法来判断该动物是否有叫声
var joinS=function(animation){
	if(animation && typeof animation.speak==='function'){
		shouji.push(animation);
		console.log("有叫声的动物");
	}
};
joinS(duck);//有叫声的动物
joinS(dog);//有叫声的动物