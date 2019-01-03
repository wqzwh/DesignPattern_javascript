// 用闭包实现命令模式
// 命令模式的意图是把请求封装为对象，从而分离请求的发起者和请求的接收者（执行者）之间的耦合关系。在命令被执行之前，可以预先往命令对象中植入命令的接收者
<button id="execute">点击我执行命令</button>
<button id="undo">点击我执行命令</button>

var TV={
	open:function () {
		console.log("打开电视机")
	},
	close:function () {
		console.log("关闭电视机")
	}
}

var setTvCommand=function(receive){
	this.receive=receive;
}
setTvCommand.prototype.execute=function(){
	this.receive.open();
}
setTvCommand.prototype.undo=function(){
	this.receive.close();
}

var getCommind=function(commind){
	document.getElementById("execute").onclick=function(){
		commind.execute();
	}
	document.getElementById("undo").onclick=function(){
		commind.undo();
	}
}

getCommind(new setTvCommand(TV))