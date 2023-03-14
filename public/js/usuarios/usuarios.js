//Redirege a tablaUsuarios.php y retorna la tabla de usuarios registrados
$(document).ready(function(){
    //Cargar tabla de usuarios
    $("#tablaUsuariosLoad").load("usuarios/tablaUsuarios.php");

     //Funcion para select de filtrado
     $('#emp').select2();
     $('#est').select2();
     //Pasar la clase select2 a modal insertar
     $('#idempresa').select2();
     $('#idarea').select2();
     $('#idpuesto').select2();
     $('#idrol').select2();
     $('#idcc').select2();
     //Pasar la clase select2 a modal actualizar
     $('#idempresau').select2();
     $('#idareau').select2();
     $('#idpuestou').select2();
     $('#idrolu').select2();
     $('#idccu').select2();
   
});
//Filtro  usuario y activos o inactivos y por empresas
function filtroUsuario(){
    $.ajax({
        type:"POST",
        data: $('#filtroDatos').serialize(),
        url: "usuarios/tablaFiltroUsuarios.php",
        success:function(respuesta){  
         document.getElementById("tablaUsuariosLoad").innerHTML = respuesta;
        
        //Stilo de tabla
        $('#tablaUsuariosDataTableF').DataTable({
            //Idioma de la tabla
            "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
             }
        } );
          
        }
    });

    return false;
}

//Filtro por empresa y estatus del usuario
$('#emp').on("select2:select", function (e) {
    //console.log("ID seleccionado: " + e.params.data.id);
    filtroUsuario();
});
//Filtro por estatus de usuario
$('#est').on("select2:select", function (e) {
    //console.log("ID seleccionado: " + e.params.data.id);
    filtroUsuario();
});

//Redirege a agregarNuevoUsuario.php y realiza la funcion de registrar usuarios en la base de datos
function agregarNuevoUsuario(){
    $.ajax({
        type:"POST",
        data: $('#frmAgregarUsuario').serialize(),
        url: "../procesos/usuarios/crud/agregarNuevoUsuario.php",
        success:function(respuesta){
            respuesta = respuesta.trim();
            if(respuesta == 1){
                $("#tablaUsuariosLoad").load("usuarios/tablaUsuarios.php");
                $('#idempresa').select2('val', '0');
                $('#idarea').select2('val', '0');
                $('#idpuesto').select2('val', '0');
                $('#idrol').select2('val', '0');
                $('#idcc').select2('val', '0');
                $('#frmAgregarUsuario')[0].reset();
                Swal.fire(":D","Agregado exitosamente!","success");              
            }else{
                Swal.fire(":(","Error al agregar! " + respuesta, "error");
            }    
        }
    });
    return false;
}
//Funcion para actualizar tados de usuario
function actualizarUsuario(){
    $.ajax({
        type:"POST",
        data: $('#frmActualizarUsuario').serialize(),
        url: "../procesos/usuarios/crud/actualizarUsuario.php",
        success:function(respuesta){
            respuesta = respuesta.trim();
            if(respuesta == 1){
                
                $("#tablaUsuariosLoad").load("usuarios/tablaUsuarios.php"); 
                $('#btnsalir').click();
                Swal.fire(":D","Actualizado exitosamente!","success");  
                            
            }else{
                Swal.fire(":(","Error al actualizar! " + respuesta, "error");
            }    
            
        }
    });
    return false;
}
//Funcion editar usuario
function obtenerDatosUsuario(idUsuario){
    $.ajax({
        type: "POST",
        data: "id_usuario=" + idUsuario,
        url: "../procesos/usuarios/crud/obtenerDatosUsuario.php",
        success:function(respuesta){ 

            respuesta = jQuery.parseJSON(respuesta);
            $('#idUsuario').val(respuesta['id_usuario']);
            $('#nameu').val(respuesta['name']);
            $('#lastnameu').val(respuesta['lastname']);
            $('#useru').val(respuesta['user']);
            $('#passwordu').val(respuesta['pass']);
            $('#emailu').val(respuesta['email']);
            $('#birthdateu').val(respuesta['fechanac']);
            $emp = respuesta['company'].toString();
            $('#idempresau').val($emp);
            $('#idempresau').trigger('change');
            $area = respuesta['area'].toString();
            $('#idareau').val($area);
            $('#idareau').trigger('change');
            $pues = respuesta['position'].toString();
            $('#idpuestou').val($pues);
            $('#idpuestou').trigger('change');
            $rol = respuesta['idrol'].toString();
            $('#idrolu').val($rol);
            $('#idrolu').trigger('change');
            $cc = respuesta['idcc'].toString();
            $('#idccu').val($cc);
            $('#idccu').trigger('change');
            
        }
    });
}

//Genera un password 
function generarPassword(base,length){
    let password = "";
    for (let x = 0;x < length; x++){
        let random = Math.floor(Math.random() * base.length);
        password += base.charAt(random);
    }
    document.getElementById('password').value =  password + "*";
    document.getElementById('passwordu').value =  password + "*";
}
//Contenido para password
function generar(){
    let base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = ".?,;-_!¡¿*%&$/()[]{}|@<>";
    base += numbers;
    base += symbols;
    
    //Mandar dase de elementos y rango 
    generarPassword(base,7);
}
//Funcion para eliminar usuarios
function eliminarUsuario(idUsuario){
    Swal.fire({
        title: 'Esta seguro de eliminar este usuario?',
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
                data:"idUsuario=" + idUsuario,
                url:"../procesos/usuarios/crud/eliminarUsuario.php",
                success:function(respuesta){
                    if(respuesta == 1){
                        $("#tablaUsuariosLoad").load("usuarios/tablaUsuarios.php");
         
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
//Funcion para desactivar o activar usuario
function activarDesactivar(idUsuario,estado){
    if(estado == 1){
        Swal.fire({
            title: 'Desactivar usuario',
            text:'Esta seguro de desactivar este usuario?',
            icon:'warning',
            showCancelButton: 'true',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, desactivar!'
        }).then((result) => {
            if(result.isConfirmed){
                $.ajax({
                    type:"POST",
                    data:"idUsuario=" + idUsuario,
                    url:"../procesos/usuarios/crud/estado.php",
                    success:function(respuesta){
                        if(respuesta == 1){
                            $("#tablaUsuariosLoad").load("usuarios/tablaUsuarios.php");
             
                         Swal.fire(":D","Desactivado exitosamente!","success");  
                                         
                         }else{
                             Swal.fire(":(","Error al Desactivar! "+ respuesta,"error");
                        }
                    }
                 });
            }
        })
    }else if (estado == 2){
    Swal.fire({
        title: 'Activar usuario',
        text:'Esta seguro de activar este usuario?',
        icon:'warning',
        showCancelButton: 'true',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, activar!'
    }).then((result) => {
        if(result.isConfirmed){
            $.ajax({
                type:"POST",
                data:"idUsuario=" + idUsuario,
                url:"../procesos/usuarios/crud/estado.php",
                success:function(respuesta){
                    if(respuesta == 1){
                        $("#tablaUsuariosLoad").load("usuarios/tablaUsuarios.php");
         
                     Swal.fire(":D","Activar exitosamente!","success");  
                                     
                     }else{
                         Swal.fire(":(","Error al activar! "+ respuesta,"error");
                    }
                }
             });
        }
    })
}
    return false;
}
