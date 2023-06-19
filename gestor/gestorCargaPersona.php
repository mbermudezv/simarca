<?php

require '../sql/select/selectCargaPersona.php';

try 
    {

        $db = new SelectCargaPersona();		
        $rs = $db->selectCargaPersona();
        
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