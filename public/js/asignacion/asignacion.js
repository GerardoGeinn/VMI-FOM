//Consulta tabla de registros
$(document).ready(function(){
    $('#tablaAsignacion').load("asignacion/tablaAsignacion.php");
});

//Agregar asignacion
function asignarEquipo(){
     $.ajax({
        type: "POST",
        data: $('#frmAsignaEquipos').serialize(),
        url: "../procesos/asignacion/asignar.php",
        success:function(respuesta){
            respuesta = respuesta.trim();

            if(respuesta == 1){
                $('#idEmpre').select2('val', '0');
                $('#idEquipo').select2('val', '0');
                $("#idPersona").html("<option value='0'>Selecciona asignacion</option>");
                $("#idCC").html("<option value='0'>Seleciona CC</option>");
                
                $('#frmAsignaEquipos')[0].reset();
                $('#tablaAsignacion').load("asignacion/tablaAsignacion.php");
                Swal.fire(":D","Asignado con exito!","success");
            }else{
                Swal.fire(":(","Fallo al asignar" + respuesta,"error");
            }
            //console.log(respuesta);
        }
     });

     return false;
}
 //Funcion para mostrar los usuarios deacuerdo a la empresa, modal agregar
$('#idEmpre').on("select2:select", function (e) {
    var id_emp = e.params.data.id;
    nombreUser(id_emp);
    //c_costos(id_emp);
});
//Funcion para mostrar los usuarios deacuerdo a la empresa modal editar
/*$('#idEmpreu').on("select2:select", function (e) {
    var id_emp = e.params.data.id;
    nombreUser(id_emp);
});*/
//Funcion para mostrar nombre de usuario deacuerdo a la empresa
function nombreUser(id_emp){
    $.ajax({
        type: "POST",
        data: "id_emp=" + id_emp,
        url: "../procesos/asignacion/selectEmp.php",
        success:function(respuesta){
            $("#idPersona").html(respuesta);
        }
    });
}
//Funcion para mostrar centro de costos deacuerdo a la empresa
function c_costos(idemp){
    $.ajax({
        type: "POST",
        data: "id_emp=" + idemp,
        url: "../procesos/asignacion/selectCC.php",
        success:function(respuesta){
            $("#idCC").html(respuesta);
        }
    });
}

//Evento de boton Para generar etiqueta
function generarEtiqueta(){
    //Variables de campo empresa, centro de costos y tipo de equipo
    var emp = document.getElementById('idEmpre');
    var cc = document.getElementById('idCC');
    var t_eq = document.getElementById('idEquipo');
    //Validar que los campos necesarios para generar etiqueta no esten vacios
    if(emp.value==0 || emp.value==''){
        Swal.fire(":(","Campo empesa vacio! ", "error");
    }else if(t_eq.value==0 || t_eq.value==''){
        Swal.fire(":(","Campo tipo de equipo vacio! ", "error");
    }else if(cc.value==0 || cc.value==''){
        Swal.fire(":(","Campo centro de costos vacio! ", "error");
    }else{
        //Genera la etiqueta 
        $.ajax({
            type: "POST",
            data: $('#frmAsignaEquipos').serialize(),
            url: "../procesos/asignacion/etiqueta.php",
            success:function(respuesta){
                respuesta = respuesta.trim();
                $('#etiqueta').val(respuesta);
            }
         });
    }

}
//Evento de boton Para generar etiqueta modal editar
function generarEtiqueta2(){
    //Variables de campo empresa, centro de costos y tipo de equipo
    var emp = document.getElementById('idEmpreu');
    var cc = document.getElementById('idCCu');
    var t_eq = document.getElementById('idEquipou');
    //Validar que los campos necesarios para generar etiqueta no esten vacios
    if(emp.value==0 || emp.value==''){
        Swal.fire(":(","Campo empesa vacio! ", "error");
    }else if(t_eq.value==0 || t_eq.value==''){
        Swal.fire(":(","Campo tipo de equipo vacio! ", "error");
    }else if(cc.value==0 || cc.value==''){
        Swal.fire(":(","Campo centro de costos vacio! ", "error");
    }else{
        //Genera la etiqueta 
        $.ajax({
            type: "POST",
            data: $('#frmEditarAsignaEquipo').serialize(),
            url: "../procesos/asignacion/etiqueta2.php",
            success:function(respuesta){
                respuesta = respuesta.trim();
                $('#etqu').val(respuesta);
            }
         });
    }

}

