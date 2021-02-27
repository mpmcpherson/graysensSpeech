<?php
include('defaultConnector.php');

$password = "";
$user_name = "";
$email = "";

$gets = json_decode(file_get_contents('php://input'), true);

$user_name = $gets["userName"];
//$userName = $_POST["userName"];
$password = $gets["userPass"];
//$userPass = $_POST["userPass"];

$hash = password_hash($password,  PASSWORD_DEFAULT);

$result = mysqli_query($dbhandle, "INSERT into users(pw_hash, username, email, user_status, organizational_unit) VALUES ('$hash','$user_name','dummyval',3, 8)");


$newUser = mysqli_query($dbhandle, "select user_id, username from users where username like $user_name");

    $ary = array();

    while($row = mysqli_fetch_array($newUser, MYSQLI_ASSOC))
    {
        array_push($ary, array($row['user_id']));
    }

echo json_encode($ary);
?>