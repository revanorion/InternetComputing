<?php
session_start();

if(!isset($_SESSION['login_user'])){
    header('Location: login.php'); // Redirecting To Home Page
}
?>
