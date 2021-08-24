<?php

require '../sql/select/selectEstudianteBusqueda.php';

try {

    $alias=$_GET['alias'];
		
	$db = new EstudianteBusqueda();		
	$rs = $db->conEstudianteBusqueda($alias);			
	
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