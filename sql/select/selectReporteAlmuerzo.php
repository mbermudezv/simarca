<?php

class SelectReporteAlmuerzo
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectReporteAlmuerzo($fecha, $intTipo)
    {        

        if ($this->pdo != null) {
            
            date_default_timezone_set('America/Costa_Rica');
	 	    $fechaDesde = date_create($fecha)->format('Y-m-d');
			
            $consultaSQL = "SELECT Estudiante_Nombre, Estudiante_Apellido1, 
                                Estudiante_Apellido2, seccion_Descripcion
                            FROM Estudiante INNER JOIN Marca
                            ON Estudiante.Estudiante_Id = Marca.Estudiante_Id 
                            INNER JOIN seccion
                            ON Estudiante.seccion_Id = seccion.seccion_Id
                            WHERE (Marca_Tipo = ".$intTipo.") 
                                AND Marca.Marca_Fecha = '".$fechaDesde."' 
                                ORDER BY seccion.seccion_Id, Estudiante_Apellido1,
                                Estudiante_Apellido2,Estudiante_Nombre";                                

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