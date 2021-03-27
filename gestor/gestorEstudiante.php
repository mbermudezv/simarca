<?php

require '../sql/select/selectEstudiante_por_Cedula.php';
require '../sql/insert/insertMarca.php';	

try {

	$cedula = $_GET['cedula'];
    $intSeleccion = $_GET['seleccion'];

	$Select = new SelectSQL();
	$rs = $Select->selectEstudiante_por_Cedula($cedula);
    
    if (count($rs)>0) {

        $intId = $rs[0]["Estudiante_Id"];

        $Insert = new InsertSQL(); 	
        $insert = $Insert-> insertMarca($intId, $intSeleccion);
        
        $Insert = null;
        $insert = null;
        
    }
	
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