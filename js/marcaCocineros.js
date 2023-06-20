
let persona={};

window.onload = function() 
{
    
    cargaComboPersona();
   
    return true;
}

function cargaComboPersona() {
 
    fetch('../gestor/gestorCargaPersona.php')
    .then(function(response) 
    {
            
        if(response.ok) 
        {
  
            response.json().then(function(data) 
            {          
                
                let cboPersona = document.getElementById("cboPersona");
                
                data.forEach(element => {                    
                    let opt = document.createElement("option");
                    opt.value = element.persona_id;
                    opt.innerHTML = element.persona_nombre; 
                    cboPersona.append(opt);
                });                
                      
            });
  
        }

    }).then(function(data){});
  
    
}


function selectPersonaGestor(persona_id) 
{
        
    if (persona_id > 0) 
    {
                 
        fetch('../gestor/gestorCargaPersona_Id.php?'
        + new URLSearchParams({persona_id: persona_id}))
        .then(function(response) {

            if(response.ok) {
                
                response.json().then(
                    function(data) 
                    {

                        let contenedorError = document.getElementById("mensaje");
                        contenedorError.innerHTML='';
                                                       
                       
                        if (Object.keys(data).length>0) {

                            //console.log(data);
                            cargaDatosPersona(data);
                                             

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

function cargaDatosPersona(data) 
{    
    data.forEach(obj => {       
        //Para ser usado en Guardar. 
        persona.int_persona_id = obj.persona_id;    
        persona.persona_nombre = obj.persona_nombre;
        persona.persona_apellido1 = obj.persona_apellido1;
        persona.persona_apellido2 = obj.persona_apellido1;
    }); 

    return true;
}

function guardar() 
{
    
    if (Object.keys(persona).length>0) 
    {
        
        const formData = new FormData();

        const json = JSON.stringify(persona);            
        
        formData.append('jsonDatos', json);
          
        fetch('../gestor/gestorAsistencia_Marca.php',{
        method: 'POST', 
        body: formData,})
        .then(function(response) {

        if(response.ok) {

            let contenedorError = document.getElementById("mensaje");
            contenedorError.innerHTML='';

            response.text()
            .then(function(data) 
            {
            
                console.log(data);
                //cargar_de_nuevo();
                                                    
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

