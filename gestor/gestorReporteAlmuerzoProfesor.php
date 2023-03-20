<?php

require '../sql/conexion.php';
require '../sql/select/selectReporteAlmuerzoProfesor.php';

try {

 	$getfecDesde = $_GET['fechaDesde'];
    $getfecHasta = $_GET['fechaHasta'];
    
	$Select = new SelectReporteAlmuerzoProfesor();
	$rs = $Select->selectReporteAlmuerzoProfesor($getfecDesde, $getfecHasta);
	
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