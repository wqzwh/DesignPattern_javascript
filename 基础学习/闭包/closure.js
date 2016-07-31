// 闭包
// 常规函数，当函数运行完，内部变量自动释放
var aaa=function () { 
    var a=1;
    console.log(a);
 }
 aaa();//1
 aaa();//1

//  变量的搜索是从内到外而非从外到内的

var a = 1;
var func1 = function(){
    var b = 2;
    var func2 = function(){
        var c = 3;
        alert ( b ); // 输出：2
        alert ( a ); // 输出：1
    }
    func2();
    alert ( c ); // 输出：Uncaught ReferenceError: c is not defined
};
func1();

// 闭包的简单例子
var aaa=function () { 
    var a=1;
    return function () { 
        a++;
        console.log(a);
     }
 }
 var f=aaa();
f();//2
f();//3
f();//4


// 闭包的作用
//1 封装变量
// 定义一个计算乘积的函数
var mult=function () {
    var a=1;
    for(var i=0;i<arguments.length;i++){
        a=a*arguments[i]
    };
    return a;
}
mult(1,2,3);//6


var caches={};
var preCaches=[];
var mult=function() {
    var args1=Array.prototype.join.call(arguments,',');
    var args=Array.prototype.sort(args1);//增加排序，保证123，321缓存一次
    if(caches[args]){
        return caches[args]
    }
    var a=1;
    for(var i=0;i<arguments.length;i++){
        a=a*arguments[i]
    }
    return caches[args]=a; 
}
mult(1,2,3);//6

// 将caches存在mult内部中，避免全局暴露
var mult=function() {
    var caches={};
    var args=Array.prototype.join.call(arguments,',');
    if(caches[args]){
        return caches[args]
    }
    var a=1;
    for(var i=0;i<arguments.length;i++){
        a=a*arguments[i]
    }
    return caches[args]=a;
}
mult(1,2,3);//6

// 改写自运行形式
var mult=(function() {
    var wqcaches={};
    return function () {
        var args=Array.prototype.join.call(arguments,',');
        if(wqcaches[args]){
            return wqcaches[args]
        }
        var a=1;
        for(var i=0;i<arguments.length;i++){
            a=a*arguments[i]
        }
        return wqcaches[args]=a;
    }
})();
mult(1,2,3);//6

// 把计算过程独立出来
var mult=(function() {
    var wqcaches={};
    var getResult=function() {
        var a=1;
        for(var i=0;i<arguments.length;i++){
            a=a*arguments[i]
        }
        return a;
    }
    return function () {
        var args=Array.prototype.join.call(arguments,',');
        if(wqcaches[args]){
            console.log("1111");
            return wqcaches[args]
        }
        return wqcaches[args]=getResult.apply(null,arguments);
    }
})();

// 2延续局部变量的寿命
// 我们把 img 变量用闭包封闭起来，便能解决请求丢失的问题
var report = (function(){
    var imgs = [];
    return function( src ){
        var img = new Image();
        imgs.push( img );
        img.src = src;
    }
})();