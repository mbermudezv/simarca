
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
                // for (let i = 0; i < disponible; i++) {
                //   valor = i+1;
                //   let opt = document.createElement("option");
                //   opt.value = valor;
                //   opt.innerHTML = valor; 
                //   selectCantidadsolicitud.append(opt);
                // }
      
            });
  
        }

    }).then(function(data){});
  
    
}


function selectEstudianteGestor(strCedula) 
{

    let jsonTipoMArca = [];    
    jsonTipoMArca = JSON.parse(arrayTipoMArca);

    let tipoMarca_Id = jsonTipoMArca["tipoMarca_Id"];    
    
    fetch('../gestor/gestorEstudiante.php?'
      + new URLSearchParams({cedula: strCedula, seleccion: tipoMarca_Id}))
      .then(function(response) {

    if(response.ok) {

        let contenedorError = document.getElementById("divNombre");
        contenedorError.innerHTML='';

        response.json().then(
            function(data) 
            {
        
                //console.log(data);
                if (Object.keys(data).length>0) {

                    cargaDatosPantalla(data);
                    mostrarMarcaContador();
                    mostrarImagen();                    

                } else {

                    let contenedorError = document.getElementById("divNombre");
                    contenedorError.innerHTML='<div class="alert alert-danger">' +
                                            '<strong>Error! </strong>' +
                                            'No se encontró el estudiante </div>';
                
                }
         
            }).catch(function(error) {

                  let contenedorError = document.getElementById("tipoMarca_Descripcion");
                  contenedorError.innerHTML='<div class="alert alert-danger">' +
                                          '<strong>Error! </strong>' +
                                          'No hay respuesta del servidor . Verifique su conexión de internet ' + error.message +
                                          '</div>';
            });              


    } else {
            
            let contenedorError = document.getElementById("tipoMarca_Descripcion");           
            contenedorError.innerHTML='<div class="alert alert-danger">' +
                                    '<strong>Error! </strong>' +
                                        'No se pudo conectar con el servidor. Intente de nuevo.' +
                                    '</div>';
    }

  }).catch(function(error) {
    
          let contenedorError = document.getElementById("tipoMarca_Descripcion");         
          contenedorError.innerHTML='<div class="alert alert-danger">' +
                                  '<strong>Error! </strong>' +
                                      'Hubo un problema al conectar con el servidor: ' + error.message +
                                  '</div>';        
  }).then();

  document.getElementById('txtMarca').value = '';

  return true;

}

function cargaDatosPantalla(data) 
{    
    //console.log(data[0].Estudiante_Nombre);
    document.getElementById("divNombre").innerHTML = 
                data[0].Estudiante_Nombre + " " + data[0].Estudiante_Apellido1 + " " + data[0].Estudiante_Apellido2;

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