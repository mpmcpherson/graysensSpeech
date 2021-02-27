<?php

require 'defaultConnector.php';

$userName = "";
$userPass = "";

$gets = json_decode(file_get_contents('php://input'), true);

$userName = $gets["userName"];
//$userName = $_POST["userName"];
$userPass = $gets["userPass"];
//$userPass = $_POST["userPass"];



$result = mysqli_query($dbhandle,"SELECT pw_hash, user_id from general_dev_bastion.users where username like '$userName'");

$userid = '';
$resPass = array();
$userIdArr = array();

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    array_push($resPass, $row['pw_hash']);
    array_push($userIdArr, $row['user_id']);
}

$userid = $userIdArr[0];

if (password_verify($userPass, $resPass[0])) {
    $rnd=rand();
    $_SESSION['valid'] = 1;
    $_SESSION['userid'] = $userid;
    $_SESSION['username'] = $userName;
    setcookie('userid', $userid, time()+60*60*1, "/");
    setcookie('sessionID', "invalidSessionUnset", time()-(60*60*8), "/");
    setcookie('sessionID', $rnd, time()+60*60*1, "/");
    $newQ = "UPDATE general_dev_bastion.users SET sessionID = ".$rnd." WHERE user_id = '".$_SESSION['userid']."'";
    $result = mysqli_query($dbhandle, $newQ);
    
    echo json_encode([true,$userid,$sessionID]);
} else { 
    echo json_encode([false, $userName, $userPass]);
}
