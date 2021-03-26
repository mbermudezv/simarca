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

document.getElementById("txtMarca").onkeypress = 
function(evt) {

    let val = this.value;
    evt = evt || window.event;

    // Ensure we only handle printable keys, excluding enter and space
    let charCode = typeof evt.which == "number" ? evt.which : evt.keyCode;
    
    if (charCode && charCode > 32) {

        const convertir = new remplazaCaracter(charCode, this, val);
        
        return false;
    }
};

document.getElementById("txtMarca").onkeydown = 
function(evt) {
    
    if (evt.key == "Enter") {

        let strCedula = document.getElementById("txtMarca").value;

        selectEstudianteGestor(strCedula);

    }
                

};

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

function selectEstudianteGestor(strCedula) {

    fetch('../gestor/gestorEstudiante.php?'
      + new URLSearchParams({cedula: strCedula}))
      .then(function(response) {

    if(response.ok) {

      response.json().then(function(data) {
        
       //console.log(data);
        if (Object.keys(data).length>0) {

          cargaDatosPantalla(data);

        } else {
                    
          
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

  return true;

    
}

function cargaDatosPantalla(data) {
    
    //console.log(data[0].Estudiante_Nombre);
    document.getElementById("divNombre").innerHTML = 
                data[0].Estudiante_Nombre + " " + data[0].Estudiante_Apellido1 + " " + data[0].Estudiante_Apellido2;

    return true;

}

function transformTypedChar(charStr) {

    return charStr == "'" ? "-" : charStr;

}   

class remplazaCaracter {

    constructor(charCode, obj, val) {

        let keyChar = String.fromCharCode(charCode);

        // Transform typed character
        let mappedChar = transformTypedChar(keyChar);

        let start, end;

        if (typeof obj.selectionStart == "number" && typeof obj.selectionEnd == "number") {
            
            start = obj.selectionStart;
            end = obj.selectionEnd;
            obj.value = val.slice(0, start) + mappedChar + val.slice(end);

            // Move the caret
            obj.selectionStart = obj.selectionEnd = start + 1;

        }


        return true;

    }
}
