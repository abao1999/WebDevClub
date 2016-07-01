<?php

 require('../Account/Login/config.php');
                $rankindex = 1;
                $link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
                mysql_select_db(DB_DATABASE, $link);
                //$result = mysql_query("SELECT * FROM users WHERE type !='T'");
                $result = mysql_query("SELECT * FROM users Order by score DESC");
                echo "<br><br><br>";
                echo "<table style = 'border-collapse: collapse; background: white; margin:auto; width:80%; height:1800px;'>"; // start a table tag in the HTML
                echo "<thead><tr>"
                        . "<th style = 'width:10%;'>Rank</th>"
                        . "<th style = 'width:20%;'>First Name</th>"
                        . "<th style = 'width:20%;'>Last Name</th>"
                        . "<th style = 'width:20%;'>Username</th>"
                        . "<th style = 'width:10%;'>Status</th>"
                        . "<th style = 'width:20%;'>Score</th>"
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
                            . "<strong><td style = 'font-family: Comic Sans MS, cursive, sans-serif; color:blue; width:20%;'>" . $row['firstname'] . "</td>"
                            . "<td style = 'font-family: Comic Sans MS, cursive, sans-serif;color:blue; width:20%;'>" . $row['lastname'] . "</td></strong>"
                            . "<td style = 'color:purple; width:20%; font-style:oblique'>" . $row['username'] . "</td>"
                            . "<td style = 'width:10%; $color'>" . $status . "</td>"
                            . "<td style = 'width:20%; color: gold;'>" . $row['score'] . " webbits</td>"
                        . "</tr>";  //$row['index'] the index here is a field name
                }
                echo "</tbody>";
                echo "</table>"; //Close the table in HTML
