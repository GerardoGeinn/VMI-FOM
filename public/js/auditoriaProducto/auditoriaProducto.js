$(document).ready(function(){
     //Cargar tabla de detalles productos
     $("#tablaDetalleProductoLoad").load("auditoriaProducto/tablaDetalles.php");
});
 //estilo a tabla de auditorias
 function styleTableAudit(id){
     $.ajax({
          type:"POST",
          data: "idDetalle=" + id,
          url: "auditoriaProducto/tablaAuditoriasDetalle.php",
          success:function(respuesta){
               //Cargar tabla de detalles productos
               document.getElementById("tablaAuditoriaDetallesLoad").innerHTML = respuesta;
               //$("#tablaAuditoriaDetallesLoad").load("auditoriaProducto/tablaAuditoriasDetalle.php");
               //Estolo a tabla con modal 
               $('#tablaAuditorias').DataTable( {
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
//Funcion para agregar Detalles
function agregarNuevoDetalle(){
     $.ajax({
         type:"POST",
         data: $('#frmAgregarDetalle').serialize(),
         url: "../procesos/auditoriaProducto/crearDetalle.php",
         success:function(respuesta){
             respuesta = respuesta.trim();
             if(respuesta == 1){
                 $("#tablaDetalleProductoLoad").load("auditoriaProducto/tablaDetalles.php");
                 $('#idproducto').select2('val', '0');
                 $('#idauditor').select2('val', '0');
                 $('#frmAgregarDetalle')[0].reset();
                 $('#btnsalir1').click();
                 Swal.fire(":D","Agregado exitosamente!","success");            
             }else{
                 Swal.fire(":(","Error al agregar! " + respuesta, "error");
             }    
         }
     });
     return false;
 }
 //Funcion obtener ID detalle para auditoria
function auditoriaDetalle(id){
     $('#idDetalle').val(id);
}
//Agregar auditoria a detelle
function agregarNuevoAuditoria(){
     $.ajax({
          type:"POST",
          data: $('#frmAgregarAuditoria').serialize(),
          url: "../procesos/auditoriaProducto/crearAuditoria.php",
          success:function(respuesta){
              respuesta = respuesta.trim();
              if(respuesta == 1){
                  $id = $('#idDetalle').val();
                  $("#tablaDetalleProductoLoad").load("auditoriaProducto/tablaDetalles.php");
                  $('#resistencia').select2('val', '0');
                  $('#sujecionPuno').select2('val', '0');
                  $('#defecto').select2('val', '0');
                  $('#sujecionPecho').select2('val', '0');
                  $('#defecto2').select2('val', '0');
                  $('#resistenciaUniones').select2('val', '0');
                  $('#posicionEtq').select2('val', '0');
                  $('#dictamen').select2('val', '0');
                  $('#frmAgregarAuditoria')[0].reset();
                  $('#idDetalle').val($id);
                  //$('#btnsalir').click();
                  Swal.fire(":D","Agregado exitosamente!","success");              
              }else{
                  Swal.fire(":(","Error al agregar! " + respuesta, "error");
              }    
          }
      });
      return false;
}
//Eliminar detalle
function eliminarAuditoria(idAuditoria){
    Swal.fire({
         title: 'Esta seguro de eliminar esta auditoria?',
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
                 data:"idAuditoria=" + idAuditoria,
                 url:"../procesos/auditoriaProducto/eliminarAuditoria.php",
                 success:function(respuesta){
                     if(respuesta >= 1){
                        //cargar tabla auditorias
                        styleTableAudit(respuesta);
                        //Cargar tabla de detalles productos
                        $("#tablaDetalleProductoLoad").load("auditoriaProducto/tablaDetalles.php");
          
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
//Eliminar detalle
function eliminarUsuario(){
     Swal.fire({
          title: 'Esta seguro de eliminar este detalle?',
          text:'Una vez eliminado no podra ser recuperado!',
          icon:'warning',
          showCancelButton: 'true',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
          if(result.isConfirmed){
              /*$.ajax({
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
               });*/
          }
      })
      return false;
}
//Traer datos a grafica recuento de defectos
function CargarDatosGraficoBar(){
    $.ajax({
        type: "POST",
        url: "../procesos/auditoriaProducto/graficaDefectos.php",
        success:function(respuesta){ 
            var titulo =[];
            var cantidad =[];
            data = jQuery.parseJSON(respuesta);
            //Dar el valor a los campos de mla grafica
            for(var i=0; i < data.length; i++){
                titulo.push(data[i][0]);
                cantidad.push(data[i][1]);
            }
            var ctx = document.getElementById('pastelDefectos');
            ctx.height = 70;
            ctx.width = 100;
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: titulo,
                    datasets: [{
                        label: '# Defectos',
                        data: cantidad,
                        backgroundColor: [
                             	 
                            'rgba(0, 255, 0, 0.2)',	 
                            'rgba(50, 205, 50, 0.2)',		 
                            'rgba(250, 240, 230, 0.2)',	 
                            'rgba(255, 0, 255, 0.2)',		 
                            'rgba(128, 0, 0, 0.2)',	
                            'rgba(102, 205, 170, 0.2)',		 
                            'rgba(0, 0, 205, 0.2)',		 
                            'rgba(186, 85, 211, 0.2)',	 
                            'rgba(147, 112, 219, 0.2)',		 
                            'rgba(60, 179, 113, 0.2)',		 
                            'rgba(123, 104, 238, 0.2)',		 
                            'rgba(0, 250, 154, 0.2)',	 
                            'rgba(72, 209, 204, 0.2)',		 
                            'rgba(199, 21, 133, 0.2)',		 
                            'rgba(25, 25, 112, 0.2)',	 
                            'rgba(245, 255, 250, 0.2)',		 
                            'rgba(255, 228, 225, 0.2)',	 
                            'rgba(255, 228, 181, 0.2)',		 
                            'rgba(255, 222, 173, 0.2)',	 
                            'rgba(0, 0, 128, 0.2)',		 
                            'rgba(253, 245, 230, 0.2)',	 
                            'rgba(128, 128, 0, 0.2)',		 
                            'rgba(107, 142, 35, 0.2)',		 
                            'rgba(255, 165, 0, 0.2)',		 
                            'rgba(255, 69, 0, 0.2)', 
                            'rgba(218, 112, 214, 0.2)',		 
                            'rgba(238, 232, 170, 0.2)',	 
                            'rgba(152, 251, 152, 0.2)',	
                            'rgba(175, 238, 238, 0.2)',	 
                            'rgba(219, 112, 147, 0.2)',		 
                            'rgba(255, 239, 213, 0.2)',		 
                            'rgba(255, 218, 185, 0.2)',	 
                            'rgba(205, 133, 63, 0.2)',		 
                            'rgba(255, 192, 203, 0.2)', 
                            'rgba(221, 160, 221, 0.2)',	 
                            'rgba(176, 224, 230, 0.2)',		 
                            'rgba(128, 0, 128, 0.2)',	
                            'rgba(255, 0, 0, 0.2)',		 
                            'rgba(188, 143, 143, 0.2)',	 
                            'rgba(65, 105, 225, 0.2)',		 
                            'rgba(139, 69, 19, 0.2)',	 
                            'rgba(250, 128, 114, 0.2)',	 
                            'rgba(244, 164, 96, 0.2)',	
                            'rgba(46, 139, 87, 0.2)',	 
                            'rgba(255, 245, 238, 0.2)',	
                            'rgba(160, 82, 45, 0.2)',		 
                            'rgba(192, 192, 192, 0.2)',	
                            'rgba(135, 206, 235, 0.2)',		 
                            'rgba(106, 90, 205, 0.2)',	 
                            'rgba(112, 128, 144, 0.2)',		 		 
                            'rgba(255, 250, 250, 0.2)',		 
                            'rgba(0, 255, 127, 0.2)',		 
                            'rgba(70, 130, 180, 0.2)',	 
                            'rgba(210, 180, 140, 0.2)',		 
                            'rgba(0, 128, 128, 0.2)',	 
                            'rgba(216, 191, 216, 0.2)',		 
                            'rgba(255, 99, 71, 0.2)',		 
                            'rgba(64, 224, 208, 0.2)',		 
                            'rgba(238, 130, 238, 0.2)',		 
                            'rgba(245, 222, 179, 0.2)',		 
                            'rgba(255, 255, 255, 0.2)',	 
                            'rgba(245, 245, 245, 0.2)',		 
                            'rgba(255, 255, 0, 0.2)',	
                            'rgba(154, 205, 50, 0.2)'
                        ],
                        borderColor: [
                            		 		 
                            'rgba(0, 255, 0, 1)',	 
                            'rgba(50, 205, 50, 1)',		 
                            'rgba(250, 240, 230, 1)',	 
                            'rgba(255, 0, 255, 1)',		 
                            'rgba(128, 0, 0, 1)',	
                            'rgba(102, 205, 170, 1)',		 
                            'rgba(0, 0, 205, 1)',		 
                            'rgba(186, 85, 211, 1)',	 
                            'rgba(147, 112, 219, 1)',		 
                            'rgba(60, 179, 113, 1)',		 
                            'rgba(123, 104, 238, 1)',		 
                            'rgba(0, 250, 154, 1)',	 
                            'rgba(72, 209, 204, 1)',		 
                            'rgba(199, 21, 133, 1)',		 
                            'rgba(25, 25, 112, 1)',	 
                            'rgba(245, 255, 250, 1)',		 
                            'rgba(255, 228, 225, 1)',	 
                            'rgba(255, 228, 181, 1)',		 
                            'rgba(255, 222, 173, 1)',	 
                            'rgba(0, 0, 128, 1)',		 
                            'rgba(253, 245, 230, 1)',	 
                            'rgba(128, 128, 0, 1)',		 
                            'rgba(107, 142, 35, 1)',		 
                            'rgba(255, 165, 0, 1)',		 
                            'rgba(255, 69, 0, 1)', 
                            'rgba(218, 112, 214, 1)',		 
                            'rgba(238, 232, 170, 1)',	 
                            'rgba(152, 251, 152, 1)',	
                            'rgba(175, 238, 238, 1)',	 
                            'rgba(219, 112, 147, 1)',		 
                            'rgba(255, 239, 213, 1)',		 
                            'rgba(255, 218, 185, 1)',	 
                            'rgba(205, 133, 63, 1)',		 
                            'rgba(255, 192, 203, 1)', 
                            'rgba(221, 160, 221, 1)',	 
                            'rgba(176, 224, 230, 1)',		 
                            'rgba(128, 0, 128, 1)',	
                            'rgba(255, 0, 0, 1)',		 
                            'rgba(188, 143, 143, 1)',	 
                            'rgba(65, 105, 225, 1)',		 
                            'rgba(139, 69, 19, 1)',	 
                            'rgba(250, 128, 114, 1)',	 
                            'rgba(244, 164, 96, 1)',	
                            'rgba(46, 139, 87, 1)',	 
                            'rgba(255, 245, 238, 1)',	
                            'rgba(160, 82, 45, 1)',		 
                            'rgba(192, 192, 192, 1)',	
                            'rgba(135, 206, 235, 1)',		 
                            'rgba(106, 90, 205, 1)',	 
                            'rgba(112, 128, 144, 1)',		 		 
                            'rgba(255, 250, 250, 1)',		 
                            'rgba(0, 255, 127, 1)',		 
                            'rgba(70, 130, 180, 1)',	 
                            'rgba(210, 180, 140, 1)',		 
                            'rgba(0, 128, 128, 1)',	 
                            'rgba(216, 191, 216, 1)',		 
                            'rgba(255, 99, 71, 1)',		 
                            'rgba(64, 224, 208, 1)',		 
                            'rgba(238, 130, 238, 1)',		 
                            'rgba(245, 222, 179, 1)',		 
                            'rgba(255, 255, 255, 1)',	 
                            'rgba(245, 245, 245, 1)',		 
                            'rgba(255, 255, 0, 1)',	
                            'rgba(154, 205, 50, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    /*scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }*/
                }
            });
           
        }
    });
}