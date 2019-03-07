<?php
header('Content-Type:application/json; charset=utf-8'); 
require_once("db_info.php");
$conn = mysqli_connect($SERV, $USER, $PSWD, $DB); 
$data = file_get_contents('php://input');
$data = json_decode($data, true); 
if ( ! $conn) {
    $result=[
        "msg"=>"数据库连接失败"
    ];
}
$username = $data["people"]; 
$result = [
    "errcode" => 1, 
    "errmsg" => "你什么都没有写嘛", 
    "data" => ''
]; 
$msg = $data["msg"]; 
// var_dump($username);
// var_dump($data);
if ($msg != "") {
    $sql="INSERT INTO players(username, message) VALUES ('$username','$msg')";
    $result=$conn->query($sql);
    $result = [
        "errcode" => 0, 
        "errmsg" => "好了 已经成功提交了！", 
        "data" => ''
    ]; 
}
echo json_encode($result); 