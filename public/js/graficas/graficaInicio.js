$(document).ready(function(){
    //estilo de select2 para modal crear ticket
    $('#usuario').select2();
    $('#tipo').select2();
    $('#empresa').select2();
    $('#empresaMes').select2();
    $('#estadoMes').select2();
    CargarDatosGraficoBar();
    CargarDatosTicketTipo();
    filtroCargarDatosEmpresa();
    CargarDatosMes();
});
//Traer datos a grafica tickets asignados a operador
function CargarDatosGraficoBar(){
    var fechainicial = document.getElementById("fchInicio").value;
    var fechafinal = document.getElementById("fchFin").value;
 
    if(Date.parse(fechafinal) < Date.parse(fechainicial)) {
         Swal.fire(":(","La fecha final debe ser mayor a la fecha inicial", "error");
         //alert("La fecha final debe ser mayor a la fecha inicial");
     }else{
        document.getElementById('grafica').innerHTML = '<canvas id="myChart" width="90" height="120"></canvas>'; 
    $.ajax({
            type: "POST",
            url: "../procesos/graficos/graficaInicio.php",
            success:function(respuesta){ 
                var titulo =[];
                var cantidad =[];
                data = jQuery.parseJSON(respuesta);
                //Dar el valor a los campos de mla grafica
                for(var i=0; i < data.length; i++){
                    titulo.push(data[i][1]);
                    cantidad.push(data[i][2]);
                }
                var ctx = document.getElementById('myChart');
                ctx.height = 30;
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: titulo,
                        datasets: [{
                            label: '# tickets asignados',
                            data: cantidad,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        //onClick: abre     
                        onClick:function(e){ 
                            var activePoints = myChart.getElementsAtEvent(e); 
                            var selectedIndex = activePoints[0]._index; 
                            var nombre = this.data.labels[selectedIndex];
                            var resul = this.data.datasets[0].data[selectedIndex];
                            var Filtro = "";
                            verTickets(nombre,Filtro);
                        }
                    }
                });
            
            }
        });
    }
}
//Ver todos los tickets de usuario seleccionado 
function verTickets(nombre,filtro){
    $('#modalResultGrafica').modal('show'); // abrir
    $.ajax({
        type:"POST",
        data:"id="+ nombre+"&filtro="+ filtro,
        url:"grafica/tablaGraficaAsignados.php",
        success:function(respuesta){
            if(respuesta){
                document.getElementById("tablaTicketsLoad").innerHTML = respuesta;
                $('#tablaTickets').DataTable({
                    //Idioma de la tabla
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    }
                } );
            }else{
                Swal.fire(":(","Error! " + respuesta, "error");
            }
        }
    });
}
//Traer datos a grafica tickets asignados a operador filtro
function filtroCargarDatosGraficoBar(){
    var fechainicial = document.getElementById("fchInicio").value;
    var fechafinal = document.getElementById("fchFin").value;
 
    if(Date.parse(fechafinal) < Date.parse(fechainicial)) {
         Swal.fire(":(","La fecha final debe ser mayor a la fecha inicial", "error");
         //alert("La fecha final debe ser mayor a la fecha inicial");
     }else{
        document.getElementById('grafica').innerHTML = '<canvas id="myChart" width="90" height="120"></canvas>'; 
        $.ajax({
             type: "POST",
             data: $('#frmTicketAsignado').serialize(),
             url: "../procesos/graficos/filtroTicketsAsignados.php",
             success:function(respuesta){ 
                 var titulo =[];
                 var cantidad =[];
                 data = jQuery.parseJSON(respuesta);
                 //Dar el valor a los campos de mla grafica
                 for(var i=0; i < data.length; i++){
                     titulo.push(data[i][1]);
                     cantidad.push(data[i][2]);
                 }
                 var ctx = document.getElementById('myChart');
                 ctx.height = 30;
                 var myChart = new Chart(ctx, {
                     type: 'bar',
                     data: {
                         labels: titulo,
                         datasets: [{
                             label: '# tickets asignados',
                             data: cantidad,
                             backgroundColor: [
                                 'rgba(255, 99, 132, 0.2)',
                                 'rgba(54, 162, 235, 0.2)',
                                 'rgba(255, 206, 86, 0.2)',
                                 'rgba(75, 192, 192, 0.2)',
                                 'rgba(153, 102, 255, 0.2)',
                                 'rgba(255, 159, 64, 0.2)'
                             ],
                             borderColor: [
                                 'rgba(255, 99, 132, 1)',
                                 'rgba(54, 162, 235, 1)',
                                 'rgba(255, 206, 86, 1)',
                                 'rgba(75, 192, 192, 1)',
                                 'rgba(153, 102, 255, 1)',
                                 'rgba(255, 159, 64, 1)'
                             ],
                             borderWidth: 1
                         }]
                     },
                     options: {
                         scales: {
                             yAxes: [{
                                 ticks: {
                                     beginAtZero: true
                                 }
                             }]
                         },
                         //onClick: abre     
                         onClick:function(e){ 
                             var activePoints = myChart.getElementsAtEvent(e); 
                             var selectedIndex = activePoints[0]._index; 
                             var nombre = this.data.labels[selectedIndex];
                             var resul = this.data.datasets[0].data[selectedIndex];
                             var Filtro = "";
                             if(fechainicial != "" && fechafinal == ""){
                                Filtro += " AND DATE_FORMAT(t.fecha_inicio,'%Y-%m-%d') ='"+ fechainicial +"'";
                             }
                             if(fechainicial != "" && fechafinal != ""){
                                 Filtro += " AND DATE_FORMAT(t.fecha_inicio,'%Y-%m-%d') BETWEEN '"+fechainicial + "' AND '"+fechafinal+"'";
                             } 
                             verTickets(nombre,Filtro);
                         }
                     }
                 });
                
             }
         });
     }
   
}
//Filtro por usuario
$('#usuario').on("select2:select", function (e) {
    var $id =  e.params.data.id;
/*if($id == 0){
        document.getElementById('grafica').innerHTML ="";
        CargarDatosGraficoBar();
    }else{*/
        document.getElementById('grafica').innerHTML ="";
        filtroCargarDatosGraficoBar();
    //}
    
});
//Traer datos a grafica tickets tipo
function CargarDatosTicketTipo(){
    document.getElementById('grafica2').innerHTML = '<canvas id="myChart2" width="90" height="120"></canvas>'; 
   $.ajax({
        type: "POST",
        url: "../procesos/graficos/graficaTicketTipo.php",
        success:function(respuesta){ 
            var titulo =[];
            var cantidad =[];
            data = jQuery.parseJSON(respuesta);
            //Dar el valor a los campos de mla grafica
            for(var i=0; i < data.length; i++){
                titulo.push(data[i][0]);
                cantidad.push(data[i][1]);
            }
            var ctx = document.getElementById('myChart2');
            ctx.height = 30;
            var myChart2 = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: titulo,
                    datasets: [{
                        label: '# Tipo tickets',
                        data: cantidad,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    //onClick: abre     
                    onClick:function(e){ 
                        var activePoints = myChart2.getElementsAtEvent(e); 
                        var selectedIndex = activePoints[0]._index; 
                        var nombre = this.data.labels[selectedIndex];
                        var resul = this.data.datasets[0].data[selectedIndex];
                        //alert(nombre); 
                        //$('#modalResultGrafica').modal('show'); // abrir
                        var Filtro = "";
                        verTicketsTipo(nombre,Filtro);
                    }
                }
            });
           
        }
    });
}
//Ver todos los tickets de tipo seleccionado 
function verTicketsTipo(nombre,filtro){
    $('#modalResultGrafica').modal('show'); // abrir
    $.ajax({
        type:"POST",
        data:"id="+ nombre+"&filtro="+ filtro,
        url:"grafica/tablaGraficaTipo.php",
        success:function(respuesta){
            if(respuesta){
                document.getElementById("tablaTicketsLoad").innerHTML = respuesta;
                $('#tablaTicketsTipo').DataTable({
                    //Idioma de la tabla
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    }
                } );
            }else{
                Swal.fire(":(","Error! " + respuesta, "error");
            }
        }
    });
}
    
