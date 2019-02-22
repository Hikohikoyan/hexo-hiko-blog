$(function () 
{
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
    var badboy;
    function check_input()
    {
        var str1=new RegExp(people.trim().toLowerCase());
        var str2=new RegExp(password.trim().toLowerCase());
        var str3="<script>";
        var badboy=str1.test(str3);
        if (badboy=false){
        str3="<?";
        badboy=str1.test(str3);}
    }
    function htmlEncode (str){
        return $('<span/>').html();
    }
    function catch_input(){
        people = document.getElementById("shuru1").value;
        password = document.getElementById("password").value;
        htmlEncode(people);
        htmlEncode(password);
        check_input();
    }
    login = function () {
        catch_input();
        console.log("user:"+people);
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
                url: "/BBT/backend/php/login.php",
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
        catch_input();
        sending = JSON.stringify({
            people,
            password
        });
        if(badboy!=true){
            zhuce();
        }else{
            console.log("出bug咯");}
        function zhuce()
        {
            $.ajax(
            {
                url: "http://203.195.221.189/BBT/backend/php/signup.php",
                type: "POST",
                contentTyoe: 'application/x-www-form-urlencoded',
                dataType: "JSON",
                data: sending,
                success: function (data) 
                {
                    alert(data["errmsg"]);
                    login_ornot=0;
                    check();
                }
            })
        }
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
})
// Btn.onclick=function(){
//     var MsgValue=Msg.Value;
//     var tree=innerHTML=MsgValue+"<span></span>";*/
