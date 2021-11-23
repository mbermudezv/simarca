<?php

require '../sql/conexion.php';
require '../sql/select/selectProfesores.php';

try {

    $Profesor = new SelectProfesor();        
    $rs = $Profesor->selectProfesor();
             
    echo json_encode($rs);

    $Profesor = null;
    $rs = null;
    
} 

catch (PDOException $e) 
{		

    $rs = null;
    $Profesor = null;
    echo json_encode(array("error" => $e->getMessage()));
    exit;

}

?>
