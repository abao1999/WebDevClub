<?php
include'testexec.php'; // Includes Login Script
if($_SESSION['SESS_TYPE']!='T') {
        header("Location: ../Denied.html");
    }
?>
<html>
    <head>
        <title>Chat Room</title>
        <link rel="shortcut icon" href="../../images/laptopicon.png" type="image/png"/>
       <link href="layout.css" rel="stylesheet" type="text/css"/>
        <script type = "text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type = "text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.17/jquery-ui.min.js"></script>
    </head>
    <body>
<br>
<h1 style = "color:midnightblue;">Private Chat</h1>
<hr>
<br><br> 
<br>
<textarea id = "chatbox">
RICHARD: Hello I am making this chat room. When it is completed, it will be a very good chat room.
        It will be made possible by my awesome php skills. 
        For further assistance, please contact me. I know everything !!!!!!
</textarea>

</body>
</html>
