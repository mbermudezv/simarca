<?php

require '../sql/conexion.php';
require '../sql/select/selectReporteSolicitud_sin_Almuerzo.php';

try {

 	$getfechaDesde = $_GET['fechaDesde'];
    $getfechaHasta = $_GET['fechaHasta'];

	$Select = new SelectReporteSolicitud_sin_Almuerzo();
	$rs = $Select->selectReporteSolicitud_sin_Almuerzo($getfechaDesde, $getfechaHasta);        
	
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