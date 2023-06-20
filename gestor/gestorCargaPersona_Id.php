<?php

require '../sql/conexion.php';
require '../sql/select/selectCargaPersona_Id.php';

try 
    {
        $persona_id = $_GET['persona_id'];

        $db = new SelectCargaPersona_Id();		
        $rs = $db->selectCargaPersona_Id($persona_id);
        
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