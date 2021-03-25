<?php

require '../sql/select/selectEstudiante_por_Cedula.php';	

try {

	$cedula=$_GET['cedula'];

	$db = new SelectSQL();		
	$rs = $db->selectEstudiante_por_Cedula($cedula);			
	
    echo json_encode($rs);

    $rs = null;
    $db = null;

} 

catch (PDOException $e) 
{		

    $rs = null;
    $db = null;
    echo json_encode(array("error" => $e->getMessage()));
    exit;

}

?>