<?php

require '../sql/conexion.php';
require '../sql/select/selectReporteMarcaAsistencia.php';

try {

 	$getfechaDesde = $_GET['fechaDesde'];
    $getfechaHasta = $_GET['fechaHasta'];

	$Select = new SelectReporteMarcaAsistencia();
	$rs = $Select->selectReporteMarcaAsistencia($getfechaDesde, $getfechaHasta);        
	
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