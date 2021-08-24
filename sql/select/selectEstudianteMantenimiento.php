<?php

require '../sql/conexion.php';

class EstudianteBusquedaMantenimiento 
{
    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function conEstudianteBusquedaMantenimiento($estudiante_Id)
    {        

        if ($this->pdo != null) {		
			
			$consultaSQL = "SELECT Estudiante_Nombre, Estudiante_Apellido1,
                                Estudiante_Apellido2, Estudiante_Cedula, seccion_Id
                            FROM Estudiante
                            WHERE Estudiante_Id =".$estudiante_Id;

			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [						
						'estudiante_Nombre' => $row['Estudiante_Nombre'],
						'estudiante_PrimerApellido' => $row['Estudiante_Apellido1'],
						'estudiante_SegundoApellido' => $row['Estudiante_Apellido2'],
                        'estudiante_Cedula' => $row['Estudiante_Cedula'],
                        'seccion_Id' => $row['seccion_Id']
					];	
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>