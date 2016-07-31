// 函数作为参数传递
// 1. 回调函数
// 常规写法
var appendDiv = function(){
    for ( var i = 0; i < 100; i++ ){
        var div = document.createElement( 'div' );
        div.innerHTML = i;
        document.body.appendChild( div );
        div.style.display = 'none';
    }
};
appendDiv();
// 回调形式写法
var appendDiv=function (callback) {
    for ( var i = 0; i < 100; i++ ){
        var div = document.createElement( 'div' );
        div.innerHTML = i;
        document.body.appendChild( div );
        if(typeof callback === 'function'){
            callback(div)
        }
    }
}
appendDiv(function(node) {
    node.style.display='none';
});



// 函数作为返回值输出
// 1 判断数据的类型
// Object.prototype.toString.call(obj)来判断数据类型
var isType=function(type){
    return function (obj){
        return Object.prototype.toString.call(obj) === '[object '+type+']';
    }
}
var isString = isType( 'String' );
var isArray = isType( 'Array' );
var isNumber = isType( 'Number' );
console.log( isArray( [ 1, 2, 3 ] ) ); //true

// 另一种写法，用闭包的形式
for(var i=0,type;type=['String', 'Array', 'Number'][i++];){
    (function(type){
        Type[ 'is' + type ] = function( obj ){
            return Object.prototype.toString.call( obj ) === '[object '+ type +']';
        }
    })(type)
}
Type.isArray( [] ); // 输出：true
Type.isString( "str" ); // 输出：true



// 高阶函数实现AOP
Function.prototype.before = function( beforefn ){
    var __self = this; // 保存原函数的引用
    return function(){ // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply( this, arguments ); // 执行新函数，修正 this
        return __self.apply( this, arguments ); // 执行原函数
    }
};
Function.prototype.after = function( afterfn ){
    var __self = this;
    return function(){
        var ret = __self.apply( this, arguments );
        afterfn.apply( this, arguments );
        return ret;
    }
};
var func = function(){
    console.log( 2 );
};
func = func.before(function(){
    console.log( 1 );
}).after(function(){
    console.log( 3 );
});
func();//1,2,3


// 高阶函数的其他应用
// currying柯里化
// 编写一个计算每月开销的函数
var monthlyCost = 0;
var cost = function( money ){
    monthlyCost += money;
};
cost( 100 ); // 第 1 天开销
cost( 200 ); // 第 2 天开销
cost( 300 ); // 第 3 天开销
//cost( 700 ); // 第 30 天开销
alert ( monthlyCost ); // 输出：600
// 实际上只需要在月底计算一次
var cost = (function(){
    var args = [];
    return function(){
        if ( arguments.length === 0 ){
            var money = 0;
        for ( var i = 0, l = args.length; i < l; i++ ){
            money += args[ i ];
        }
            return money;
        }else{
            [].push.apply( args, arguments );
        }
    }
})();
cost( 100 ); // 未真正求值
cost( 200 ); // 未真正求值
cost( 300 ); // 未真正求值
console.log( cost() ); // 求值并输出：600

// currying独立出来
var currying=function(fn){
    var args=[];
    return function(){
        if ( arguments.length === 0 ){
            return fn.apply( this, args );
        }else{
            [].push.apply( args, arguments );
            return arguments.callee;
        }
    }
}
var cost = (function(){
    var money = 0;
    return function(){
        for ( var i = 0, l = arguments.length; i < l; i++ ){
            money += arguments[ i ];
        }
        return money;
    }
})();
var cost = currying( cost ); // 转化成 currying 函数
cost( 100 ); // 未真正求值
cost( 200 ); // 未真正求值
cost( 300 ); // 未真正求值
alert ( cost() ); // 求值并输出：600


// uncurrying 反柯里化
// 代码实现方式之一
Function.prototype.uncurrying = function () {
    var self = this;
    return function() {
        // shift 删除数组第一个元素并且返回这个值
        var obj = Array.prototype.shift.call( arguments );
        return self.apply( obj, arguments );
    };
};
// 将push方法变成普通的方法
var push = Array.prototype.push.uncurrying();
var aa={};
var bb=[];
console.log(push(aa,4));//Object {0: 4, length: 1}
console.log(push(bb,5));//[5]

