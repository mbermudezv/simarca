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

    function selectReporteAlmuerzoProfesor($fechaDesde)
    {        

        if ($this->pdo != null) {
            
            date_default_timezone_set('America/Costa_Rica');
	 	    $fechaDesde = date_create($fechaDesde)->format('Y-m-d');
		                                
            $consultaSQL = "SELECT profesor_cedula, profesor_primer_apellido,
                            profesor_segundo_apellido, profesor_nombre,
                            Monto FROM Cuenta INNER JOIN
                            profesor ON Cuenta.Cliente_id = profesor.profesor_Id
                            WHERE Fecha = '".$fechaDesde."'";     


			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [						
						'profesor_cedula' => $row['profesor_cedula'],
                        'profesor_primer_apellido' => $row['profesor_primer_apellido'],
                        'profesor_segundo_apellido' => $row['profesor_segundo_apellido'],
                        'profesor_nombre' => $row['profesor_nombre'],
                        'Monto' => $row['Monto']                        
					];
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>