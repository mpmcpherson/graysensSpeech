<?php
require 'defaultConnector.php';

$first_name="";
$last_name="";
$userId = "";

$personId="";

$intervalAmount = "";
$intervalType = "";

$channelName = "";
$channelValue = "";

$gets = json_decode(file_get_contents('php://input'), true);

$first_name = $gets["first_name"];
$last_name = $gets["last_name"];
$userId = $gets["userId"];

$intervalAmount = $gets["intervalAmount"];
$intervalType = $gets["intervalType"];

$channelName = $gets["channelName"];
$channelValue = $gets["channelValue"];

$diagnosticOut = "";

//person insert
$qq = "insert into people(first_name, last_name, possessingUserId) values ('".$first_name."', '".$last_name."', ".$userId.")";
$result = mysqli_query($dbhandle, $qq);
$diagnosticOut .= simplog($result, "people insert successful");

//frequency insert
$qq = "insert into userIntervalLink(userId, intervalAmount, intervalType) values (".$userId.", ".$intervalAmount.", ".$intervalType.")";
$result = mysqli_query($dbhandle, $qq);
$diagnosticOut .= simplog($result, "userIntervalLink insert successful");

$qq = "select id from people where people.first_name like '%".$first_name."%' and last_name like '%".$last_name."%' and possessingUserId =".$userId." limit 1";
$result = mysqli_query($dbhandle, $qq);
$diagnosticOut .= simplog($result, "peopleId select successful");

if($result){
	$output = array();
	while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
	    array_push($output, array($row['id']));
	}
	$personId = $output[0][0];
}



//going to have to select newest to get personid
//contact details
$qq = "insert into contactChannels(personId, channelName, channelValue) values (".$personId.", '".$channelName."', '".$channelValue."')";
$result = mysqli_query($dbhandle, $qq);
$diagnosticOut .= simplog($result, "contacts insert successful");

echo json_encode($diagnosticOut);

function simplog($result, $call){
	if($result){
		return $call."\n";
	}else{
		return "Could not insert data : " . mysqli_error($dbhandle) . " " . mysqli_errno($dbhandle);
	}
}

?>