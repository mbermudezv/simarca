<?php

class SelectSQL 
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectEstudiante_por_Cedula($strCedula)
    {        

        if ($this->pdo != null) {		
			
            $consultaSQL = "SELECT * FROM Estudiante WHERE Estudiante_Cedula = '".$strCedula."'";

			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [						
						'Estudiante_Nombre' => $row['Estudiante_Nombre'],
                        'Estudiante_Apellido1' => $row['Estudiante_Apellido1'],
                        'Estudiante_Apellido2' => $row['Estudiante_Apellido2'],
                        'Estudiante_Id' => $row['Estudiante_Id'],
                        'Estudiante_Seccion' => $row['Estudiante_Seccion'],
                        'Estudiante_Cedula' => $row['Estudiante_Cedula']						
					];
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>