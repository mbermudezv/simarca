<?php

header('Access-Control-Allow-Origin: *');

try {

    echo json_encode(array("error" => "Hola"));    
    
} 

catch (PDOException $e) 
{		

    $rs = null;
    $Email = null;
    echo json_encode(array("error" => $e->getMessage()));
    exit;

}

?>