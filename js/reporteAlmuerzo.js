
window.arrayAlmuerzos = [];

window.onload = function() 
{
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '< Anterior',
        nextText: '  Siguiente >',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd-mm-yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
     };
    
     $.datepicker.setDefaults($.datepicker.regional['es']);
    
    $(function() {
        $('.datepicker').datepicker();
        
    });

    return true;
}

function mostrar_Informacion() {
    
    $('#lista').empty();
    
    //Para brincarse la pantalla de seleccionar tipo de marca 3
    //que es Almuerzo
    let tipo = 3;
    let fecha = $('#fecha').val();

    fetch('../gestor/gestorReporteAlmuerzo.php?'
    + new URLSearchParams({fecha: fecha, tipo: tipo}))
    .then(function(response) {

        if(response.ok) {
            
            response.json().then(
                function(data) 
                {

                    let contenedorError = document.getElementById("mensaje");
                    contenedorError.innerHTML='';
                                                                        
                    if (Object.keys(data).length>0) {

                        //console.log(data);
                        arrayAlmuerzos=data;
                        cargaDatosPantalla(data);
                        
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

    return true;
}

function cargaDatosPantalla(data) 
{    
        
    data.forEach(obj => {       

        let fila = document.createElement('div');
        fila.id = "fila";
        fila.className = "form-group row justify-content-center";
        
        let nombre = obj.Estudiante_Nombre + " " + obj.Estudiante_Apellido1 + " " + obj.Estudiante_Apellido2;

        let colNombre = document.createElement('div');
        colNombre.id = "nombre";
        colNombre.className = "col-8 col-sm-8 col-md-8 col-lg-4 col-xl-4";
        let createATextNombre = document.createTextNode(nombre);
        colNombre.appendChild(createATextNombre);

        let seccion = obj.seccion_Descripcion;

        let colSeccion = document.createElement('div');
        colSeccion.id = "seccion";
        colSeccion.className = "col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2";
        let createATextSeccion = document.createTextNode(seccion);
        colSeccion.appendChild(createATextSeccion);
        
        fila.appendChild(colNombre);
        fila.appendChild(colSeccion);

        document.getElementById('lista').appendChild(fila);        

    }); 

    return true;

}

function enviar_email() {

    const formData = new FormData();
    
    let fecha = $('#fecha').val();
    let jsonData = JSON.stringify(arrayAlmuerzos);

    let btnIngresar = document.getElementById("btnEnviar");
        
    btnIngresar.disabled = true;
    btnIngresar.innerHTML = '<span id="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    let spinner = document.getElementById("spinner");
      
    formData.append('fecha', fecha);
    formData.append('JSON_Datos', jsonData);

    fetch('https://wappcom.net/comedor/test_email_Almuerzos.php', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json'},
        body: formData
      }).then(function(response) {
  

    }).catch(function(error) {

        console.log(error);
       
    }).then();

    spinner.style.visibility = 'hidden';
    btnIngresar.innerText="Enviar por Correo";
    btnIngresar.disabled = false;
  
    let tituloMensaje = document.getElementById("tituloMensaje");
    tituloMensaje.innerText='';
  
    let contenedorError = document.getElementById("mensajeModal");
    contenedorError.innerText='';
  
    let mensajeModalParrafo = document.getElementById("mensajeModalParrafo");
    mensajeModalParrafo.innerText='Se le enviará una notificación a su correo institucional';
  
    tituloMensaje.innerText = 'Ok!';
    contenedorError.innerText ='Se envió el correo!';      
    
    $('#modalMensaje').modal('show');
  
    return true;

  }

  function test_array() {

    let json_lista = new Array();

    for (let i = 0; i < arrayAlmuerzos.length; i++) {
        
        let json_detalle = new Array();

        let nombre = arrayAlmuerzos[i]["Estudiante_Nombre"];
        let seccion = arrayAlmuerzos[i]["seccion_Descripcion"];

        json_detalle = {
                        "Estudiante_Nombre":nombre,
                        "seccion_Descripcion":seccion
                        };
        
        json_lista.push(json_detalle);
    }    

    const formData = new FormData();
    
    let fecha = $('#fecha').val();
    let jsonData = JSON.stringify(arrayAlmuerzos);
  
    formData.append('fecha', fecha);
    formData.append('JSON_Datos', jsonData);

    fetch('../test_array.php', {
        method: 'POST',
        body: formData
      }).then(function(response) {
  
       if(response.ok) {

          response.text().then(function(data) 
          {  
              console.log(data);                
                            
          }).catch(function(error) {

                console.log(error);             

          })

        } else {

              console.log(response);
        
        }

    }).catch(function(error) {

        console.log(error);
       
    }).then();

    return true;

  }