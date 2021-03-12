<?php

require '../sql/select/selectTipoMarca.php';

try 
    {

        $db = new SelectSQL();		
        $rs = $db->TipoMarca();
        
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