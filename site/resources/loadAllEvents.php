<?php
require 'defaultConnector.php';

$userId = "";

$gets = json_decode(file_get_contents('php://input'), true);

$userId = $gets["userId"];

$qq = "select * from EventListing el where el.userId = ".$userId;

$result = mysqli_query($dbhandle, $qq);


$output = array();

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    array_push($output, array(recoverString($row['id']),recoverString($row['EventTopic'])));
}

echo json_encode($output);


function recoverString(string $string) : string{
	return htmlspecialchars_decode($string, ENT_QUOTES);
}
?>