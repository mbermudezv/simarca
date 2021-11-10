window.onload = function() 
{

  carga_datos();
       
  return true;

}

function carga_datos() {
    
    let urlParams = new URLSearchParams(window.location.search);
    let profesor_Id = urlParams.get('profesor_Id');
                    
    fetch('../gestor/gestorProfesor_x_Id.php?'
    + new URLSearchParams({id: profesor_Id}))
    .then(function(response) 
    {
            
        if(response.ok) 
        {

            response.json().then(function(data) 
            {
                
                //console.log(data);
                carga_pantalla(data);
                            
            });
    
        }

    }).then();
  
    return true;

}

function  carga_pantalla(data) {
    
}