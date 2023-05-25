<?php

class SelectReporteSolicitud_sin_Almuerzo
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectReporteSolicitud_sin_Almuerzo($fechaDesde, $fechaHasta)
    {        

        if ($this->pdo != null) {
            
            date_default_timezone_set('America/Costa_Rica');
	 	    $fechaDesdeFormato = date_create($fechaDesde)->format('Y-m-d');
            $fechaHastaFormato = date_create($fechaHasta)->format('Y-m-d');

            $consultaSQL = "SELECT Marca_Fecha, Estudiante_Apellido1, 
                            Estudiante_Apellido2, Estudiante_Nombre, 
                            seccion_Descripcion 
                            FROM Estudiante 
                            INNER JOIN Marca
                            ON Estudiante.Estudiante_Id = Marca.Estudiante_Id 
                            INNER JOIN seccion 
                            ON Estudiante.seccion_Id = seccion.seccion_Id
                            WHERE Marca.Marca_Fecha 
                            BETWEEN '".$fechaDesdeFormato."' AND '".$fechaHastaFormato."'
                            AND Marca_Tipo IN (4,3)
                            GROUP BY Marca_Fecha, Estudiante_Apellido1,
                                    Estudiante_Apellido2, Estudiante_Nombre, 
                                    seccion_Descripcion 
                            HAVING COUNT(DISTINCT Marca_Tipo) = 1";                                

			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [						
                        'Marca_Fecha' => $row['Marca_Fecha'],
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