<?php
require 'defaultConnector.php';

$userId = "";

$gets = json_decode(file_get_contents('php://input'), true);

$userId = $gets["userId"];

	//geeze, this ended up being really heavy. I may beed to rebuild this damn database

$qq = 	"select p.id,p.first_name,p.last_name, p.possessingUserId from people p
		left join lastContacted lc on lc.originPersonId = p.possessingUserId
		left join userIntervalLink uil on uil.userId = lc.originPersonId
		left join intervalTypes it on it.id = uil.intervalType
		where p.possessingUserId = ".$userId."
		and CURRENT_DATE() >= DATE_ADD(lc.lastContactedDate, INTERVAL uil.intervalAmount it.intervalType)"; 

$result = mysqli_query($dbhandle, $qq);


$output = array();

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    array_push($output, array($row['id'],$row['first_name'], $row['last_name'], $row['possessingUserId']));
}

echo json_encode($output);

?>