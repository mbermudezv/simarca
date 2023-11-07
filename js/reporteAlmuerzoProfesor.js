
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
    
    let fechaDesde = $('#fechaDesde').val();
    let fechaHasta = $('#fechaHasta').val();

    fetch('../gestor/gestorReporteAlmuerzoProfesor.php?'
    + new URLSearchParams({fechaDesde: fechaDesde, fechaHasta: fechaHasta}))
    .then(function(response) {

        if(response.ok) {
            
            response.json().then(
                function(data) 
                {

                    let contenedorError = document.getElementById("mensaje");
                    contenedorError.innerHTML='';
                                                                        
                    if (Object.keys(data).length>0) {

                        console.log(data);
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
    let totalSinpe = 0; 
    let totalEfectivo = 0;
        
    data.forEach(obj => {       

        let fila = document.createElement('div');
        fila.id = "fila";
        fila.className = "form-group row justify-content-center";
        
        let nombre = obj.profesor_nombre + " " + obj.profesor_primer_apellido + " " + obj.profesor_segundo_apellido;

        let colNombre = document.createElement('div');
        colNombre.id = "nombre";
        colNombre.className = "col-4";
        let createATextNombre = document.createTextNode(nombre);
        colNombre.appendChild(createATextNombre);
        
        let monto = obj.Monto;

        let date = new Date(obj.Fecha);
        let day = `${(date.getDate())}`.padStart(2,'0');
        let month = `${(date.getMonth()+1)}`.padStart(2,'0');
        let year = date.getFullYear();
               
        let fechaFormato = `${day   }-${month}-${year}`;

        let colFecha = document.createElement('div');
        colFecha.id = "fecha";
        colFecha.className = "col-2";
        let createATextFecha = document.createTextNode(fechaFormato);
        colFecha.appendChild(createATextFecha);

        let colMonto = document.createElement('div');
        colMonto.id = "monto";
        colMonto.className = "col-2";
        let createATextMonto = document.createTextNode(monto);
        colMonto.appendChild(createATextMonto);
        
        let strSinpeEfectivo = Sinpe(obj.Sinpe);
        let colSinpe = document.createElement('div');        
        colSinpe.id = "Sinpe";
        colSinpe.className = "col-2";
        let createATextSinpe = document.createTextNode(strSinpeEfectivo);
        colSinpe.appendChild(createATextSinpe);
                       
        if (strSinpeEfectivo === "Sinpe") {
            totalSinpe = totalSinpe + Number(monto);            
        } else {
            totalEfectivo = totalEfectivo + Number(monto);
        }

        fila.appendChild(colNombre);
        fila.appendChild(colFecha);
        fila.appendChild(colMonto);
        fila.appendChild(colSinpe);

        document.getElementById('lista').appendChild(fila);        

    });

    let filaTotal = document.createElement('div');
    filaTotal.id = "filaTotal";
    filaTotal.className = "form-group row justify-content-center pt-2";
    
    let colTotalSinpe = document.createElement('div');
    colTotalSinpe.id = "totalSinpe";
    colTotalSinpe.className = "col-3";
    let createATextTotalSinpe = document.createTextNode("Total Sinpe: " + totalSinpe.toLocaleString("en-US"));
    colTotalSinpe.appendChild(createATextTotalSinpe);

    let colTotalEfectivo = document.createElement('div');
    colTotalEfectivo.id = "totalEfectivo";
    colTotalEfectivo.className = "col-3";
    let createATextTotalEfectivo = document.createTextNode("Total Efectivo: " + totalEfectivo.toLocaleString("en-US"));
    colTotalEfectivo.appendChild(createATextTotalEfectivo);

    filaTotal.appendChild(colTotalEfectivo);
    filaTotal.appendChild(colTotalSinpe);
    
    document.getElementById('lista').appendChild(filaTotal);

    return true;

}

function Sinpe(params) {        

    if (params=="1") {
        
        return "Sinpe"
        
    }

    return "En efectivo"
    
}

function imprimir() {
        
    $('#encabezadoBar').hide();    
    $('#botones').hide();
    $('#logo').hide();    
    window.print();    
    $('#botones').show();
    $('#encabezadoBar').show();
    $('#logo').show();

}

function enviar_email() {

    let contenedorMensaje = document.getElementById("mensaje");         
    contenedorMensaje.innerHTML="";

    if (arrayAlmuerzos.length==0) {
        
        contenedorMensaje.innerHTML='<div class="alert alert-danger">' +
                                    '<strong>Error! </strong>' +
                                        'No hay datos para enviar'
                                    '</div>';
        return false
    }

    const formData = new FormData();
    
    let fechaDesde = $('#fechaDesde').val();
    let fechaHasta = $('#fechaHasta').val();
    let jsonData = JSON.stringify(arrayAlmuerzos);

    let btnIngresar = document.getElementById("btnEnviar");
        
    btnIngresar.disabled = true;
    btnIngresar.innerHTML = '<span id="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    let spinner = document.getElementById("spinner");
      
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    formData.append('JSON_Datos', jsonData);

    fetch('https://wappcom.net/comedor/email_AlmuerzosProfesor.php', {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'application/json'},
        body: formData
      }).then(function(response) {

        console.log(response);

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
    mensajeModalParrafo.innerText='';
  
    tituloMensaje.innerText = 'Ok!';
    contenedorError.innerText ='Se envió el correo!';      
    
    $('#modalMensaje').modal('show');

    arrayAlmuerzos=[];
  
    return true;

  }