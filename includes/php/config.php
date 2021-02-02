<?php

$db['host'] = 'localhost';
$db['user'] = 'admin';
$db['pass'] = 'admin';
$db['name'] = 'torpedo';

$conn = mysqli_connect($db['host'], $db['user'], $db['pass'], $db['name']);
if(!$conn){
 die("Csatlakozási hiba! " . mysqli_connect_error());
}
else{
	echo "ok";
}
 
