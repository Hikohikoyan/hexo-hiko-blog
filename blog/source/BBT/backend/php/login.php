<?php
header('Content-Type:application/json; charset=utf-8');
require_once("data/db_info.php");
$data = file_get_contents('php://input');
$data = json_decode($data, true);
// var_dump($data);
$conn=mysqli_connect($SERV,$USER,$PSWD,$DB_LOGIN);
if(!$conn){
     die(mysqli_error());
    //  echo "Error!";
 }
 $people=$data["people"];
 $pswd=$data["password"];
 //定义
$sql="SELECT * From users  where username = '$people' ";
$result = $conn-> query($sql);
$row=mysqli_fetch_assoc($result);
if($row!=NULL){
    // setcookie("username",$people,time()+3600);
    if($row["password"]===$pswd){
        $result=[
          "errmsg"=>"登录成功",
            "errcode"=>0,
            "data"=>''
        ];
        echo json_encode($result);
        return;
    }
}else{
    $result=[
        "errcode"=>1,
        "errmsg"=>"你没注册过，你自己好好想想",
         "data"=>''
    ];
    // var_dump($result);
    echo json_encode($result);
    return;
}

if($row["username"]==$people){
    $result=[
        "errmsg"=>"密码错了!!!!",
        "errcode"=>1,
        "data"=>''
    ];
    echo json_encode($result);
    return;
}
 $result=[
            "errcode"=>1,
            "errmsg"=>"你没注册过，你自己好好想想",
            "data"=>''
        ];
echo json_encode($result);