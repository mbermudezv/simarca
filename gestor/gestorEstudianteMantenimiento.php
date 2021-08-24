<?php

require '../sql/select/selectEstudianteMantenimiento.php';

try {

    $estudiante_Id=$_GET['estudiante_Id'];
		
	$db = new EstudianteBusquedaMantenimiento();		
	$rs = $db->conEstudianteBusquedaMantenimiento($estudiante_Id);			
	
	echo json_encode($rs);

	$rs = null;
	$db = null;
			
} 
catch (PDOException $e) {		
	$rs = null;
	$db = null;
	echo "Error al conectar con la base de datos: " . $e->getMessage() . "\n";
	exit;
}
?>