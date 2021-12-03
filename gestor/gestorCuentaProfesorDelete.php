<?php

require '../sql/conexion.php';
require '../sql/delete/deleteCuentaProfesor.php';
	
try {

	$cuentaId=$_POST['cuenta'];
	
 	$db = new DeleteCuentaProfesor();
 	$db-> deleteCuentaProfesor($cuentaId);
 	$db = null;

} 
catch (Exception $e) {		
	console.log("Error de la aplicación: " + $e->getMessage());
	echo "Error al conectar con la base de datos: " . $e->getMessage() . "\n";
	$db = null;
	exit;
}

?>