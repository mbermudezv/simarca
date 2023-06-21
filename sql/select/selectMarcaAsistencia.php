<?php

class SelectMarcaAsistencia
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectMarcaAsistencia($intPersona_Id, $intTipo_Id)
    {        
        $rs = [];

        if ($this->pdo != null) {
            
            date_default_timezone_set('America/Costa_Rica');
            
		    $fecha = date_create('now')->format('Y-m-d');	
			
            $consultaSQL = "SELECT Marca_Asistencia_Id FROM Marca_Asistencia 
                            WHERE tipoMarcaAsistencia_id = ".$intTipo_Id." AND 
                            persona_id = ".$intPersona_Id." AND 
                            Marca_Asistencia_Fecha = '".$fecha."'";

			$sql = $this->pdo->query($consultaSQL);			

			 while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) 
            {
                $rs[] = ['Marca_Asistencia_Id' => $row['Marca_Asistencia_Id']];
			}           

		}   

		$this->pdo = null;

        return $rs;

    }
    
}

?>