// 购买商品的例子
/**
 * html结构：
 *  选择颜色: <select id="colorSelect">
                <option value="">请选择</option>
                <option value="red">红色</option>
                <option value="blue">蓝色</option>
            </select>
    输入购买数量: <input type="text" id="numberInput"/>
    您选择了颜色: <div id="colorInfo"></div><br/>
    您输入了数量: <div id="numberInfo"></div><br/>
    <button id="nextBtn" disabled="true">请选择手机颜色和购买数量</button>
 * 
 * 
*/

// 未用中介者模式写法
var colorSelect = document.getElementById( 'colorSelect' ),
    numberInput = document.getElementById( 'numberInput' ),
    colorInfo = document.getElementById( 'colorInfo' ),
    numberInfo = document.getElementById( 'numberInfo' ),
    nextBtn = document.getElementById( 'nextBtn' );
var goods = { // 手机库存
    "red": 3,
    "blue": 6
};
colorSelect.onchange=function(){
    var color=this.value,//颜色
        cnumber=numberInput.value,// 数量
        stock = goods[ color ]; // 该颜色手机对应的当前库存

    colorInfo.innerHTML=color;

    if ( !color ){
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请选择手机颜色';
        return;
    }

    if ( ( ( cnumber - 0 ) | 0 ) !== cnumber - 0 ){ // 用户输入的购买数量是否为正整数
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请输入正确的购买数量';
        return;
    }

    if ( number > stock ){ // 当前选择数量没有超过库存量
        nextBtn.disabled = true;
        nextBtn.innerHTML = '库存不足';
        return ;
    }

    nextBtn.disabled = false;
    nextBtn.innerHTML = '放入购物车';
}

numberInput.oninput=function(){
    var color=colorSelect.value,//颜色
        cnumber=this.value,// 数量
        stock = goods[ color ]; // 该颜色手机对应的当前库存

    colorInfo.innerHTML=color;

    if ( !color ){
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请选择手机颜色';
        return;
    }

    if ( ( ( cnumber - 0 ) | 0 ) !== cnumber - 0 ){ // 用户输入的购买数量是否为正整数
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请输入正确的购买数量';
        return;
    }

    if ( number > stock ){ // 当前选择数量没有超过库存量
        nextBtn.disabled = true;
        nextBtn.innerHTML = '库存不足';
        return ;
    }

    nextBtn.disabled = false;
    nextBtn.innerHTML = '放入购物车';
}

// 如果需求变成一下形式
/**
 *  选择颜色: <select id="colorSelect">
                <option value="">请选择</option>
                <option value="red">红色</option>
                <option value="blue">蓝色</option>
            </select>
    选择内存: <select id="memorySelect">
                <option value="">请选择</option>
                <option value="32G">32G</option>
                <option value="16G">16G</option>
            </select>
    输入购买数量: <input type="text" id="numberInput"/><br/>
    您选择了颜色: <div id="colorInfo"></div><br/>
    您选择了内存: <div id="memoryInfo"></div><br/>
    您输入了数量: <div id="numberInfo"></div><br/>
    <button id="nextBtn" disabled="true">请选择手机颜色和购买数量</button>
 * 
 * 
*/
// 使用中介者模式改写代码
var goods = { // 手机库存
    "red|32G": 3,
    "red|16G": 0,
    "blue|32G": 1,
    "blue|16G": 6
};
// 将自身传给定义的中介函数
var mediator=(function(){
    var colorSelect = document.getElementById( 'colorSelect' ),
        memorySelect = document.getElementById( 'memorySelect' ),
        numberInput = document.getElementById( 'numberInput' ),
        colorInfo = document.getElementById( 'colorInfo' ),
        memoryInfo = document.getElementById( 'memoryInfo' ),
        numberInfo = document.getElementById( 'numberInfo' ),
        nextBtn = document.getElementById( 'nextBtn' );

    return {
        change:function(obj){
            var color=colorSelect.value,//颜色
                memory=memorySelect.value,//内存
                cnumber=numberInput.value,// 数量
                stock = goods[ color + '|' + memory ]; // 颜色和内存对应的手机库存数量

            if(obj===colorSelect){
                colorInfo.innerHTML=color;
            }
            if(obj===memorySelect){
                memoryInfo.innerHTML=memory;
            } 
            if(obj===numberInput){
                numberInfo.innerHTML=cnumber;
            } 

            if ( !color ){
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请选择手机颜色';
                return;
            }

            if ( ( ( cnumber - 0 ) | 0 ) !== cnumber - 0 ){ // 用户输入的购买数量是否为正整数
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请输入正确的购买数量';
                return;
            }

            if ( number > stock ){ // 当前选择数量没有超过库存量
                nextBtn.disabled = true;
                nextBtn.innerHTML = '库存不足';
                return ;
            }  

            nextBtn.disabled = false;
            nextBtn.innerHTML = '放入购物车';
        }
    }    
})();
// 事件函数：
colorSelect.onchange = function(){
    mediator.changed( this );
};
memorySelect.onchange = function(){
    mediator.changed( this );
};
numberInput.oninput = function(){
    mediator.changed( this );
};

