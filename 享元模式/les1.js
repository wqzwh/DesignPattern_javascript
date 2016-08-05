// 享元模式
// 运用共享技术来有效支持大量细粒度的对象

// 非享元模式写法
// 简单的例子
// 50件男士和50件女士内衣，然后需要模特并且拍照展示
// 缺点就是会个创建50个新对象，会占用内存
var Model=function(sex,underwear){
    this.sex=sex;
    this.underwear=underwear;
}
Model.prototype.takePhoto=function(){
    console.log( 'sex= ' + this.sex + ' underwear=' + this.underwear);
}
for(var i=0;i<50;i++){
    var model=new Model('男士','50件内衣');
    model.takePhoto();
}
for(var j=0;j<50;j++){
    var model=new Model('女士','50件内衣');
    model.takePhoto();
}

// 其实只需要两个模特即可，这样就能减少新对象的创建
// 享元模式写法
var Model=function(sex){
    this.sex=sex;
}
Model.prototype.takePhoto=function(){
    console.log( 'sex= ' + this.sex + ' underwear=' + this.underwear);
}
var man=new Model('man');
var woman=new Model('woman');

for(var i=0;i<50;i++){
    man.underwear=i+'件'
    man.takePhoto();
}
for(var j=0;j<50;j++){
    woman.underwear=j+'件'
    woman.takePhoto();
}



// 内部状态与外部状态
// 享元模式要求将对象的属性划分为内部状态与外部状态（状态在这里通常指属性）。享元模式的目标是尽量减少共享对象的数量
/**
 * 内部状态存储于对象内部。
 * 内部状态可以被一些对象共享。
 * 内部状态独立于具体的场景，通常不会改变。
 * 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。
 * */ 


// 文件上传的例子
// 未用享元模式编写
var id=0;
window.startUpload=function(uploadType,files){// uploadType 区分是控件还是 flash
    for(var i=0,file;file=files[i++];){
        var uploadObj=new Upload(uploadType, file.fileName, file.fileSize);
        uploadObj.init(id++); // 给 upload 对象设置一个唯一的 id
    }
}

var Upload=function(uploadType, fileName, fileSize){
    this.uploadType=uploadType;
    this.fileName=fileName;
    this.fileSize=fileSize;
    this.dom= null;
}
Upload.prototype.init = function( id ){
    var that = this;
    this.id = id;
    this.dom = document.createElement( 'div' );
    this.dom.innerHTML =
        '<span>文件名称:'+ this.fileName +', 文件大小: '+ this.fileSize +'</span>' +
        '<button class="delFile">删除</button>';
    this.dom.querySelector( '.delFile' ).onclick = function(){
        that.delFile();
    }
    document.body.appendChild( this.dom );
};
Upload.prototype.delFile = function(){
    if ( this.fileSize < 3000 ){
        return this.dom.parentNode.removeChild( this.dom );
    }
    if ( window.confirm( '确定要删除该文件吗? ' + this.fileName ) ){
        return this.dom.parentNode.removeChild( this.dom );
    }
};
// 分别创建 3个插件上传对象和 3个 Flash上传对象
startUpload( 'plugin', [
    {
        fileName: '1.txt',
        fileSize: 1000
    },
    {
        fileName: '2.html',
        fileSize: 3000
    },
    {
        fileName: '3.txt',
        fileSize: 5000
    }
]);
startUpload( 'flash', [
    {
        fileName: '4.txt',
        fileSize: 1000
    },
    {
        fileName: '5.html',
        fileSize: 3000
    },
    {
        fileName: '6.txt',
        fileSize: 5000
    }
]);

// 用享元模式重构文件上传
// 避免在startUpload中重复创建对象，其实只需要根据上传类型不同创建两个对象即可，因此上传类型是可以被共享的，应该设为内部状态，其余的文件大小文件名称可以设为外部状态
var Upload=function(uploadType){
    this.uploadType=uploadType;
    this.dom= null;
}
Upload.prototype.delFile = function(id){
    // 这里获取不到fileSize和fileName，因为他们是外部状态。调用一个函数来获取外部状态的参数
    uploadManager.setExternalState( id, this );
    console.log(this.fileSize);
    console.log(this.fileName);
    if ( this.fileSize < 3000 ){
        return this.dom.parentNode.removeChild( this.dom );
    }
    if ( window.confirm( '确定要删除该文件吗? ' + this.fileName ) ){
        return this.dom.parentNode.removeChild( this.dom );
    }
};
// 定义一个方法来判断是否创建过对象
var UploadCreateObject=(function(){
    // 定义一个空对象来保存创建的新对象
    var createdObjs = {};
    return {
        create:function(uploadType){
            if ( createdObjs [ uploadType] ){
                return createdObjs [ uploadType];
            }
            return createdObjs [ uploadType] = new Upload( uploadType);
        }
    }
})();
// 封装外部状态
var uploadManager=(function(){
    // 保存所有的外部对象
    var uploadExternalObject = {};
    return {
        add:function(id,uploadType, fileName, fileSize){
            // 判断是否需要创建新对象
            var createObj=UploadCreateObject.create(uploadType);
            var dom = document.createElement( 'div' );
            dom.innerHTML =
                '<span>文件名称:'+ fileName +', 文件大小: '+ fileSize +'</span>' +
                '<button class="delFile">删除</button>';
            dom.querySelector( '.delFile' ).onclick = function(){
                createObj.delFile(id);
            }
            document.body.appendChild( dom );
            uploadExternalObject[ id ] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom
            };
            return createObj;
        },
        setExternalState:function(id, createObj){
            var uploadData = uploadExternalObject[ id ];
            for ( var i in uploadData ){
                createObj[ i ] = uploadData[ i ];
            }
        }
    }
})();

// 使用
var id=0;
window.startUpload=function(uploadType,files){// uploadType 区分是控件还是 flash
    for(var i=0,file;file=files[i++];){
        uploadManager.add(++id,uploadType, file.fileName, file.fileSize);
    }
}
startUpload( 'plugin', [
    {
        fileName: '1.txt',
        fileSize: 1000
    },
    {
        fileName: '2.html',
        fileSize: 3000
    },
    {
        fileName: '3.txt',
        fileSize: 5000
    }
]);
startUpload( 'flash', [
    {
        fileName: '4.txt',
        fileSize: 1000
    },
    {
        fileName: '5.html',
        fileSize: 3000
    },
    {
        fileName: '6.txt',
        fileSize: 5000
    }
]);







