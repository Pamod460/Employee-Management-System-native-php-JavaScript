<?php
session_start();
$username = $_POST['userName'];
$password = $_POST['password'];

if($username == "root" && $password == "12345"){
    $_SESSION['username'] = $username;
    $_SESSION['password'] = $password;
    include ("mainwindow.php");

}else{
    echo("Incorrect Username or Password!");
    include "../client/login.html";
}
 
?>