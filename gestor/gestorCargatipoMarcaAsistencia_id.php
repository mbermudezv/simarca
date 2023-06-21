<?php

require '../sql/conexion.php';
require '../sql/select/selectCargatipoMarcaAsistencia_id.php';

try 
    {
        $tipoMarcaAsistencia_id = $_GET['tipoMarcaAsistencia_id'];

        $db = new SelecttipoMarcaAsistencia_id();		
        $rs = $db->selecttipoMarcaAsistencia_id($tipoMarcaAsistencia_id);
        
        echo json_encode($rs);                

        $rs = null;
        $db = null;
    
    } 

catch (PDOException $e) 
    {		

        $rs = null;
        $db = null;
        echo json_encode(array("error" => $e->getMessage()));
        exit;

    }

?>