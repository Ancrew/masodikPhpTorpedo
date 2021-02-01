<?php
    
if (isset($_POST["submit"])) {
    $userName = $_POST["uid"];
    $pwd = $_POST["pwd"];
    
    require_once 'config.php';
    require_once 'functions.inc.php';
    
    if (emptyInputsLogin($userName, $pwd) !== false) {
        header ("location: ../../login.php?error=emptyinputslogin");
        exit();
    }

    
    loginUser($conn, $userName, $pwd);
}
else{
    header("location: ../../login.php");
    exit();
}
