<?php

require '../sql/conexion.php';
require '../sql/select/selectReporteAlmuerzoProfesor.php';

try {

 	$getfecDesde = $_GET['fecha'];

	$Select = new SelectReporteAlmuerzoProfesor();
	$rs = $Select->selectReporteAlmuerzoProfesor($getfecDesde);        
	
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