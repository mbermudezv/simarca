<?php

class SelectProfesorId 
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function selectProfesorId($profesor_Id)
    {        

        if ($this->pdo != null) {		
			
            $consultaSQL = "SELECT * FROM profesor WHERE profesor_Id =" . $profesor_Id; 
                            
			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) {
					$rs[] = [
                        'profesor_Id' => $row['profesor_Id'],
						'profesor_nombre' => $row['profesor_nombre'],
                        'profesor_primer_apellido' => $row['profesor_primer_apellido'],                        
                        'profesor_segundo_apellido' => $row['profesor_segundo_apellido'],
                        'profesor_email' => $row['profesor_email'],
                        'profesor_cedula' => $row['profesor_cedula']						
					];
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}


?>
