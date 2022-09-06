
window.onload = function() 
{

    document.getElementById("txtMarca").focus();
    
    mostrarMarcaContadorSolicitud();
    mostrarMenu();

    return true;

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


function selectEstudianteGestor(strCedula) 
{

    //seleccion: 4 es Solicitud de Almuerzo
    fetch('../gestor/gestorEstudiante.php?'
      + new URLSearchParams({cedula: strCedula, seleccion: 4}))
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
                    mostrarMarcaContadorSolicitud();
                    

                } else {

                    let contenedorError = document.getElementById("divNombre");
                    contenedorError.innerHTML='<div class="alert alert-danger">' +
                                            '<strong>Intente de Nuevo! </strong>' +
                                            '</div>';                
                }
         
            }).catch(function(error) {

                let contenedorError = document.getElementById("divNombre");         
                contenedorError.innerHTML='<div class="alert alert-danger">' +
                                  '<strong>Intente de Nuevo! </strong>' +
                                  '</div>';       
            });              


    } else {
            
        let contenedorError = document.getElementById("divNombre");           
        contenedorError.innerHTML='<div class="alert alert-danger">' +
                                '<strong>Intente de Nuevo!</strong>' +
                                '</div>';
    }

  }).catch(function(error) {
    
    let contenedorError = document.getElementById("divNombre");         
    contenedorError.innerHTML='<div class="alert alert-danger">' +
                      '<strong>Intente de Nuevo! </strong>' +
                      '</div>'; 

  }).then();

  document.getElementById("txtMarca").focus();

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


function mostrarMarcaContadorSolicitud() 
{

    //seleccion: 4 es Solicitud de Almuerzo
    fetch('../gestor/gestorMarcaContador.php?'
            + new URLSearchParams({seleccion: 4}))
    .then(function(response) 
    {

        if(response.ok) {                    

            response.text().then(
                function(data) 
                {      
                    //console.log(data);
                    if (Object.keys(data).length>0) {

                        document.getElementById("contadorSolicitud").innerHTML = data;

                    } else {

                        document.getElementById("contadorSolicitud").innerHTML ='0';
                    
                    }
       
                });

        } 

    }).then();

    return true;

}

function mostrarMenu() 
{


    fetch('../gestor/gestorMenu.php?'
            + new URLSearchParams({menu: 1}))
    .then(function(response) 
    {

        if(response.ok) {                    

            response.text().then(
                function(data) 
                {      
                    //console.log(data);
                    if (Object.keys(data).length>0) {

                        document.getElementById("menuHoy").innerHTML = data;

                    } else {

                        document.getElementById("menuHoy").innerHTML ='No hay Menú';
                    
                    }
       
                });

        } 

    }).then();

    return true;

}