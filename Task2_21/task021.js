/**
 * @Author : Iceberg
 * @Date : 2016-03-30
 */

/**
 *判断空数据
 */
function valiBlank(num){
    var regBlank = new RegExp("^[\n\r\s ]*$");
    if(regBlank.test(num)){
        alert("输入不可为空");
        return false;
    }
    else{
        return true;
    }
}
/**
 * 判断重复数据
 */
function valiMulti(num){
    var itemList = document.getElementsByClassName("item");
    for(var i=0; i<itemList.length; i++){
        if(num == itemList[i].innerHTML){return false;}
    }
    return true;
}

/**
 * 队列类
 */
function Queue(){
    var dataCount = 1;//数据量计数器
    var habbitCount = 1;//爱好计数器
    this.tagIn = function(){
        var text = document.getElementById("myTag").value;
        text = text.replace(/[,，]/g,"");//解决逗号BUG
        text = mytrim(text);
        /*
        验证逻辑如下：
        1.验证数据不空 验证重复数据
        2.验证数据量是否达到上限，这里假定上限为 5
         */
        if(valiBlank(text) && valiMulti(text)){
            if(dataCount==5){
                leftOut();
                dataCount--;
            }
            var textNode = document.createTextNode(text);
            var divNode = document.createElement("div");
            divNode.appendChild(textNode);
            divNode.className = "item";
            var fatherNode = document.getElementById("graph-top");
            fatherNode.appendChild(divNode);
            initClickDel();
            initMouseEvent();
            dataCount++;
        }
    };
    this.rightIn = function(){
        var text = document.getElementById("myInput").value;
        text = mytrim(text);
        //输入去重
        var textArr = text.split(/[ \s\r\n、,，]+/).myunique(1);
        //与原有数据比较是否有重复
        var itemList = document.getElementsByClassName("item-habbit");
        var itemValueArr = [];
        for(var i=0; i<itemList.length; i++){
            itemValueArr[i] = itemList[i].innerHTML;
        }
        textArr = textArr.myunique(2,itemValueArr);
        //插入所输入的数据
        for(var i=0; i<textArr.length; i++){
            //处理数据溢出
            if(habbitCount==5){
                habbitLeftOut();
                habbitCount--;
            }
            if(!valiBlank(textArr[i])){continue;}//处理split后有空数据的问题
            var textNode = document.createTextNode(textArr[i]);
            var divNode = document.createElement("div");
            divNode.appendChild(textNode);
            divNode.className = "item-habbit";
            var fatherNode = document.getElementById("graph");
            fatherNode.appendChild(divNode);
            habbitCount++;
        }
    };
    var leftOut = function(){
        var firstDivNode = document.getElementById("graph-top").firstChild;
        document.getElementById("graph-top").removeChild(firstDivNode);
    };
    var habbitLeftOut = function(){
        var firstDivNode = document.getElementById("graph").firstChild;
        document.getElementById("graph").removeChild(firstDivNode);
    };
    var clickDel = function(){
        var node = event.target;
        node.parentNode.removeChild(node);
        dataCount--;//使用点击删除后，数据量计数器要自减1
    };
    var initClickDel = function() {
        var itemList = document.getElementsByClassName("item");
        for (var i = 0; i < itemList.length; i++) {
            itemList[i].addEventListener("click", clickDel);
        }
    };
}
function initKeyEvent(queueObj){
    document.querySelector("#myTag").onkeyup = function(event){
        var e = event||window.event||arguments.callee.caller.arguments[0];
        if(e && (e.keyCode==32 || e.keyCode==13 || e.keyCode==188)){
            queueObj.tagIn();
            document.getElementById("myTag").value="";
        }
    }
}
function initMouseEvent(){
    //绑定鼠标移进移出事件
    var itemList = document.getElementsByClassName("item");
    for(var i=0; i<itemList.length; i++){
        itemList[i].addEventListener("mouseover",mouseOver);
        itemList[i].addEventListener("mouseout",mouseOut);
    }
}
function mouseOver(){
    var itemNode = event.target;
    itemNode.className = "item delete"; //css中delete定义在item之后，否则此句无效
    itemNode.innerHTML = "删除" + itemNode.innerHTML;

}
function mouseOut(){
    var itemNode = event.target;
    itemNode.className = "item";
    itemNode.innerHTML = itemNode.innerHTML.substr(2);

}
/**
 * 绑定事件
 */
function init(){
    var myQueue = new Queue();
    //键盘输入事件
    initKeyEvent(myQueue);
    //鼠标移入移出事件
    initMouseEvent();
    //鼠标点击 “确认爱好” 事件
    document.getElementById("btn-commit").addEventListener("click",myQueue.rightIn);
}
init();