//Traer datos a grafica tickets tipo filtro
function filtroDatosTicketTipo(){
    var fechainicial = document.getElementById("fchInicio2").value;
    var fechafinal = document.getElementById("fchFin2").value;
 
    if(Date.parse(fechafinal) < Date.parse(fechainicial)) {
         Swal.fire(":(","La fecha final debe ser mayor a la fecha inicial", "error");
         //alert("La fecha final debe ser mayor a la fecha inicial");
     }else{
        document.getElementById('grafica2').innerHTML = '<canvas id="myChart2" width="90" height="120"></canvas>'; 
    $.ajax({
            type: "POST",
            data: $('#frmTicketTipo').serialize(),
            url: "../procesos/graficos/filtroTicketTipo.php",
            success:function(respuesta){ 
                var titulo =[];
                var cantidad =[];
                data = jQuery.parseJSON(respuesta);
                //Dar el valor a los campos de mla grafica
                for(var i=0; i < data.length; i++){
                    titulo.push(data[i][0]);
                    cantidad.push(data[i][1]);
                }
                var ctx = document.getElementById('myChart2');
                ctx.height = 30;
                var myChart2 = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: titulo,
                        datasets: [{
                            label: '# Tipo tickets',
                            data: cantidad,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        //onClick: abre     
                        onClick:function(e){ 
                            var activePoints = myChart2.getElementsAtEvent(e); 
                            var selectedIndex = activePoints[0]._index; 
                            var nombre = this.data.labels[selectedIndex];
                            var resul = this.data.datasets[0].data[selectedIndex];
                            //alert(nombre); 
                            var Filtro = "";
                            if(fechainicial != "" && fechafinal == ""){
                               Filtro += " AND DATE_FORMAT(t.fecha_inicio,'%Y-%m-%d') ='"+ fechainicial +"'";
                            }
                            if(fechainicial != "" && fechafinal != ""){
                                Filtro += " AND DATE_FORMAT(t.fecha_inicio,'%Y-%m-%d') BETWEEN '"+fechainicial + "' AND '"+fechafinal+"'";
                            } 
                            verTicketsTipo(nombre,Filtro);
                        }
                    }
                });
            
            }
        });
     }
}

