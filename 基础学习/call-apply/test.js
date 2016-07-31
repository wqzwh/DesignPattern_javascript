// apply 接受两个参数  第一个参数指定了函数体内this对象的指向，第二个参数为一个带下标的集合
var fun=function(a,b,c){
	console.log([a,b,c]);
}
fun.apply(null,[1,2,3,4,5]);//[1,2,3]
fun.call(null,1,2,3);//[1,2,3]

Math.max(1,2,4,6,3,2,8);//8
Math.max.call(null,1,2,4,6,3,2,8);//8
Math.max.apply(null,[1,2,4,6,3,2,8]);//8



// 用途
// 1改变this指向
var ob1={
	name:'1111'
};
var ob2={
	name:'2222'
};
window.name='3333';
var getName=function(){
	console.log(this.name);
}
getName();//3333
getName.call(ob1);//1111
getName.apply(ob2);//2222

document.getElementById('div').onClick=function(){
	console.log(this.id);//this指向的是当前选中的div
	var fun=function(){
		console.log(this.id);
	}
	fun();//this指向的是window
	fun.call(this);//this指向的是当前选中的div
}

// 2通过bind来改变this指向
var obj={
	name:'2222'
}
var fun=function(a,b,c,d){
	console.log(this.name)
	console.log([a,b,c,d]);
}.bind(obj,1,2);
fun(5,6);//2222   [1,2,5,6]


// 3借用其他对象的方法
// 借用构造函数
var A=function(name){
	this.name=name;
};
var B=function(){
	A.apply(this,arguments);
};
B.prototype.getName=function(){
	return this.name
};
var b=new B('1111');
console.log(b.getName());//1111

// 对象是没有数组的一些方法的，但是可以借用call和apply来给对象使用数组方法

var aa={};
Array.prototype.push.call(aa,'1111');
aa.length;//1
aa[0];//1111

// 如果在IE7以下浏览器中执行，必须显式地给对象 a 设置 length 属性
var aa{
	length:0
}
