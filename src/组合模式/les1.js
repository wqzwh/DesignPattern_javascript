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
// 一键完成三大功能
// 打开空调
// 打开电视和音响
// 关门、开电脑、登录 QQ
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
var openAcCommand = {
    execute: function(){
        console.log( '打开空调' );
    }
};

// 电视和音响是连在一起的是并列的叶对象，所以需要创建一个组合对象
var openTvCommand = {
    execute: function(){
        console.log( '打开电视' );
    }
};
var openSoundCommand = {
    execute: function(){
        console.log( '打开音响' );
    }
};
var macroCommand1 = MacroCommand();
macroCommand1.add( openTvCommand );
macroCommand1.add( openSoundCommand );

// 关门、开电脑、登录 QQ也是并列的叶对象，所以需要创建一个组合对象
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
var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);

var macroCommand2 = MacroCommand();
macroCommand2.add(openAcCommand);
macroCommand2.add(macroCommand1);
macroCommand2.add(macroCommand);

macroCommand2.execute(); //会按照顺序执行


// 扫描文件实例
// 定义文件夹Folder和文件File这两个类
var Folder=function(name){
    this.name=name;
    this.files=[];
}
Folder.prototype.add=function(file){
    this.files.push(file);
}
Folder.prototype.scan=function(){
    console.log( '开始扫描文件夹: ' + this.name );
    for ( var i = 0, file, files = this.files; file = files[ i++ ]; ){
        file.scan();
    }
}
var File=function(name) {
    this.name=name;
}
File.prototype.add = function(){
    throw new Error( '文件下面不能再添加文件' );
}
File.prototype.scan = function(){
    console.log( '开始扫描文件: ' + this.name );
}

// 创建一些文件夹和文件
var folder=new Folder('学习资料');
var folder1=new Folder('JavaScript');
var folder2=new Folder('jQuery');

var file1=new Folder('JavaScript 设计模式与开发实践');
var file2=new Folder('精通 jQuery');
var file3=new Folder('重构与模式');

// 把文件添加到文件夹中
folder1.add( file1 );
folder2.add( file2 );
folder.add( folder1 );
folder.add( folder2 );
folder.add( file3 );
folder.scan();


//  对叶对象操作的一致性
// 只有用一致的方式对待列表中的每个叶对象的时候，才适合使用组合模式。
// 比如公司要给全体员工发放元旦的过节费 1000 块，这个场景可以运用组合模式，但如果公司给今天过生日的员工发送一封生日祝福的邮件，组合模式在这里就没有用武之地了，除非先把今天过生日的员工挑选出来。



// 引用父对象
// 当我们删除某个文件的时候，实际上是从这个文件所在的上层文件夹中删除该文件的
// 改写扫描文件代码，增加一个parent是否含有父对象
var Folder=function(name){
    this.name=name;
    this.parent=null;
    this.files=[];
}
Folder.prototype.add=function(file){
    file.parent=this;//设置父对象
    this.files.push(file);
    console.log(this.files);
}
Folder.prototype.scan=function(){
    console.log( '开始扫描文件夹: ' + this.name );
    for ( var i = 0, file, files = this.files; file = files[ i++ ]; ){
        file.scan();
    }
}
Folder.prototype.remove=function(){
    if(!this.parent){
        return;
    }
    for(var files = this.parent.files, l = files.length - 1; l >=0; l--){
        var file = files[ l ];
        if ( file === this ){
            files.splice( l, 1 );
        }
    }
}

var File=function(name){
    this.name=name;
    this.parent=null;
    this.files=[];
}
File.prototype.add=function(file){
    this.files.push(file);
}
File.prototype.scan=function(){
    console.log( '开始扫描文件夹: ' + this.name );
    for ( var i = 0, file, files = this.files; file = files[ i++ ]; ){
        file.scan();
    }
}
File.prototype.remove=function(){
    if(!this.parent){
        return;
    }
    for(var files = this.parent.files, l = files.length - 1; l >=0; l--){
        var file = files[ l ];
        if ( file === this ){
            files.splice( l, 1 );
        }
    }
}

var folder = new Folder( '学习资料' );
var folder1 = new Folder( 'JavaScript' );
var file1 = new File( '深入浅出Node.js' );
folder1.add( new File( 'JavaScript 设计模式与开发实践' ) );
folder.add( folder1 );
folder.add( file1 );
folder1.remove(); //移除文件夹
folder.scan();


// 组合模式适用于以下这两种情况
// 1、表示对象的部分整体层次结构
// 2、客户希望统一对待树中的所有对象