//Eliminar registro de asignacion
function eliminarAsignacion(idAsignacion){
    Swal.fire({
        title: 'Esta seguro de eliminar este equipo?',
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
                data:"idAsignacion=" + idAsignacion,
                url:"../procesos/asignacion/eliminarAsignacion.php",
                success:function(respuesta){
                    if(respuesta == 1){
                        $('#tablaAsignacion').load("asignacion/tablaAsignacion.php");
         
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

//Filtro de equipos por empresas
function filtroEquipo(){
    $.ajax({
        type:"POST",
        data: $('#filtroEmpresa').serialize(),
        url: "asignacion/tablaAsignacionFiltro.php",
        success:function(respuesta){  
         document.getElementById("tablaAsignacion").innerHTML = respuesta;
        
        //Stilo de tabla
        $('#tablaAsignacionu').DataTable({
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
$('#empa').on("select2:select", function (e) {
    //console.log("ID seleccionado: " + e.params.data.id);
    filtroEquipo();
});

//Funcion para traer datos de modal editar
function obtenerDatosAsignar(idequipo){
    $.ajax({
        type: "POST",
        data: "idequipo=" + idequipo,
        url: "../procesos/asignacion/obtenerDatosEquipo.php",
        success:function(respuesta){ 
            respuesta = jQuery.parseJSON(respuesta);
            //Dar el valor a los campos de modal
            $('#idequipoo').val(respuesta['idequipo']);
            $emp = respuesta['id_empresa'].toString();
            $('#idEmpreu').val($emp);
            $('#idEmpreu').trigger('change');
            $equip = respuesta['id_articulo'].toString();
            $('#idEquipou').val($equip);
            $('#idEquipou').trigger('change');
            $user = respuesta['id_usuario'].toString();
            $('#idPersonau').val($user);
            $('#idPersonau').trigger('change');
            $cc = respuesta['id_cc'].toString();
            $('#idCCu').val($cc);
            $('#idCCu').trigger('change');
            $('#etqu').val(respuesta['etiqueta']);
            $('#marcau').val(respuesta['marca']);
            $('#modelou').val(respuesta['modelo']);
            $('#serieu').val(respuesta['serie']);
            $('#modelou').val(respuesta['modelo']);
            $('#procesadoru').val(respuesta['procesador']);
            $('#almacu').val(respuesta['almacenamiento']);
            $('#ramu').val(respuesta['ram']);
            $('#sistemau').val(respuesta['sistema_operativo']);
            $('#macu').val(respuesta['mac']);
            $('#descripcionu').val(respuesta['descripcion']);
        }
    });
}

//Editar registros de Equipos (Asignacion)
function EditarAsignarEquipo(){
    $.ajax({
        type:"POST",
        data: $('#frmEditarAsignaEquipo').serialize(),
        url: "../procesos/asignacion/actualizarAsignacion.php",
        success:function(respuesta){
            respuesta = respuesta.trim();
            if(respuesta == 1){
                
                $('#tablaAsignacion').load("asignacion/tablaAsignacion.php"); 
                $('#btnsalir2').click();
                Swal.fire(":D","Actualizado exitosamente!","success");  
                            
            }else{
                Swal.fire(":(","Error al actualizar! " + respuesta, "error");
            }    
            
        }
    });
    return false;
}

//Adjuntar archivos

function DatosUsuario(idUsuario){
    $('#iduser').val(idUsuario);

}

//Mostrar archivos
function obtenerArchivos(idequipo){
    $.ajax({
        type: "POST",
        data: "idequipo=" + idequipo,
        url: "../procesos/asignacion/obtenerDatosArchivos.php",
        success:function(respuesta){ 
            respuesta = jQuery.parseJSON(respuesta);
            //Dar el valor a los campos de modal
            if(respuesta['responsiva'] != null){
                $('#resp').val(respuesta['responsiva']);
                $('#responsiv1').val('Responsiva');
            }
            if(respuesta['factura'] != null){
                $('#fact').val(respuesta['factura']);
                $('#factur1').val('Factura');
            }
        
        }    
    })
}
//Url de archivos Responsiva
function urlArchivR(){
    $responsiva = document.getElementById("resp").value; 
    if($responsiva != null){
        window.open($responsiva,"Diseño Web", "width=600, height=800");
    }
   
}
//Url de archivos Factura
function urlArchivF(){
    $factura = document.getElementById("fact").value; 
    if($factura != null){
    window.open($factura,"Diseño Web", "width=600, height=800");
    }
}

//Subir Archivos
function archivoss(){
    $.ajax({
        method: "POST",
        url: "../procesos/asignacion/archivos.php",
        contentType:false,
        cache:false,
        processData:false,  
        data: new FormData($('#frmArchivos')[0]),
    success:function(respuesta) {
        if(respuesta){
                $('#frmArchivos')[0].reset();
                $('#salirArchivo').click();
                $('#tablaAsignacion').load("asignacion/tablaAsignacion.php"); 
                Swal.fire(":D","Exito al subir archivo!" + respuesta,"success");
            }else{
                Swal.fire(":(","Fallo al asignar" + respuesta,"error");
            }
        }    
    })
    return false;
}
//Funcion para ver Imagen de equipo
function imagenEquipo(idEquipo){
    $('#imagen').val(idEquipo);
    $('#idequipo').val(idEquipo);
}
//Funcion para ver Imagen subida en Google Drive
function urlImagen(){
    $idequipo = document.getElementById("imagen").value; 
    $.ajax({
        type: "POST",
        data: "idequipo=" + $idequipo,
        url: "../procesos/asignacion/obtenerDatosImagen.php",
        success:function(respuesta){ 
            //Dar el valor a los campos de modal
            if(respuesta == 1){
                Swal.fire(":(","No hay imagen adjunta","error");
                
            }else{
                
                $imagen = respuesta;
                window.open($imagen,"Diseño Web", "width=600, height=800");
            }
        }    
    })
}
//Subir imagen equipo
function agregarImagenEquipo(){
    $.ajax({
        method: "POST",
        url: "../procesos/asignacion/agregarImagenEquipo.php",
        contentType:false,
        cache:false,
        processData:false,  
        data: new FormData($('#frmAgregarImagen')[0]),
    success:function(respuesta) {
        //alert("repuesta: " + respuesta);
        if(respuesta == 2){
            Swal.fire(":(","Fallo al subir archivo! formato valido (.png)" + respuesta,"error");
            }else{
                $('#frmAgregarImagen')[0].reset();
                $('#salirArchivo').click();
                $('#tablaAsignacion').load("asignacion/tablaAsignacion.php"); 
                Swal.fire(":D","Exito al subir archivo!"+ respuesta,"success");
               
            }
        }    
    })
    return false;
}
//funcion para obtener el historial de usuarios asignados
function obtenerHistorialAsignar(id_equipo){
    $.ajax({
        type:"POST",
        data: "idEquipo=" + id_equipo,
        url: "asignacion/tablaAsignacionUsuario.php",
        success:function(respuesta){
             //Cargar tabla de detalles productos
             document.getElementById("tablaHistorialAsignacionoLoad").innerHTML = respuesta;
             //Estolo a tabla con modal 
             $('#tablaHistorialAsignacion').DataTable( {
                  responsive: {
                  details: {
                       display: $.fn.dataTable.Responsive.display.modal( {
                            header: function ( row ) {
                                 var data = row.data();
                                 return 'Detalles de '+data[0]+' '+data[1];
                            }
                       } ),
                       renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
                            tableClass: 'table'
                       } )
                  }
                  },
                  language: {
                  "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                  }
             } );                
        }
    });
    return false;
}