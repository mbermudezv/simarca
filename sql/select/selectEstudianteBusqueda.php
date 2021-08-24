<?php

require '../sql/conexion.php';

class EstudianteBusqueda 
{
    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function conEstudianteBusqueda($alias)
    {        

        if ($this->pdo != null) {		
			
			$consultaSQL = "SELECT * FROM Estudiante WHERE  
                            Estudiante_Nombre like '%$alias%' 
                            OR Estudiante_Apellido1 like '%$alias%' OR 
                            Estudiante_Apellido2 like '%$alias%'
                            ORDER BY Estudiante_Nombre DESC";

			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [						
						'estudiante_Id' => $row['Estudiante_Id'],	                
						'estudiante_Nombre' => $row['Estudiante_Nombre'],
						'estudiante_PrimerApellido' => $row['Estudiante_Apellido1'],
						'estudiante_SegundoApellido' => $row['Estudiante_Apellido2']	
					];	
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>