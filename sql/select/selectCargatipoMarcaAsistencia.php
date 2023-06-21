<?php

require '../sql/conexion.php';

class SelectCargatipoMarcaAsistencia 
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectCargatipoMarcaAsistencia()
    {        

        if ($this->pdo != null) {		
			
			$consultaSQL = "SELECT * FROM tipoMarcaAsistencia ORDER BY tipoMarcaAsistencia_id";

			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [						
						'tipoMarcaAsistencia_id' => $row['tipoMarcaAsistencia_id'],
						'tipoMarcaAsistencia_Descripcion' => $row['tipoMarcaAsistencia_Descripcion']
					];	
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>