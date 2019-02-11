$(function () {
    // do something

    // if(document.readyState==="loading"){
    //     document.addEventListener('DomContentLoaded',afterloaded);
    // }else{
    //     afterloaded();
    // }
    // afterloaded();
    var login_ornot = 1;
    if (login_ornot != 0) {
        alert("你还没有登录！");
    };
        var hello=document.getElementById("hello");
   check();
    //获取网页值 设置事件
    var sending = Array(2);
    // var result = Array(3)
    var people;
    var password;
    var badboy=0;
    function preventing(){

    if (people.trim() === "") {
        alert("输入用户名");
        badboy=1;
    }
    if(people.trim().indexOf("#")>-1){
        badboy=1;
    }
    if (password.trim() === "") {
        alert("密码呢？");
        badboy=1;
    }
    if (people.trim().indexOf("=")>-1){
        badboy=1;
    }
    if (people.trim().indexOf(".")>-1){
        badboy=1;
    }
    if (people.trim().indexOf("<")>-1){
        badboy=1;
    }
    if (people.trim().indexOf(">")>-1){
        badboy=1;
    }
    if (people.trim().indexOf("&")>-1){
        badboy=1;
    }
    if (people.trim().indexOf("/")>-1){
        badboy=1;
    }
    if(badboy===0){console.log("这些是你输入的东西");
    console.log(people);
    console.log(password);}else{
        alert("警告(我不管 我爱弹窗)");
    }}
    login = function () {
        people = document.getElementById("shuru1").value;
        password = document.getElementById("password").value;
        preventing();
        // if (people.trim() === "") {
        //     alert("输入用户名");
        //     return;
        // }
        // if (password.trim() === "") {
        //     alert("密码呢？");
        //     return;
        // } else {
        //     console.log("这些是你输入的东西");
        //     console.log(people);
        //     console.log(password);
        //     alert("oh");
        //     denglu();
        // }
        if(badboy===0){
            denglu();
        }else{
            console.log("不允许你登录");
        }
        sending = JSON.stringify({
            people,
            password,
        });
        function denglu() {
            $.ajax({
                url: "backend/php/login.php",
                type: "POST",
                contentTyoe: 'application/x-www-form-urlencoded',
                dataType: "JSON",
                data: sending,
                // success:login_ornot=0
                success: function (data) {
                    alert(data["errmsg"]);
                    login_ornot=0;
                    check();
                }
            })
        }
    }
    // function attention_login() {
    //     window.open="http://www.baidu.com";
    // }
    signup = function () {
        people = document.getElementById("shuru1").value;
        password = document.getElementById("password").value;
        sending = JSON.stringify({
            people,
            password
        });
       
        preventing();
        if(badboy===0){
            zhuce();
        }else{
            console.log("不允许你注册");
        }
        function zhuce(){$.ajax(
            {
                url: "backend/php/signup.php",
                type: "POST",
                contentTyoe: 'application/x-www-form-urlencoded',
                dataType: "JSON",
                data: sending,
                success: function (data) {
                    alert(data["errmsg"]);
                    login_ornot=0;
                    check();
                }
            }
        )}
        
    }

        function check(){
            people = document.getElementById("shuru1").value;
            console.log("这是待会的cookie值"+people);
        if (login_ornot == 0) {
            var cookieDate=new Date(2018,11,29);
        document.cookie="username="+people +";expires="+cookieDate+";path=/";
        hello.style.display='block';
        console.log(login_ornot);
        if (login_ornot != 0) {
            alert("你还没有登录！");
            login_ornot=1;
            hello.style.display='none';
        }
    }}
});
// Btn.onclick=function(){
//     var MsgValue=Msg.Value;
//     var tree=innerHTML=MsgValue+"<span></span>";*/
