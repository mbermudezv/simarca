$('#salir').html('<img src="../img/salir.png">');
$('#btnbuscar').html('<img src="../img/buscar.png">');

window.onload = function() { 
	document.getElementById("txtBuscar").focus();
	return false; 
};

function buscar() {
	
	let strAlias = document.getElementById("txtBuscar").value;
    let dir = "estudianteMantenimiento.html";
 
	$( ".cell" ).remove();	
	
	$.getJSON("../gestor/gestorEstudianteBusqueda.php", { alias: strAlias })
	.done(function(data) {        
	$.each(data, function(n, linkData) {
				
		var item = document.getElementById("contenedor_Fila");
		var listItem = document.createElement('a');
		var createAText = document.createTextNode(linkData.estudiante_Nombre + " " + 
                                                    linkData.estudiante_PrimerApellido  + " " + 
                                                    linkData.estudiante_SegundoApellido);
		
		listItem.className = "cell";
		listItem.id = "hyp_cliente"	;
		listItem.setAttribute('href', dir + "?estudiante=" +linkData.estudiante_Id);				
		listItem.appendChild(createAText);
		item.appendChild(listItem);				
		
	});		
	}).fail(function(jqXHR, textStatus, error) {			
	console.log("Error de la aplicación: " + error);    			
	$(body).append("Error al conectar con la base de datos: " + error);			
	});
}

