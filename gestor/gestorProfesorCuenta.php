<?php

require '../sql/conexion.php';
require '../sql/insert/insertProfesorCuenta.php';

try {

    $Cliente_id = $_POST['Cliente_id'];
    $Monto = $_POST['Monto'];
    $Fecha = $_POST['Fecha'];    

    $Insert = new InsertProfesorCuenta();
    $rs = $Insert->insertProfesorCuenta($Cliente_id, $Monto, $Fecha);
        
    echo $rs;
    
    $Insert = null;
    $rs = null;
    
} 
catch (PDOException $e) 
{		
    $rs = null;
    $Insert = null;
    echo $e->getMessage();
    exit;
}

?>