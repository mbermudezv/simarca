<?php

class InsertProfesorCuenta
{
	private $pdo;
	
	function __construct()
	{
		$pdo = new \PDO(DB_Str, DB_USER, DB_PASS);

		$this->pdo = $pdo;
	}

	function insertProfesorCuenta($Cliente_id, $Monto, $Fecha, $Sinpe)
	{
		
		date_default_timezone_set('America/Costa_Rica');

		$fecha = date_create($Fecha)->format('Y-m-d');		
						            
        $this->pdo->beginTransaction();
                                                             
        $sql = 'INSERT INTO Cuenta 
                    (Cliente_id, Monto, Fecha, Sinpe) 
                VALUES (:Cliente_id, :Monto, :Fecha, :Sinpe)';

        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([
            ':Cliente_id' => $Cliente_id,
            ':Monto' => $Monto,
            ':Fecha' => $fecha,
			':Sinpe' => $Sinpe
            ]);            

        $this->pdo->commit(); 
											
		$stmt = null;

		$this->pdo = null;

		return true;
      
	}

}

?>