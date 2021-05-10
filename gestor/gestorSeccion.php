<?php

require '../sql/select/selectSeccion.php';

try 
    {

        $db = new SelectSeccion();		
        $rs = $db->selectSeccion();
        
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