$(document).ready(function(){
    $('#empresa').select2();
    $('#codigoAlmac').select2();
    alert("hola");
});


function filtroEmpresa(){
   // $('#indicador').load("existencias/indicadorCargaWeb.php");

    $.ajax({
        type:"POST",
        data: $('#filtroEmpresa').serialize(),
        url: "tablaReporteExistencias.php", //redirige 
        success:function(respuesta){   
            document.getElementById("tablaReporteExistenciasLoad").innerHTML = respuesta; //manda respusta de la tabla
            //Estolo a tabla con modal 
            $('#tablaReporteExistencias').DataTable( {
                aLengthMenu: [ [25, 50, 100, 200, -1], [25, 50, 100, 200, "All"] ],
                 iDisplayLength: 25,
                scrollX: true,
                /*responsive: {
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
                },*/
                language: {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    },
                    dom: 'lBfrtip',
                    buttons: [
                        {
                            //COPY
                            extend: 'copyHtml5',
                            text: '<i class="fa-regular fa-copy"></i>',//u can define a diferent text or icon
                            title: 'Student Letter Request List',
                        },
                        {
                            //EXCEL
                            extend: 'excelHtml5',
                            text: '<i class="fa-regular fa-file-excel"></i>', 
                            title: 'Student Letter Request List',
                        },
                        {
                            //CSV
                            extend: 'csvHtml5',
                            text: '<i class="fa-solid fa-file-csv"></i>', 
                            title: 'Student Letter Request List',
                        },
                        {
                            //PDF
                            extend: 'pdfHtml5',
                            text: '<i class="fa-solid fa-file-pdf"></i>',
                            orientation: 'landscape',
                            pageSize: 'LEGAL',
                            download: 'open'
                        }
                    ]
            } );
            var x = document.getElementById("prueba1");
            x.style.display = "none";
        }
    });
    return false;
}

 
 //Indicador de carga
 window.addEventListener('load', () =>{
    const contenedor_loader = document.querySelector('.contenedor_loader');
    contenedor_loader.style.opacity = 0;
    contenedor_loader.style.visibility = 'hidden';
    });
    //Funcion de filtro y select dinamico
    /*$('#empresa').on("select2:select", function (e) {
        var $id =  e.params.data.id;
        filtroEmpresa();
        if($id == 2 || $id ==3){
           
            document.getElementById('codigoAlmac').innerHTML = "";
            codigo($id);
        }
        
    });*/
    
    $('#codigoAlmac').on("select2:select", function (e) {
        filtroEmpresa();
    });
