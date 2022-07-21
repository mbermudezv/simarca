<?php

require '../conexion.php';
require 'selectEstudiante_por_Cedula.php';
require 'selectMarcaRegistrada.php';

try {

	$cedula = $_GET['cedula'];
    $intSeleccion = $_GET['seleccion'];

	$Select = new SelectSQL();
	$rs = $Select->selectEstudiante_por_Cedula($cedula);
    
    if (count($rs)>0) {

        $intId = $rs[0]["Estudiante_Id"];        
        $rsSolicitudRegistrada = [];
        $selectSolicitudRegistrada = new SelectSQLMarcaRegistrada();

        $rsSolicitudRegistrada = $selectSolicitudRegistrada->selectMarcaRegistrada($intId, $intSeleccion);

        if (count($rsSolicitudRegistrada)==0) {

            echo "0";
            exit;

        }
        
    }

    echo "1";
	         
    $Select = null;
    $rs = null;
    
} 

catch (PDOException $e) 
{		

    $rs = null;
    $db = null;
    echo $e->getMessage();
    exit;

}

?>