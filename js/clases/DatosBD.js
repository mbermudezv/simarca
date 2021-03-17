class DatosBD {

    constructor(){

        $('.item').remove();

    }

    cargaDatos_BD() {
        
        fetch('../../gestor/gestorTipoMarca.php').then(function(response) {
             
            response.json().then(function(data) {
                                   
                //console.log(data);
                //cargaDatos_en_Pantalla(data);
                return data;
    
            }).catch(function(error) {
    
                        let contenedorError = document.getElementById("mensaje");
                        contenedorError.innerHTML='<div class="alert alert-danger">' +
                                                '<strong>Error! ' + error.message + '. </strong>' +
                                                'No hay respuesta del servidor. Verifique su conexión de red ' +
                                                '</div>';
                });                      
    
          }).catch(function(error) {
            
                    let contenedorError = document.getElementById("mensaje");
                    contenedorError.innerHTML='<div class="alert alert-danger">' +
                                            '<strong>Error! ' + error.message + '. </strong>' +
                                            'No hay respuesta del servidor. Verifique su conexión de red ' +
                                            '</div>';
            }).then();
                     
    }
}