<?php
//session_set_cookie_params(0);
session_start();
if (!isset($_SESSION['SESS_MEMBER_ID'])) {
    header("Location: ../account/login/login-form.php");
}
include('detectidle.php');

require_once('../account/login/config.php');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
mysql_select_db(DB_DATABASE, $link);

$sourcecode = mysql_query("SELECT source FROM pagecodes WHERE name ='news'");
$source = mysql_fetch_assoc($sourcecode);
echo $source['source'];
