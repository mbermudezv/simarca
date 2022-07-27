<?php

require '../sql/conexion.php';
require '../sql/select/selectEstudiante_por_Cedula.php';
require '../sql/select/selectMarcaRegistrada.php';
require '../sql/insert/insertMarca.php';

try {

	$cedula = $_GET['cedula'];
    $intSeleccion = $_GET['seleccion'];
      
	$Select = new SelectSQL();
	$rs = $Select->selectEstudiante_por_Cedula($cedula);
    
    if (count($rs)>0) {

        $intId = $rs[0]["Estudiante_Id"];

        if ($intSeleccion == 3) {

            $rsSolicitudRegistrada = [];
            $selectSolicitudRegistrada = new SelectSQLMarcaRegistrada();
    
            $rsSolicitudRegistrada = 
                                    $selectSolicitudRegistrada->
                                        selectMarcaRegistrada($intId, 4);
    
            if (count($rsSolicitudRegistrada)==0) {
    
                echo json_encode(array("error" => "No Existe la Solicitud de Almuerzo"));
                exit;
    
            }
    
        }
        
        $rsMarcaRegistrada = [];
        $selectMarcaRegistrada = new SelectSQLMarcaRegistrada();
        $rsMarcaRegistrada = $selectMarcaRegistrada->selectMarcaRegistrada($intId, $intSeleccion);

        if (count($rsMarcaRegistrada)==0) {

            $Insert = new InsertSQL(); 	
            $insert = $Insert-> insertMarca($intId, $intSeleccion);
            
            $Insert = null;
            $insert = null;                
        }

       
        echo json_encode($rs); 
        
    }
	         
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