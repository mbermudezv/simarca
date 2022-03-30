<?php

class SelectSinMarcaEstudianteSeccion 
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectSinMarcaEstudianteSeccion($seccion_Id, $Marca_Tipo)
    {        

        if ($this->pdo != null) {
            
            date_default_timezone_set('America/Costa_Rica');

            $Marca_Fecha = date_create('now')->format('Y-m-d');
            
            $consultaSQL = "SELECT * FROM Estudiante 
                            WHERE seccion_Id = $seccion_Id AND Estudiante_Id NOT IN 
                            (SELECT Estudiante_Id FROM Marca 
                            WHERE Marca_Fecha = '$Marca_Fecha' AND 
                            Marca_Tipo = $Marca_Tipo)";	

			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [						
						'Estudiante_Nombre' => $row['Estudiante_Nombre'],
                        'Estudiante_Apellido1' => $row['Estudiante_Apellido1'],
                        'Estudiante_Apellido2' => $row['Estudiante_Apellido2'],
                        'Estudiante_Id' => $row['Estudiante_Id']
					];
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>