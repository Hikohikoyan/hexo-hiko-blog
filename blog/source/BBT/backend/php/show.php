<?php
header('Content-Type:application/json; charset=utf-8'); 
require_once("db_info.php");
$conn = mysqli_connect($SERV, $USER, $PSWD, $DB_SHOW); 
$data = file_get_contents('php://input');
$data = json_decode($data, true); 
if ( ! $conn) {
    die(); 
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

// var_dump($ok);
// for($i=0;$i<=15;$i++){
//     $allmsg[$i]=$ok[$i];
//     var_dump($i);
//     var_dump("______________ok[i_______");
//     var_dump($ok[$i]);
//     var_dump("____________allmsg[i_____");

//     var_dump($allmsg[$i]);
//     if(!$ok[$i]){
//         break;
//     }
