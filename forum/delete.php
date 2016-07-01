<?php
$files = glob('pages/*'); // get all file names
foreach($files as $file){ // iterate files
  if(is_file($file))
    unlink($file); // delete file
}

/**
$files = scandir('../Forum/pages/');
foreach($files as $file) {
    unlink($file);
}
**/