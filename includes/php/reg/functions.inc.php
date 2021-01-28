<?php

 function emptyInputsSignup($user, $pass, $repass, $email){
     $result;
     if (empty($user) || empty($pass) ||empty($repass) || empty($email)) {
         $result = true;
     }
     else{
         $result = false;
     }
     return $result;
 }
 
  function invalidUid($user){
     $result;
   
     if (!preg_match("/^[a-zA-Z0-9]*$/", $user)) {
         $result = true;
     }
     else{
         $result = false;
     }
     return $result;
 }
 function invalidEmail($email){
     $result;
   
     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
         $result = true;
     }
     else{
         $result = false;
     }
     return $result;
 }
 
  function pwdMatch($pass, $repass){
     $result;
   
     if($pass !== $repass) {
         $result = true;
     }
     else{
         $result = false;
     }
     return $result;
 }
 
 function uidExists($conn, $user, $email){
     $sql = "SELECT * FROM felhasznalok WHERE user = ? OR email = ?;";
     $stmt = mysqli_stmt_init($conn);
     if (!mysqli_stmt_prepare($stmt, $sql)) {
        header ("location: ../../../reg.php?error=stmtfailed");
        exit();
     }
     mysqli_stmt_bind_param($stmt, "ss", $user, $email);
     mysqli_stmt_execute($stmt);
     $resultData = mysqli_stmt_get_result($stmt);
     if ($row = mysqli_fetch_assoc($resultData)) {
         return row;
     }
     else{
         $result=false;
     }
     mysqli_Stmt_close($stmt);
     return $result;
 }
 function createUser($conn, $user, $email, $pass){     
     $sql = "INSERT INTO felhasznalok (user, pass, email) VALUES (?, ?, ?)";
     $stmt = mysqli_stmt_init($conn);
     if (!mysqli_stmt_prepare($stmt, $sql)) {
        header ("location: ../../../reg.php?error=stmtfailed");
        exit();
     }
     $hashedPwd = password_hash($pass, PASSWORD_DEFAULT);
     mysqli_stmt_bind_param($stmt, "sss", $user, $hashedPwd, $email);
     mysqli_stmt_execute($stmt);
     mysqli_Stmt_close($stmt);
     header ("location: ../../../reg.php?error=none");
//     exit();
 }
 
  function createProfil($conn){
     $ertek=32;
     $sql = "INSERT INTO profil (betuMeret) VALUES (?)";
     $stmt = mysqli_stmt_init($conn);
     if (!mysqli_stmt_prepare($stmt, $sql)) {
        header ("location: ../../../reg.php?error=stmtfailed");
        exit();
     }
     mysqli_stmt_bind_param($stmt, "s", $ertek);
     mysqli_stmt_execute($stmt);
     mysqli_Stmt_close($stmt);
     header ("location: ../../../reg.php?error=none");
     exit();
 }
 