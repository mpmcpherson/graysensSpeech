<?php
//require 'defaultConnector.php';



$nouns = explode("\n",file_get_contents("trimmedNouns"));
$verbs = explode("\n",file_get_contents("verbs"));
$adjectives = explode("\n",file_get_contents("adjectives"));
$adverbs = explode("\n",file_get_contents("adverbs"));
$conjunctions = explode("\n",file_get_contents("conjunctions"));

//$words = [$nouns,$verbs,$adjectives,$adverbs,$conjunctions];
$words = [$nouns,$verbs,$adjectives,$adverbs];


echo json_encode($words);

?>