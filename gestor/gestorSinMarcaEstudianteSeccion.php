<?php

require '../sql/conexion.php';
require '../sql/select/selectSinMarcaEstudiante_por_Seccion.php';

try {

	$seccion_Id = $_GET['seccion_Id'];
    $Marca_Tipo = $_GET['Marca_Tipo'];
    
	$Select = new SelectSinMarcaEstudianteSeccion();
	$rs = $Select->selectSinMarcaEstudianteSeccion($seccion_Id, $Marca_Tipo);        
	
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