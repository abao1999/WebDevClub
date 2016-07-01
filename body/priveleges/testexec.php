<?php
    session_start();
    require'../../Account/Login/config.php';
    $link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
        if (!$link) {
            die('Failed to connect to server: ' . mysql_error());
        }

        //Select database
        $db = mysql_select_db(DB_DATABASE, $link);
        if (!$db) {
            die("Unable to select database");
        }
if (isset($_POST['add'])) {
    $username = $_POST['member'];
    $pointchange = $_POST['points'];
    mysql_query("UPDATE users SET score=score+$pointchange WHERE username = '$username'");
}
if (isset($_POST['subtract'])) {
    $username = $_POST['member'];
    $pointchange = $_POST['points'];
    mysql_query("UPDATE users SET score=score-$pointchange WHERE username = '$username'");
}

if (isset($_POST['submit'])) {
    $newsource = mysql_real_escape_string($_POST['code1']);
    mysql_query("UPDATE pagecodes SET source='$newsource' WHERE name='news'");
}