<?php
header('Content-Type:application/json; charset=utf-8');
require_once("db_info.php");
$data = file_get_contents('php://input');
$data = json_decode($data, true);
$conn=mysqli_connect($SERV,$USER,$PSWD,$DB);
if(!$conn){
    $result=["errmsg"=>"mysql connect failed"];
    exit;
}
$username=$data["people"];
$password=$data["password"];
$sql="SELECT * From users  where username = '$username' ";
$result=$conn->query($sql);
$row=mysqli_fetch_assoc($result);
// var_dump($row["username"]);
unset($result);
if($row){
    $result=[
    "errcode"=>111,
    "errmsg"=>"Login please",
    "data"=>''
];
echo json_encode($result);
exit;
}else{
    $sql="INSERT INTO users(username, password) VALUES ('$username','$password')";
    $result=$conn->query($sql);
    $result=[
             "errcode"=>0,
              "errmsg"=>"Signup Success",
              "data"=>'' ];
}
if(isset($result)){
    echo json_encode($result);
}else{
    $result=["errmsg"=>"Signup failed"];
    echo json_encode($result);
}