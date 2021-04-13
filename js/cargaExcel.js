function guardar() {

    let excel = $('#upexcel')[0].files[0];

    let data = new FormData();

    data.append('upexcel', excel);

    $('#guardar').html('<img src="../img/cargando.gif">');

    fetch('../gestor/insertExcelGestor.php', 
    {
        method: 'POST', 
        body: data,     
    }).then(function(response) 
        {
    
            if(response.ok) {
                        
                response.text().then(function(data) 
                {  
                    console.log(data);                 
                
                }).catch(function(error) 
                    {
                        
                        console.log(error);
    
                    });
        
            } 
    
        }).catch(function(error) 
            {
                console.log(error);
            
            }).then();    

    $('#guardar').html('<img src="../img/guardar.png">');

    return true;

}