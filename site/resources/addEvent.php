<?php
require 'defaultConnector.php';

$userId = "";
$EventTopic = "";
$EventListing = "";

$gets = json_decode(file_get_contents('php://input'), true);

$userId = $gets["userId"];
$EventTopic = $gets["EventTopic"];
$EventListing = $gets["EventListing"];

//var_dump($gets);

$diagnosticOut = "";

$qq = "insert into EventListing(userId, EventTopic, EventListing) values (".$userId.", '".prepString($EventTopic)."', '".prepString($EventListing)."')";

$result = mysqli_query($dbhandle, $qq);
$diagnosticOut .= simplog($result, "event insert successful");

echo json_encode($diagnosticOut);

function simplog($result, $call){
	if($result){
		return $call."\n";
	}else{
		return "Could not insert data : " . mysqli_error($dbhandle) . " " . mysqli_errno($dbhandle);
	}
}
function prepString(string $string) : string{
	return htmlspecialchars(str_replace(["\r\n", "\r", "\n"], '<br/>', $string), ENT_QUOTES, "UTF-8");
}

?>