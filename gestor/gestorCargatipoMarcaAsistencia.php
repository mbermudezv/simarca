<?php

require '../sql/select/selectCargatipoMarcaAsistencia.php';

try 
    {

        $db = new SelectCargatipoMarcaAsistencia();		
        $rs = $db->selectCargatipoMarcaAsistencia();
        
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