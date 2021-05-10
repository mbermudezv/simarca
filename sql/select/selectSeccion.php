<?php

require '../sql/conexion.php';

class SelectSeccion 
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectSeccion()
    {        

        if ($this->pdo != null) {		
			
			$consultaSQL = "SELECT seccion_Id, seccion_Descripcion FROM seccion 
                            ORDER BY seccion_Descripcion";

			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [						
						'seccion_Id' => $row['seccion_Id'],
						'seccion_Descripcion' => $row['seccion_Descripcion']						
					];	
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>