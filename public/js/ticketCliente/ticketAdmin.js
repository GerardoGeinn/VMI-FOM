$(document).ready(function(){
    //inicializar tabla de ticket
    $('#tablaTicketAdminLoad').load('ticketAdmin/tablaTicketAdmin.php');
     //Dar formato a select2
     $('#modalEmpresa').select2();
     $('#modalCategoria').select2();
     $('#modalTipo').select2();
     $('#modalNivel').select2();
     $('#modalEstado').select2();
     $('#modalAsignado').select2();
     
});
//Ocultar spinner
function spinnerCrear(){
    document.getElementById("spinner2").hidden = true;
}
//Funcion para ver ticket de inicio a fin
function ver_ticketAdmin(id_ticket){
    $('#modalAsignado').val(0);
    $('#modalAsignado').trigger('change');
    document.getElementById("spinner").hidden = true;
    document.getElementById("modalRespuestaLoad").innerHTML = "";
    $.ajax({
        type: "POST",
        data: "id_ticket=" + id_ticket,
        url: "../procesos/ticketAdmin/verTicketAdmin.php",
        success:function(respuesta){ 
            respuesta = jQuery.parseJSON(respuesta);
            //Dar el valor a los campos de modal
            $idTicket = respuesta['id_ticket'];
            $('#modalidTicket').val(respuesta['id_ticket']);
            $('#modalidTickete').val(respuesta['id_ticket']);
            $('#idticketMenu').val("#" + respuesta['id_ticket']);
            $('#modalUsuario').val(respuesta['nombre']);
            $('#modalUbicacion').val(respuesta['ubicacion']);
            $('#modalEmail').val(respuesta['email']);
            $emp = respuesta['id_empresa'].toString();
            $('#modalEmpresa').val($emp);
            $('#modalEmpresa').trigger('change');
            $cat = respuesta['id_categoria'].toString();
            $('#modalCategoria').val($cat);
            $('#modalCategoria').trigger('change');
            $tipo = respuesta['id_tipo'].toString();
            $('#modalTipo').val($tipo);
            $('#modalTipo').trigger('change');
            $nivel = respuesta['id_nivel'].toString();
            $('#modalNivel').val($nivel);
            $('#modalNivel').trigger('change');
            $('#modalAsunto').val(respuesta['asunto']);
            $("#detalle").html(respuesta['descripcion']);
            $('#modalFecha').val("Fecha: " + respuesta['fecha']);
            $estado = respuesta['id_estado'].toString();
            $('#modalEstado').val($estado);
            $('#modalEstado').trigger('change');
            $('#modalGmail').val(respuesta['email']);
            if(respuesta['id_usuarioMaster']!=""){
                $('#modalAsignado').val(respuesta['id_usuarioMaster']);
                $('#modalAsignado').trigger('change');
            }else{
                $('#modalAsignado').val(0);
                $('#modalAsignado').trigger('change');
            }
           
           if(respuesta['url']!=""){
                var x = document.getElementById("descargImag");
                x.style.display = "block";
                document.getElementById('urlTicket').setAttribute('href', respuesta['url']);
                document.getElementById('urlTicket').setAttribute('download', respuesta['id_ticket']);
           }else{
                var x = document.getElementById("descargImag");
                x.style.display = "none";
                document.getElementById('urlTicket').setAttribute('href', "123");
                document.getElementById('urlTicket').setAttribute('download', "123");
           }
            cargarLista($idTicket);
        }
        
    });
}
//Loading boton comentar
function loadingComentar(){
    document.getElementById("spinner").hidden = false;
    document.getElementById("icoEnviar").hidden = true;
}
//Loading boton crear ticket
function loadingComentar2(){
    document.getElementById("spinner2").hidden = false;
    document.getElementById("icoCrear").hidden = true;
}
//Filtro  ticket por empresa y fecha
function filtroTicketAdmin(){
    $.ajax({
        type:"POST",
        data: $('#filtroDatosTicketAdmin').serialize(),
        url: "ticketAdmin/tablaFiltroTicketAdmin.php",
        success:function(respuesta){  
         document.getElementById("tablaTicketAdminLoad").innerHTML = respuesta;
        
        //Stilo de tabla
        $('#tablaTicketsDataTableAdmin').DataTable({
            //Idioma de la tabla
            "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
             }
        } );
          
        }
    });

    return false;
}
//Filtrar por empresa
$('#empa').on("select2:select", function (e) {

    filtroTicketAdmin()
});
//Filtro estado
$('#estado').on("select2:select", function (e) {
    filtroTicketAdmin()
});
//Filtro asignado
$('#asignado').on("select2:select", function (e) {
    filtroTicketAdmin()
});
//Filtro tipo
$('#tipo').on("select2:select", function (e) {
    filtroTicketAdmin()
});

