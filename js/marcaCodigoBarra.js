window.arrayTipoMArca = [];

window.onload = function() {

    let boologin = login();

    if (boologin === false) {

      
      let contenedorError = document.getElementById("tipoMarca_Descripcion");
      
      contenedorError.innerHTML='<div class="alert alert-danger">' +
                                      '<strong>Error! </strong>' +
                                          'No ha seleccionado el Tipo de Marca' +
                                      '</div>';
  
    }

    return true;
}

function login() {

    arrayTipoMArca = window.sessionStorage.getItem('sessionTipoMArca');    
    
    if (arrayTipoMArca && arrayTipoMArca.length>0) {
        
        let jsonTipoMArca = [];

        jsonTipoMArca = JSON.parse(arrayTipoMArca);

        let tipoMarca_Descripcion = document.getElementById("tipoMarca_Descripcion");
        tipoMarca_Descripcion.innerText = jsonTipoMArca["tipoMarca_Descripcion"];


    } else {

        return false;

    }
            
    return true;
    
}

function transformTypedChar(charStr) {

	return charStr == "'" ? "-" : charStr;

}

function remplazaCaracter(params) {
    
}