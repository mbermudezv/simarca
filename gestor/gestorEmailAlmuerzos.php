<?php

require '../conexion/conexionEmail.php';
require '../php/email_Almuerzos.php';

header('Access-Control-Allow-Origin: *');

try {

    /* $fecha = $_POST['fecha'];
    $JSON_Datos = $_POST['JSON_Datos']; */

    $fecha = '11-08-2021';
    $JSON_Datos = 1;

    $Email = new Email_Almuerzos();
    $rs = $Copias->email_Almuerzos($fecha, $JSON_Datos);
        
    echo $rs;

    $Email = null;
    $rs = null;
    
} 

catch (PDOException $e) 
{		

    $rs = null;
    $Email = null;
    //echo json_encode(array("error" => $e->getMessage()));
    exit;

}

?>