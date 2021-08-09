<?php

class InsertSolicitud
{
	private $pdo;
	
	function __construct()
	{
		$pdo = new \PDO(DB_Str, DB_USER, DB_PASS);

		$this->pdo = $pdo;
	}

	function insertSolicitud($arrayEstudiantes, $intSeleccion)
	{
		
		date_default_timezone_set('America/Costa_Rica');

		$fecha = date_create('now')->format('Y-m-d H:i:s');
		//$fecha = date_create('now')->format('Y-m-d');		
		
        if(!empty($arrayEstudiantes)) {
            
            $this->pdo->beginTransaction();
            
            foreach($arrayEstudiantes as $key => $arrayEstudiantesId) {
                
                $intEstudianteId = $arrayEstudiantesId;                

                $sql = 'INSERT INTO Marca 
                (Estudiante_Id, Marca_Tipo, Marca_Fecha) 
                VALUES 
                (:Estudiante_Id, :Marca_Tipo, :Marca_Fecha)';

                $stmt = $this->pdo->prepare($sql);

                $stmt->execute([
                    ':Estudiante_Id' => $intEstudianteId,
                    ':Marca_Tipo' => $intSeleccion,
                    ':Marca_Fecha' => $fecha
                    ]);

            }

            $this->pdo->commit(); 
        }
											
		$stmt = null;

		$this->pdo = null;

		return true;
      
	}

}

?>