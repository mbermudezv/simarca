<?php

require '../sql/conexion.php';
require '../sql/select/selectReporteAlmuerzo.php';

try {

 	$getfecDesde = $_GET['fecha'];
    $getmarcaTipo = $_GET['tipo'];

	$Select = new SelectReporteAlmuerzo();
	$rs = $Select->selectReporteAlmuerzo($getfecDesde, $getmarcaTipo);        
	
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