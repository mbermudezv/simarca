<?php

require '../sql/select/selectMarcaContador.php';
	
try {

    $intSeleccion = $_GET['seleccion'];

	$Select = new SelectSQLMarcaContador();
	$rs = $Select->selectMarcaContador($intSeleccion);
        	
    echo $rs[0]['Total'];
    
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