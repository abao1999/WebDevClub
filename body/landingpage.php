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
        <title>Web Dev Club - Main</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="stylesheet2.css" rel="stylesheet" type="text/css"/>
        <link rel="shortcut icon" href="../images/laptopicon.png" type="image/png"/>
        <link rel="stylesheet" type="text/css" href="../bootstrap.css"/>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"/>
        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
        <script>
                    $(function () {
                    $("#tabs").tabs();
                            $("#tabs2").tabs();
                    });</script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
    </head>
    <body>
        <div id="preloader">
            <div id="status">&nbsp;</div>
        </div>
        <script>
                    // makes sure the whole site is loaded
                    jQuery(window).load(function() {
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
                            <li><a href="account.php#!tabs-1"><span>My Profile</span></a></li>
                            <li><a href="account.php#tabs-2"><span>Options</span></a></li>
                            <li><a href="../account/login/logout.php"><span>Log out</span></a></li>
                        </ul>
                        <script>
                                    $(document).ready(function(){
                            $(this).scrollTop(0);
                            });
                                    var dropdownlink = document.getElementById('dropdownlink');
                                    if ($(window).width() > 800) {
                            dropdownlink.className = 'dropdown-toggle disabled';
                            }
                            else {
                            dropdownlink.className = 'dropdown-toggle';
                            }
                            window.addEventListener('resize', function(event){
                            if ($(window).width() > 800) {
                            dropdownlink.className = 'dropdown-toggle disabled';
                            }
                            else {
                            dropdownlink.className = 'dropdown-toggle';
                            }
                            });</script>
                    </li>
                </ul>
            </div>
        </div>
        <br><br><br><br>
        <section id="main">
            <div id="tabs2">
                <div id="navbar2">
                    <ul id="navbar2_real">
                        <li><a href="#tabs-a">Resources</a></li
                        ><li><a href="#tabs-b">Assignments</a></li
                        ><li><a href="#tabs-c">Chat Room </a></li>
                    </ul>
                </div>
                <section class="mainPage" id="tabs-a">
                    <div class="title"><h2>Resources</h2></div>
                    <div id="tabs_container" style="margin-bottom:100px; overflow:auto; z-index:-100;">
                        <div id="tabs" style="min-width:500px;">
                            <ul>
                                <li><a href="#tabs-1">Powerpoints</a></li>
                                <li><a href="#tabs-2">Documents</a></li>
                                <li><a href="#tabs-3">External Links</a></li>
                            </ul>
                            <div id="tabs-1">
                                <iframe src="https://docs.google.com/presentation/d/1qC89wydiOskT4-4P4ez7Q8TIV3sZCz2L2z_6MJa-894/embed?start=false&loop=true&delayms=3000" width="403.5px" height="350" frameborder="0" scrolling="no" style="margin:17px;"allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                                <iframe src="https://docs.google.com/presentation/d/1gD_qvFEM-52ZlRh1ixKDOhxZX1jKOjZK--qhtUc_Q5c/embed?start=false&loop=true&delayms=3000" width="403.5px" height="350" frameborder="0" scrolling="no" style="margin:17px;"allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                                <iframe src="https://docs.google.com/presentation/d/1qC89wydiOskT4-4P4ez7Q8TIV3sZCz2L2z_6MJa-894/embed?start=false&loop=true&delayms=3000" width="403.5px" height="350" frameborder="0" scrolling="no" style="margin:17px;"allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                                <iframe src="https://docs.google.com/presentation/d/1gD_qvFEM-52ZlRh1ixKDOhxZX1jKOjZK--qhtUc_Q5c/embed?start=false&loop=true&delayms=3000" width="403.5px" height="350" frameborder="0" scrolling="no" style="margin:17px;"allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                                <iframe src="https://docs.google.com/presentation/d/1qC89wydiOskT4-4P4ez7Q8TIV3sZCz2L2z_6MJa-894/embed?start=false&loop=true&delayms=3000" width="403.5px" height="350" frameborder="0" scrolling="no" style="margin:17px;"allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                                <iframe src="https://docs.google.com/presentation/d/1gD_qvFEM-52ZlRh1ixKDOhxZX1jKOjZK--qhtUc_Q5c/embed?start=false&loop=true&delayms=3000" width="403.5px" height="350" frameborder="0" scrolling="no" style="margin:17px;"allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                                <iframe src="https://docs.google.com/presentation/d/1qC89wydiOskT4-4P4ez7Q8TIV3sZCz2L2z_6MJa-894/embed?start=false&loop=true&delayms=3000" width="403.5px" height="350" frameborder="0" scrolling="no" style="margin:17px;"allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                                <iframe src="https://docs.google.com/presentation/d/1gD_qvFEM-52ZlRh1ixKDOhxZX1jKOjZK--qhtUc_Q5c/embed?start=false&loop=true&delayms=3000" width="403.5px" height="350" frameborder="0" scrolling="no" style="margin:17px;"allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                            </div>
                            <div id="tabs-2">
                                <div>
                                    <div class="resourceTag">
                                        <div><p><i class="fa fa-file-text"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Openshift Tutorial for Mac Users</p></div><a target="doc1" style="margin-left:60px;" href="../documents/OpenShiftMacView2.htm"><i class="fa fa-eye"></i> View </a> 
                                        <a style="margin-left:60px;" href="../documents/OpenShiftMac.docx"><i class="fa fa-download"></i> Download (docx) </a>
                                    </div>
                                    <hr>
                                    <div class="resourceTag">
                                        <div><p><i class="fa fa-file-text"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;W3Schools HTML5 Tag Reference</p></div><a target="doc2" style="margin-left:60px;" href="../documents/cheatsheet1.html"><i class="fa fa-eye"></i> View </a> 
                                        <a style="margin-left:60px;" target="downloaddoc2" href="../documents/cheatsheet1.pdf"><i class="fa fa-download"></i> Download (pdf) </a>
                                    </div>
                                    <hr>
                                    <div class="resourceTag">
                                        <div><p><i class="fa fa-file-text"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;W3Schools Color Groups and Hex Codes</p></div><a target="doc3" style="margin-left:60px;" href="../documents/cheatsheet2.html"><i class="fa fa-eye"></i> View </a> 
                                        <a style="margin-left:60px;" target="downloaddoc3" href="../documents/cheatsheet2.pdf"><i class="fa fa-download"></i> Download (pdf) </a>
                                    </div>
                                    <hr>
                                </div>
                            </div>
                            <div id="tabs-3">
                                <h4>Here is a very useful HTML and CSS online course by codecademy.com</h4>
                                <div class="resourceTag">
                                    <p><a target="link0" href="https://www.codecademy.com/en/tracks/web"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CodeAcademy: <a target="link0" href="https://www.codecademy.com/en/tracks/web">https://www.codecademy.com/en/tracks/web</a></p>
                                </div>
                                <h4>Some other useful plugins, resources, and tutorials are referenced below.</h4>
                                <div class="resourceTag">
                                    <p><a target="link1" href="http://www.w3schools.com/"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;W3Schools: <a target="link1" href="http://www.w3schools.com/">http://www.w3schools.com/</a></p>
                                </div>
                                <div class="resourceTag">
                                    <p><a target="link2" href="https://www.codeschool.com/paths/html-css"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CodeSchool: <a target="link2" href="https://www.codeschool.com/paths/html-css">https://www.codeschool.com/paths/html-css</a></p>
                                </div>
                                <div class="resourceTag">
                                    <p><a target="link3" href="https://jquery.com/"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JQuery: <a target="link3" href="https://jquery.com/">https://jquery.com/</a></p>
                                </div>
                                <div class="resourceTag">
                                    <p><a target="link4" href="https://netbeans.org/"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Netbeans IDE: <a target="link4" href="https://netbeans.org/">https://netbeans.org/</a></p>
                                </div>
                                <div class="resourceTag">
                                    <p><a target="link5" href="http://getbootstrap.com/"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bootstrap: <a target="link5" href="http://getbootstrap.com/">http://getbootstrap.com/</a></p>
                                </div>
                                <div class="resourceTag">
                                    <p><a target="link6" href="https://www.apachefriends.org/index.html"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;XAMPP: <a target="link6" href="https://www.apachefriends.org/index.html">https://www.apachefriends.org/index.html</a></p>
                                </div>
                                <div class="resourceTag">
                                    <p><a target="link7" href="https://www.openshift.com/"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OpenShift: <a target="link7" href="https://www.openshift.com/">https://www.openshift.com/</a></p>
                                </div>
                                <div class="resourceTag">
                                    <p><a target="link8" href="https://filezilla-project.org/"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FileZilla: <a target="link8" href="https://filezilla-project.org/">https://filezilla-project.org/</a></p>
                                </div>
                                <div class="resourceTag">
                                    <p><a target="link9" href="https://jotform.com/"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JotForm: <a target="link9" href="https://jotform.com/">https://jotform.com/</a></p>
                                </div>   
                                <div class="resourceTag">
                                    <p><a target="link10" href="https://typeform.com/"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TypeForm: <a target="link10" href="https://typeform.com/">https://typeform.com/</a></p>
                                </div>
                                <div class="resourceTag">
                                    <p><a target="link11" href="https://www.heroku.com/"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Heroku: <a target="link11" href="https://www.heroku.com/">https://www.heroku.com/</a></p>
                                </div>
                                <div class="resourceTag">
                                    <p><a target="link12" href="https://c9.io/"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cloud 9: <a target="link12" href="https://c9.io/">https://c9.io/</a></p>
                                </div>
                                <div class="resourceTag">
                                    <p><a target="link13" href="http://fortawesome.github.io/Font-Awesome/cheatsheet/"><i class="fa fa-external-link-square"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FA Icons: <a target="link13" href="http://fortawesome.github.io/Font-Awesome/cheatsheet/">http://fortawesome.github.io/Font-Awesome/cheatsheet/</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="mainPage" id="tabs-b">
                    <div class="title"><h2>Assignments</h2></div>
                    <br><br><br><br><br><br>
                    <h3><i>Sorry, there are no assignments posted at the moment. Please wait for the club to start...</i></h3>
                    <br><br><br><br>
                </section>
                <section class="mainPage" id="tabs-c">
                    <div class="title"><h2>Chat Room</h2></div>
                    <p style="font-size:12px; text-align:center;">* If chat window is closed, click on white space below. Note: Chat is blocked at BASIS</p>
                    <script id="cid0020000099353636005" data-cfasync="false" async src="//st.chatango.com/js/gz/emb.js" style="width: 100%; height: 900px;">{"handle":"webdevclubsupport", "arch":"js", "styles":{"a":"0084ef", "b":100, "c":"FFFFFF", "d":"FFFFFF", "k":"0084ef", "l":"0084ef", "m":"0084ef", "n":"FFFFFF", "p":"10", "q":"0084ef", "r":100, "surl":0, "cnrs":"0.35", "fwtickm":1}}</script>
                </section>
            </div>
        </section>
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
