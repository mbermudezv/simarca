<?php

require '../sql/conexion.php';

class SelectTipoMarca 
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectTipoMarca()
    {        

        if ($this->pdo != null) {		
			
			$consultaSQL = "SELECT tipoMarca_Id, tipoMarca_Descripcion FROM tipoMarca 
                            ORDER BY tipoMarca_Descripcion";

			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [						
						'tipoMarca_Descripcion' => $row['tipoMarca_Descripcion'],
						'tipoMarca_Id' => $row['tipoMarca_Id']						
					];	
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>