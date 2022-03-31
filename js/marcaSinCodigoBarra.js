
let seccion=0;

window.onload = function() 
{

    mostrarMarcaContador();
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
      
        seccion = seccion_Id; //Para ser usado en el reload.

        $('#lista').empty(); 

        fetch('../gestor/gestorSinMarcaEstudianteSeccion.php?'
        + new URLSearchParams({seccion_Id: seccion_Id, Marca_Tipo:3}))//seleccion: 3 es Registro de Almuerzo
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
                      
        let colNombre = document.createElement('div');
        colNombre.id = "nombre";
        colNombre.className = "col-10 col-sm-10 col-md-6 col-lg-4 col-xl-4";
        let createATextNombre = document.createTextNode(nombre);
        colNombre.appendChild(createATextNombre);

        let colCheck = document.createElement('div');
        colCheck.id = "check";
        colCheck.className = "col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 d-flex align-items-center justify-content-center";
        colCheck.innerHTML='<button id="btnGuardar" onclick="guardar(' + obj.Estudiante_Id +');" ' +
                                'type="button" class="btn btn-primary"> ' +
                                'Marcar' +
                            '</button>';

        fila.appendChild(colNombre);
        fila.appendChild(colCheck);

        document.getElementById('lista').appendChild(fila);        

    }); 

    return true;

}

function guardar(estudiante_Id) 
{
    
    if (estudiante_Id>0) 
    {
        
        const formData = new FormData();    
        
        formData.append('Estudiante_Id', estudiante_Id);
        formData.append('seleccion', 3); //seleccion: 3 es Marca de Almuerzo
          
        fetch('../gestor/gestorEstudiante_Marca.php',{
        method: 'POST', 
        body: formData,})
        .then(function(response) {

        if(response.ok) {

            let contenedorError = document.getElementById("mensaje");
            contenedorError.innerHTML='';

            response.text()
            .then(function(data) 
            {
            
                //console.log(data);
                cargar_de_nuevo();
                                                    
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

function cargar_de_nuevo() {    

    mostrarMarcaContador();
    selectEstudianteGestor(seccion);

  }

function mostrarMarcaContador() 
{
      
    //seleccion: 3 es Almuerzo
    fetch('../gestor/gestorMarcaContador.php?'
            + new URLSearchParams({seleccion: 3}))
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

