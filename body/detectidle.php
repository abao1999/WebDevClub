<?php
require('../account/login/config.php');
    $link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
    mysql_select_db(DB_DATABASE, $link);
    $username = $_SESSION['SESS_USER_NAME'];
    //$_SESSION['LAST_ACTIVITY'] = time(); // update last activity time stamp
    $last = time();
    mysql_query("UPDATE active SET last='$last' WHERE username='$username'");

