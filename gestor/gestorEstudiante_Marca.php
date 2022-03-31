<?php
require '../sql/conexion.php';
require '../sql/insert/insertMarca.php';

try {

    $intSeleccion = $_POST['seleccion'];    
    $Estudiante_Id = $_POST['Estudiante_Id'];  

    $Insert = new InsertSQL(); 	
    $insert = $Insert-> insertMarca($Estudiante_Id, $intSeleccion);
    
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