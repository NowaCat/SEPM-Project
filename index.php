<?php


session_start();
require_once "db_config.php";

//check user session exists and is verified
if (isset($_SESSION["user"]) && $_SESSION["user"]->is_verified)
{
    ?>
    
    <h1 >Login Successful!  </h1>
    <a  href="logout.php">
        Logout
    </a>

    <?php
}
else
{
    header("Location: login.php");
}



?>