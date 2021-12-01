let Cuenta_id = 0;

window.onload = function() 
{

    cargaComboUsuario();

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

    $('.cellBotonBorrar').html('<img src="../img/borrar.png">');
    $('#salir').html('<img src="../img/salir.png">');
       
  return true;

}

function carga_datos(profesor_Id) {

    let contenedorError = document.getElementById("mensaje");
    contenedorError.innerHTML='';

    $('#lista').empty();
    
    if (profesor_Id>0) {

      fetch('../gestor/gestorProfesorCuenta_x_Id.php?'
      + new URLSearchParams({id: profesor_Id}))
      .then(function(response) 
      {
              
          if(response.ok) 
          {
  
              response.json().then(function(data) 
              {
                                                                                  
                //console.log(data);
  
                if (Object.keys(data).length>0) {
  
                  carga_pantalla(data);
                    
                } else {
  
                    let contenedorError = document.getElementById("mensaje");
                    contenedorError.innerHTML='<div class="alert alert-danger">' +
                                            '<strong>Error! </strong>' +
                                            'No se encontraron datos </div>';                                                        
                
                }                
                   
              });
      
          }
  
      }).then();
  
    }else {

      let contenedorError = document.getElementById("mensaje");
      contenedorError.innerHTML='<div class="alert alert-danger">' +
                              '<strong>Error! </strong>' +
                              'No se encontraron datos </div>';

    }
    
    return true;

}

function  carga_pantalla(datosProfesor) {
    
  datosProfesor.forEach(obj => {       
       
    //console.log(obj.Fecha)

    let fila = document.createElement('div');
    fila.className = "d-flex flex-nowrap filaCuenta";
    fila.id = obj.Cuenta_id;
    fila.setAttribute('data-id',obj.Cuenta_id);

    let colFecha = document.createElement('div');
    colFecha.className = "col-8 form-control";
    let createATextFecha = document.createTextNode(obj.Fecha);
    colFecha.appendChild(createATextFecha);

    let colMonto = document.createElement('div');
    colMonto.className = "col-4 form-control";
    let createATextMonto = document.createTextNode(obj.Monto);
    colMonto.appendChild(createATextMonto);

    let colBorrar = document.createElement('div');
    colBorrar.className = "d-flex align-items-center col-4 cellBotonBorrar";
    colBorrar.onclick = new Function("botonQuitar(" + JSON.stringify(obj) + ");");

    let elemImg = document.createElement("img");
    elemImg.src = "../img/borrar.png";
    
    colBorrar.appendChild(elemImg);

    fila.appendChild(colFecha);
    fila.appendChild(colMonto);
    fila.appendChild(colBorrar);

    document.getElementById('lista').appendChild(fila);
       
  }); 

  return true;

}

function cuenta_profesor() 
{

  let cboUsuario = document.getElementById("cboUsuario");
  
  let profesor_Id = [...cboUsuario.options]
                  .filter((x) => x.selected)
                  .map((x)=>x.value);   
  
  carga_datos(profesor_Id);

  return true;
  
}

function cargaComboUsuario() 
{
  
  fetch('../gestor/gestorProfesores.php')
  .then(function(response) 
  {
          
    if(response.ok) 
    {

      response.json().then(function(data) 
      {
        
        //console.log(data);
              
        data.forEach(element => 
          {

            let cboSoftware = document.getElementById("cboUsuario"); 
            let opt = document.createElement("option");
            opt.value = element.profesor_Id;
            opt.innerHTML = element.profesor_nombre + ' ' + 
                            element.profesor_primer_apellido + ' ' +
                            element.profesor_segundo_apellido;        
            cboSoftware.append(opt);            

          });
          
          $("#cboUsuario").selectpicker("refresh");
    
      });
  
    }

  }).then();

  return true;

}

function verifica_antes_guardar() {

  let contenedorError = document.getElementById("mensaje");
  contenedorError.innerHTML='';

  let cboUsuario = document.getElementById("cboUsuario");
  let inputFecha = document.getElementById("fecha").value;
  let inputMonto = document.getElementById("monto").value;
  
  let intProfesor = [...cboUsuario.options]
                  .filter((x) => x.selected)
                  .map((x)=>x.value);
                  

  if (intProfesor <= 0) {

    contenedorError.innerHTML='<div class="alert alert-danger">' +
                                  '<strong>Error! </strong>' +
                                'Selecciones el profesor </div>';

    return false;
  }

  if (inputFecha === "") {

    contenedorError.innerHTML='<div class="alert alert-danger">' +
                                  '<strong>Error! </strong>' +
                                'Selecciones la fecha </div>';  

    return false;
  }


  if (inputMonto === "" || inputMonto == 0) {

    contenedorError.innerHTML='<div class="alert alert-danger">' +
                                  '<strong>Error! </strong>' +
                                'Digite el monto </div>';  

    return false;
  }

  return true;
  
}


