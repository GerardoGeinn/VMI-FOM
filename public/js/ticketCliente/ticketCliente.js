$(document).ready(function(){
    //inicializar tabla de ticket
    $('#tablaTicketClienteLoad').load('ticketCliente/tablaTicketCliente.php');
     //Dar formato a select2
     $('#modalEmpresa').select2();
     $('#modalCategoria').select2();
     $('#modalTipo').select2();
     $('#modalNivel').select2();
     $('#modalEstado').select2();
});
//Funcion para ver ticket de inicio a fin
function ver_ticket(id_ticket){
    $('#modalAsignado').val(0);
    $('#modalAsignado').trigger('change');
    $('#modalAsignado').val(0);
    $('#modalAsignado').trigger('change');
    document.getElementById("spinner").hidden = true;
    document.getElementById("modalRespuestaLoad").innerHTML = "";
    $.ajax({
        type: "POST",
        data: "id_ticket=" + id_ticket,
        url: "../procesos/ticketUsuario/verTicket.php",
        success:function(respuesta){ 
            respuesta = jQuery.parseJSON(respuesta);
            //Dar el valor a los campos de modal
            $('#modalidTicket').val(respuesta['id_ticket']);
            $('#modalidTickete').val(respuesta['id_ticket']);
            $('#idticketMenu').val("#" + respuesta['id_ticket']);
            $emp = respuesta['id_empresa'].toString();
            $('#modalEmpresa').val($emp);
            $('#modalEmpresa').trigger('change');
            $cat = respuesta['id_categoria'].toString();
            $('#modalCategoria').val($cat);
            $('#modalCategoria').trigger('change');
            $tipo = respuesta['id_tipo'].toString();
            $('#modalTipo').val($tipo);
            $('#modalTipo').trigger('change');
            $nivel = respuesta['id_tipo'].toString();
            $('#modalNivel').val($nivel);
            $('#modalNivel').trigger('change');
            $('#modalAsunto').val(respuesta['asunto']);
            $("#prueba").html(respuesta['descripcion']);
            $('#modalFecha').val("Fecha: " + respuesta['fecha']);
            $estado = respuesta['id_estado'].toString();
            $('#modalEstado').val($estado);
            $('#modalEstado').trigger('change');
            if(respuesta['id_usuarioMaster']!=""){
                $('#modalAsignado').val(respuesta['id_usuarioMaster']);
                $('#modalAsignado').trigger('change');
            }else{
                $('#modalAsignado').val(0);
                $('#modalAsignado').trigger('change');
            }
           
            if(respuesta['url']!=""){
                var x = document.getElementById("descargImagC");
                x.style.display = "block";
                document.getElementById('urlTicket').setAttribute('href', respuesta['url']);
                document.getElementById('urlTicket').setAttribute('download', respuesta['id_ticket']);
           }else{
                var x = document.getElementById("descargImagC");
                x.style.display = "none";
                document.getElementById('urlTicket').setAttribute('href', "123");
                document.getElementById('urlTicket').setAttribute('download', "123");
           }

            
           
            cargarLista(respuesta['id_ticket']);
        }
        
    });
}
//Loading boton comentar
function loadingComentar(){
    document.getElementById("spinner").hidden = false;
    document.getElementById("icoEnviar").hidden = true;
}
//Filtro  ticket por empresa y fecha
function filtroTicket(){
    $.ajax({
        type:"POST",
        data: $('#filtroDatosTicket').serialize(),
        url: "ticketCliente/tablaFiltroTicketCliente.php",
        success:function(respuesta){  
         document.getElementById("tablaTicketClienteLoad").innerHTML = respuesta;
        
        //Stilo de tabla
        $('#tablaTicketsDataTableF').DataTable({
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
$('#emp').on("select2:select", function (e) {
    filtroTicket();
});
//Filtro estado
$('#estado').on("select2:select", function (e) {
    filtroTicket();
});
//Va
//Validar que la fecha fin no sea menor a fecha inicio cliente
function ValidarFechas(){
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
        data: $('#formEditarTickete').serialize(),
        url: "../procesos/ticketUsuario/asignarTicket.php",
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
        data: $('#formEditarTickete').serialize(),
        url: "../procesos/ticketUsuario/editarTicket.php",
        success:function(respuesta){  
            if(respuesta == 1){
                Swal.fire(":D","Guardado exitosamente el cambio!","success");
            }else{
                Swal.fire(":(","Error al asignar", "error");
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
        url: "ticketCliente/tablaFiltroRespuestas.php",
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

/*//Funcion para cambiar estado
function cambiarEstado(){
    let estado = document.getElementById('row-2-office');
    let result = estado.value;
    let resulF = "";
    if(result == 1){
        resulF = "nuevo";
    }

    Swal.fire({
        title: 'Esta seguro de cambiar este estado?',
        text:'Este ticket cambiara a ' + result +' !',
        icon:'warning',
        showCancelButton: 'true',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cambiar!'
    }).then((result) => {
        if(result.isConfirmed){
           /* $.ajax({
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
}*/