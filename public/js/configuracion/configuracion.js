$(document).ready(function(){
    $('#idCategoria').select2();
    $('#idCategoriaEdit').select2();
});

//--------Tickets------------------------------------------------------------------------------------------------------------------------------------------
//Agregar Categoria
function agregarCategoria(){
    $.ajax({
        type:"POST",
        data: $('#frmAgregarCategoria').serialize(),
        url:"../procesos/configuracion/agregarCategoria.php",
        success:function(respuesta){
            if(respuesta == 1){
                //$("#sesionTicket").load("configuracion/listaTicket.php");
                //$('#idcc').select2('val', '0');   
                $('#frmAgregarCategoria')[0].reset();
                Swal.fire(":D","Agregado exitosamente!","success");              
            }else{
                Swal.fire(":(","Error al agregar! " + respuesta, "error");
            }    
        }
     });
     return false;
}
//Editar categoria
function categoriaEditar(){
    $.ajax({
        type:"POST",
        data: $('#frmEditarCategoria').serialize(),
        url: "../procesos/configuracion/editarCategoria.php",
        success:function(respuesta){
            if(respuesta == 1){
                $('#mdlAgregarSalir').click();
                $('#frmAgregarCategoria')[0].reset();
                Swal.fire(":D","Actualizado exitosamente!","success");  
                            
            }else{
                Swal.fire(":(","Error al actualizar! " + respuesta, "error");
            }    
            
        }
    });
    return false;
}
//Funcion editar Categoria
function obtenerDatosCategoria(idCategoria){
    $.ajax({
        type: "POST",
        data: "idCategoriaEdit=" + idCategoria,
        url: "../procesos/configuracion/obtenerDatosCategoria.php",
        success:function(respuesta){ 
            respuesta = jQuery.parseJSON(respuesta);
            $('#idCtg').val(respuesta['idCategoria']);
            $('#nombre').val(respuesta['categoria']);
        }
    });
}

//Eliminar categoria
function categoriaEliminar(idCategoria){
    Swal.fire({
        title: 'Esta seguro de eliminar esta categoria?',
        text:'Una vez eliminado no podra ser recuperado!',
        icon:'warning',
        showCancelButton: 'true',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if(result.isConfirmed){
            $.ajax({
                type:"POST",
                data:"idCategoria=" + idCategoria,
                url:"../procesos/configuracion/eliminarCategoria.php",
                success:function(respuesta){
                    if(respuesta == 1){
         
                     Swal.fire(":D","Eliminado exitosamente!","success");  
                                     
                     }else{
                         Swal.fire(":(","Error al eliminar! "+ respuesta,"error");
                    }
                }
             });
        }
    })
    return false;
}
//Agregar Tipo de Categoria
function agregarTipo(){
    $.ajax({
        type:"POST",
        data: $('#frmAgregarTipo').serialize(),
        url:"../procesos/configuracion/agregarTipo.php",
        success:function(respuesta){
            if(respuesta == 1){
                //$("#sesionTicket").load("configuracion/listaTicket.php");
                $('#idCategoria').select2('val', '0');   
                $('#frmAgregarTipo')[0].reset();
                Swal.fire(":D","Agregado exitosamente!","success");              
            }else{
                Swal.fire(":(","Error al agregar! " + respuesta, "error");
            }    
        }
     });
     return false;
}
//Editar Tipo
function tipoEditar(){
    $.ajax({
        type:"POST",
        data: $('#frmEditarTipo').serialize(),
        url: "../procesos/configuracion/editarTipo.php",
        success:function(respuesta){
            if(respuesta == 1){
                $('#idCategoriaEdit').select2('val', '0');
                $('#btnEditTipoSalir').click();
                $('#frmEditarTipo')[0].reset();
                Swal.fire(":D","Actualizado exitosamente!","success");  
                            
            }else{
                Swal.fire(":(","Error al actualizar! " + respuesta, "error");
            }    
            
        }
    });
    return false;
}
//Funcion obtener tipo de categoria
function obtenerDatosTipo(idTipo){
    $.ajax({
        type: "POST",
        data: "idTipo=" + idTipo,
        url: "../procesos/configuracion/obtenerDatosTipo.php",
        success:function(respuesta){ 
            respuesta = jQuery.parseJSON(respuesta);
            $('#idTipoEdit').val(respuesta['id_tipo']);
            $('#tipoNombreEdit').val(respuesta['descripcion']);
            $idCatg = respuesta['idCategoria'].toString();
            $('#idCategoriaEdit').val($idCatg);
            $('#idCategoriaEdit').trigger('change');
        }
    });
}
//Eliminar Tipo
function tipoEliminar(idTipo){
    Swal.fire({
        title: 'Esta seguro de eliminar este Tipo?',
        text:'Una vez eliminado no podra ser recuperado!',
        icon:'warning',
        showCancelButton: 'true',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if(result.isConfirmed){
            $.ajax({
                type:"POST",
                data:"idTipo=" + idTipo,
                url:"../procesos/configuracion/eliminarTipo.php",
                success:function(respuesta){
                    if(respuesta == 1){
         
                     Swal.fire(":D","Eliminado exitosamente!","success");  
                                     
                     }else{
                         Swal.fire(":(","Error al eliminar! "+ respuesta,"error");
                    }
                }
             });
        }
    })
    return false;
}
//-------------------Usuarios-------------------------------------------------------------------------------------------------------------------------------------

//Agregar puesto
function agregarPuesto(){
    $.ajax({
        type:"POST",
        data: $('#frmAgregarPuesto').serialize(),
        url:"../procesos/configuracion/agregarPuesto.php",
        success:function(respuesta){
            if(respuesta == 1){
                $('#frmAgregarPuesto')[0].reset();
                Swal.fire(":D","Agregado exitosamente!","success");              
            }else{
                Swal.fire(":(","Error al agregar! " + respuesta, "error");
            }    
        }
     });
     return false;
}
//Funcion obtener tipo de categoria
function obtenerDatosPuesto(idPuesto){
    $.ajax({
        type: "POST",
        data: "idPuesto=" + idPuesto,
        url: "../procesos/configuracion/obtenerDatosPuesto.php",
        success:function(respuesta){ 
            respuesta = jQuery.parseJSON(respuesta);
            $('#idPstEdit').val(respuesta['id_puesto']);
            $('#pstEdit').val(respuesta['nombre']);
        }
    });
}