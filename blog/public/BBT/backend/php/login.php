<?php
header('Content-Type:application/json; charset=utf-8');
require_once("db_info.php");
$data = file_get_contents('php://input');
$data = json_decode($data, true);
// var_dump($data);
$conn=mysqli_connect($SERV,$USER,$PSWD,$DB);
if(!$conn){
    // die(mysqli_error());
     $result=["errmsg"=>"数据库连接失败"];
     exit;
 }
 $people=$data["people"];
 $pswd=$data["password"];
 $checkif=0;
 //定义
$sql="SELECT password From users  where username = '$people' ";
$result = $conn-> query($sql);
$row=mysqli_fetch_assoc($result);
if($row){
    // setcookie("username",$people,time()+3600);
    if($row["password"]===$pswd){
        $result=[
          "errmsg"=>"Success",
            "errcode"=>0,
            "data"=>''
        ];
        $checkif=1;
        echo json_encode($result);
        return;
    }
}else{
    $result=[
        "errcode"=>1,
        "errmsg"=>"Sighup please!",
         "data"=>''
    ];
    $checkif=2;
    // var_dump($result);
    echo json_encode($result);
    return;
}

if($row["username"]==$people){
    $result=[
        "errmsg"=>"Wrong password",
        "errcode"=>1,
        "data"=>''
    ];
    $checkif=3;
    echo json_encode($result);
    return;
}
 if($checkif==0){
    $result=["errmsg"=>"if not enter"];
}
if($checkif==2 OR $checkif==3){
 $result=[
            "errcode"=>1,
            "errmsg"=>"Sighup please",
            "data"=>''
        ];
}
echo json_encode($result);