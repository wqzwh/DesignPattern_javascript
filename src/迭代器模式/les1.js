// 迭代器模式无非就是循环访问聚合对象中的各个元素
$.each([1,2,3], function (i, n) { //jq的each方法
    console.log(i); //下标值
    console.log(n); //当前值
});

// 实现自己的迭代器 仿照jq
var each=function(arr,callback){
    for(var i=0,l=arr.length;i<l;i++){
        callback.call(arr[i],i,arr[i]);// 把下标和元素当作参数传给 callback 函数
    }
}
each([1,2,3],function(i,n){
    console.log(i+'-----'+n);
})

// 判断两个数组是否相等
var each=function(arr,callback){
    for(var i=0,l=arr.length;i<l;i++){
        callback(i,arr[i]);// 把下标和元素当作参数传给 callback 函数
    }
}
var compare=function(arr1,arr2){
    if(arr1.length!==arr2.length){
        console.log("不相等1");
        return false
    }
    each(arr1,function(i,n){
        if(n!==arr2[i]){
            console.log("不相等2");
            return false
        }
    })
    console.log ( 'ary1 和 ary2 相等' );
}
compare( [ 1, 2, 3 ], [ 1, 2, 4 ] ); 



// 中止迭代器
// 改写each函数
var each=function(arr,callback){
    for(var i=0,l=arr.length;i<l;i++){
        if(callback.call(arr[i],i,arr[i])===false){
            break;
        }// 把下标和元素当作参数传给 callback 函数
    }
}
each([1,2,3,4,5,6],function(i,n){
    if(n>3){
        return false
    }
    console.log(i+'-----'+n);//0-----1  1-----2  2-----3
})


// 迭代器模式的应用举例
// 根据浏览器上传类型，书写通用的上传函数
// 将各自类型封装在自己的函数中，然后同迭代器去循环遍历来区分当前浏览器适合哪种上传模式

// 定义ie控件上传
var getActiveUploadObj=function(){
    try {
        return new ActiveXObject( "TXFTNActiveX.FTNUpload" ); // IE 上传控件
    } catch (error) {
        return false
    }
}
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
var getFlashUploadObj = function(){
    if ( flashChecker() ){ 
        var str = '<object type="application/x-shockwave-flash"></object>';
        return $( str ).appendTo( $('body') );
    }
    return false;
};
// 定义form表单上传
var getFormUpladObj = function(){
    var str = '<input name="file" type="file" class="ui-file"/>'; // 表单上传
    return $( str ).appendTo( $('body') );
};
// 定义迭代器
var iteratorUploadObj = function(){
    for ( var i = 0, fn; fn = arguments[ i++ ]; ){
        var uploadObj = fn();
        if ( uploadObj !== false ){
            return uploadObj;
        }
    }
};
// 具体使用
var uploadObj = iteratorUploadObj( getActiveUploadObj, getFlashUploadObj, getFormUpladObj );










