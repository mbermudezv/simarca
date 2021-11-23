<?php

require '../sql/conexion.php';
require '../sql/select/selectCuentaProfesor_x_Id.php';

$id = $_GET['id'];

try {
              
    $Profesor = new SelectCuentaProfesor();        
    $rs = $Profesor->selectCuentaProfesor($id);
              
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
