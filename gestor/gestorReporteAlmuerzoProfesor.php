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
	
    echo json_encode($rs);
    
    /* $output = array_filter($rs, function($value) {
        return $value == '2021-11-04';  
      });

    echo json_encode($output);   */

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