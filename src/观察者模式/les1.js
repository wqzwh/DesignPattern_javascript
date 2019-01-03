// 观察者模式（发布订阅模式）
// 定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知

// DOM 事件
// 给body订阅三个click
document.body.addEventListener( 'click', function(){
    alert(2);
}, false );
document.body.addEventListener( 'click', function(){
    alert(3);
}, false );
document.body.addEventListener( 'click', function(){
    alert(4);
}, false );
document.body.click();// 模拟用户点击 触发所订阅的三个click


// 自定义事件
/**
 * 定义一个售楼处
 * 定义一个收集客户信息的数组
 * 售楼处针对客户可以订阅信息
 * 售楼处正对订阅的用户发布信息
 * **/ 

// 定义一个售楼处
var SalesOffices={};
// 定义一个收集客户信息的数组
SalesOffices.clientList=[];
// 售楼处针对客户可以订阅信息
SalesOffices.listen=function(fn){
    this.clientList.push(fn)
};
// 售楼处正对订阅的用户发布信息
SalesOffices.release=function(){
    for(var i=0,fn;fn=this.clientList[i++];){
        fn.apply(this,arguments);
    }
}
// 客户1订阅
SalesOffices.listen(function(price, squareMeter){
    console.log('价格:'+price);
    console.log('平方数:'+squareMeter);
})
// 客户2订阅
SalesOffices.listen(function(price, squareMeter){
    console.log('价格:'+price);
    console.log('平方数:'+squareMeter);
})
// 售楼处正对订阅的用户发布信息
SalesOffices.release(10000,90);
SalesOffices.release(20000,110);
// 存在一个问题，就是发布的信息不是针对客户的预留信息发布的
// 改写代码 增加一个对应的key值

// 定义一个售楼处
var SalesOffices={};
// 定义一个收集客户信息的数组
SalesOffices.clientList=[];
// 售楼处针对客户可以订阅信息
SalesOffices.listen=function(key,fn){
    if(!this.clientList[key]){// 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
        this.clientList[ key ] = [];
    }
    this.clientList[key].push(fn)
};
// 售楼处正对订阅的用户发布信息
SalesOffices.release=function(){
    // 取出对应的key和对应的fns函数
    var key=Array.prototype.shift.call(arguments);
    var fns=this.clientList[ key ];

    if(!fns || fns.length === 0){//判断是否存在对应key的函数
        return false
    }

    for(var i=0,fn;fn=fns[i++];){
        fn.apply(this,arguments);
    }
}
// 客户1订阅
SalesOffices.listen('squareMeter90',function(price, squareMeter){
    console.log('价格:'+price);
    console.log('平方数:'+squareMeter);
})
// 客户2订阅
SalesOffices.listen('squareMeter110',function(price, squareMeter){
    console.log('价格:'+price);
    console.log('平方数:'+squareMeter);
})
// 售楼处正对订阅的用户发布信息
SalesOffices.release('squareMeter90',10000,90); //价格:10000 平方数:90
SalesOffices.release('squareMeter110',20000,110); //价格:20000 平方数:110


// 通用的发布订阅模式
// 将发布订阅代码单独封装在一个类中
// 定义一个方法来安装发布订阅模式
var event={
    clientList:[],
    listen:function(key,fn){
        if(!this.clientList[key]){// 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
            this.clientList[ key ] = [];
        }
        this.clientList[key].push(fn)
    },
    release:function(){
        // 取出对应的key和对应的fns函数
        var key=Array.prototype.shift.call(arguments);
        var fns=this.clientList[ key ];
        if(!fns || fns.length === 0){//判断是否存在对应key的函数
            return false
        }
        for(var i=0,fn;fn=fns[i++];){
            fn.apply(this,arguments);
        }
    }
}
// 定义安装发布订阅函数
var installEvent=function(obj){
    for ( var i in event ){
        obj[ i ] = event[ i ];
    }
};
// 定义一个售楼处
var SalesOffices={};
installEvent( SalesOffices );
// 客户1订阅
SalesOffices.listen('squareMeter90',function(price, squareMeter){
    console.log('价格:'+price);
    console.log('平方数:'+squareMeter);
})
// 客户2订阅
SalesOffices.listen('squareMeter110',function(price, squareMeter){
    console.log('价格:'+price);
    console.log('平方数:'+squareMeter);
})
// 售楼处正对订阅的用户发布信息
SalesOffices.release('squareMeter90',10000,90); //价格:10000 平方数:90
SalesOffices.release('squareMeter110',20000,110); //价格:20000 平方数:110

// 取消订阅的事件
event.remove=function(key,fn){
    var fns=this.clientList[key];
    // 如果不存在fns那么就是直接返回false，无人订阅
    if(!fns){
        return false
    }

    // 如果没有传入fn，也需要取消对应的key
    if(!fn){
        fns && ( fns.length = 0 );
    }else{
        for ( var l = fns.length - 1; l >=0; l-- ){ // 反向遍历订阅的回调函数列表
            var _fn = fns[ l ];
            if ( _fn === fn ){
                fns.splice( l, 1 ); // 删除订阅者的回调函数
            }
        }
    }
}


// 重构event发布订阅模式，让用户直接从event直接订阅，并接受event的发布
var Event=(function(){
    var clientList={},
        listen,
        release,
        remove;

    listen=function(key,fn){
        if(!clientList[key]){// 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
            clientList[ key ] = [];
        }
        clientList[key].push(fn)
    };

    release=function(){
        // 取出对应的key和对应的fns函数
        var key=Array.prototype.shift.call(arguments);
        var fns=clientList[ key ];
        if(!fns || fns.length === 0){//判断是否存在对应key的函数
            return false
        }
        for(var i=0,fn;fn=fns[i++];){
            fn.apply(this,arguments);
        }
    }

    remove=function(key,fn){
        var fns=clientList[key];
        // 如果不存在fns那么就是直接返回false，无人订阅
        if(!fns){
            return false
        }

        // 如果没有传入fn，也需要取消对应的key
        if(!fn){
            fns && ( fns.length = 0 );
        }else{
            for ( var l = fns.length - 1; l >=0; l-- ){ // 反向遍历订阅的回调函数列表
                var _fn = fns[ l ];
                if ( _fn === fn ){
                    fns.splice( l, 1 ); // 删除订阅者的回调函数
                }
            }
        }
    }
    return {
        listen:listen,
        release:release,
        remove:remove
    }
})();
// 客户1订阅
Event.listen('squareMeter90',function(price, squareMeter){
    console.log('价格:'+price);
    console.log('平方数:'+squareMeter);
});
Event.release('squareMeter90',10000,90); //价格:10000 平方数:90






