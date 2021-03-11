window.onload = function() {

    cargaDatosBD();
    return true;
}

function cargaDatosBD() {

    $('.item').remove();

    fetch('../gestor/gestorTipoMarca.php').then(function(response) {

        if(response.ok) {
    
          response.json().then(function(data) {  
           
              console.log(data);
              //cargaDatosPantallaRechazoSolicitud(data);
    
            }).catch(function(error) {
    
                      let contenedorError = document.getElementById("mensaje");
                      contenedorError.innerHTML='<div class="alert alert-danger">' +
                                              '<strong>Error! ' + error.message + '. </strong>' +
                                              'No hay respuesta del servidor. Verifique su conexión de red ' +
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
                                        '<strong>Error! ' + error.message + '. </strong>' +
                                        'No hay respuesta del servidor. Verifique su conexión de red ' +
                                        '</div>';
    }).then();
    
    return true;
 
}