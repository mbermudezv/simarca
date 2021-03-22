$(document).ready(function() {    
  
    $("#plantilla").on("click", "a", function(event) {
          
          event.preventDefault();        
          let tipoMarca_Id = $(this).data('id');
          let tipoMarca_Descripcion = $(this).data('nombre');

          enviar_a_FormularioMarca(tipoMarca_Id,tipoMarca_Descripcion)

          return true;
        });
  
});    

window.onload = function() {

    cargaDatos_BD();

    return true;
}

function cargaDatos_BD() {

    $('.item').remove();

    fetch('../gestor/gestorTipoMarca.php').then(function(response) {
         
        response.json().then(function(data) {
                               
            cargaDatos_en_Pantalla(data);

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
    
    return true;
 
}

function cargaDatos_en_Pantalla(rs) {

    rs.forEach(obj => {

        let plantilla = document.getElementById("plantilla");
      
        let item = document.createElement('a');
        item.className = "item nav-item nav-link";        

        let itemText = document.createTextNode(obj.tipoMarca_Descripcion);
        item.appendChild(itemText);

        item.setAttribute("data-id",obj.tipoMarca_Id);
        item.setAttribute("data-nombre",obj.tipoMarca_Descripcion);

        plantilla.appendChild(item);

    }); 

    return true;   
}

function enviar_a_FormularioMarca(tipoMarca_Id,tipoMarca_Descripcion) {

    let arrayTipoMArca = {tipoMarca_Id:tipoMarca_Id,
                        tipoMarca_Descripcion:tipoMarca_Descripcion};

    let jsonTipoMArca = JSON.stringify(arrayTipoMArca);

    window.sessionStorage.setItem('sessionTipoMArca',jsonTipoMArca);

    window.location.replace('marcaCodigoBarra.html');

    return true;
}