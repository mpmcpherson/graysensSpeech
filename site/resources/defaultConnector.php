<?php

	$uname = "crudtest";
	$pw = "TetraTetra44!#";
	$host = "mysql.bastionsoftwarellc.com";
	$schema = "general_dev_bastion";

	$msqli=new mysqli($host,$uname,$pw,$schema);

	$dbhandle = mysqli_connect($host,$uname,$pw,$schema);


?>