<?php

class DeleteCuentaProfesor
{
	private $pdo;
	
	function __construct()
	{
		$pdo = new \PDO(DB_Str, DB_USER, DB_PASS);
		$this->pdo = $pdo;
	}

	public function deleteCuentaProfesor($cuentaID){
						
		$sql = 'DELETE FROM Cuenta WHERE Cuenta_id = :Cuenta_id';
		 				
		try {

            $stmt = $this->pdo->prepare($sql);
                    
            $stmt->execute([':Cuenta_id' => $cuentaID]);

            $stmt = null;
            $this->pdo = null;

            return true;

        } catch (Exception $e) {
		    echo "Error al conectar con la base de datos: " . $e->getMessage() . "\n";
		    exit;				
	    }	

	}
}

?>