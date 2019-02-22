$(function () 
{
    var package = Array(2); 
    var catchall = document.cookie; 
    var l1 = catchall.length-1; 
    console.log("这是获取到的cookie" + l1 + "" + catchall); 
    var people = ""; 
    function getname() {
        for (var i = 9; i <= l1; i ++) {
            people = people + catchall[i]; 
            //console.log(people + "←是people的值" + "______" + catchall[i] + "→是catchall[" + i + "]的值"); 
        }
        // if(people.length>l1){
        //     l1=people.length-l1+1;
        //     for(var i=l1;i<=people.length;i++){
        //         people[i]="";
        //     }
        // }
    }
    getname(); 
    console.log(people); 
    alert("~\(0,<)欢迎" + people + "(> u o)/~"); 
    changeImage = function () {
        element = document.getElementById('you'); 
        console.log(element.src); 
    if (element.src.match("11")) {
        element.src = "backend/img/y.jpg"; 
        return; 
    }
    if (element.src.match("y")) {
        element.src = "backend/img/o.jpg"; 
        return; 
    }
    if (element.src.match("o")) {
        element.src = "backend/img/u.jpg"; 
        return; 
    }
    if (element.src.match("u")) {
        element.src = "backend/img/11.jpeg"; 
        return; }
    }
    var order = []; var allmsg = []; var allpeople = []; 
    var oldmsg; var newmsg; 
    var passage = document.createElement("div"); 
    var label = document.createElement("label"); 
    var compilebox = document.createElement("div"); 
    hao = function () {
        var msg = $("#fudu").val(); 
        alert(msg); 
        package = JSON.stringify( {people, msg})
        $.ajax( {
            url:"http://203.195.221.189/BBT/backend/php/bbs.php", 
            type:"POST", 
            contentTyoe:'application/x-www-form-urlencoded', 
            dataType:"json", 
            data:package, 
            success:function (data) {
            alert(data["errmsg"] + "errcode:[" + data["errcode"] + "]"); 
            showall(people, msg); 
        }}); 
    }
    playfudu = function ()
    {
        var hihi = document.getElementById("allmsg"); 
        var guding = document.createElement("div"); 
        guding.id = "cantmove"; hihi.appendChild(guding); 
        $.ajax( {
            url:"http://203.195.221.189/BBT/backend/php/show.php", 
            type:"POST", 
            contentTyoe:'application/x-www-form-urlencoded', 
            dataType:"json", 
            data:package, 
            success:function (data) {
                for (var i = 0; i < data.length; i ++){
                    order[i] = data[i]["num"]; 
                    allpeople[i] = data[i]["fuduji"]; 
                    allmsg[i] = data[i]["msg"]; 
                    var x = document.createElement("label"); 
                    x.innerText = "第" + order[i] + "条留言："; 
                    guding.appendChild(x); 
                    var y = document.createElement("label"); 
                    y.innerText = "复读机：" + (allpeople[i]);
                    guding.appendChild(y); 
                    var z = document.createElement("p"); 
                    z.innerText = "说：" + (allmsg[i]); 
                    guding.appendChild(z); 
                }
            }
        });
    }
    function compile() {
    var msg = $("#fudu").val(); 
    //a=x=people;b=msg=y;
    var newwords = document.createElement("textarea"); 
    newwords.type = "txt"; newwords.cols = "15"; newwords.rows = "12"; 
    newwords.placeholder = "！修改你的话"; 
    newwords.id = "new"; 
    compilebox.appendChild(newwords); 
    var queren = document.createElement("input"); 
    queren.type = "submit"; queren.value = "确认"; 
    compilebox.appendChild(queren); 
    queren.onclick = function() {
        // 这里执行点击后操作    
        oldmsg = msg; 
        newmsg = $("#new").val(); 
        console.log("newmsg=" + newmsg); 
         var bibi = JSON.stringify( {
            people, 
            oldmsg, 
            newmsg
        }); 
        yoxi(bibi); 
    }
    function yoxi(bibi) {
        $.ajax( {
            url:"http://203.195.221.189/BBT/backend/php/compile.php", 
            type:"POST", 
            contentTyoe:'application/x-www-form-urlencoded', 
            dataType:"json", 
            data:bibi, 
            success:function (data) {
                alert("修改成" + data["newmsg"]); }})
    }}
    function delmsg() {
    var msg = $("#fudu").val(); 
    var who = JSON.stringify( {
        people, 
        oldmsg:msg, 
        newmsg:"复读到最后一无所有"
    })
    $.ajax
    ( {
        url:"http://203.195.221.189/BBT/backend/php/compile.php", 
        type:"POST", 
        contentTyoe:'application/x-www-form-urlencoded', 
        dataType:"json", 
        data:who, 
        success:function (data) {
            alert(data["newmsg"]); 
                }
            
    }); }
    function showall() 
    {
        var msg = $("#fudu").val(); 
        var words = document.createTextNode(msg); 
        var br = document.createElement("div"); 
        console.log("这是你" + "__" + people + "的留言：" + "__________" + msg); 
        label.innerText = "复读机" + ":" + people; 
        var showbox = document.getElementById("showbox"); 
        showbox.appendChild(passage); 
        passage.appendChild(label); 
        passage.appendChild(br); 
        var t = passage.lastChild; 
        t.appendChild(words); 
        passage.appendChild(compilebox); 
        var bianji = document.createElement("input"); 
        bianji.onclick = function(){compile();}
        var shanchu = document.createElement("input"); 
        shanchu.onclick = function() {delmsg();}
        compilebox.appendChild(bianji); 
        compilebox.appendChild(shanchu); 
        bianji.id = "bianji"; 
        bianji.type = "button"; bianji .value ="编辑"; 
        shanchu.id = "shanchu"; shanchu.type = "button";
        shanchu.value ="删除";}
})