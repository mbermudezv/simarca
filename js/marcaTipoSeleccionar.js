window.onload = function() {

    cargaDatos_BD();
    return true;
}

function cargaDatos_BD() {

    $('.item').remove();

    fetch('../gestor/gestorTipoMarca.php').then(function(response) {
         
        response.json().then(function(data) {
                               
            //console.log(data);
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

    //console.log(rs);

    rs.forEach(obj => {

        let plantilla = document.getElementById("plantilla");
      
        let item = document.createElement('a');
        item.className = "item nav-item nav-link";

        let itemText = document.createTextNode(obj.tipoMarca_Descripcion);
        item.appendChild(itemText);

        item.setAttribute('href', '../vistas/marcaCodigoBarra.html' + "?tipoMarca_Id =" + obj.tipoMarca_Id);

        plantilla.appendChild(item);

    }); 

    return true;
    
}