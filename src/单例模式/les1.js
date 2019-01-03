// 透明的单例模式
// 使用 CreateDiv 单例类，它的作用是负责在页面中创建唯一的 div 节点
// 缺点: CreateDiv 的构造函数实际上负责了两件事情。第一是创建对象和执行初始化 init 方法，第二是保证只有一个对象
var CreateDiv=(function(){
    var instance;
    var CreateDiv=function(html){
        if(instance) return instance;
        this.html=html;
        this.init();
        return instance=this;
    };
    CreateDiv.prototype.init=function(){
        var div = document.createElement( 'div' );
        div.innerHTML = this.html;
        document.body.appendChild( div );
    }
    return CreateDiv;
})();
var a = new CreateDiv( 'sven1' );
var b = new CreateDiv( 'sven2' );
console.log(a===b);//true

// 用代理实现单例模式
// 改写上面的例子
// CreateDiv只负责创建div，不负责是否存在实例
var CreateDiv=function(html){
    this.html=html;
    this.init();
}
CreateDiv.prototype.init=function(){
    var div = document.createElement( 'div' );
    div.innerHTML = this.html;
    document.body.appendChild( div );
}
// 引入代理类 proxySingletonCreateDiv来判断是否存在实例
var ProxySingletonCreateDiv=(function(){
    var instance;
    return function(html){
        if(!instance){
            instance =new CreateDiv(html)
        }
        return instance;
    }
})();
var a=new ProxySingletonCreateDiv('sven1');
var b=new ProxySingletonCreateDiv('sven2');
console.log(a===b);//true

