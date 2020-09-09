<?php

    session_start();

    require_once "db_config.php";

    if (isset($_POST["login"]))
    {
        //declare the post variable
        $email = $_POST["email"];
        $password = $_POST["password"];


        

        
        $sql = "SELECT * FROM admin_users WHERE email = '$email'";//sql query check wether $email exists
        //variable to declare the sql excuting
        $result = mysqli_query($link, $sql);
        
        if (mysqli_num_rows($result)>0)//check wether the sql is true
        {
            $row = mysqli_fetch_object($result);//fetch the row of user from database
            
            //check if user has entered correct password by comparing with hash stored in database
            if (password_verify($password, $row->password))
            {
                // create user session
                $_SESSION["user"]=$row;
                $row->is_verified=true;
                
                
                header("Location: index.php");               
            }
            else
            {
                echo  "password is incorrect";
            }
        }
        else
        {
            echo "account not exists";
        }
    } 
?>

<h1 style="font-weight: bold;color:#008CBA;font-size: 50;margin-left:10%;margin-top: 3%;margin-bottom: 3%">Sign in for Administrator</h1>
<form style="margin-left:10%;margin-right: 10%; padding: auto" method="POST" action="login.php">
    
    <label style="font-weight: bold;font-size: 20">Email</label><br>
        <input style="width: 100%; height: auto; margin-bottom: 3%;margin-top: 1%;border: 2px solid red;border-radius: 4px; font: 1.5em sans-serif;border-color: #008CBA" type="email" name="email"     >
    
    
    <label style="font-weight: bold;font-size: 20">Password</label>
        <input style="width: 100%; height: auto; ;border: 2px solid red;border-radius: 4px;margin-top: 1%; font: 1.5em sans-serif;border-color: #008CBA" type="password" name="password">
    
        
    <input style="  background-color: #008CBA; border: none; color: white; padding: 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 50px 2px; cursor: pointer; border-radius: 4px;" type="submit" name="login" value="Sign in">
    
    <a href="register.php"><input style=" background-color: #white; border: none; color: #008CBA; padding: 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 50px 2px; cursor: pointer; border-radius: 4px;" type="button" name="register" value="Haven't an account yet ?  Click here to sign up !"></a>
    

</form>