<!DOCTYPE html>
<html>
    <head>
        <title>Web Dev Club</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Anthony Bao and Richard Bao">
        <meta name="keywords" content="basis, basis scottsdale, web, dev, club, website, development">
        <link rel="shortcut icon" href="images/WDCLogo1.png" type="image/png"/>
        <link href="stylesheet1.css" rel="stylesheet" type="text/css"/>
        <link href="bootstrap.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/jquery-latest.min.js"></script>
        <script src="//unslider.com/unslider.min.js"></script>
        <script src="js/libs2/countClicks.js" type="text/javascript"></script>

        <link rel='stylesheet' id='parent-style-css'  href='themes/oneengine/style.css' type='text/css' media='all' />
        <link rel='stylesheet' id='bootstrap-style-css'  href='themes/oneengine/bootstrap-4.0.7.css' type='text/css' media='all' />

        <script type='text/javascript' src='js/jquery/jquery-1.11.1.js'></script>
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
        <script type='text/javascript'>
            var index = 0;
            var text = 'Web Dev Club';
            function type() {
                document.getElementById('nameOfClub').innerHTML += text.charAt(index);
                index += 1;
                var t = setTimeout('type()', 100);
            }
        </script>
        <script>
            $(function () { // $(document).ready shorthand
                $('#peopleNames').hide().delay(2000).fadeIn('slow');
                $('#fblike1').hide().delay(3000).slideDown(300);
            });
        </script>
    </head>
    <body onload="type();
            clickCounterForever();">
        <div id="fb-root"></div>
        <script>(function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id))
                    return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));</script>
        <div id="custom" class="navbar navbar-default navbar-fixed-top" role="navigation" style="z-index:100;">
            <div class="container-fluid">
                <div class="navbar-header">
                    <img src="images/WDCLogo1.png" alt="" style="height:30px; width:30px; margin-top:5px"/>
                    <a class="navbar-brand" href="#"> 
                        The Web Dev Club
                    </a>
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-menubuilder" style = "margin-top:7px;">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse navbar-menubuilder">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#home" style="height:20px;">Home</a></li>
                        <li><a href="#objective" style="height:20px;">Description</a></li>
                        <li><a href="#club-info" style="height:20px;">Club Info</a></li>
                        <li><a href="#contact-us" style="height:20px;">Contact Us</a></li>
                        <li><a href="#stats" style="height:20px;">Stats</a></li>
                        <li><a href="../account/register/register-form.php" style="height:20px;">Sign Up</a></li>
                        <li><a href="../account/login/login-form.php" style="height:20px;">Log in</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <div class="banner">
                <ul>
                    <li id="wallPaperSlide1"></li>
                    <li id="wallPaperSlide2"></li>
                    <!--
                    <li id="wallPaperSlide3"></li>
                    -->
                    <li id="wallPaperSlide4"></li>
                    <li id="wallPaperSlide5"></li>
                </ul>
            </div>   
            <script>
                $(function () {
                    $('.banner').unslider({
                        speed: 500, //  The speed to animate each slide (in milliseconds)
                        delay: 8000, //  The delay between slide animations (in milliseconds)
                    });
                });
            </script>
        </div>
        <section id="home">
            <h1 id="nameOfClub" style="height:80px;"><noscript>Web Dev Club</noscript></h1> <br>
            <h3 id="peopleNames" style="height:36px;">Hosted by Anthony Bao, Richard Bao, Nathan Johns</h3>
            <br><br>
            <div id="fblike1" class="fb-like" data-href="https://www.facebook.com/pages/Web-Dev-Club/1611907219084201?skip_nax_wizard=true" data-layout="standard" data-action="like" data-show-faces="true" data-share="true" style="margin-left:170px;"></div>
            <div id="loginandregister">
                <form action="../account/login/login-form.php">
                    <button class="account_buttons" type="submit">
                        Log in
                    </button>
                </form>
                <form action="../account/register/register-form.php">
                    <button class="account_buttons" type="submit">
                        Sign up
                    </button>
                </form>
            </div>
        </section>

        <section id="objective">
            <h2>Objectives</h2>
            <br><br><br><br>
            <p>The Web Development Club is a free club for students in 5th through 8th grade.</p>
            <p>It will run from September 15th to April 7th and students will be taught the basics of web development.</p>
            <p>Students will learn HTML5, CSS3, and some JavaScript/JQuery, as well as understanding the fundamental concepts of web development.</p>
            <p>Depending on time, we will also go over MySQL databases and PHP, although these topics are beyond our main scope. </p>
            <p>The objective for this club is for students to eventually be able to not only create their own websites, but to be able to host them as well.</p>
            <p>We will be using NetBeans IDE for the development environment and Openshift, Google Drive and other free platforms for hosting. </p>
            <p>The Web Dev Club will be an enriching experience that will teach valuable skills and open doors.</p>
        </section>


        <section id="club-info">
            <h2> Club Info </h2> <br><br><br><br>
            <ul class="slides">
                <input type="radio" name="radio-btn" id="img-1" checked />
                <li class="slide-container">
                    <div class="slide">
                        <h3>  People </h3>
                        <p><strong>Dr. Mitra Sahu</strong>: Club Supervisor/Activity Manager</p> 
                        <br>
                        <p>Anthony Bao</p>  <!--Co-founder/Director-->
                        <p>Richard Bao</p>  <!--Co-founder/President-->
                        <p>Nathan Johns</p>  <!--Co-founder/Vice-President-->
                        <!--
                        titles: founder, cofounder, manager, director, president, vice president
                        -->
                    </div>
                    <div class="nav">
                        <label for="img-3" class="prev">&#x2039;</label>
                        <label for="img-2" class="next">&#x203a;</label>
                    </div>
                </li>
                <input type="radio" name="radio-btn" id="img-2" />
                <li class="slide-container">
                    <div class="slide">
                        <h3> Meeting Times </h3>
                        <p>Once a week from September 15th to April 7th</p>
                        <p>Meetings will be scheduled on Tuesdays.</p>
                        <p>They will be held from 4:00pm to 5:00pm</p>
                        <p style = "font-style:italic;">Scheduled meeting times may be subject to change</p>
                        <br>
                        <p>WE HOPE TO SEE YOU THERE : )</p>
                    </div>
                    <div class="nav">
                        <label for="img-1" class="prev">&#x2039;</label>
                        <label for="img-3" class="next">&#x203a;</label>
                    </div>
                </li>

                <input type="radio" name="radio-btn" id="img-3" />
                <li class="slide-container">
                    <div class="slide">
                        <h3> Location </h3>
                        <p>The club will meet in room 9 (Dr. Sahu's Room)</p>
                        <p style = "font-style:italic;">Scheduled meeting locations may be subject to change</p>
                        <br><br>
                        <p>Try to bring your own computer</p>
                    </div>
                    <div class="nav">
                        <label for="img-2" class="prev">&#x2039;</label>
                        <label for="img-1" class="next">&#x203a;</label>
                    </div>
                </li>
                <li class="nav-dots">
                    <label for="img-1" class="nav-dot" id="img-dot-1"></label>
                    <label for="img-2" class="nav-dot" id="img-dot-2"></label>
                    <label for="img-3" class="nav-dot" id="img-dot-3"></label>
                </li>
            </ul>
        </section>
        <section id = "contact-us">
            <h2>Contact Us</h2><br><br><br><br>
            <div id = "contact-info">
                <div>
                    <p><strong>Anthony Bao</strong></p>
                    <img src = "../images/AnthonyAvatar.jpg" alt="Anthony"/>
                    <p style = "color:blue;">Email:</p>
                    <a style = "color:black;" href = "mailto:anthonybao1999@gmail.com">anthonybao1999@gmail.com</a>
                    <p style = "color:blue">Phone:</p>
                    <p style = "color:black;">602-819-5728</p>
                </div>

                <div>
                    <p><strong>Richard Bao</strong></p>
                    <img src = "../images/richardProfile.JPG" alt="Richard"/>
                    <p style = "color:blue;">Email:</p>
                    <a style = "color:black;" href = "mailto:richardbao419@gmail.com">richardbao419@gmail.com</a>
                    <p style = "color:blue">Phone:</p>
                    <p style = "color:black;">602-919-5818</p>
                </div>

                <div> 
                    <p><strong>Nathan Johns</strong></p>
                    <img src = "http://www.plentyofcheddar.com/wp-content/uploads/2013/11/questionmark4.jpg" alt = "Nathan"/>
                    <p style = "color:blue;">Email:</p>
                    <a style = "color:black;" href = "mailto:njohns132@gmail.com">njohns132@gmail.com</a>
                    <p style = "color:blue">Phone:</p>
                    <p style = "color:black;">???-???-!!!!</p>
                </div>
            </div>
        </section>
        <div id="stats" class="specialSection" style="background:green;"> <!--#e0e0e0-->
            <div class="container">
                <div class="row">
                    <div class="animation-wrapper col-md-12" style="margin:10px 0 10px;" >
                        <div class="heading-title-wrapper " >
                            <h2>Statistics</h2>
                            <br><br>
                            <span class="sub-title">Web Dev Club members learn HTML, CSS, JavaScript, JQuery, and more. Moreover, our members are taught useful project management skills, website design, and most importantly, good coding practices and style.</span>
                            <br><br>
                            <span class="sub-title">Below are percentages of all websites that use the following languages:</span> <br><br>
                        </div>
                    </div>
                    <!-- END ET-HEADING-TITLE-BLOCK -->
                    <div class="pie-wrapper" style="margin:50px 0 10px;"><div class="pie-column col-md-3">
                            <span class="chart" data-percent="100" data-easing="easeOutExpo" data-animate="2000" data-line-cap="square" data-line-width="10" data-track-color="#ecf0f1" data-bar-color="#3498db" style="width:150px;height:150px">
                                <span class="percent-chart" style="line-height:150px;"></span>
                            </span>
                            <div class="pie-content">
                                <h2>HTML/XHTML</h2>
                            </div>
                        </div>
                        <div class="pie-column col-md-3">
                            <span class="chart" data-percent="91" data-easing="easeOutExpo" data-animate="2000" data-line-cap="square" data-line-width="10" data-track-color="#ecf0f1" data-bar-color="#ffc600" style="width:150px;height:150px">
                                <span class="percent-chart" style="line-height:150px;"></span>
                            </span>
                            <div class="pie-content">
                                <h2>CSS</h2>
                            </div>
                        </div>
                        <div class="pie-column col-md-3">
                            <span class="chart" data-percent="89" data-easing="easeOutExpo" data-animate="2000" data-line-cap="square" data-line-width="10" data-track-color="#ecf0f1" data-bar-color="#e67e22" style="width:150px;height:150px">
                                <span class="percent-chart" style="line-height:150px;"></span>
                            </span>
                            <div class="pie-content">
                                <h2>JavaScript</h2>
                            </div>
                        </div>
                        <div class="pie-column col-md-3">
                            <span class="chart" data-percent="39" data-easing="easeOutExpo" data-animate="2000" data-line-cap="square" data-line-width="10" data-track-color="#ecf0f1" data-bar-color="springgreen" style="width:150px;height:150px">
                                <span class="percent-chart" style="line-height:150px;"></span>
                            </span>
                            <div class="pie-content">
                                <h2>PHP</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="template-wrap cf" style="padding-bottom:50px; padding-top:50px; background:lightgreen;"> <!--#ecf0f1-->
                <div class="container">
                    <div class="row">
                        <div class="counter-wrapper" style="margin:10px 0 10px;">
                            <div class="counter col-md-3">
                                <span class="timer" data-from="0" data-to="54" data-speed="2000" data-refresh-interval="50"></span>
                                <span class="counter-title">Student Members</span>
                            </div>
                            <div class="counter col-md-3">
                                <span class="timer" data-from="0" data-to="4" data-speed="2000" data-refresh-interval="50"></span>
                                <span class="counter-title">Instructors</span>
                            </div>
                            <div class="counter col-md-3">
                                <span class="timer" data-from="0" data-to="1" data-speed="2000" data-refresh-interval="50"></span>
                                <span class="counter-title">Completed websites</span>
                            </div>
                            <div class="counter col-md-3">
                                <span class="timer" data-from="0" data-to="23" data-speed="2000" data-refresh-interval="50"></span>
                                <span class="counter-title">Club duration (weeks)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section id ="club-photo">
            <a target="BASISSCOTTSDALE" href = "http://basisscottsdale.org/"><img src = "http://nebula.wsimg.com/177011edbbb7027a4e3fd4426dcd88f6?AccessKeyId=4AC19913B3B06F57AC6A&disposition=0&alloworigin=1"/></a>
        </section>
        <footer>
            <h2> Web Dev Club </h2>
            <p>Email: <a href="mailto:anthonybao1999@gmail.com">anthonybao1999@gmail.com</a></p>
            <p>Email: <a href="mailto:richardbao419@gmail.com">richardbao419@gmail.com</a></p>
            <p>Email: <a href="mailto:njohns132@gmail.com">njohns132@gmail.com</a></p>
            <a target="social media 1" href="https://www.facebook.com/pages/Web-Dev-Club/1611907219084201?skip_nax_wizard=true"><i class="fa fa-facebook fa-2x"></i></a>
            <div style="text-align:center; font-size:12px; margin:0 auto;"><p>You have recently visited this page <span id="resultForever" style="color:#00B800"></span> times.</p></div>
            <div><img src="http://simplehitcounter.com/hit.php?uid=1934478&f=16777215&b=0" border="0" height="18" width="83" alt="web counter"></div>
            <p> Thank you for visiting </p>
            <a href="#">Back to top</a>
        </footer>
        <div style="background:black; text-align:center; color:white!important; width:100%; padding:20px;">
            <p>Content Copyright 2015 Anthony Bao and Richard Bao. All rights reserved</p>
        </div>

        <!-- For Stats Section -->
        <script type='text/javascript' src='js/libs/waypoints.min.js'></script>
        <script type='text/javascript' src='js/libs/statsCounter.js'></script>

        <script type='text/javascript' src='js/libs/easyPieChart.js'></script>

        <script type='text/javascript' src='js/libs/pieChart1.js'></script>
    </body>
</html>
