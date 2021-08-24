<?php

class insertEstudiante
{
	private $pdo;
	
	function __construct()
	{
        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS);		
		$this->pdo = $pdo;
	}
    
    public function insertEstudiante($estudiante_Cedula, $estudiante_Nombre, 
                                        $estudiante_PrimerApellido, $estudiante_SegundoApellido, 
                                        $estudiante_Seccion){
        		
        $sql = 'INSERT INTO Estudiante (Estudiante_Cedula, 
                Estudiante_Nombre, Estudiante_Apellido1, Estudiante_Apellido2, seccion_Id) 
                VALUES (:estudiante_Cedula, :estudiante_Nombre, 
                :estudiante_PrimerApellido, :estudiante_SegundoApellido, :seccion_Id)';
									
		try {
		
		$stmt = $this->pdo->prepare($sql);				
        			
        $stmt->execute([            
            ':estudiante_Cedula' => $estudiante_Cedula,
            ':estudiante_Nombre' => $estudiante_Nombre,
            ':estudiante_PrimerApellido' => $estudiante_PrimerApellido,
            ':estudiante_SegundoApellido' => $estudiante_SegundoApellido,
            ':seccion_Id' => $estudiante_Seccion           
                  
            ]);				
        $stmt = null;
        $this->pdo = null;

        return 0;

        } catch (Exception $e) {
		echo "Error al conectar con la base de datos: " . $e->getMessage() . "\n";
		exit;				
	    }	
	}
}

?>