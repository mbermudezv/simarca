window.onload = function() 
{
    
  cargaComboUsuario();  
   
  return true;
}

function cuenta_profesor() 
{

  let cboUsuario = document.getElementById("cboUsuario");
  
  let profesor_Id = [...cboUsuario.options]
                  .filter((x) => x.selected)
                  .map((x)=>x.value);   

  window.location.href = '../vistas/cuenta_profesor.html?profesor_Id=' + profesor_Id;

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

  }).then(function(data){});

}
