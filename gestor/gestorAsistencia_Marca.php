<?php
require '../sql/conexion.php';
require '../sql/select/selectMarcaAsistencia.php';
require '../sql/insert/insertMarcaAsistencia.php';

try {

    $arrayPersonaMarca = array();
    $arrayPersonaMarca = json_decode($_POST['jsonDatos'], true); 


    $Insert = new InsertMarcaAsistencia(); 	
    $insert = $Insert-> insertMarcaAsistencia($arrayPersonaMarca);
    
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