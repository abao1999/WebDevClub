<?php
include'testexec.php'; // Includes Login Script
if($_SESSION['SESS_TYPE']!='T') {
        header("Location: ../Denied.html");
    }
?>
<html>
    <head>
        <title>Admin-Home</title>
        <link rel="shortcut icon" href="../../images/laptopicon.png" type="image/png"/>
       <link href="layout.css" rel="stylesheet" type="text/css"/>
        <script type = "text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type = "text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.17/jquery-ui.min.js"></script>
    </head>
    <body style = "text-align:center; margin:auto; background:linear-gradient(midnightblue,lightblue);">
<br>
<h1 style = "color:white; font-size: 50px; font-family: monospace; text-shadow: 5px 5px 3px midnightblue">SECRET ADMIN PAGE</h2>
<hr>
<br><br> 
<br>
<table style = "width:100%; height:500px;">
    <tr>
        <td class = "coolcell"><a class = "privelegemenu" target = "scoremanager" href = "Score.php">Score Manager</a></td> 
        <td class = "coolcell"><a class = "privelegemenu" target = "codeeditor" href = "CodeEdit.php">Code Editor</a></td> 
    </tr>
    <tr>
        <td class = "coolcell"><a class = "privelegemenu" target = "chatroom" href = "ChatRoom.php">Private Chat</a></td> 
        <td class = "coolcell"><a class = "privelegemenu" href = "">COMING SOON</a></td> 
    </tr>
</table>
</body>
</html>
