// 虚拟代理实现图片预加载
var myImage=(function(){
    var imgNode=document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc:function(src){
            imgNode.src=src;
        }
    }
})();

// 定义一个代理函数
var proxyImage=(function(){
    var img=new Image;
    img.onload=function(){
        myImage.setSrc(this.src);
    }
    return {
        setSrc:function (src) { 
            myImage.setSrc('loading.gif');
            img.src=src;
         }
    }
})();
proxyImage.setSrc('large.jpg');