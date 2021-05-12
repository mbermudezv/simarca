
window.onload = function() 
{
    
    cargaComboSeccion();
   
    return true;
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


function selectEstudianteGestor(seccion_Id) 
{
    
    if (seccion_Id > 0) 
    {
    
            fetch('../gestor/gestorEstudianteSeccion.php?'
            + new URLSearchParams({seccion_Id: seccion_Id}))
            .then(function(response) {

            if(response.ok) {
                
                response.json().then(
                    function(data) 
                    {
                        let contenedorError = document.getElementById("mensaje");
                            contenedorError.innerHTML='';
                
                        //console.log(data);
                        if (Object.keys(data).length>0) {

                            cargaDatosPantalla(data);
                            //mostrarMarcaContador();                    

                        } else {

                            let contenedorError = document.getElementById("mensaje");
                            contenedorError.innerHTML='<div class="alert alert-danger">' +
                                                    '<strong>Error! </strong>' +
                                                    'No se encontraron datos </div>';
                        
                        }
                
                    }).catch(function(error) {

                        let contenedorError = document.getElementById("mensaje");
                        contenedorError.innerHTML='<div class="alert alert-danger">' +
                                                '<strong>Error! </strong>' +
                                                'No hay respuesta del servidor . Verifique su conexión de internet ' + error.message +
                                                '</div>';
                    });              


            } else {
                    
                    let contenedorError = document.getElementById("mensaje");           
                    contenedorError.innerHTML='<div class="alert alert-danger">' +
                                            '<strong>Error! </strong>' +
                                                'No se pudo conectar con el servidor. Intente de nuevo.' +
                                            '</div>';
            }

        }).catch(function(error) {
            
                let contenedorError = document.getElementById("mensaje");         
                contenedorError.innerHTML='<div class="alert alert-danger">' +
                                        '<strong>Error! </strong>' +
                                            'Hubo un problema al conectar con el servidor: ' + error.message +
                                        '</div>';        
        }).then();

    }
  

  return true;

}

function cargaDatosPantalla(data) 
{    
    $('#check').remove();
    $('#nombre').remove();
    
    data.forEach(obj => {

        let plantilla = document.getElementById("plantilla");

        let nombre = obj.Estudiante_Nombre + " " + obj.Estudiante_Apellido1 + " " + obj.Estudiante_Apellido2;
        
        let colCheck = document.createElement('div');
        colCheck.id = "check";
        colCheck.className = "col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 form-check d-flex align-items-center justify-content-center";
        colCheck.innerHTML='<input class="form-check-input position-static" ' +
                            'type="checkbox" data-id="' + obj.seccion_Id +'">';
              
        let colNombre = document.createElement('div');
        colNombre.id = "nombre";
        colNombre.className = "col-10 col-sm-10 col-md-6 col-lg-4 col-xl-4";
        let createATextNombre = document.createTextNode(nombre);
        colNombre.appendChild(createATextNombre);

        plantilla.appendChild(colCheck);
        plantilla.appendChild(colNombre);

    }); 

    return true;

}

function mostrarMarcaContador() 
{
    let jsonTipoMArca = [];    
    jsonTipoMArca = JSON.parse(arrayTipoMArca);

    let tipoMarca_Id = jsonTipoMArca["tipoMarca_Id"];    

    fetch('../gestor/gestorMarcaContador.php?'
            + new URLSearchParams({seleccion: tipoMarca_Id}))
    .then(function(response) 
    {

        if(response.ok) {                    

            response.text().then(
                function(data) 
                {      
                    //console.log(data);
                    if (Object.keys(data).length>0) {

                        document.getElementById("contador").innerHTML = data;

                    } else {

                        document.getElementById("contador").innerHTML ='0';
                    
                    }
       
                });

        } 

    }).then();

    return 1;

}

function mostrarImagen() {

    fetch('../php/selectImg.php').then(
        function(response) 
        {

            if(response.ok) {                    

                response.text().then(
                    function(data) 
                    {      
                        //console.log(data);
                        if (Object.keys(data).length>0) {

                            document.getElementById("imagenMarca").src = "../img/marca/" + data;

                        }

                    });
            } 

        }).then();

    return true;
    
}