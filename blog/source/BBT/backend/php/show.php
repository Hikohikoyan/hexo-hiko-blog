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
$result=[
    "num"=>"",
    "fuduji"=>"",
    "msg"=>""
];
$sql="SELECT * From players";
$r=$conn->query($sql);
// $ok=mysqli_fetch_array($r);
$allmsg=[];
// $i=0;
while($ok=mysqli_fetch_array($r)){
    $result["num"]=$ok["num"];
    $result["fuduji"]=$ok["username"];
    $result["msg"]=$ok["message"];
    $allmsg[]=$result;
};
echo json_encode($allmsg);