window.arrayTipoMArca = [];

window.onload = function() 
{
    
    let boologin = login();

    if (boologin === false) {
      
      let contenedorError = document.getElementById("tipoMarca_Descripcion");
      
      contenedorError.innerHTML='<div class="alert alert-danger">' +
                                      '<strong>Error! </strong>' +
                                          'No ha seleccionado el Tipo de Marca' +
                                      '</div>';
      
        return 0
  
    }
   
    return 1;
}

document.getElementById("txtMarca").onkeypress = 
function(evt) {
    
    evt = evt || window.event;
        
    let val = this.value;
    let isPrintableKey = evt.key.length === 1;

    if (isPrintableKey) {

        const convertir = new remplazaCaracter(evt.key, this, val);
        convertir.transformar();

        return false;
    }

    return true;
};

class remplazaCaracter {
    
    constructor(tecla, objeto, valor){
        
        this.tecla = tecla;
        this.objeto = objeto;
        this.valor = valor;

    }

    transformar(){

        let mappedChar = this.tecla == "'" ? "-" : this.tecla;
        
        let start, end;

        if (typeof this.objeto.selectionStart == "number" && typeof this.objeto.selectionEnd == "number") {
            
            start = this.objeto.selectionStart;
            end = this.objeto.selectionEnd;
            
            this.objeto.value = this.valor.slice(0, start) + mappedChar + this.valor.slice(end);

            // Move the caret
            this.objeto.selectionStart = this.objeto.selectionEnd = start + 1;

        }
        
        return this.objeto.value
      
    }

}

document.getElementById("txtMarca").onkeydown = 
function(evt) {
    
    if (evt.key == "Enter") {

        let strCedula = document.getElementById("txtMarca").value;

        selectEstudianteGestor(strCedula);

    }
                

};

function login() 
{
    arrayTipoMArca = window.sessionStorage.getItem('sessionTipoMArca');    
    
    if (arrayTipoMArca && arrayTipoMArca.length>0) {

        document.getElementById("txtMarca").focus();
        
        let jsonTipoMArca = [];

        jsonTipoMArca = JSON.parse(arrayTipoMArca);

        let tipoMarca_Descripcion = document.getElementById("tipoMarca");
        tipoMarca_Descripcion.innerText = jsonTipoMArca["tipoMarca_Descripcion"];

        mostrarMarcaContador();
        mostrarImagen();        

    } else {

        return false;

    }
            
    return true;    
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
                    document.getElementById('txtMarca').value = '';

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
                        console.log(data);
                        if (Object.keys(data).length>0) {

                            document.getElementById("imagenMarca").src = "../img/marca/" + data;

                        }

                    });
            } 

        }).then();

    return true;
    
}