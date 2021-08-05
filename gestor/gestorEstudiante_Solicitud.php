<?php

try {

    $seleccion = $_POST['seleccion'];    
    $arrayEstudiantes = array();
    $arrayEstudiantes = json_decode($_POST['arrayEstudiantes'], true);    

    echo json_encode($arrayEstudiantes);
        
} 

catch (PDOException $e) 
{		

    echo json_encode(array("error" => $e->getMessage()));
    exit;

}

?>