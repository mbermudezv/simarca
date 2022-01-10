<?php

ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(-1);

require '../sql/conexion.php';
require '../sql/select/selectReporteAlmuerzoProfesor.php';

try {

 	// $getfecDesde = $_GET['fechaDesde'];
    // $getfecHasta = $_GET['fechaHasta'];

    $getfecDesde = '01-11-2021';
    $getfecHasta = '30-12-2021';
    
	$Select = new SelectReporteAlmuerzoProfesor();
	$rs = $Select->selectReporteAlmuerzoProfesor($getfecDesde, $getfecHasta);
	
    //echo json_encode($rs);
    
    date_default_timezone_set('America/Costa_Rica');
	$fechaDesdeYMD = date_create($fechaDesde)->format('Y-m-d');
    $fechaHastaYMD = date_create($fechaHasta)->format('Y-m-d');

    $begin = new DateTime($fechaDesdeYMD);
    $end   = new DateTime($fechaHastaYMD);
   

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