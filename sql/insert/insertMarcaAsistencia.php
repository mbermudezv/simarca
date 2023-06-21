<?php

class InsertMarcaAsistencia
{
	private $pdo;
	
	function __construct()
	{
		$pdo = new \PDO(DB_Str, DB_USER, DB_PASS);

		$this->pdo = $pdo;
	}

	function insertMarcaAsistencia($arrayPersonaMarca)
	{
		
		date_default_timezone_set('America/Costa_Rica');

		$fecha = date_create('now')->format('Y-m-d');
        $hora =	date_create('now')->format('H:i:s');	
		
        if(!empty($arrayPersonaMarca)) {
                                                                           
            $selectMarcaRegistrada = new SelectMarcaAsistencia();                

            $rsMarcaRegistrada = $selectMarcaRegistrada
                                    ->selectMarcaAsistencia(
                                        $arrayPersonaMarca["persona_id"],
                                        $arrayPersonaMarca["tipoMarcaAsistencia_id"]);
        
            if (count($rsMarcaRegistrada)==0) {
                
                $sql = 'INSERT INTO Marca_Asistencia 
                        (persona_id, tipoMarcaAsistencia_id, 
                        Marca_Asistencia_Fecha, Marca_Asistencia_Hora) 
                        VALUES 
                        (:persona_id, :tipoMarcaAsistencia_id, 
                        :Marca_Asistencia_Fecha, :Marca_Asistencia_Hora)';

                $this->pdo->beginTransaction();
                
                $stmt = $this->pdo->prepare($sql);

                $stmt->execute([
                    ':persona_id' => $arrayPersonaMarca["persona_id"],
                    ':tipoMarcaAsistencia_id' => $arrayPersonaMarca["tipoMarcaAsistencia_id"],
                    ':Marca_Asistencia_Fecha' => $fecha,
                    ':Marca_Asistencia_Hora' => $hora
                    ]);

                $this->pdo->commit();

                return "ok";

            }        
            
        }
											
		$stmt = null;

		$this->pdo = null;

		return false;
      
	}

}

?>