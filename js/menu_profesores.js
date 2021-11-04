window.onload = function() 
{
    
  cargaComboUsuario();
   
  return true;
}

function login() 
{

  let cboUsuario = document.getElementById("cboUsuario");
  
  let profesor_Id = [...cboUsuario.options]
                  .filter((x) => x.selected)
                  .map((x)=>x.value);   

  fetch('gestor/gestorUsuario_x_Id.php?'
    + new URLSearchParams({id: profesor_Id}))
  .then(function(response) 
  {
          
    if(response.ok) 
    {

      response.json().then(function(data) 
      {
        
        console.log(data);
        //window.sessionStorage.setItem('sesion', JSON.stringify(data));
        //window.location.href = 'vistas/menu.html';
                     
      });
  
    }

  }).then();
  
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
        
        console.log(data);
              
       /*  data.forEach(element => 
          {

            let cboSoftware = document.getElementById("cboUsuario"); 
            let opt = document.createElement("option");
            opt.value = element.profesor_Id;
            opt.innerHTML = element.profesor_nombre + ' ' + 
                            element.profesor_primer_apellido + ' ' +
                            element.profesor_segundo_apellido;        
            cboSoftware.append(opt);            

          }); */
          
          //$("#cboUsuario").selectpicker("refresh");
    
      });
  
    }

  }).then(function(data){});

}
