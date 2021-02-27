<?php
require 'defaultConnector.php';

$userId = "";

$gets = json_decode(file_get_contents('php://input'), true);

$userId = $gets["userId"];

$qq = "select * from people where people.possessingUserId = ".$userId;

$result = mysqli_query($dbhandle, $qq);


$output = array();

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    array_push($output, array($row['id'],$row['first_name'], $row['last_name'], $row['possessingUserId']));
}

echo json_encode($output);

?>