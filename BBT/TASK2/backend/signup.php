<?php
header('Content-Type:application/json; charset=utf-8');
$data = file_get_contents('php://input');
$data = json_decode($data, true);
$conn=mysqli_connect("localhost","root","","bbs");
if(!$conn){
    die(mysqli_error());
    // echo "Error!";
}
$username=$data["people"];
$password=$data["password"];
$sql="SELECT * From users  where username = '$username' ";
$result=$conn->query($sql);
$row=mysqli_fetch_assoc($result);
// var_dump($row["username"]);
if($row["username"]==$username){
    $result=[
    "errcode"=>111,
    "errmsg"=>"你不是注册过了吗",
    "data"=>''
];
echo json_encode($result);
return;
}
// var_dump($username);
 $sql="INSERT INTO users(username, pssword) VALUES ('$username','$password')";
 $result=$conn->query($sql);
 $result=[
          "errcode"=>0,
           "errmsg"=>"开始你的表演吧",
           "data"=>'' ];
echo json_encode($result);
