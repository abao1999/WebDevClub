<?php
//session_set_cookie_params(0);
session_start();
if (!isset($_SESSION['SESS_MEMBER_ID'])) {
    header("Location: ../account/login/login-form.php");
}
include('detectidle.php');
?>
<!DOCTYPE html>
<html>
    <head>
        <title>My Account</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta HTTP-EQUIV="refresh" content="18000; URL=../account/login/logout.php">
        <link rel="shortcut icon" href="../images/laptopicon.png" type="image/png"/>
        <link rel="stylesheet" type="text/css" href="stylesheet3.css"/>
        <link rel="stylesheet" type="text/css" href="../bootstrap.css"/>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
        <script>
            $(function () {
                $("#tabs").tabs();
            });
        </script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
    </head>
    <body>
        <div id="preloader">
            <div id="status">&nbsp;</div>
        </div>
        <script>
            // makes sure the whole site is loaded
            jQuery(window).load(function () {
                // will first fade out the loading animation
                jQuery("#status").fadeOut();
                // will fade out the whole DIV that covers the website.
                jQuery("#preloader").delay(1000).fadeOut("slow");
            })
        </script>
        <div id="custom" class="navbar navbar-default" role="navigation" style="z-index:100;">
            <div class="navbar-header">
                <img src="../images/laptopicon.png" alt="" style="height:30px; width:30px;margin-top:10px;"/>
                <a class="navbar-brand" href="#"> 
                    Web Dev Club
                </a>
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-menubuilder" style = "margin-top:7px;">                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse navbar-menubuilder" id="nav">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="landingpage.php" style="height:20px;"> Main Terminal</a></li>
                    <li><a href="learn/cool/start.php" style="height:20px;"> Learn </a></li>
                    <li><a href="codeeditorpage.php" style="height:20px;"> Code </a></li>        
                    <li><a href="members.php" style="height:20px;"> Members </a></li>
                    <li><a href="newspage.php" style="height:20px;"> News</a></li>
                    <li id="last_menu_item" class="dropdown"><a id = "dropdownlink" style="height:20px;" class = "dropdown-toggle" data-toggle ="dropdown" href="account.php">My Account <b class = "caret"></b></a>
                        <ul style="z-index:20;" class="dropdown-menu">
                            <li><a href="../account/login/logout.php"><span>Log out</span></a></li>
                        </ul>
                        <script>
                            var dropdownlink = document.getElementById('dropdownlink');
                            if ($(window).width() > 800) {
                                dropdownlink.className = 'dropdown-toggle disabled';
                            }
                            else {
                                dropdownlink.className = 'dropdown-toggle';
                            }
                            window.addEventListener('resize', function (event) {
                                if ($(window).width() > 800) {
                                    dropdownlink.className = 'dropdown-toggle disabled';
                                }
                                else {
                                    dropdownlink.className = 'dropdown-toggle';
                                }
                            });

                        </script>
                    </li>
                </ul>
            </div>
        </div>

        <div id="title0_1">
            <h1> 
                <?php
                echo $_SESSION['SESS_FIRST_NAME'];
                echo "'s Account";
                ?>
            </h1>
        </div>
        <div id="tabs_container" style="margin-bottom:100px; overflow:auto; z-index:-100;">
            <div id="tabs" style="min-width:500px;">
                <ul>
                    <li><a href="#tabs-1">My Profile</a></li>
                    <li><a href="#tabs-2">Options</a></li>
                </ul>
                <div id="tabs-1">
                    <h3>User Information</h3>
                    <p> Username:
                        <?php
                        echo $_SESSION['SESS_USER_NAME'];
                        ?>
                    </p>
                    <p> First Name:
                        <?php
                        echo $_SESSION['SESS_FIRST_NAME'];
                        ?>
                    </p>
                    <p> Last Name:
                        <?php
                        echo $_SESSION['SESS_LAST_NAME'];
                        ?>
                    </p>
                    <p> Email Address:
                        <?php
                        echo $_SESSION['SESS_EMAIL_ADDRESS'];
                        ?>
                    </p>
                </div>
                <div id="tabs-2">
                    <h3>Help and Support</h3>
                    <br><br>
                    <button id="contact_webmasters"> Contact the Webmasters </button>
                    <p id="email_webmasters1" class="hidden" style="text-indent:40px;"><a style="text-decoration:none;" href="mailto:anthonybao1999@gmail.com"> Email: anthonybao1999@gmail.com</a></p>
                    <p id="email_webmasters2" class="hidden" style="text-indent:40px;"><a style="text-decoration:none;" href="mailto:richardbao419@gmail.com"> Email: richardbao419@gmail.com</a></p>
                    <p id="call_webmasters1" class="hidden" style="text-indent:40px;"><i class="fa fa-phone fa-1x"></i> Call 602-819-5728</p>
                    <br><br>
                    <?php
                    if ($_SESSION['SESS_TYPE'] == "T") {
                        echo "<p style = 'font-size: 15px; color:grey;'>As a club cofounder or admin, you have special privileges. Click the link below to access the secret admin page.</p>";
                        echo "<a target = 'secretadminpage' href = 'Priveleges/test.php' style = 'text-decoration:none;'><h3 style = 'color:gold; text-shadow: 1px 3px orange;'>Club Master Privelages</h3></a>";
                        echo "<br>";
                    }
                    ?>
                    <p>Be sure to go to the <a href="LandingPage.php#tabs-c">chat room</a> for any questions</p>
                    <br><br>
                    <hr>
                    <br><br>
                    <h3>Manage Your Account</h3>
                    <br><br>
                    <p>Want to change your username or password?</p>
                    <br><br>
                    <hr>
                    <br><br>
                    <h3>Personalize</h3>
                    <br><br>
                    <hr>
                    <br><br>
                </div>
                <script>
                    $('#contact_webmasters').click(function () {
                        $('#email_webmasters1').toggleClass('hidden');
                        $('#email_webmasters2').toggleClass('hidden');
                        $('#call_webmasters1').toggleClass('hidden');
                    });
                </script>
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
            <p> Click <a href="../account/login/welcome.php#onlineCounter" style="color:lightskyblue;"><strong>HERE</strong></a> to see online activity</p>
            <a href="#">Back to top</a>
        </footer>
        <div style="background:black; text-align:center; color:white!important; width:100%; padding:20px;">
            <p>Content Copyright 2015 Anthony Bao and Richard Bao. All rights reserved</p>
        </div> 
    </body>
</html>