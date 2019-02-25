<?
header('Content-Type:application/json; charset=utf-8'); 
require_once("db_info.php");
$conn = mysqli_connect($SERV, $USER, $PSWD, $DB); 

if((($_FILES['ICON']['type'] == "gif")
||($_FILES['ICON']['type'] == "bmp")
||($_FILES['ICON']['type'] == "png")){
    echo "Invalid file";
}
$sql="SELECT src from icons";
$r=$conn->query($sql);
$src=mysqli_fetch_array($r);
if(($_FILES['ICON']['type'] == "jpeg" )
||($_FILES['ICON']['type'] == "jpg")){
    if(file_exists($src . $_FILES["ICON"]["name"]){
        echo $_FILES["ICON"]["name"] . " already exists. ";
    }else{
        move_uploaded_file($_FILES["ICON"]["tmp_name"],
        "../img/" . $_FILES["file"]["name"]);
        echo "Stored in: " . "../img/" . $_FILES["file"]["name"];
    }
}