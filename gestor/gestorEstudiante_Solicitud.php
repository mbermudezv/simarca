<?php
require '../sql/conexion.php';
require '../sql/select/selectMarcaRegistrada.php';
require '../sql/insert/insertSolicitud.php';

try {

    $intSeleccion = $_POST['seleccion'];    
    $arrayEstudiantes = array();
    $arrayEstudiantes = json_decode($_POST['arrayEstudiantes'], true);    

    $Insert = new InsertSolicitud(); 	
    $insert = $Insert-> insertSolicitud($arrayEstudiantes, $intSeleccion);
    
    $Insert = null;
    $insert = null;
    
    echo "Ok";    
        
} 

catch (PDOException $e) 
{		

    echo json_encode(array("error" => $e->getMessage()));
    exit;

}

?>