// 基于继承的设计模式——模板方法
// 模板方法模式是一种只需使用继承就可以实现的非常简单的模式。
// 模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架， 包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

// 咖啡和茶的例子
// 定义一个饮料类
// 定义一个泡的类
// 定义一个调料类

var Beverage = function(){};
Beverage.prototype.boilWater=function(){
    console.log('把水煮沸');
}
// 会有三个方法
// 泡的方式 brew()
// 倒进杯子的方法 pourInCup()
// 加料的方法 addCondiments()
Beverage.prototype.brew=function(){}
Beverage.prototype.pourInCup=function(){}
Beverage.prototype.addCondiments=function(){}
// 初始化方法init()
Beverage.prototype.init=function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
}

//  定义一个咖啡的类
var Coffee=function(){};
// Coffee.prototype=new Beverage();//这样继承会存在问题，不推荐使用
Coffee.prototype=Object.create(Beverage.prototype);
Coffee.prototype.constructor=Beverage;

Coffee.prototype.brew=function(){ 
    console.log( '用沸水冲泡咖啡' );
}
Coffee.prototype.pourInCup=function(){ 
    console.log( '把咖啡倒进杯子' );
}
Coffee.prototype.addCondiments=function(){ 
    console.log( '加糖和牛奶' );
}

var coffee=new Coffee();
coffee.init();


// 钩子方法 正对特殊的需求
// 改写以上的代码
// 定义一个钩子，默认是需要执行钩子里面的方法
Beverage.prototype.customerWantsCondiments=function(){
    return true;
}
// 初始化方法init()
Beverage.prototype.init=function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    if(this.customerWantsCondiments()){
        this.addCondiments();
    }
}
Coffee.prototype.customerWantsCondiments=function(){ 
    return false; //证明不需要调料
}
Coffee.init();



// 不用继承也能实现上面的效果
// 用函数作为参数的方法来实现
var Beverage=function(param){
    var boilWater=function(){
        console.log('把水煮沸');
    }
    var brew=param.brew || function(){
        console.log('必须定义泡方法');
    }
    var pourInCup=param.pourInCup || function(){
        console.log('必须定义倒方法');
    }
    var addCondiments=param.addCondiments || function(){
        console.log('必须定义添加原料方法');
    }
    // 定义一个方法
    var F=function(){}
    // 初始化这些方法的顺序
    F.prototype.init=function(){
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    };
    return F;
}

var Coffee=Beverage({
    brew:function(){
        console.log( '用沸水冲泡咖啡' );
    },
    pourInCup:function(){
        console.log( '把咖啡倒进杯子' );
    },
    addCondiments:function(){
        console.log( '加糖和牛奶' );
    }
});
var coffee=new Coffee();
coffee.init();



