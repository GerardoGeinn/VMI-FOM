// $(document).ready(function () {
//     // $('#tablaReport').select();

//     $.ajax({
//         type: "GET",
//         url: "tablacom.php",
//         dataType: "json",
//         success: function(respuesta) {
//         document.getElementById("tabla").innerHTML = respuesta;
//         $('#tablaReport').DataTable( {
//             aLengthMenu: [ [25, 50, 100, 200, -1], [25, 50, 100, 200, "All"] ],
//              iDisplayLength: 40,
//             scrollX: true,

//             language: {
//                 "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
//                 },
//                 dom: 'lBfrtip',

//         });
//         }
//     });
//     return false;

// });
window.addEventListener('DOMContentLoaded', event => {


$(document).ready(function () {
$.ajax({
        type: "GET",
        url: "tablacom.php",
        dataType: "json",
        success: function(respuesta) {
        document.getElementById("tabla").innerHTML = respuesta;
        $('#tablaReport').DataTable( {
            aLengthMenu: [ [25, 50, 100, 200, -1], [25, 50, 100, 200, "All"] ],
             iDisplayLength: 40,
            scrollX: true,

            language: {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                },
                dom: 'lBfrtip',

        });
        }
    });
    return false;

});


});




// $(document).ready(function() {
//     $.ajax({
//         url: "tablacom.php",
//         type: "GET",
//         dataType: "json",
//         success: function(respuesta) {
//             // Crea un array vacio para poner las columnas con datos
//             var tableData = [];

//             // Pasa por la repsuesta del JSON y agrega cada columna como un array al tableData.
//             for (var i = 0; i < respuesta.length; i++) {
//                 var rowData =
//                   [ respuesta[i].SERIE,
//                     respuesta[i].FOLIO,
//                     respuesta[i].AGENTE,
//                     respuesta[i].CANTIDAD,
//                     respuesta[i].CODIGO,
//                     respuesta[i].DESCRIPCION,
//                     respuesta[i].ALMACEN,
//                     respuesta[i].FECHA,
//                     respuesta[i].PRECIOP,
//                     respuesta[i].MONTOT
//                 ];
//                 tableData.push(rowData);
//             }

//             // Usa simpleDatatables para crear la tabla
//             new simpleDatatables.DataTable('#tablaReport', {
//                 data: tableData // Setea los datos al tableData
                
//             });
//         }
//     });
// });