//Filtro por tipo
$('#tipo').on("select2:select", function (e) {
    var $id =  e.params.data.id;
    /*if($id == 0){
        document.getElementById('grafica2').innerHTML ="";
        CargarDatosTicketTipo();
    }else{*/
        document.getElementById('grafica2').innerHTML ="";
        filtroDatosTicketTipo();
    //}
    
});
//Validar que la fecha fin no sea menor a fecha inicio tickets asignados 
function ValidarFechas(){
    filtroCargarDatosGraficoBar();
 }
 //Validar que la fecha fin no sea menor a fecha inicio ticket tipo
function ValidarFechas2(){
    filtroDatosTicketTipo();
 }
 //Validar que la fecha fin no sea menor a fecha inicio ticket tipo
function ValidarFechas3(){
    filtroCargarDatosEmpresa();
 }
/*$("#grafica2").click(function(e) {
 
    
 });*/
//Ver todos los tickets de empresa seleccionada
function verTicketsEmpresa(nombre,filtro){
    $('#modalResultGrafica').modal('show'); // abrir
    $.ajax({
        type:"POST",
        data:"id="+ nombre+"&filtro="+ filtro,
        url:"grafica/tablaGraficaEmpresa.php",
        success:function(respuesta){
            if(respuesta){
                document.getElementById("tablaTicketsLoad").innerHTML = respuesta;
                $('#tablaTicketsEmpresa').DataTable({
                    //Idioma de la tabla
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    }
                } );
            }else{
                Swal.fire(":(","Error! " + respuesta, "error");
            }
        }
    });
}
//Traer datos a grafica tickets asignados a operador filtro
function filtroCargarDatosEmpresa(){
    var fechainicial = document.getElementById("fchInicio3").value;
    var fechafinal = document.getElementById("fchFin3").value;
 
    if(Date.parse(fechafinal) < Date.parse(fechainicial)) {
         Swal.fire(":(","La fecha final debe ser mayor a la fecha inicial", "error");
         //alert("La fecha final debe ser mayor a la fecha inicial");
     }else{
        document.getElementById('grafica3').innerHTML = '<canvas id="myChart3" width="90" height="120"></canvas>'; 
        $.ajax({
             type: "POST",
             data: $('#frmTicketEmpresa').serialize(),
             url: "../procesos/graficos/filtroTicketEmpresa.php",
             success:function(respuesta){ 
                 var titulo =[];
                 var cantidad =[];
                 data = jQuery.parseJSON(respuesta);
                 //Dar el valor a los campos de mla grafica
                 for(var i=0; i < data.length; i++){
                     titulo.push(data[i][0]);
                     cantidad.push(data[i][1]);
                 }
                 var ctx = document.getElementById('myChart3');
                 ctx.height = 30;
                 var myChart3 = new Chart(ctx, {
                     type: 'bar',
                     data: {
                         labels: titulo,
                         datasets: [{
                             label: '# Tickets Empresas',
                             data: cantidad,
                             backgroundColor: [
                                 'rgba(255, 99, 132, 0.2)',
                                 'rgba(54, 162, 235, 0.2)',
                                 'rgba(255, 206, 86, 0.2)',
                                 'rgba(75, 192, 192, 0.2)',
                                 'rgba(153, 102, 255, 0.2)',
                                 'rgba(255, 159, 64, 0.2)'
                             ],
                             borderColor: [
                                 'rgba(255, 99, 132, 1)',
                                 'rgba(54, 162, 235, 1)',
                                 'rgba(255, 206, 86, 1)',
                                 'rgba(75, 192, 192, 1)',
                                 'rgba(153, 102, 255, 1)',
                                 'rgba(255, 159, 64, 1)'
                             ],
                             borderWidth: 1
                         }]
                     },
                     options: {
                         scales: {
                             yAxes: [{
                                 ticks: {
                                     beginAtZero: true
                                 }
                             }]
                         },
                         //onClick: abre     
                         onClick:function(e){ 
                             var activePoints = myChart3.getElementsAtEvent(e);  
                             var selectedIndex = activePoints[0]._index; 
                             var nombre = this.data.labels[selectedIndex];
                             var resul = this.data.datasets[0].data[selectedIndex];
                             var Filtro = "";
                             if(fechainicial != "" && fechafinal == ""){
                                Filtro += " AND DATE_FORMAT(t.fecha_inicio,'%Y-%m-%d') ='"+ fechainicial +"'";
                             }
                             if(fechainicial != "" && fechafinal != ""){
                                 Filtro += " AND DATE_FORMAT(t.fecha_inicio,'%Y-%m-%d') BETWEEN '"+fechainicial + "' AND '"+fechafinal+"'";
                             } 
                             verTicketsEmpresa(nombre,Filtro);
                         }
                     }
                 });
                
             }
         });
     }
   
}
//Filtro por empresa
$('#empresa').on("select2:select", function (e) {
    var $id =  e.params.data.id;
        document.getElementById('grafica3').innerHTML ="";
        filtroCargarDatosEmpresa();
    
});
//Ver todos los tickets de tipo de empresa por mes 
function verTicketsMes(nombre){
    $('#modalResultGrafica').modal('show'); // abrir
    $.ajax({
        type:"POST",
        data:"id="+ nombre,
        url:"grafica/tablaGraficaMes.php",
        success:function(respuesta){
            if(respuesta){
                document.getElementById("tablaTicketsLoad").innerHTML = respuesta;
                $('#tablaTicketsMes').DataTable({
                    //Idioma de la tabla
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    }
                } );
            }else{
                Swal.fire(":(","Error! " + respuesta, "error");
            }
        }
    });
}
//Traer datos a grafica tickets Mes filtro
function CargarDatosMes(){

    document.getElementById('grafica4').innerHTML = '<canvas id="myChart4" width="90" height="120"></canvas>'; 
    $.ajax({
         type: "POST",
         data: $('#frmTicketMes').serialize(),
         url: "../procesos/graficos/filtroTicketMes.php",
         success:function(respuesta){ 
             var titulo =[];
             var cantidad =[];
             data = jQuery.parseJSON(respuesta);
             //Dar el valor a los campos de mla grafica
             for(var i=0; i < data.length; i++){
                 titulo.push(data[i][0]);
                 cantidad.push(data[i][1]);
             }
             var ctx = document.getElementById('myChart4');
             ctx.height = 30;
             var myChart4 = new Chart(ctx, {
                 type: 'bar',
                 data: {
                     labels: titulo,
                     datasets: [{
                         label: '# Tickets Mes',
                         data: cantidad,
                         backgroundColor: [
                             'rgba(255, 99, 132, 0.2)',
                             'rgba(54, 162, 235, 0.2)',
                             'rgba(255, 206, 86, 0.2)',
                             'rgba(75, 192, 192, 0.2)',
                             'rgba(153, 102, 255, 0.2)',
                             'rgba(255, 159, 64, 0.2)'
                         ],
                         borderColor: [
                             'rgba(255, 99, 132, 1)',
                             'rgba(54, 162, 235, 1)',
                             'rgba(255, 206, 86, 1)',
                             'rgba(75, 192, 192, 1)',
                             'rgba(153, 102, 255, 1)',
                             'rgba(255, 159, 64, 1)'
                         ],
                         borderWidth: 1
                     }]
                 },
                 options: {
                     scales: {
                         yAxes: [{
                             ticks: {
                                 beginAtZero: true
                             }
                         }]
                     },
                     //onClick: abre     
                     onClick:function(e){ 
                         var activePoints = myChart4.getElementsAtEvent(e);  
                         var selectedIndex = activePoints[0]._index; 
                         var nombre = this.data.labels[selectedIndex];
                         var resul = this.data.datasets[0].data[selectedIndex];
                        //alert(nombre);
                        verTicketsMes(nombre);
                     }
                 }
             });
            
         }
     });
}
//Traer datos a grafica tickets Mes filtro
function filtroCargarDatosMes(empresa, estado){

        document.getElementById('grafica4').innerHTML = '<canvas id="myChart4" width="90" height="120"></canvas>'; 
        $.ajax({
             type: "POST",
             data: $('#frmTicketMes').serialize(),
             url: "../procesos/graficos/filtroTicketMes.php",
             success:function(respuesta){ 
                 var titulo =[];
                 var cantidad =[];
                 data = jQuery.parseJSON(respuesta);
                 //Dar el valor a los campos de mla grafica
                 for(var i=0; i < data.length; i++){
                     titulo.push(data[i][0]);
                     cantidad.push(data[i][1]);
                 }
                 var ctx = document.getElementById('myChart4');
                 ctx.height = 30;
                 var myChart4 = new Chart(ctx, {
                     type: 'bar',
                     data: {
                         labels: titulo,
                         datasets: [{
                             label: '# Tickets Mes',
                             data: cantidad,
                             backgroundColor: [
                                 'rgba(255, 99, 132, 0.2)',
                                 'rgba(54, 162, 235, 0.2)',
                                 'rgba(255, 206, 86, 0.2)',
                                 'rgba(75, 192, 192, 0.2)',
                                 'rgba(153, 102, 255, 0.2)',
                                 'rgba(255, 159, 64, 0.2)'
                             ],
                             borderColor: [
                                 'rgba(255, 99, 132, 1)',
                                 'rgba(54, 162, 235, 1)',
                                 'rgba(255, 206, 86, 1)',
                                 'rgba(75, 192, 192, 1)',
                                 'rgba(153, 102, 255, 1)',
                                 'rgba(255, 159, 64, 1)'
                             ],
                             borderWidth: 1
                         }]
                     },
                     options: {
                         scales: {
                             yAxes: [{
                                 ticks: {
                                     beginAtZero: true
                                 }
                             }]
                         },
                         //onClick: abre     
                         onClick:function(e){ 
                             var activePoints = myChart4.getElementsAtEvent(e);  
                             var selectedIndex = activePoints[0]._index; 
                             var nombre = this.data.labels[selectedIndex];
                             var resul = this.data.datasets[0].data[selectedIndex];
                            
                            verFiltroTicketsMes(nombre,empresa,estado);
                         }
                     }
                 });
                
             }
         });
}
 //Filtro por Mes
 $('#empresaMes').on("select2:select", function (e) {
    var $id =  e.params.data.id;
    document.getElementById('grafica4').innerHTML = "";
    $estado = $("#estadoMes").val();
    filtroCargarDatosMes($id,$estado);

});
//Filtro por Mes (Estado)
$('#estadoMes').on("select2:select", function (e) {
    var $id =  e.params.data.id;
    document.getElementById('grafica4').innerHTML = "";
    $empresa = $("#empresaMes").val();
    if($empresa == 1){
        $empresa = 0;
    }
    filtroCargarDatosMes($empresa,$id);

});
//Ver todos los tickets de empresa seleccionada
function verFiltroTicketsMes(mes,empresa,estado){
    $('#modalResultGrafica').modal('show'); // abrir
    $.ajax({
        type:"POST",
        data:"idMes="+ mes +"&filtro="+ empresa +"&estado="+ estado,
        url:"grafica/tablaGraficaMes.php",
        success:function(respuesta){
            if(respuesta){
                document.getElementById("tablaTicketsLoad").innerHTML = respuesta;
                $('#tablaTicketsMes').DataTable({
                    //Idioma de la tabla
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    }
                } );
            }else{
                Swal.fire(":(","Error! " + respuesta, "error");
            }
        }
    });
}
//Ver todos los tickets de empresa seleccionada
function verTicketsMes(mes){
    $('#modalResultGrafica').modal('show'); // abrir
    $.ajax({
        type:"POST",
        data:"idMes="+ mes,
        url:"grafica/tablaGraficaMes.php",
        success:function(respuesta){
            if(respuesta){
                document.getElementById("tablaTicketsLoad").innerHTML = respuesta;
                $('#tablaTicketsMes').DataTable({
                    //Idioma de la tabla
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    }
                } );
            }else{
                Swal.fire(":(","Error! " + respuesta, "error");
            }
        }
    });
}

//Funcion para ver ticket de inicio a fin
function ver_ticketAdmin(id_ticket){
    $('#modalAsignado').val(0);
    $('#modalAsignado').trigger('change');
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
                var x = document.getElementById("descargaImg");
                x.style.display = "block";
                document.getElementById('urlTicket').setAttribute('href', respuesta['url']);
                document.getElementById('urlTicket').setAttribute('download', respuesta['id_ticket']);
           }else{
                var x = document.getElementById("descargaImg");
                x.style.display = "none";
                document.getElementById('urlTicket').setAttribute('href', "123");
                document.getElementById('urlTicket').setAttribute('download', "123");
           }
           
            cargarLista($idTicket);
        }
        
    });
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

    