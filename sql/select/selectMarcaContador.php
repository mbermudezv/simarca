<?php

require '../sql/conexion.php';

class SelectSQLMarcaContador 
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectMarcaContador($intTipo)
    {        
        $rs = [];

        if ($this->pdo != null) {
            
            date_default_timezone_set('America/Costa_Rica');
		    $fecha = date_create('now')->format('Y-m-d');	
			
            $consultaSQL = "SELECT count(*) AS Total FROM Marca 
                            WHERE Marca_Tipo = ".$intTipo." AND 
                            Marca_Fecha = '$fecha'";

			$sql = $this->pdo->query($consultaSQL);			

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) 
            {
                $rs[] = ['Total' => $row['Total']];
			}            

		}   

		$this->pdo = null;

        return $rs;

    }
    
}

?>