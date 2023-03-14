
//Funcion para insertar respuesta a pregunta 1
function pregunta1(id){
    $("#otro").hide();
    var opcion = "";
    if(id == 1){
        opcion = "Muy Insatisfecho";
    }else if(id == 2){
        opcion = "Insatisfecho";
    }else if(id == 3){
        opcion = "Neutro";
    }else if(id == 4){
        opcion = "Satisfecho";
    }else if(id == 5){
        opcion = "Muy Satisfecho";
    }
    Swal.fire({
        title: 'Esta seguro de elegir ' + opcion,
        text:'Una vez enviado no podra ser modificado!',
        icon:'warning',
        showCancelButton: 'true',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, enviar!'
    }).then((result) => {
        if(result.isConfirmed){
            $('#respuesta1').val(id);
            $('#result1').val(opcion); 
        }
    })
    return false;
}
//Funcion para insertar respuesta a pregunta 2
function pregunta2(id){
    $("#otro").hide();
    var opcion = "";
    if(id == 1){
        opcion = "Muy Insatisfecho";
    }else if(id == 2){
        opcion = "Insatisfecho";
    }else if(id == 3){
        opcion = "Neutro";
    }else if(id == 4){
        opcion = "Satisfecho";
    }else if(id == 5){
        opcion = "Muy Satisfecho";
    }
    Swal.fire({
        title: 'Esta seguro de elegir ' + opcion,
        text:'Una vez enviado no podra ser modificado!',
        icon:'warning',
        showCancelButton: 'true',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, enviar!'
    }).then((result) => {
        if(result.isConfirmed){     
            $('#respuesta2').val(id); 
            $('#result2').val(opcion);      
        }
    })
    return false;
}
//obtener respuesta de ultima pregunta
function pregunta3(id){
    $('#respuesta3').val(id);
}
//Funcion para insertar respuestas
function registrarRespuesta(){
    $.ajax({
        type:"POST",
        data:$('#frmRespuesta').serialize(),
        url:"../procesos/encuesta/respuesta.php",
        success:function(respuesta){
            if(respuesta == 1){
                $("#pregunta").html("<h1>Agradecemos tus respuestas  :D</h1>");
                Swal.fire(":D","Enviado exitosamente!","success");              
            }else{
                Swal.fire(":(","Error al enviar! " + respuesta, "error");
            }    
        }
   });
    return false;
}
//Habilitar agregar comentario
function mostrar(){
    $("#otro").show();
    $('#respuesta3').val(5);
}