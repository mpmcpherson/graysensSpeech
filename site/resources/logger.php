<?php 

	$log = getUserIpAddr();
	
	$log = $log . "\n" . $_SERVER['HTTP_USER_AGENT'];


	file_put_contents("access".gmdate("Y-m-d H:i:s") . ".txt", $log);
	
	unset($log);

	function getUserIpAddr(){
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){
        //ip from share internet
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        //ip pass from proxy
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }else{
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

?>	