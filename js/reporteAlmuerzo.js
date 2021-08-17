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