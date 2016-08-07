// 职责链模式的定义是：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。
// 职责链模式代码实例
//  500 元订单、200 元订单以及普通购买，三种类型
// 三个参数：订单类型、是否支付、库存量
var order500=function(orderType, pay, stock){
    if(orderType===1 && pay===true){
        console.log( '500 元定金预购, 得到 100 优惠券' );
    }else{
        order200( orderType, pay, stock ); // 将请求传递给 200 元订单
    }
}
var order200=function(orderType, pay, stock){
    if(orderType===2 && pay===true){
        console.log( '200 元定金预购, 得到 50 优惠券' );
    }else{
        orderNormal( orderType, pay, stock ); // 将请求传递给 普通订单
    }
}
var orderNormal=function(orderType, pay, stock){
    if(stock>0){
        console.log( '普通购买, 无优惠券' );
    }else{
        console.log( '手机库存不足' );
    }
}
order500( 1 , true, 500); // 输出：500 元定金预购, 得到 100 优惠券
order500( 1, false, 500 ); // 输出：普通购买, 无优惠券
order500( 2, true, 500 ); // 输出：200 元定金预购, 得到 500 优惠券
order500( 3, false, 500 ); // 输出：普通购买, 无优惠券
order500( 3, false, 0 ); // 输出：手机库存不足
//  有个缺点：请求在链条传递中的顺序非常僵硬


// 灵活可拆分的职责链节点
var order500=function(orderType, pay, stock){
    if(orderType===1 && pay===true){
        console.log( '500 元定金预购, 得到 100 优惠券' );
    }else{
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
    }
}
var order200=function(orderType, pay, stock){
    if(orderType===2 && pay===true){
        console.log( '200 元定金预购, 得到 50 优惠券' );
    }else{
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
    }
}
var orderNormal=function(orderType, pay, stock){
    if(stock>0){
        console.log( '普通购买, 无优惠券' );
    }else{
        console.log( '手机库存不足' );
    }
}
// 定义一个链的构造函数，chain
// 还拥有一个实例属性 this.successor ，表示在链中的下一个节点
// setNextSuccessor  指定在链中的下一个节点
// passRequest 传递请求给某个节点

var Chain=function(fn){
    this.fn=fn;
    this.successor=null;
}
Chain.prototype.setNextSuccessor=function(successor){
    return this.successor = successor;
}
Chain.prototype.passRequest=function(){
    var ret = this.fn.apply( this, arguments );
    if ( ret === 'nextSuccessor' ){
        return this.successor && this.successor.passRequest.apply( this.successor, arguments );
    }
    return ret;
}
// 把 3个订单函数分别包装成职责链的节点：
var chainOrder500 = new Chain( order500 );
var chainOrder200 = new Chain( order200 );
var chainOrderNormal = new Chain( orderNormal );

// 然后指定节点在职责链中的顺序：
chainOrder500.setNextSuccessor( chainOrder200 );
chainOrder200.setNextSuccessor( chainOrderNormal );

chainOrder500.passRequest( 1, true, 500 ); // 输出：500 元定金预购，得到 100 优惠券
chainOrder500.passRequest( 2, true, 500 ); // 输出：200 元定金预购，得到 50 优惠券
chainOrder500.passRequest( 3, true, 500 ); // 输出：普通购买，无优惠券
chainOrder500.passRequest( 1, false, 0 ); // 输出：手机库存不足


// 异步的职责链
Chain.prototype.next= function(){
    return this.successor && this.successor.passRequest.apply( this.successor, arguments );
};
var fn1 = new Chain(function(){
    console.log( 1 );
    return 'nextSuccessor';
});
var fn2 = new Chain(function(){
    console.log( 2 );
    var self = this;
    setTimeout(function(){
        self.next();
    }, 1000 );
});
var fn3 = new Chain(function(){
    console.log( 3 );
});
fn1.setNextSuccessor( fn2 ).setNextSuccessor( fn3 );
fn1.passRequest();



// 用 AOP 实现职责链
// 改写 Function.prototype.after 函数
Function.prototype.after = function( fn ){
    var self = this;
    return function(){
        var ret = self.apply( this, arguments );
        if ( ret === 'nextSuccessor' ){
            return fn.apply( this, arguments );
        }
        return ret;
    }
};
var order = order500yuan.after( order200yuan ).after( orderNormal );
order( 1, true, 500 ); // 输出：500 元定金预购，得到 100 优惠券
order( 2, true, 500 ); // 输出：200 元定金预购，得到 50 优惠券
order( 1, false, 500 ); // 输出：普通购买，无优惠券


// 用职责链模式获取文件上传对象
// 定义flash上传函数
function flashChecker() {
    var hasFlash = 0; //是否安装了flash
    var flashVersion = 0; //flash版本
    if (document.all) {
      var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      if (swf) {
        hasFlash = 1;
        VSwf = swf.GetVariable("$version");
        flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
      }
    } else {
      if (navigator.plugins && navigator.plugins.length > 0) {
        var swf = navigator.plugins["Shockwave Flash"];
        if (swf) {
          hasFlash = 1;
          var words = swf.description.split(" ");
          for (var i = 0; i < words.length; ++i) {
            if (isNaN(parseInt(words[i]))) continue;
            flashVersion = parseInt(words[i]);
          }
        }
      }
    }
    return { f: hasFlash, v: flashVersion };
}
var getActiveUploadObj = function(){
    try{
        return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
    }catch(e){
        return 'nextSuccessor' ;
    }
};
var getFlashUploadObj = function(){
    if ( flashChecker() ){
        var str = '<object type="application/x-shockwave-flash"></object>';
        return $( str ).appendTo( $('body') );
    }
    return 'nextSuccessor' ;
};
var getFormUpladObj = function(){
    return $( '<form><input name="file" type="file"/></form>' ).appendTo( $('body') );
};
var getUploadObj = getActiveUploadObj.after( getFlashUploadObj ).after( getFormUpladObj );
console.log( getUploadObj() );