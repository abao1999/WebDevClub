// <?php
//  //session_set_cookie_params(0);
//  session_start();
//  if (!isset($_SESSION['SESS_MEMBER_ID'])) {
//      header("Location: ../../../account/login/login-form.php");
//  }
//  include('detectidle.php');
// ?>

<!DOCTYPE html>
<html>
    <head>
        <title>Web Dev Club - Learn</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta HTTP-EQUIV="refresh" content="18000; URL=../../../account/login/logout.php">
        <link href="../resources/tutstyle.css" rel="stylesheet" type="text/css"/>
        <link rel="shortcut icon" href="../../../images/wdclogo1.png" type="image/png"/>
        <link rel="stylesheet" type="text/css" href="../../../bootstrap.css"/>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="canvastree.js"></script>
    </head>
    <body>
        <script>
            $(function () {
                $('a[href*=#]:not([href=#])').click(function () {
                    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        if (target.length) {
                            $('html,body').animate({
                                scrollTop: target.offset().top
                            }, 800);
                            return false;
                        }
                    }
                });
            });
        </script>
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
            <h1> Code Samples and Tutorials  </h1>
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
                <div id="content" style="background:lightgreen;">
                    <div id="pointerArrow1">
                        <a href="#firstdescriptiontext2"><i class="fa fa-angle-down fa-3x"></i></a>
                    </div>
                    <canvas id="canvastree"></canvas>
                    <article id="firstdescription">
                        <div id="firstdescriptiontext1">
                            Learn the fundamental concepts of front-end web development with HTML, CSS, and JavaScript.</p>
                            <img alt="HTML5 CSS JS" src="http://howardism.org/Technical/Learning/web-trifecta.svg"/>
                            Start with these basic skills and keep expanding your knowledge to grow your awesome tree of mad skills 
                        </div>
                        <div id="firstdescriptiontext2">
                            <h1>In This Chapter...</h1>
                            <hr><br>
                            <ol>
                                <li><strong>Learn HTML 5</strong>
                                <ul>
                                    <li>HTML Tags</li>
                                    <li>Attributes</li>
                                    <li>Properties</li>
                                </ul>
                                </li>
                                <li><strong>Learn CSS 3</strong>
                                <ul>
                                    <li>Style your HTML</li>
                                    <li>Create beautiful web pages</li>
                                </ul>
                                </li>
                                <li><strong>Learn JavaScript</strong>
                                <ul>
                                    <li>Understand JS code</li>
                                    <li>Use JQuery for Basic Animations</li>
                                    <li>Gain knowledge of the logic behind all web sites</li>
                                </ul>
                                </li>
                            </ol>
                            <a href="../tutorials/tutorial1.html" id="getstartednowbutton">Get Started Now</a>
                        </div>
                    </article>
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
            <p> Click <a href="../../../account/login/welcome.php#onlinecounter" style="color:lightskyblue;"><strong>HERE</strong></a> to see online activity</p>
            <a href="#">Back to top</a>
        </footer>
        <div style="background:black; text-align:center; color:white!important; width:100%; padding:20px;">
            <p>Content Copyright 2015 Anthony Bao and Richard Bao. All rights reserved</p>
        </div>
    </body>
</html>
