<?php

require '../sql/select/select_menu.php';
	
try {

	$menuId=$_GET['menu'];
	
 	$Select = new SelectMenu();
 	$rs = $Select->conMenuDescripcion($menuId);
 	
    echo json_encode($rs);

} 
catch (Exception $e) {		
	console.log("Error de la aplicación: " + $e->getMessage());
	echo "Error al conectar con la base de datos: " . $e->getMessage() . "\n";
	$db = null;
	exit;
}

?>