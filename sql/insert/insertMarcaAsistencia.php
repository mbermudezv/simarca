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

		$fecha = date_create('now')->format('Y-m-d H:i:s');		
		
        if(!empty($arrayPersonaMarca)) {
            
            $this->pdo->beginTransaction();
            
            foreach($arrayPersonaMarca as $key => $arrayPersonaMarca_key) {
                                       
                $selectMarcaRegistrada = new SelectMarcaAsistencia();
                $rsMarcaRegistrada = $selectMarcaRegistrada
                                        ->selectMarcaAsistencia(
                                                $arrayPersonaMarca_key["persona_id"],
                                                $arrayPersonaMarca_key["tipoMarcaAsistencia_id"]);
            
                if (count($rsMarcaRegistrada)==0) {
            
                    $sql = 'INSERT INTO Marca_Asistencia 
                    (persona_id, tipoMarcaAsistencia_id, Marca_Asistencia_Fecha) 
                    VALUES 
                    (:persona_id, :tipoMarcaAsistencia_id, :Marca_Asistencia_Fecha)';

                    $stmt = $this->pdo->prepare($sql);

                    $stmt->execute([
                        ':persona_id' => $arrayPersonaMarca_key["persona_id"],
                        ':tipoMarcaAsistencia_id' => $arrayPersonaMarca_key["tipoMarcaAsistencia_id"],
                        ':Marca_Asistencia_Fecha' => $fecha
                        ]);

                }        

            }

            $this->pdo->commit(); 
        }
											
		$stmt = null;

		$this->pdo = null;

		return true;
      
	}

}

?>