//Validar que la fecha fin no sea menor a fecha inicio admin
function ValidarFechasAdmin(){
    var fechainicial = document.getElementById("fchInicio").value;
    var fechafinal = document.getElementById("fchFin").value;
 
    if(Date.parse(fechafinal) < Date.parse(fechainicial)) {
         Swal.fire(":(","La fecha final debe ser mayor a la fecha inicial", "error");
         //alert("La fecha final debe ser mayor a la fecha inicial");
     }
 }
 //habilitar la edicion de ticket ya creado
function editarTicketCreado(){
    //document.getElementById("modalAsignado").disabled = false;
    document.getElementById("modalEstado").disabled = false;
    document.getElementById("modalNivel").disabled = false;
    document.getElementById("modalTipo").disabled = false;
    document.getElementById("modalCategoria").disabled = false;
    document.getElementById("modalEmpresa").disabled = false; 
    document.getElementById("guardarTecketEditado").disabled = false;          
}
//Funcion para asignar usuario a ticket
function guardarAsingnado(){
    $.ajax({
        type:"POST",
        data: $('#formEditarTicketeAdmin').serialize(),
        url: "../procesos/ticketAdmin/asignarTicket.php",
        success:function(respuesta){  
            if(respuesta == 1){
                Swal.fire(":D","Asignado exitosamente!","success");
            }else{
                Swal.fire(":(","Error al guardar cambios", "error");
            }      
        }
    });

    return false;
}
//Funcion para guardar ticket editado
function guardarTicketEditado(){
    $.ajax({
        type:"POST",
        data: $('#formEditarTicketeAdmin').serialize(),
        url: "../procesos/ticketAdmin/editarTicket.php",
        success:function(respuesta){  
            if(respuesta){
                Swal.fire(":D","Guardado exitosamente el cambio!","success");
            }else{
                Swal.fire(":(","Error al asignar" + respuesta, "error");
            }
        }
    });

    return false;
}
//Funcion para cargar lista de respuesta de tickets
function cargarLista(idTicket){
    $.ajax({
        type:"POST",
        data: "idTicket=" + idTicket,
        url: "ticketAdmin/tablaFiltroRespuestaAdmin.php",
        success:function(respuesta){  
         document.getElementById("modalRespuestaLoad").innerHTML = respuesta;
        //Stilo de tabla
        $('#tablaRespuestaTicket').DataTable({
            //Idioma de la tabla
            "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
             }
        } );
          
        }
    });

    return false;
}
//Select dinamico categoria a tipo modal creacion
$('#idCategoria').on("select2:select", function (e) {
    var id_categoria = e.params.data.id;
    $.ajax({
        type: "POST",
        data: "id_categoria=" + id_categoria,
        url: "../procesos/ticketUsuario/selectTicketCategoria.php",
        success:function(respuesta){
            $("#idTipo").html(respuesta);
        }
    });
});
//Select dinamico categoria a tipo modal editar
$('#modalCategoria').on("select2:select", function (e) {
    var id_categoria = e.params.data.id;
    $.ajax({
        type: "POST",
        data: "id_categoria=" + id_categoria,
        url: "../procesos/ticketUsuario/selectTicketCategoria.php",
        success:function(respuesta){
            $("#modalTipo").html(respuesta);
        }
    });
});
//Funcion para cambiar estado
function cambiarEstado(result,idTicket){
    var resulF = result.value;
    var estado ="";
    if(resulF == 1){
        estado = "nuevo";
    }else if(resulF == 2){
        estado = "asignado";
    }else if(resulF == 3){
        estado = "pendiente";
    }else if(resulF == 4){
        estado = "resuelto";
    }else if(resulF == 5){
        estado = "cancelado";
    }

    Swal.fire({
        title: 'Esta seguro de cambiar el estado?',
        text:'Este ticket cambiara a ' + estado +'!',
        icon:'warning',
        showCancelButton: 'true',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cambiar!'
    }).then((result) => {
        if(result.isConfirmed){
            $.ajax({
                type:"POST",
                data:"idEstado=" + resulF + "&idTicket=" + idTicket,
                url:"../procesos/ticketAdmin/cambioEstado.php",
                success:function(respuesta){
                    if(respuesta == 1){
                        $('#tablaTicketAdminLoad').load('ticketAdmin/tablaTicketAdmin.php');
         
                     Swal.fire(":D","Cambio de estado exitosamente!","success");  
                                     
                     }else{
                         Swal.fire(":(","Error al cambiar estado! "+ respuesta,"error");
                    }
                }
             });
        }else{
            $('#tablaTicketAdminLoad').load('ticketAdmin/tablaTicketAdmin.php');
        }
    })
    return false;
}
