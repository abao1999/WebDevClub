<?php
// Initialize the session.
// If you are using session_name("something"), don't forget it now!
session_start();

require ('config.php');
$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
mysql_select_db(DB_DATABASE, $link);
$sessusername = $_SESSION['SESS_USER_NAME'];
$sql="DELETE FROM active WHERE username='$sessusername'";
mysql_query($sql);

// Unset all of the session variables.
$_SESSION = array();
// session_unset(); // equivalent to $_SESSION = array();

// If it's desired to kill the session, also delete the session cookie.
// Note: This will destroy the session, and not just the session data!
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Finally, destroy the session.
session_destroy();

header("Location: ../../index.php");
