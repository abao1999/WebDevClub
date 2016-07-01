<?php
include'testexec.php'; // Includes Login Script
if($_SESSION['SESS_TYPE']!='T') {
        header("Location: ../Denied.html");
    }
?>
<html>
    <head>
        <title>Code Editor</title>
        <link rel="shortcut icon" href="../../images/laptopicon.png" type="image/png"/>
       <link href="layout.css" rel="stylesheet" type="text/css"/>
        <script type = "text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type = "text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.17/jquery-ui.min.js"></script>
    </head>
    <body>
<br>
<h1 style = "color:midnightblue;">Edit Website Source Code</h1>
<hr>
<br><br> 
<h2 style = "color:midnightblue;">Add News and Updates</h2>
<br>
<div style = "text-align:center;">
    
<form method="post" action="">
<textarea id = "code1" name = "code1" style = "height:1000px; width:90%; padding:20px; text-align:left; overflow:scroll;">
<?php 
$sourcecode = mysql_query("SELECT source FROM pagecodes WHERE name ='news'");
$source = mysql_fetch_assoc($sourcecode);
echo $source['source'];
?>
</textarea>
<br>
<input name="submit" type="submit" value="Save"/>
</form>
