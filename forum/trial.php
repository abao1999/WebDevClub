<?php
//Template for basic page
$template = <<<EOD
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><!--TITLE--></title>
</head>

<body>
<!--COMMENT--> 
</body>
</html>
EOD;

//handle the posted form
if(isset($_POST['title'])&&isset($_POST['comment'])){
    //replace the areas of the template with the posted values
    $page = str_replace('<!--TITLE-->',htmlentities($_POST['title']),$template);
    $page = str_replace('<!--COMMENT-->',htmlentities($_POST['comment']),$page);
    //create a name for the new page
    $pagename = md5($_POST['title']).'.html';
    
    /**
    //db connect & select
    $db=mysql_connect('localhost','user','pass');
    mysql_select_db('yourdb');

    //check if page already exists
    $result = mysql_query('SELECT pagename from yourtable WHERE url="'.mysql_real_escape_string($pagename).'"');
    if(mysql_num_rows($result)>=1){
        $notice = '<p>Page already created <b>./pages/'.$pagename.'</b></p>';
    }
    else{
    
        //inset new page into db
        mysql_query('INSERT into yourtable (`id`,`title`,`comment`,`url`)VALUES("",
        "'.mysql_real_escape_string(htmlentities($_POST['title'])).'",
        "'.mysql_real_escape_string(htmlentities($_POST['comment'])).'",
        "'.$pagename.'")');
        //put the created content to file
        file_put_contents('./pages/'.$pagename,$page);
        //make a notice to show the user
        $notice = '<p>New Page created <b>./pages/'.$pagename.'</b></p>';
    }
    **/
      file_put_contents('pages/'.$pagename,$page);
      //make a notice to show the user
      $notice = '<p>New Page created <b>pages/'.$pagename.'</b></p>';
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Language" content="en-gb">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Make page example</title>
</head>

<body>
<?php
//if the notice is set then display it
if(isset($notice)){echo $notice;} ?>
<form method="POST" action="">
  <p>Title:<input type="text" name="title" size="31"></p>
  <p>Comment:</p>
  <p><textarea rows="5" name="comment" cols="21"></textarea></p>
  <p><input type="submit" value="Submit"></p>
</form>
</body>
</html>