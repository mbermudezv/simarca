<?php

require '../sql/conexion.php';

class SelectCargaPersona 
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectCargaPersona()
    {        

        if ($this->pdo != null) {		
			
			$consultaSQL = "SELECT * FROM persona
                            ORDER BY persona_nombre, persona_apellido1, persona_apellido2";

			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [						
						'persona_id' => $row['persona_id'],
						'persona_nombre' => $row['persona_nombre'],
						'persona_apellido1' => $row['persona_apellido1'],
						'persona_apellido2' => $row['persona_apellido2']
					];	
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>