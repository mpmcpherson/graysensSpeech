<?php
//require 'defaultConnector.php';



$nouns = explode("\n",file_get_contents("trimmedNouns"));
$verbs = explode("\n",file_get_contents("verbs"));
$adverbs = explode("\n",file_get_contents("adverbs"));
$conjunctions = explode("\n",file_get_contents("conjunctions"));

$words = [$nouns,$verbs,$adverbs,$conjunctions];


echo json_encode($words);

?>