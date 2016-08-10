// 装饰者模式，在不改变原有对象上的方法，额外添加其方法
// 模拟传统面向对象语言的装饰者模式
var Plane = function(){}
Plane.prototype.fire = function(){
    console.log( '发射普通子弹' );
}
var MissileDecorator = function( plane ){
    this.plane = plane;
}
MissileDecorator.prototype.fire = function(){
    this.plane.fire();
    console.log( '发射导弹' );
}
var AtomDecorator = function( plane ){
    this.plane = plane;
}
AtomDecorator.prototype.fire = function(){
    this.plane.fire();
    console.log( '发射原子弹' );
}
var plane = new Plane();
plane = new MissileDecorator( plane );
plane = new AtomDecorator( plane );
plane.fire();// 分别输出： 发射普通子弹、发射导弹、发射原子弹


// JavaScript 的装饰者
var plane = {
    fire: function(){
        console.log('发射普通子弹');
    }
}
var missileDecorator = function(){
    console.log( '发射导弹' );
}
var atomDecorator = function(){
    console.log( '发射原子弹' );
}
var fire1 = plane.fire;
plane.fire = function(){
    fire1();
    missileDecorator();
}
var fire2 = plane.fire;
plane.fire = function(){
    fire2();
    atomDecorator();
}
plane.fire();// 分别输出： 发射普通子弹、发射导弹、发射原子弹



// 装饰函数
// 常规做法
var a=function(){
    console.log("1")
}
var _a=a;
a=function(){
    _a();
    console.log("2")
}
a(); //1  2


window.onload = function(){
    alert (1);
}
var _onload = window.onload || function(){};
window.onload = (function(){
    _onload();
    alert (2);
})();//1 2

// 存在两个弊端
// 1、中间变量会很多
//  this 被劫持的问题
var _getElementById = document.getElementById;
document.getElementById = function( id ){
    alert (1);
    return _getElementById( id ); // 抛出异常错误，document.getElementById这是个内部方法，this必须是document才会正确
}
var button = document.getElementById( 'button' );

// 改写，把document传给全局保存的_getElementById
var _getElementById = document.getElementById;
document.getElementById = function( ){
    alert (1);
    return _getElementById.apply(document,arguments);
}
var button = document.getElementById( 'button' );



// 用 AOP 装饰函数
