<?php

class SelectReporteAlmuerzoProfesor
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectReporteAlmuerzoProfesor($fechaDesde, $fechaHasta)
    {        

        if ($this->pdo != null) {
            
            date_default_timezone_set('America/Costa_Rica');
	 	    $fechaDesde = date_create($fechaDesde)->format('Y-m-d');
            $fechaHasta = date_create($fechaHasta)->format('Y-m-d');
		                                
            $consultaSQL = "SELECT * FROM Cuenta INNER JOIN
                            profesor ON Cuenta.Cliente_id = profesor.profesor_Id
                            WHERE Fecha BETWEEN '".$fechaDesde."' AND '".$fechaHasta."' ";     


			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [						
						'Estudiante_Nombre' => $row['Estudiante_Nombre'],
                        'Estudiante_Apellido1' => $row['Estudiante_Apellido1'],
                        'Estudiante_Apellido2' => $row['Estudiante_Apellido2'],
                        'seccion_Descripcion' => $row['seccion_Descripcion']                        
					];
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>