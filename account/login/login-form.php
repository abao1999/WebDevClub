<?php
include('login-exec.php'); // Includes Login Script
if (isset($_SESSION['SESS_MEMBER_ID'])) {
    header("Location: welcome.php");
}
?>
<html>
    <head>
        <title>Login</title>
        <link rel="shortcut icon" href="../../images/laptopicon.png" type="image/png"/>
        <link href="loginmodule.css" rel="stylesheet" type="text/css" />
        <script type = "text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type = "text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.17/jquery-ui.min.js"></script>
    </head>
    <body>
        <section id="header">
            <h2>Login To Your Account</h2>
            <form action="../../index.php">
                <button class="account_buttons" type="submit">
                    Home
                </button>
            </form>
        </section>
        <div id="login">
            <form id = "LoginForm" name = "LoginForm" action="" method="post">
                <br><br>
                <label class = "LoginInputLabel">Username :</label>
                <input id="username" name="username" placeholder="username" type="text" value = "<?php echo (isset($_POST['username'])) ? $_POST['username'] : ''; ?>"/>
                <br><br>
                <label class = "LoginInputLabel">Password :</label>
                <input id="password" name="password" placeholder="password" type="password" value = "<?php echo (isset($_POST['password'])) ? $_POST['password'] : ''; ?>"/>
                <br></br>
                <input id="sessionOption" name="stayLoggedIn" type="checkbox" value = "1"/>   
                <label> Keep me logged in</label>
                <br></br>
                <input name="submit" type="submit" value=" Login "/>
                <div id = registerLink>
                    <a href = '../register/register-form.php'> Register</a>
                </div>
            </form>
            <span><?php echo $error; ?></span>
        </div>
        <br>
    </body>
</html>
