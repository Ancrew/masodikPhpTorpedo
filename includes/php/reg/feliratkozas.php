<?php

if(isset($_POST["submit"])){
    echo "It works";
    $user=$_POST['user'];
    $pass=$_POST['pass'];
    $repass=$_POST['repass'];
    $email=$_POST['email'];
    
    require_once 'config.php';
    require_once 'functions.inc.php';
    
    if (emptyInputsSignup($user, $pass, $repass, $email) !== false) {
        header ("location: ../../../reg.php?error=emptyinput");
        exit();
    }
    
    
    if (invalidUid($user) !== false) {
        header ("location: ../reg.php?error=invaliduid");
        exit();
    }
    
    if (invalidEmail($email) !== false) {
        header ("location: ../reg.php?error=invalidemail");
        exit();
    }
    if (pwdMatch($pass, $repass) !== false) {
        header ("location: ../reg.php?error=passwordsdontmatch");
        exit();
    }
    if (uidExists($conn, $user, $email) !== false) {
        header ("location: ../reg.php?error=usernametaken");
        exit();
    }
//    createUser($conn, $user, $email, $pass);
    createProfil($conn);
}
else{
    header("location: fail.php");
    header ("location: reg.php?error=none");
    exit();
}