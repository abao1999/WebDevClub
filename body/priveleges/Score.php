<?php
include'testexec.php'; // Includes Login Script
if($_SESSION['SESS_TYPE']!='T') {
        header("Location: ../Denied.html");
    }
?>
<html>
    <head>
        <title>Score Manager</title>
        <link rel="shortcut icon" href="../../images/laptopicon.png" type="image/png"/>
       <link href="layout.css" rel="stylesheet" type="text/css"/>
        <script type = "text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type = "text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.17/jquery-ui.min.js"></script>
    </head>
    <body>
        <br>
        <h1 style = "color:midnightblue;">Manage Scores</h1>
        <hr>
        <br><br> 
        <p style = "color:lightgrey; font-style:oblique;">Award or Deduct Points</p>
        <br>
        <?php
                $rankindex = 1;
                $link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
                mysql_select_db(DB_DATABASE, $link);
                
                //$html=file_get_contents("../NewsPage.php");
                //mysql_query("INSERT INTO pagecodes (name, source) VALUES ('first','" . mysql_real_escape_string($html) . "')");
                
                //$result = mysql_query("SELECT * FROM users WHERE type !='T'");
                $result = mysql_query("SELECT * FROM users Order by score DESC");
                echo "<br><br>";
                echo "<section style='min-width:400px;'>";
                echo "<table style = 'border-collapse: collapse; background: white; margin:auto; width:100%; height:1800px;'>"; // start a table tag in the HTML
                echo "<thead><tr>"
                        . "<th style = 'width:10%;'>Rank</th>"
                        . "<th style = 'width:10%;'>First Name</th>"
                        . "<th style = 'width:10%;'>Last Name</th>"
                        . "<th style = 'width:10%;'>Username</th>"
                        . "<th style = 'width:10%;'>Status</th>"
                        . "<th style = 'width:10%;'>Score</th>"
                    . "</tr></thead>";
                echo "<tbody>";
                while ($row = mysql_fetch_array($result)) {   //Creates a loop to loop through results
                        $username = $row['username'];
                        $status = "OFFLINE";
                        $color = "color: red;";
                        $resultActive = mysql_query("SELECT * FROM active WHERE BINARY username='$username'");
                        $rowActive = mysql_fetch_array($resultActive);  
                        if(mysql_num_rows($resultActive)>0)   {
                            $status = "ONLINE";
                            $color = "color: green;";
                            if(time()-$rowActive['last']>900)   {
                                $status = "IDLE";
                                $color = "color: brown;";
                            }
                        }
                    echo "<tr>"
                            . "<td style = 'width:10%;'># " . $rankindex++ . "</td>"
                            . "<strong><td style = 'font-family: Comic Sans MS, cursive, sans-serif; color:blue; width:10%;'>" . $row['firstname'] . "</td>"
                            . "<td style = 'font-family: Comic Sans MS, cursive, sans-serif;color:blue; width:10%;'>" . $row['lastname'] . "</td></strong>"
                            . "<td style = 'color:purple; width:10%; font-style:oblique'>" . $row['username'] . "</td>"
                            . "<td style = 'width:10%; $color'>" . $status . "</td>"
                            . "<td style = 'width:10%; color: gold;'>" . $row['score'] . " webbits</td>"
                            . "<td style = 'width:40%;'><form action='' method='post'>
                                <input name = 'member' type = 'text' value = '$username' readonly='readonly'>
                                <input name='points' type='text' value = '1'/>
                                <input name='add' type='submit' value=' Add '/>
                                <input name='subtract' type='submit' value=' Subtract '/>
                             </form></td>"
                        . "</tr>";  //$row['index'] the index here is a field name
                }
                echo "</tbody>";
                echo "</table>"; //Close the table in HTML
                echo "</section>";
        ?>