
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
        
        $('#lista').empty(); 

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

    } else {

        $('#lista').empty();

    }
  

  return true;

}

function cargaDatosPantalla(data) 
{    
        
    data.forEach(obj => {       

        let fila = document.createElement('div');
        fila.id = "fila";
        fila.className = "form-group row justify-content-center";
        
        let nombre = obj.Estudiante_Nombre + " " + obj.Estudiante_Apellido1 + " " + obj.Estudiante_Apellido2;
        
        let colCheck = document.createElement('div');
        colCheck.id = "check";
        colCheck.className = "col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 form-check d-flex align-items-center justify-content-center";
        colCheck.innerHTML='<input class="form-check-input position-static" ' +
                            'type="checkbox" data-id="' + obj.Estudiante_Id +'">';
              
        let colNombre = document.createElement('div');
        colNombre.id = "nombre";
        colNombre.className = "col-10 col-sm-10 col-md-6 col-lg-4 col-xl-4";
        let createATextNombre = document.createTextNode(nombre);
        colNombre.appendChild(createATextNombre);

        fila.appendChild(colCheck);
        fila.appendChild(colNombre);

        document.getElementById('lista').appendChild(fila);        

    }); 

    return true;

}

function guardar() 
{
    let btnIngresar = document.getElementById("btnGuardar");
    btnIngresar.disabled = true;
    btnIngresar.innerHTML = '<span id="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    let spinner = document.getElementById("spinner");

    let arrayEstudiantes = [];
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (let i = 0; i < checkboxes.length; i++) 
    {    
        arrayEstudiantes.push(checkboxes[i].getAttribute('data-id'));
        
    }

    if (arrayEstudiantes && arrayEstudiantes.length>0) 
    {
        //console.log(arrayEstudiantes);

        const formData = new FormData();    
        const jsonEstudiantes = JSON.stringify(arrayEstudiantes);

        formData.append('arrayEstudiantes', jsonEstudiantes);
        formData.append('seleccion', 4); //seleccion: 4 es Solicitud de Almuerzo
          
        fetch('../gestor/gestorEstudiante_Solicitud.php',{
        method: 'POST', 
        body: formData,})
        .then(function(response) {

        if(response.ok) {

            let contenedorError = document.getElementById("mensaje");
            contenedorError.innerHTML='';

            response.json()
            .then(function(data) 
            {
            
                console.log(data);
                                                    
            }).catch(function(error) {

                let contenedorError = document.getElementById("mensaje");
                contenedorError.innerHTML='<div class="alert alert-danger">' +
                                        '<strong>Error! </strong>' +
                                        'No hay respuesta del servidor . Verifique su conexión de internet ' + error.message +
                                        '</div>';

                spinner.style.visibility = 'hidden';
                btnIngresar.innerText="Registrar Solicitud";
                btnIngresar.disabled = false;

            });              


        } else {
                
            let contenedorError = document.getElementById("mensaje");           
            contenedorError.innerHTML='<div class="alert alert-danger">' +
                                    '<strong>Error! </strong>' +
                                        'No se pudo conectar con el servidor. Intente de nuevo.' +
                                    '</div>';

            spinner.style.visibility = 'hidden';
            btnIngresar.innerText="Registrar Solicitud";
            btnIngresar.disabled = false;                                        
        }

        }).catch(function(error) {

            spinner.style.visibility = 'hidden';
            btnIngresar.innerText="Registrar Solicitud";
            btnIngresar.disabled = false;
    
            let contenedorError = document.getElementById("mensaje");         
            contenedorError.innerHTML='<div class="alert alert-danger">' +
                                    '<strong>Error! </strong>' +
                                        'Hubo un problema al conectar con el servidor: ' + error.message +
                                    '</div>';        
        }).then();

    } else {

        spinner.style.visibility = 'hidden';
        btnIngresar.innerText="Registrar Solicitud";
        btnIngresar.disabled = false;
            
        let tituloMensaje = document.getElementById("tituloMensaje");
        tituloMensaje.innerText='';
    
        let contenedorError = document.getElementById("mensajeModal");
        contenedorError.innerText='';
    
        let mensajeModalParrafo = document.getElementById("mensajeModalParrafo");
        mensajeModalParrafo.innerText='';
    
        tituloMensaje.innerText = 'Hubo un inconveniente!';
        contenedorError.innerText ='Al parecer no hay estudiantes seleccionados!';
        mensajeModalParrafo.innerText = 'Marca los estudiantes que solicitan almuerzo ' + 
                                        'haciendo click en el cuadro pequeño junto al nombre del estudiante';
        
        $('#modalMensaje').modal('show');
        
    
        return false;   
      }
    
      spinner.style.visibility = 'hidden';
      btnIngresar.innerText="Registrar Solicitud";
      btnIngresar.disabled = false;

      let tituloMensaje = document.getElementById("tituloMensaje");
      tituloMensaje.innerText='';
  
      let contenedorError = document.getElementById("mensajeModal");
      contenedorError.innerText='';

      let mensajeModalParrafo = document.getElementById("mensajeModalParrafo");
      mensajeModalParrafo.innerText='';

      tituloMensaje.innerText = 'Ok!';
      contenedorError.innerText ='Se Registró la Solicitud de Almuerzo!';      
      
      $('#modalMensaje').modal('show');

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

