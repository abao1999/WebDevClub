<?php
//session_set_cookie_params(0);
session_start();
if (!isset($_SESSION['SESS_MEMBER_ID'])) {
    header("Location: login-form.php");
}
?>
<!DOCTYPE html>

<html>
    <head>
        <title>Member Index</title>
        <meta HTTP-EQUIV="refresh" content="18000; URL=logout.php">
        <link rel="shortcut icon" href="../../images/laptopicon.png" type="image/png"/>
        <link href="loginmodule.css" rel="stylesheet" type="text/css" />
        <link href="solarsystemstylesheet.css" type="text/css" rel="stylesheet"/>
    </head>
    <body>
        <br><br>
        <div id="greeting">
            <h1>Welcome 
                <?php
                echo $_SESSION['SESS_FIRST_NAME'];
                ?>
            </h1>
            <a href="logout.php">Back to Home</a> | <a href="../../body/landingpage.php">Continue to Main Page</a>
            <p>Make sure to check out the chat</p>
            <div><img src="http://simplehitcounter.com/hit.php?uid=1934557&f=65280&b=0" border="0" height="18" width="83" alt="web counter"></div>
        </div>
        <div id="solarSystemAnimation">
            <div id="suncontainer">
                <img alt="the sun" id="sun" src="http://www.nasa.gov/images/content/756752main_20130620-m2.9flare-orig_full.jpg">
            </div>
            <div class="planetOrbit" id="mercury-orbit">
                <img alt="mercury" id="mercury" src="https://www.wwu.edu/depts/skywise/planets/mercury.jpg"/>
            </div>
            <div class="planetOrbit" id="venus-orbit">
                <img alt="venus" id="venus" src="http://www.esa.int/var/esa/storage/images/esa_multimedia/images/2005/08/artist_s_impression_of_the_venusian_surface/10333953-2-eng-GB/Artist_s_impression_of_the_Venusian_surface.jpg"/>
            </div>
            <div class="planetOrbit" id="earth-orbit">
                <img alt="earth" id="earth" src="https://c2.staticflickr.com/6/5448/7203961392_488357f30a_b.jpg"/>
                <div class="moonOrbit" id="moon-orbit">
                    <img alt ="moon" id="moon" src="http://www.robgendlerastropics.com/FullmoonnewL.jpg"/>
                </div>
            </div>
            <div class="planetOrbit" id="mars-orbit">
                <img alt="mars" id="mars" src="http://skywalker.cochise.edu/wellerr/students/mars2/project_files/image001.jpg"/>
                <div class="moonOrbit" id="phobos-orbit">
                    <img alt="phobos" id="phobos" src="http://s3.amazonaws.com/codecademy-content/courses/sun-earth-code/moon.png"/>
                </div>
                <div class="moonOrbit" id="deimos-orbit">
                    <img alt="deimos" id="deimos" src="http://s3.amazonaws.com/codecademy-content/courses/sun-earth-code/moon.png"/>
                </div>
            </div>
            <div class="asteroidOrbit" id="asteroidBelt1">
                <img alt="asteroids" class="asteroids" src="http://www.planetary.cz/wp-content/uploads/rosetta_lutetia_globe.png"/>
            </div>
            <div class="asteroidOrbit" id="asteroidBelt2">
                <img alt="asteroids" class="asteroids" src="http://www.planetary.cz/wp-content/uploads/rosetta_lutetia_globe.png"/>
            </div>
            <div class="asteroidOrbit" id="asteroidBelt3">
                <img alt="asteroids" class="asteroids" src="http://www.planetary.cz/wp-content/uploads/rosetta_lutetia_globe.png"/>
            </div>
            <div class="asteroidOrbit" id="asteroidBelt4">
                <img alt="asteroids" class="asteroids" src="http://www.planetary.cz/wp-content/uploads/rosetta_lutetia_globe.png"/>
            </div>
            <div class="asteroidOrbit" id="asteroidBelt5">
                <img alt="asteroids" class="asteroids" src="http://www.planetary.cz/wp-content/uploads/rosetta_lutetia_globe.png"/>
            </div>
            <div class="asteroidOrbit" id="asteroidBelt6">
                <img alt="asteroids" class="asteroids" src="http://www.planetary.cz/wp-content/uploads/rosetta_lutetia_globe.png"/>
            </div>
            <div class="planetOrbit" id="jupiter-orbit">
                <img alt="jupiter" id="jupiter" src="http://cdn4.sci-news.com/images/enlarge/image_1926_1e-Jupiter-Great-Red-Spot.jpg"/>
                <div class="moonOrbit" id="io-orbit">
                    <img alt="io" id="io" src="http://www.lpi.usra.edu/resources/outerp/io-enh.gif"/>
                </div>
                <div class="moonOrbit" id="europa-orbit">
                    <img alt="europa" id="europa" src="https://upload.wikimedia.org/wikipedia/commons/5/54/Europa-moon.jpg"/>
                </div>
                <div class="moonOrbit" id="ganymede-orbit">
                    <img alt="ganymede" id="ganymede" src="http://www.seasky.org/solar-system/assets/images/ganymede03_sk12.jpg"/>
                </div>
                <div class="moonOrbit" id="callisto-orbit">
                    <img alt="callisto" id="callisto" src="https://solarsystem.nasa.gov/planets/images/inset-jup_callisto-large.gif"/>
                </div>
            </div>
            <div class="planetOrbit" id="saturn-orbit">
                <img alt="saturn" id="saturn" src="http://imagesci.com/img/2013/13/saturn-the-planet-3804-hd-wallpapers.jpg"/>
            </div>
        </div>
        <div id = "onlineCounter">
            <?php
            require('config.php');
            $link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
            mysql_select_db(DB_DATABASE, $link);
            $result = mysql_query("SELECT * FROM active", $link);
            $num_rows = mysql_num_rows($result);
            echo "<h3>";
            if ($num_rows == 1) {
                echo "$num_rows person is online\n";
            } else {
                echo "$num_rows people are online\n";
            }
            echo "</h3>";
            echo "<div>";
            echo "<table>"; // start a table tag in the HTML
            while ($row = mysql_fetch_array($result)) {   //Creates a loop to loop through results
                $duration = date('m/d/Y H:i:s', $row['time']);
                echo "<tr><td>" . $row['username'] . " <span style = 'color:lightgrey;'>since $duration</span></td></tr>";  //$row['index'] the index here is a field name
            }
            echo "</table>"; //Close the table in HTML
            echo "</div>";
            ?>
        </div>
    </body>
</html>