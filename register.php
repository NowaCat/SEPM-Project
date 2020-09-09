<?php
    require_once "db_config.php";
    // check wether the register form is submitted
    if (isset($_POST["register"]))
    {
        //declare the variable post to database
        $email = $_POST["email"];
        $password = $_POST["password"];
        //hash password to prevent hacking
        $password = password_hash($password, PASSWORD_DEFAULT);
        //SQL query to insert attributes in database
        
 
        // Check database connection
        
        $sql = "INSERT INTO admin_users (email, password) VALUES ('$email', '$password')"; 
        mysqli_query($link, $sql);
        
        header("Location: login.php");
    }
?>
 
<h1 style="font-weight: bold;color:#008CBA;font-size: 50;margin-left:10%;margin-top: 3%;margin-bottom: 3%">Please create an Administrator account</h1>
<form style="margin-left:10%;margin-right: 10%; padding: auto" method="POST" action="register.php">
    <label style="font-weight: bold;font-size: 20">Please enter an email</label><br>
    
        <input style="width: 100%; height: auto; margin-bottom: 3%;margin-top: 1%;border: 2px solid red;border-radius: 4px; font: 1.5em sans-serif;border-color: #008CBA" type="email" name="email" ><br>
    
        <label style="font-weight: bold;font-size: 20">Please enter a password</label>
    
        <input style="width: 100%; height: auto; ;border: 2px solid red;border-radius: 4px;margin-top: 1%; font: 1.5em sans-serif;border-color: #008CBA" type="password" name="password" >
    
       
    <input style="  background-color: #008CBA; border: none; color: white; padding: 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 50px 2px; cursor: pointer; border-radius: 4px;" type="submit" name="register" value="Sign up">
    
    <a href="login.php"><input style=" background-color: #white; border: none; color: #008CBA; padding: 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 50px 2px; cursor: pointer; border-radius: 4px;" type="button" name="login" value="Already have an account ?  Click here to sign in !"></a>

</form>
