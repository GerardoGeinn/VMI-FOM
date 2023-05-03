// var idOrden;

function DatoIdOrden(id){
    $('#idOrden').val(id);

}

function DatoIdOrdenEditar(id,folio){
    $('#idDetalle').val(id);
    $('#orden').val(folio);
  
}

function DatoIdOrdenEliminar(id){
   

    var dataString = id;
    $('#ideliminar').val(dataString);
    
}


$('#orden').submit(function(event) {
        event.preventDefault();//se cancela la acción por defecto (que es el envío del formulario)
        var formData = $(this).serialize();// convierte los valores del formulario en una cadena de consulta
        // Agregar el ID de la bd1 a los datos que se envían al archivo PHP

        $.ajax({
            type:"POST",
            data:formData,
            url:'guardar_mov.php', 
            success: function(respuesta){   
                console.log(respuesta); 
                toastr.success("La información se ha guardado correctamente");
                setTimeout(function(){
                window.location.href = window.location.href.split('#')[0]; // Redirigir al usuario a la página anterior al modal       
                },2000);         
            },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ': ' + errorThrown);

                }
        });
});


$('#deletepedido').submit(function(event) {
    event.preventDefault();//se cancela la acción por defecto (que es el envío del formulario)
    var formData = $(this).serialize();// convierte los valores del formulario en una cadena de consulta
    // Agregar el ID de la bd1 a los datos que se envían al archivo PHP

    $.ajax({
        type:"POST",
        data:formData,
        url:'eliminarPedido.php', 
        success: function(respuesta){   
            console.log(respuesta); 
            toastr.success("La información se ha guardado correctamente");
            setTimeout(function(){
            window.location.href = window.location.href.split('#')[0]; // Redirigir al usuario a la página anterior al modal       
            },2000);         
        },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ': ' + errorThrown);

            }
    });
});

