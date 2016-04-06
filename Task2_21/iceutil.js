

/**
 * trim，删除左右两端空格
 * 例如：text = mytrim(text);
 * */
function mytrim(str){
    return str.replace(/(^\s*)|(\s*$)/g,"");
}

/**
 * 数组去重
 * flag=1 某数组自身去重
 * flag=2 某数组与source数组对比，去掉某数组已经在source(souce数组无重复项)数组中存在的项
 */
Array.prototype.myunique = function(flag,source){
    var json = {};
    var res = [];
    if(flag==1){
        //do nothing
    }
    if(flag==2){
        for(i=0; i<source.length; i++){
            json[source[i]] = 1;
        }
    }
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}