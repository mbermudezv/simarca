window.onload = function() 
{
    
    $('#salir').html('<img src="../img/salir.png">'); 
    $('#guardar').html('<img src="../img/guardar.png">');
    $('#buscar').html('<img src="../img/buscar.png">'); 
    
    cargaComboSeccion();

    mostrar_Informacion();

       
    return true;
}

function mostrar_Informacion() {

    let urlParams = new URLSearchParams(window.location.search);
    let estudiante_Id = urlParams.get('estudiante');
    
    if (estudiante_Id==0) {
    
        return false;

    }

    fetch('../gestor/gestorEstudianteMantenimiento.php?'
    + new URLSearchParams({estudiante_Id: estudiante_Id}))
    .then(function(response) {

        if(response.ok) {            
            response.json().then(
                function(data) 
                {                                                                        
                    if (Object.keys(data).length>0) {

                        //console.log(data);
                        $('#txtNombre').val(data[0]["estudiante_Nombre"]);
                        $('#txtApellido1').val(data[0]["estudiante_PrimerApellido"]);
                        $('#txtApellido2').val(data[0]["estudiante_SegundoApellido"]);
                        $('#txtCedula').val(data[0]["estudiante_Cedula"]);
                        document.getElementById("cboSeccion").value = data[0]["seccion_Id"];                        
                        
                    }             
                }).catch();              
        } 
    }).catch().then();

    return true;
}

function guardar() {

    
    let urlParams = new URLSearchParams(window.location.search);
    let estudiante_Id = urlParams.get('estudiante');
    
    let estudiante_Cedula = $('#txtCedula').val();
    let estudiante_Nombre = $('#txtNombre').val();
    let estudiante_PrimerApellido = $('#txtApellido1').val();
    let estudiante_SegundoApellido = $('#txtApellido2').val();
    
    let cboSeccion = document.getElementById('cboSeccion');
    let estudiante_Seccion = cboSeccion.options[cboSeccion.selectedIndex].value;
    
    let contenedorError = document.getElementById("mensaje");
    contenedorError.innerHTML='';

    if ( estudiante_Id == 'null' || typeof(estudiante_Id) == 'undefined'){              

        $('#guardar').html('<img src="../img/cargando.gif">');	

        $.post("../gestor/gestorEstudianteGuardar.php", 
            {
                estudiante_Cedula: estudiante_Cedula,
                estudiante_Nombre: estudiante_Nombre, 
                estudiante_PrimerApellido: estudiante_PrimerApellido, 
                estudiante_SegundoApellido: estudiante_SegundoApellido,
                estudiante_Seccion: estudiante_Seccion

            }).done(function(data) 
            {

                $('#guardar').html('<img src="../img/guardar.png">');                    

            }).fail(function(jqXHR, textStatus, error) 
            {
                console.log("Error de la aplicación: " + error);    			
                
                contenedorError.innerHTML='<div class="alert alert-danger">' +
                                        '<strong>Error! </strong>' +
                                        'Error al conectar con la base de datos </div>';                                                        


            });

        } else	{                                

            $('#guardar').html('<img src="../img/cargando.gif">');

            $.post("../gestor/gestorEstudianteUpdate.php", 
            {
                estudiante_Id: estudiante_Id, estudiante_Cedula: estudiante_Cedula,
                estudiante_Nombre: estudiante_Nombre, estudiante_PrimerApellido: estudiante_PrimerApellido, estudiante_SegundoApellido: estudiante_SegundoApellido,
                estudiante_Seccion: estudiante_Seccion
                
            }).done(function(data) 
            {	    		                                                         

                $('#guardar').html('<img src="../img/guardar.png">');	    		

            }).fail(function(jqXHR, textStatus, error) 
            {

                console.log("Error de la aplicación: " + error);

                contenedorError.innerHTML='<div class="alert alert-danger">' +
                                        '<strong>Error! </strong>' +
                                        'Error al conectar con la base de datos </div>';                                                        


            });			
    }

}

function cargaComboSeccion() {
 
    fetch('../gestor/gestorSeccion.php')
    .then(function(response) 
    {
            
        if(response.ok) 
        {
  
            response.json().then(function(data) 
            {
          
                //console.log(data);
                
                let cboSeccion = document.getElementById("cboSeccion");
                
                data.forEach(element => {
                    //console.log(element.seccion_Id)
                    let opt = document.createElement("option");
                    opt.value = element.seccion_Id;
                    opt.innerHTML = element.seccion_Descripcion; 
                    cboSeccion.append(opt);

                });                
                      
            });
  
        }

    }).then(function(data){});
  
    
}