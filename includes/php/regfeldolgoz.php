<?php

include 'config.php';

$user=$_GET['user'];
$pass=$_GET['pass'];
$repass=$_GET['repass'];
$email=$_GET['email'];
$conn;
$sql;
$ertek = (int) 50;
if($pass===$repass){


    // Create connection
    $conn = mysqli_connect($db['host'], $db['user'], $db['pass'], $db['name']);

    // Check connection
    if (!$conn) {
      echo "hiba";
      echo mysqli_connect_error();
    }
    else{
         $sql = <<<EOT
        INSERT INTO felhasznalok (user, pass, email) VALUES ('$user', '$pass', '$email')
EOT;
         if (mysqli_query($conn, $sql)) {
    echo "ok";
  }
        $sql = <<<EOT
        INSERT INTO profil (betuMeret) VALUES ('$ertek')
EOT;
        if (mysqli_query($conn, $sql)) {
    echo "ok";
  }
  else{
    echo "hozzáadás sikertelen2";
  }
    }
    }
else{
    echo "Hibás adatok!";
}
mysqli_close($conn);