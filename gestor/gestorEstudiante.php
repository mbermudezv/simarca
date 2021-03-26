<?php

require '../sql/select/selectEstudiante_por_Cedula.php';
require '../sql/insert/insertMarca.php';	

try {

	$cedula=$_GET['cedula'];
    $intSeleccion=$_POST['seleccion'];

	$dbSelect = new SelectSQL();
    $dbInsert = new InsertSQL();

	$rs = $dbSelect->selectEstudiante_por_Cedula($cedula);
    
    if (count($rs)>0) {

        $intId = $rs['Estudiante_Id'];
         	
        $dbInsert-> insertMarca($intId, $intSeleccion);

        $dbInsert = null;
        
    }
	
    echo json_encode($rs);

    $dbSelect = null;
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