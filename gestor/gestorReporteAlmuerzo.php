<?php

require '../sql/conexion.php';
require '../sql/select/selectEstudiante_por_Seccion.php';

try {

	$seccion_Id = $_GET['seccion_Id'];
    
	$Select = new SelectEstudianteSeccion();
	$rs = $Select->selectEstudianteSeccion($seccion_Id);        
	
    echo json_encode($rs);
    
    $Select = null;
    $rs = null;
    
} 

catch (PDOException $e) 
{		

    $rs = null;
    $db = null;
    echo json_encode(array("error" => $e->getMessage()));
    exit;

}

?>