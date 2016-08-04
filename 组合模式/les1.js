// 简单的组合模式，宏命令：一组子命令构成
var closeDoorCommand = {
    execute: function(){
        console.log( '关门' );
    }
};
var openPcCommand = {
    execute: function(){
        console.log( '开电脑' );
    }
};
var openQQCommand = {
    execute: function(){
        console.log( '登录 QQ' );
    }
};

var MacroCommand=function(){
    return {
        commandList:[],
        add:function(command){
            this.commandList.push(command);
        },
        execute:function(){
            for ( var i = 0, command; command = this.commandList[ i++ ]; ){
                command.execute();
            }
        }
    }
}
// 使用
var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);

macroCommand.execute(); //依次执行子命令



// 组合模式：组合模式将对象组合成树形结构，以表示“部分整体”的层次结构
// 请求在树中传递的过程
// 总而言之， 如果子节点是叶对象， 叶对象自身会处理这个请求， 而如果子节点还是组合对象，请求会继续往下传递。叶对象下面不会再有其他子节点，一个叶对象就是树的这条枝叶的尽头，组合对象下面可能还会有子节点


// 更强大的宏命令




