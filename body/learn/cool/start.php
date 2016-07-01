<?php
//session_set_cookie_params(0);
session_start();
if (!isset($_SESSION['SESS_MEMBER_ID'])) {
    header("Location: ../../../account/login/login-form.php");
}
include('detectidle.php');
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Web Dev Club - Learn</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta HTTP-EQUIV="refresh" content="18000; URL=../../../account/login/logout.php">
        <link href="../resources/tutstyle.css" rel="stylesheet" type="text/css"/>
        <link rel="shortcut icon" href="../../../images/laptopicon.png" type="image/png"/>
        <link rel="stylesheet" type="text/css" href="../../../bootstrap.css"/>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

    </head>
    <body>
        <div id = "navcontainer">
            <div style = "height:50px; width:100%; background:midnightblue; border-bottom:2px solid lightblue;">
                <script>
                    //$('#navcontainer').hide()
                    //$('#navcontainer').empty();
                    $('#navcontainer').load('../resources/navbar.html');
                    //$('#navcontainer').fadeIn(1000);
                </script>
            </div>
        </div>

        <div id="title0_1">
            <h1> Web Dev Tutorials  </h1>
            <i id="eye1" class="fa fa-eye-slash"></i>
            <script>
                $('#eye1').click(function () {
                    $('#menu').slideToggle();
                    $('#content').toggleClass('extendToFull');
                    $('#eye1').toggleClass('fa-eye-slash').toggleClass('fa-eye');
                });
            </script>
        </div>

        <div style="overflow-x:auto;">
            <div id ="menuandcontentcontainer"> 
                <div id="menu">
                    <script>
                        $(function () {
                            //$("#menu").hide();
                            $("#menu").load("../resources/menu.html");
                            //$("#menu").fadeIn('slow');
                        });
                    </script>
                </div>
                <div id="content">
                    
                </div>
            </div>
        </div>
        <footer id="footer">
            <h1> Web Dev Club </h1>
            <br><br>
            <p>Phone: (602)-819-5728</p>
            <p>Email: <a href="mailto:anthonybao1999@gmail.com">anthonybao1999@gmail.com</a></p>
            <p>Email: <a href="mailto:richardbao419@gmail.com">richardbao419@gmail.com</a></p>
            <p>Email: <a href="mailto:njohns132@gmail.com">njohns132@gmail.com</a></p>
            <a target="social media 1" href="https://www.facebook.com/pages/Web-Dev-Club/1611907219084201?skip_nax_wizard=true"><i class="fa fa-facebook fa-2x"></i></a>
            <p> Thank you for visiting </p>
            <p> Click <a href="../../account/login/welcome.php#onlineCounter" style="color:lightskyblue;"><strong>HERE</strong></a> to see online activity</p>
            <a href="#">Back to top</a>
        </footer>
        <div style="background:black; text-align:center; color:white!important; width:100%; padding:20px;">
            <p>Content Copyright 2015 Anthony Bao and Richard Bao. All rights reserved</p>
        </div>
    </body>
</html>