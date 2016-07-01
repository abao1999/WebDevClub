<?php

	session_start(); // Starting Session
        $error = "";
        $wrongcode = "";
        
        if (isset($_POST['Submit'])) {

	require_once('../Login/config.php');
        
        
	//Connect to mysql server
	$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
	if(!$link) {
		die('Failed to connect to server: ' . mysql_error());
	}
	
	//Select database
	$db = mysql_select_db(DB_DATABASE, $link);
	if(!$db) {
		die("Unable to select database");
	}
	
	//Function to sanitize values received from the form. Prevents SQL injection
	function clean($str) {
		$str = @trim($str);
		if(get_magic_quotes_gpc()) {
			$str = stripslashes($str);
		}
		return mysql_real_escape_string($str);
	}
	
	//Sanitize the POST values
	$fname = clean($_POST['fname']);
	$lname = clean($_POST['lname']);
	$username = clean($_POST['username']);
	$password = clean($_POST['password']);
	$cpassword = clean($_POST['cpassword']);
        $email = clean($_POST['email']);
        $code = clean($_POST['secretcode']);
	
	//Check for duplicate username
	if($username != '') {
		$qry = "SELECT * FROM users WHERE username='$username'";
		$result = mysql_query($qry);
		if($result) {
			if(mysql_num_rows($result) > 0) {
                            $error = "Username Taken";
                            session_destroy();
                                //die("Username Taken");
                                //header("Location:register-form.php");
			}
		}
	}
        if($code!='')   {
            if($code != 'helloworld$BS#1')  {
                $wrongcode = 'Please enter the correct secret registration code';
                session_destroy();
            }
        }
	if($error==""&&$wrongcode=="")  {
	//Create INSERT query
	$qry = "INSERT INTO users(firstname, lastname, username, password, email) VALUES('$fname','$lname','$username','".md5($password)."','$email')";
	$result = @mysql_query($qry);
	
	//Check whether the query was successful or not
	if($result) {
		header("location: register-success.php");
		exit();
	}
        else {
            die("query failed");
	}
        }
        }
?>