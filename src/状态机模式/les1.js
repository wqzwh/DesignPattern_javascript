// 定义电灯开关状态
var Light=function(){
    this.state='off';//定义开关的状态，默认是关闭的
    this.button=null;//定义一个电灯开关按钮，并且保存在light这个对象上
}
Light.prototype.init=function(){
    var self=this;
    var button=document.createElement('button');
    button.innerHTML = '开关';
    this.button=document.body.appendChild( button );
    this.button.onclick=function(){
        self.buttonPress();
    }
}
Light.prototype.buttonPress=function(){
    if ( this.state === 'off' ){
        console.log( '开灯' );
        this.state = 'on';
    }else if ( this.state === 'on' ){
        console.log( '关灯' );
        this.state = 'off';
    }
}
var light = new Light();
light.init();

// 用状态模式改写上面的例子
// 如果灯的形式很多，将每种形式的灯封装成状态，例如：强光（StrongLight）、弱光（WeakLight）、关灯(OffLight)三种形式，通过按钮按（buttonPress）下来切换三种状态
var StrongLight=function(light){
    this.light=light;
}
StrongLight.prototype.buttonPress=function(){
    console.log('强光');
    this.light.setState(this.light.OffLight);
}

var WeakLight=function(light){
    this.light=light;
}
WeakLight.prototype.buttonPress=function(){
    console.log('弱光');
    this.light.setState(this.light.StrongLight);
}

var OffLight=function(light){
    this.light=light;
}
OffLight.prototype.buttonPress=function(){
    console.log('关闭');
    this.light.setState(this.light.WeakLight);
}

var Light=function(){
    
    this.StrongLight=new StrongLight(this);
    this.WeakLight=new WeakLight(this);
    this.OffLight=new OffLight(this);
    this.button=null;
    this.currState=null;//定义开关所处的状态
}

Light.prototype.init=function(){
    var self=this;
    var button=document.createElement('button');
    button.innerHTML = '开关';
    this.button=document.body.appendChild( button );
    // 定义灯初始状态
    this.currState=this.OffLight;
    this.button.onclick=function(){
        self.currState.buttonPress();
    }
}

// 定义一个切换状态的方法
Light.prototype.setState=function(newState){
    this.currState=newState;
}

var light=new Light();
light.init();

// 每个状态上都会有一个buttonPress按钮方法，为了避免状态类中未定义按钮方法会有错误提示，可以单独定义一个类，抛出未定义按钮方法时候的错误提示
var State=function(){

}
State.prototype.buttonPress=function(){
    console.log("请在相应的状态类中定义按钮方法");
}

var SuperLight=function(){

}
// 继承state的原型方法
SuperLight.prototype=Object.create(State.prototype);
SuperLight.prototype.constructor=State;

// 重写buttonPress方法
SuperLight.prototype.buttonPress=function(){
    /***
     * 业务代码逻辑
     * 
     */
}