function guardar() {

  if (verifica_antes_guardar() == false) {

    return false;

  }

  let btnIngresar = document.getElementById("btnGuardar");  
  btnIngresar.disabled = true;
  btnIngresar.innerHTML = '<span id="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
  let spinner = document.getElementById("spinner");
  
  let cboUsuario = document.getElementById("cboUsuario");    
  let intProfesor = [...cboUsuario.options]
                  .filter((x) => x.selected)
                  .map((x)=>x.value);

  let inputFecha = document.getElementById("fecha").value;
  let inputMonto = document.getElementById("monto").value;

  const formData = new FormData();
  formData.append('Cliente_id', intProfesor);
  formData.append('Monto', inputMonto);
  formData.append('Fecha', inputFecha);

  fetch('../gestor/gestorProfesorCuenta.php',{
    method: 'POST', 
    body: formData,     
    }).then(function(response) {

        if(response.ok) {

          response.text().then(function(data) 
          {  
              //console.log(data);
              carga_datos(intProfesor);
                            
          }).catch(function(error) {

              spinner.style.visibility = 'hidden';
              btnIngresar.innerText="Guardar";
              btnIngresar.disabled = false;

              let tituloMensaje = document.getElementById("tituloMensaje");
              tituloMensaje.innerText='';
          
              let contenedorError = document.getElementById("mensajeModal");
              contenedorError.innerText='';

              let mensajeModalParrafo = document.getElementById("mensajeModalParrafo");
              mensajeModalParrafo.innerText='';

              tituloMensaje.innerText = 'Hubo un inconveniente!';
              contenedorError.innerText ='Intente de nuevo!';
              mensajeModalParrafo.innerText ='No hubo respuesta del servidor MEP.';
            
              $('#modalMensaje').modal('show');

          })

        } else {

                spinner.style.visibility = 'hidden';
                btnIngresar.innerText="Guardar";
                btnIngresar.disabled = false;

                let tituloMensaje = document.getElementById("tituloMensaje");
                tituloMensaje.innerText='';
            
                let contenedorError = document.getElementById("mensajeModal");
                contenedorError.innerText='';

                let mensajeModalParrafo = document.getElementById("mensajeModalParrafo");
                mensajeModalParrafo.innerText='';

                tituloMensaje.innerText = 'Hubo un inconveniente!';
                contenedorError.innerText ='No hay respuesta del servidor MEP!';
                mensajeModalParrafo.innerText ='Verifique su conexión de internet.';  
              
                $('#modalMensaje').modal('show');
        
        }

    })
    .catch(function(error) {

          spinner.style.visibility = 'hidden';
          btnIngresar.innerText="Guardar";
          btnIngresar.disabled = false;

          let tituloMensaje = document.getElementById("tituloMensaje");
          tituloMensaje.innerText='';
      
          let contenedorError = document.getElementById("mensajeModal");
          contenedorError.innerText='';

          let mensajeModalParrafo = document.getElementById("mensajeModalParrafo");
          mensajeModalParrafo.innerText='';

          tituloMensaje.innerText = 'Hubo un inconveniente!';
          contenedorError.innerText ='Error al guardar la información!';
          mensajeModalParrafo.innerText = error.message;
          
          $('#modalMensaje').modal('show');
       
    }).then();

  spinner.style.visibility = 'hidden';
  btnIngresar.innerText="Guardar";
  btnIngresar.disabled = false;

  let tituloMensaje = document.getElementById("mensaje");
  tituloMensaje.innerText='';

  document.getElementById("fecha").value = '';

  document.getElementById("monto").value = '';
  
  return true;
}

function botonQuitar(arrayArticulo) {

  let tituloMensaje = document.getElementById("tituloMensajeSiNo");
  tituloMensaje.innerText='';

  let contenedorError = document.getElementById("mensajeModalSiNo");
  contenedorError.innerText='';
  
  tituloMensaje.innerText = 'Aviso importante!' ;
  contenedorError.innerText = 'Realmente desea eliminar el ' + arrayArticulo["Fecha"] + ' Monto: ' + arrayArticulo["Monto"] + ' ?' ;
  Cuenta_id = arrayArticulo["Cuenta_id"];   

  $("#modalMensajeSiNo").modal('show');

  return false;

}

function quitarElementoArray() {

  let fila = document.getElementsByClassName('filaCuenta')
  
  for (let i = 0; i < fila.length; i++) {
    
    let dataCuenta_id = fila[i].getAttribute('data-id');
    
    if (dataCuenta_id == Cuenta_id) {
    
      let elem = document.getElementById(dataCuenta_id);
      elem.parentElement.removeChild(elem);               
      
    }

  }

  $("#modalMensajeSiNo").modal('hide');
    
  return false;

}
