<?php

require '../conexion/conexionEmail.php';
require '../php/email_Almuerzos.php';

try {

    /* $fecha = $_GET['fecha'];
    $JSON_Datos = $_GET['JSON_Datos']; */

    $fecha = "17-08-2021";
    $JSON_Datos = [];

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