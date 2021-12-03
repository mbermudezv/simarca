<?php

class SelectCuentaProfesor
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectCuentaProfesor($profesor_Id)
    {        

        if ($this->pdo != null) {
            			
            $consultaSQL = "SELECT * FROM Cuenta 
                            WHERE Cliente_id = ".$profesor_Id."
                            ORDER BY Fecha DESC";                 

			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

            date_default_timezone_set('America/Costa_Rica');
            
			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {

                $fecha = date_create($row['Fecha'])->format('d-m-Y');

                $rs[] = [
                    'Cuenta_id' => $row['Cuenta_id'],
                    'Cliente_id' => $row['Cliente_id'],						
                    'Monto' => $row['Monto'],
                    'Fecha' => $fecha
                ];
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>