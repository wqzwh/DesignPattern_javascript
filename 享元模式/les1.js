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