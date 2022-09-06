<?php

require '../sql/conexion.php';

class SelectMenu 
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function conMenuDescripcion($intId)
    {        

        if ($this->pdo != null) {		
			
            $consultaSQL = "SELECT * FROM Menu WHERE Menu_Id = ".$intId."";
                            
			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [
                        'Menu_id' => $row['Menu_Id'],
		            	'Menu_Descripcion' => $row['Menu_Descripcion']						
					];
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}


?>
