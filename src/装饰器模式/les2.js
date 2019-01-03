// AOP 装饰函数 面向切面编程
// 数据统计上报实际例子
// 登陆后上报数据，使用aop方式编写代码
/***
 * html
 * <button tag="login" id="button">点击打开登录浮层</button>
 * 
 */
// 给所有方法添加一个after方法，传入的参数是一个函数
Function.prototype.after=function(fn){
    var self=this;
    return function(){
        self.apply(this,arguments);
        fn.apply(this,arguments);
        // return ret;
    }
}

Function.prototype.before=function(fn){
    var self=this;
    return function(){
        fn.apply(this,arguments);
        self.apply(this,arguments);
        
        // return ret;
    }
}

var showLogin = function(){
    console.log( '打开登录浮层' );
}
var showB=function(){
    console.log( '打开登录浮层之前需要做的事情' );
}
var log = function(){
    console.log( '上报标签为: ' + this.getAttribute( 'tag' ) );
}

showLogin=showLogin.before(showB).after(log);

document.getElementById( 'button' ).onclick = showLogin;


// 解决 CSRF攻击最简单的一个办法就是在 HTTP请求中带上一个 Token 参数
var ajax=function(type,url,param){
    console.log(param);
}
var getToken=function(){
    return 'token'
}
ajax=ajax.before(function(type,url,param){
    param.token=getToken();
});
ajax(1,2,{'a':'444'});//{a: "444", token: "token"}


// 插件式的表单验证
var validata = function(){
    if ( username.value === '' ){
        alert ( '用户名不能为空' );
        return false;
    }
    if ( password.value === '' ){
        alert ( '密码不能为空' );
        return false;
    }
}
var formSubmit = function(){
    var param = {
        username: username.value,
        password: password.value
    }
    ajax( 'http:// xxx.com/login', param );// ajax提交函数
}
// 将验证和表单参数提交完全分开，可以给函数添加一个before方法，在这个里面验证是否通过
Function.prototype.before=function(fn){
    var self=this;
    return function(){
        if(fn.apply(this.arguments)===false){
            // 返回 false 的情况直接 return，不再执行后面的原函数
            return;
        }
        self.apply(this,arguments);
    }
}
formSubmit = formSubmit.before( validata );
submitBtn.onclick = function(){
    formSubmit();
}