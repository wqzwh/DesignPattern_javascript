// 对象池
// 建立获取气泡的工厂，创建节点div，回收节点div
var toolTipFactory=(function(){
    // 定义一个存放节点的数组
    var toolTipPool=[];
    return {
        create:function(){
            // 判断对象数组中是否存在新创建的对象
            if(toolTipPool.length===0){
                // 如果不存在那么再创建一个新的节点
                var div=document.createElement('div');
                document.body.appendChild(div);
                return div;
            }else{
                // 如果不为空，直接在对象池中提取存放的节点
                return toolTipPool.shift(); // 则从对象池中取出一个
            }
        },
        recover:function(tooltipDom){
            return toolTipPool.push( tooltipDom ); // 对象池回收 dom
        }
    }
})();
// 第一次搜索需要展示两个节点
var ary=[];
for(var i=0,str; str = [ 'A', 'B' ][ i++ ];){
    var toolTip=toolTipFactory.create();
    toolTip.innerHTML = str;
    ary.push( toolTip );
}
// 在第二次搜索前回收第一次搜索创建的节点
for(var i=0,toolTip; toolTip = ary[ i++ ];){
    toolTipFactory.recover( toolTip );
}
// 第二次搜索展示6个节点
for ( var i = 0, str; str = [ 'A', 'B', 'C', 'D', 'E', 'F' ][ i++ ]; ){
    var toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
};



// 通用对象池实现
// 把创建对象的具体过程封装起来，实现一个通用的对象池
// fn为创建节点对象的方法
var toolTipFactory=function(fn){
    // 定义一个存放节点的数组
    var toolTipPool=[];
    return {
        create:function(){
            // 判断对象数组中是否存在新创建的对象
            if(toolTipPool.length===0){
                // 如果不存在那么再创建一个新的节点
                var obj=fn.apply(this,arguments);
                return obj
            }else{
                // 如果不为空，直接在对象池中提取存放的节点
                return toolTipPool.shift(); // 则从对象池中取出一个
            }
        },
        recover:function(tooltipDom){
            return toolTipPool.push( tooltipDom ); // 对象池回收 dom
        }
    }
};

// 创建一个装载一些 iframe 的对象池
var iframeFactory=toolTipFactory(function(){
    var iframe = document.createElement( 'iframe' );
    document.body.appendChild( iframe );
    iframe.onload = function(){
        iframe.onload = null; // 防止 iframe 重复加载的 bug
        iframeFactory.recover( iframe ); // iframe 加载完成之后回收节点
    }
    return iframe;
})
var iframe1 = iframeFactory.create();
iframe1.src = 'http:// baidu.com';
var iframe2 = iframeFactory.create();
iframe2.src = 'http:// QQ.com';
setTimeout(function(){
    var iframe3 = iframeFactory.create();
    iframe3.src = 'http:// 163.com';
}, 3000 );