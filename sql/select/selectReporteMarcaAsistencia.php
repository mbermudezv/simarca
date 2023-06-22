<?php

class SelectReporteMarcaAsistencia
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectReporteMarcaAsistencia($fechaDesde, $fechaHasta)
    {        

        if ($this->pdo != null) {
            
            date_default_timezone_set('America/Costa_Rica');
	 	    $fechaDesdeFormato = date_create($fechaDesde)->format('Y-m-d');
            $fechaHastaFormato = date_create($fechaHasta)->format('Y-m-d');

            $consultaSQL = "SELECT persona.persona_nombre,persona_apellido1,
                            persona_apellido2, tipoMarcaAsistencia.tipoMarcaAsistencia_Descripcion,
                            Marca_Asistencia_Fecha, Marca_Asistencia_Hora 
                            FROM Marca_Asistencia 
                            INNER JOIN persona ON 
                            Marca_Asistencia.persona_id = persona.persona_id
                            INNER JOIN tipoMarcaAsistencia ON 
                            Marca_Asistencia.tipoMarcaAsistencia_id = tipoMarcaAsistencia.tipoMarcaAsistencia_id 
                            WHERE Marca_Asistencia_Fecha BETWEEN '".$fechaDesdeFormato."' 
                            AND '".$fechaHastaFormato."' 
                            ORDER BY Marca_Asistencia.persona_id, 
                            Marca_Asistencia_Fecha, 
                            Marca_Asistencia.tipoMarcaAsistencia_id";                                       

			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [						
                        'persona_nombre' => $row['persona_nombre'],
                        'persona_apellido1' => $row['persona_apellido1'],
                        'persona_apellido2' => $row['persona_apellido2'],
						'tipoMarcaAsistencia_Descripcion' => $row['tipoMarcaAsistencia_Descripcion'],
                        'Marca_Asistencia_Fecha' => $row['Marca_Asistencia_Fecha'],
                        'Marca_Asistencia_Hora' => $row['Marca_Asistencia_Hora']                    
					];
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>