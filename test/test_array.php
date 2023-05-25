<?php

$JSON_Datos = array();
$JSON_Datos = json_decode($_POST['JSON_Datos'], true);

$fecha = $_POST['fecha'];

if(!empty($JSON_Datos)) 
    { 
        foreach($JSON_Datos as $key => $value) 
        {
            $nombre = $value['Estudiante_Nombre']. " ". $value['Estudiante_Apellido1'];
            $seccion_Descripcion = $value['seccion_Descripcion'];
            
            echo $nombre . " " . $seccion_Descripcion;
        }
    }

?>