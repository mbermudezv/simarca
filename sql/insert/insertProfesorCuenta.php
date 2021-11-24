<?php

class InsertProfesorCuenta
{
	private $pdo;
	
	function __construct()
	{
		$pdo = new \PDO(DB_Str, DB_USER, DB_PASS);

		$this->pdo = $pdo;
	}

	function insertProfesorCuenta($Cliente_id, $Monto, $Fecha)
	{
		
		date_default_timezone_set('America/Costa_Rica');

		$fecha = date_create($Fecha)->format('Y-m-d');
		            
        $this->pdo->beginTransaction();
                                                             
        $sql = 'INSERT INTO Cuenta 
                    (Cliente_id, Monto, Fecha) 
                VALUES (:Cliente_id, :Monto, :Fecha)';

        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([
            ':Cliente_id' => $Cliente_id,
            ':Monto' => $Monto,
            ':Fecha' => $fecha
            ]);            

        $this->pdo->commit(); 
											
		$stmt = null;

		$this->pdo = null;

		return true;
      
	}

}

?>