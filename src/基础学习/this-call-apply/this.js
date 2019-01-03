// 作为对象的方法调用
// 作为普通函数调用
// 构造器调用
// call和apply的调用


// 作为对象的方法调用
var obj={
	a:1,
	getA:function() {
		console.log(arguments);
		console.log(this===obj);//true
		console.log(this.a);//1
	}
};
obj.getA();

// 作为普通函数调用
window.name='globaName';
var getName=function(){
	return this.name
};
console.log(getName());//globaName


window.name = 'globalName';
var myObject = {
	name: 'sven',
	getName: function(){
		console.log(this);
		return this.name;
	}
};
var getName = myObject.getName;
console.log( getName() ); // this会指向window对象
myObject.getName();//this会指向本身的myObject对象


function func(){
	"use strict"
	console.log(this);//undefined
}
func();

function func(){
	console.log(this);//window对象
}
func();




// 构造器调用
var MyClass = function(){
	this.name = 'sven';
};
var obj = new MyClass();
alert ( obj.name ); // 输出：sven
// 但用 new 调用构造器时，还要注意一个问题，如果构造器显式地返回了一个 object 类型的对象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的 this
var MyClass = function(){
	this.name = 'sven';
	return {
		name:'aaaa'
	}
};
var obj = new MyClass();
console.log ( obj.name ); // aaaa


var MyClass = function(){
	this.name = 'sven'
	return 'anne'; // 返回 string 类型
};
var obj = new MyClass();
alert ( obj.name ); // 输出：sven




// call 和 apply的调用
//跟普通的函数调用相比， 用 Function.prototype.call 或 Function.prototype.apply 可以动态地改变传入函数的 this

var obj1={
	name:'sven',
	getName:function(){
		return this.name;
	}
}

var obj2={
	name:'aaaa'
}

console.log(obj1.getName());//sven
console.log(obj1.getName.call(obj2));//aaaa

