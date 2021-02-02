<?php

$db['host'] = 'localhost';
$db['user'] = 'hipphopp';
$db['pass'] = 'vZ1vB5yQds2';
$db['name'] = 'torpedo';

$conn = mysqli_connect($db['host'], $db['user'], $db['pass'], $db['name']);
if(!$conn){
 die("Csatlakozási hiba! " . mysqli_connect_error());
}
else{
	echo "ok";
}
 
