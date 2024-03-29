
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

function imprimir() {
        
    $('#encabezadoBar').hide();
    $('#logo').hide();    
    $('#TituloBotones').hide();
    window.print();
    $('#TituloBotones').show();
    $('#logo').show();
    $('#encabezadoBar').show();

}

function mostrar_Informacion() {
    
    $('#lista').empty();
        
    let fechaDesde = $('#fechaDesde').val();
    let fechaHasta = $('#fechaHasta').val();

    fetch('../gestor/gestorReporteAsistencia_Marca.php?'
    + new URLSearchParams({fechaDesde: fechaDesde, fechaHasta: fechaHasta}))
    .then(function(response) {

        if(response.ok) {
            
            response.json().then(
                function(data) 
                {

                    let contenedorError = document.getElementById("mensaje");
                    contenedorError.innerHTML='';
                                                                        
                    if (Object.keys(data).length>0) {

                        //console.log(data);                        
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
                
        let nombre = obj.persona_nombre + " " + obj.persona_apellido1 + " " + obj.persona_apellido2;

        let colNombre = document.createElement('div');
        colNombre.id = "nombre";
        colNombre.className = "col-3";
        let createATextNombre = document.createTextNode(nombre);
        colNombre.appendChild(createATextNombre);

        let tipoMarcaAsistencia_Descripcion = obj.tipoMarcaAsistencia_Descripcion;

        let coltipoMarcaAsistencia_Descripcion = document.createElement('div');
        coltipoMarcaAsistencia_Descripcion.id = "tipoMarcaAsistencia_Descripcion";
        coltipoMarcaAsistencia_Descripcion.className = "col-3";
        let createATexttipoMarcaAsistencia_Descripcion = document.createTextNode(tipoMarcaAsistencia_Descripcion);
        coltipoMarcaAsistencia_Descripcion.appendChild(createATexttipoMarcaAsistencia_Descripcion);        

        let fecha = obj.Marca_Asistencia_Fecha;

        let colFecha = document.createElement('div');
        colFecha.id = "fecha";
        colFecha.className = "col-2";
        let createATextFecha = document.createTextNode(fecha);
        colFecha.appendChild(createATextFecha);

        let Marca_Asistencia_Hora = obj.Marca_Asistencia_Hora;

        let colMarca_Asistencia_Hora = document.createElement('div');
        colMarca_Asistencia_Hora.id = "hora";
        colMarca_Asistencia_Hora.className = "col-1";
        let createATextMarca_Asistencia_Hora = document.createTextNode(Marca_Asistencia_Hora);
        colMarca_Asistencia_Hora.appendChild(createATextMarca_Asistencia_Hora);
        
        fila.appendChild(colNombre);
        fila.appendChild(coltipoMarcaAsistencia_Descripcion);
        fila.appendChild(colFecha);
        fila.appendChild(colMarca_Asistencia_Hora);

        document.getElementById('lista').appendChild(fila);        

    }); 

    return true;

}