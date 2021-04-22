<?php

// require '../sql/conexion.php';

class SelectSQLMarcaRegistrada 
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectMarcaRegistrada($intId, $intTipo)
    {        
        $rs = [];

        if ($this->pdo != null) {
            
            date_default_timezone_set('America/Costa_Rica');
		    $fecha = date_create('now')->format('Y-m-d');	
			
            $consultaSQL = "SELECT Marca_Id FROM Marca 
                            WHERE Marca_Tipo = ".$intTipo." AND 
                            Estudiante_Id = ".$intId." AND 
                            Marca_Fecha = '".$fecha."'";

			$sql = $this->pdo->query($consultaSQL);			

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) 
            {
                $rs[] = ['Marca_Id' => $row['Marca_Id']];
			}            

		}   

		$this->pdo = null;

        return $rs;

    }
    
}

?>