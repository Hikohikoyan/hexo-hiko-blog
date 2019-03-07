<?php
header('Content-Type:application/json; charset=utf-8'); 
require_once("db_info.php");
$conn = mysqli_connect($SERV, $USER, $PSWD, $DB); 
$data = file_get_contents('php://input');
$data = json_decode($data, true); 
if ( ! $conn) {
    die(); 
}
$username = $data["people"]; 
$oldmsg=$data["oldmsg"];
$newmsg=$data["newmsg"];
$sql="UPDATE `players` SET`username`=$username,`message`=$newmsg WHERE (username=$username) AND(message=$oldmsg)";
$result = $conn-> query($sql);
$sql="SELECT * FROM 'players' WHERE (username=$username) AND(message=$newmsg) ";
$result = $conn-> query($sql);
if (!$result){
    $r=[
        "message"=>mysqli_error($conn)
    ];
    exit();
}else{
    $r=mysqli_fetch_row($result);
}
$data["newmsg"]=$r["message"];
echo json_encode($data);