// 一次性地把 Array.prototype 上的方法“复制”到 array 对象上
for(var i=0,fn,ary=[ 'push', 'shift', 'forEach' ];fn = ary[ i++ ];){
    Array[fn]=Array.prototype[fn].uncurrying();
}
var obj = {
    "length": 3,
    "0": 1,
    "1": 2,
    "2": 3
};
Array.push( obj, 4 ); // 向对象中添加一个元素
console.log( obj.length ); // 输出：4
var first = Array.shift( obj ); // 截取第一个元素
console.log( first ); // 输出：1
console.log( obj ); // 输出：{0: 2, 1: 3, 2: 4, length: 3}
Array.forEach( obj, function( i, n ){
    console.log( n ); // 分别输出：0, 1, 2
});

// uncurrying 的另外一种实现方式
Function.prototype.uncurrying = function(){
    var self = this;
    return function(){
        return Function.prototype.call.apply( self, arguments );
    }
};


// 函数节流的代码实现
var throttle = function ( fn, interval ) {
    var __self = fn, // 保存需要被延迟执行的函数引用
    timer, // 定时器
    firstTime = true; // 是否是第一次调用
    return function () {
        var args = arguments,
        __me = this;
        if ( firstTime ) { // 如果是第一次调用，不需延迟执行
            __self.apply(__me, args);
            return firstTime = false;
        }
        if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
            return false;
        }
        timer = setTimeout(function () { // 延迟一段时间执行
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, interval || 500 );
    };
};
window.onresize = throttle(function(){
    console.log( 1 );
}, 500 );

// 分时函数
// 一次性加载100000条dom数据
var ary = [];
for ( var i = 1; i <= 100000; i++ ){
    ary.push( i ); // 假设 ary 装载了 100000 个好友的数据
};
var renderFriendList = function( data ){
    for ( var i = 0, l = data.length; i < l; i++ ){
        var div = document.createElement( 'div' );
        div.innerHTML = i;
        document.body.appendChild( div );
    }
};
renderFriendList( ary );
// 将所有节点分时插入写法
// timeChunk 函数接受 3个参数，第 1个参数是创建节点时需要用到的数据，第 2个参数是封装了创建节点逻辑的函数，第 3个参数表示每一批创建的节点数量,第4个参数表示间隔的时间
var timeChunk=function(ary,fn,num,time){
    var t,obj;
    var len=ary.length;
    var startLen=Math.min(num || 1,len);
    // 定义一个开始渲染dom函数
    var start=function(){
        for(var i=0;i<startLen;i++){
            var obj=ary.shift();
            fn(obj)
        }
    };
    return function(){
        t=setInterval(function(){
            if ( ary.length === 0 ){ // 如果全部节点都已经被创建好
                return clearInterval( t );
            }
            start();
        },time);
    }
}
var ary = [];
for ( var i = 1; i <= 100000; i++ ){
    ary.push( i ); // 假设 ary 装载了 100000 个好友的数据
};
var renderFriendList = timeChunk(ary,function( n ){
        var div = document.createElement( 'div' );
        div.innerHTML = n;
        document.body.appendChild( div );
},100,200);
renderFriendList();


// 惰性加载函数
// 定义一个兼容浏览器的监听事件方法
// 常见的写法
// 缺点：每次都得运行if条件语句
var addEvent=function(elem, type, handler){
    if(window.addEventListener){//火狐、谷歌等标准浏览器
        return elem.addEventListener( type, handler, false );
    }
    if ( window.attachEvent ){//ie
        return elem.attachEvent( 'on' + type, handler );
    }
}
// 惰性加载函数的写法，就是将if结果赋值给当前这个兼容方法
var addEvent=function(elem, type, handler){
    if(window.addEventListener){//火狐、谷歌等标准浏览器
        addEvent=function(elem, type, handler){
            elem.addEventListener( type, handler, false );
        }
    }
    if ( window.attachEvent ){//ie
        addEvent=function(elem, type, handler){
            elem.attachEvent( 'on' + type, handler );
        }
    }
}
var div = document.getElementById( 'div1' );
addEvent( div, 'click', function(){
    alert (1);
});
addEvent( div, 'click', function(){
    alert (2);
});













