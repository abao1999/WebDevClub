<!DOCTYPE html>
<html>
    <head>
        <title>Web Dev Club - Gallery</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta HTTP-EQUIV="refresh" content="18000; URL=../Account/Login/logout.php">
        <link href="gallerystyle.css" rel="stylesheet" type="text/css"/>
        <link rel="shortcut icon" href="../images/laptopicon.png" type="image/png"/>
        <link rel="stylesheet" type="text/css" href="../bootstrap.css"/>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>    </head>
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
                    <li><a href="codeeditorpage.php" style="height:20px;"> Code </a></li>                    <li><a href="Members.php" style="height:20px;"> Members </a></li>
                    <li><a href="newspage.php" style="height:20px;"> News</a></li>
                    <li><a href="gallery.php" style="height:20px;"> Gallery</a></li>
                    <li id="last_menu_item" class="dropdown"><a id = "dropdownlink" style="height:20px;" class = "dropdown-toggle" data-toggle ="dropdown" href="Account.php">My Account <b class = "caret"></b></a>
                        <ul style="z-index:20;" class="dropdown-menu">
                            <li><a href="account.php#!tabs-1"><span>My Profile</span></a></li>
                            <li><a href="account.php#tabs-2"><span>Options</span></a></li>
                            <li><a href="../account/login/logout.php"><span>Log out</span></a></li>
                        </ul>
                        <script>
                            $(document).ready(function () {
                                $(this).scrollTop(0);
                            });

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

        <div id="title">
            <h1>Gallery</h1>
        </div>
            <p data-height="268" data-theme-id="0" data-slug-hash="wKBgod" data-default-tab="result" data-user="towc" class='codepen'>See the Pen <a href='http://codepen.io/towc/pen/wKBgod/'>Springing Particles</a> by Matei Copot (<a href='http://codepen.io/towc'>@towc</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
            <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
            
            <p data-height="268" data-theme-id="0" data-slug-hash="wKBQKo" data-default-tab="result" data-user="Linoir" class='codepen'>See the Pen <a href='http://codepen.io/Linoir/pen/wKBQKo/'>wKBQKo</a> by Linoir (<a href='http://codepen.io/Linoir'>@Linoir</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
            <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
            
            <p data-height="268" data-theme-id="0" data-slug-hash="qOEXrq" data-default-tab="result" data-user="717" class='codepen'>See the Pen <a href='http://codepen.io/717/pen/qOEXrq/'>A Pen by 717</a> by 717 (<a href='http://codepen.io/717'>@717</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
            <script async src="//assets.codepen.io/assets/embed/ei.js"></script>

            <p data-height="268" data-theme-id="0" data-slug-hash="epmBzW" data-default-tab="result" data-user="filippodlc" class='codepen'>See the Pen <a href='http://codepen.io/filippodlc/pen/epmBzW/'>Loader box border</a> by Filippo Dolci (<a href='http://codepen.io/filippodlc'>@filippodlc</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
            <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
            
            <p data-height="268" data-theme-id="0" data-slug-hash="VvYPOm" data-default-tab="result" data-user="blixt" class='codepen'>See the Pen <a href='http://codepen.io/blixt/pen/VvYPOm/'>Generate palettes from an image</a> by Blixt (<a href='http://codepen.io/blixt'>@blixt</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
            <script async src="//assets.codepen.io/assets/embed/ei.js"></script>

            <p data-height="268" data-theme-id="0" data-slug-hash="rOaWJY" data-default-tab="result" data-user="jennschiffer" class='codepen'>See the Pen <a href='http://codepen.io/jennschiffer/pen/rOaWJY/'>pixelate an image</a> by Jenn (<a href='http://codepen.io/jennschiffer'>@jennschiffer</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
            <script async src="//assets.codepen.io/assets/embed/ei.js"></script>

        <footer id="footer">
            <h1> Web Dev Club </h1>
            <br><br>
            <p>Phone: (602)-819-5728</p>
            <p>Email: <a href="mailto:anthonybao1999@gmail.com">anthonybao1999@gmail.com</a></p>
            <p>Email: <a href="mailto:richardbao419@gmail.com">richardbao419@gmail.com</a></p>
            <p>Email: <a href="mailto:njohns132@gmail.com">njohns132@gmail.com</a></p>
            <a target="social media 1" href="https://www.facebook.com/pages/Web-Dev-Club/1611907219084201?skip_nax_wizard=true"><i class="fa fa-facebook fa-2x"></i></a>
            <p> Thank you for visiting </p>
            <p> Click <a href="../Account/Login/welcome.php#onlineCounter" style="color:lightskyblue;"><strong>HERE</strong></a> to see online activity</p>
            <a href="#">Back to top</a>
        </footer>
        <div style="background:black; text-align:center; color:white!important; width:100%; padding:20px;">
            <p>Content Copyright 2015 Anthony Bao and Richard Bao. All rights reserved</p>
        </div> 
    </body>
</html>