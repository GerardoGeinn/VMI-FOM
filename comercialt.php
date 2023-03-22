
<?php

$resp="";

    $resp = "SELECT TOP 100
    DOC.CSERIEDOCUMENTO AS SERIE, CONVERT(INT,DOC.CFOLIO) AS FOLIO, ISNULL(AG.CNOMBREAGENTE,'')AS AGENTE, DOC.CTOTALUNIDADES AS CANTIDAD, 
    PRO.CCODIGOPRODUCTO AS CODIGO,PRO.CNOMBREPRODUCTO AS DESCRIPCION, ALM.CNOMBREALMACEN AS ALMACEN, FORMAT(MOV.CPRECIO,'C','en-us') AS PRECIOP,  
    CONVERT(VARCHAR,DOC.CFECHA,103) AS FECHA, DOC.CTOTAL, FORMAT(DOC.CTOTAL, 'C','en-us') AS MONTOT
    FROM admProductos PRO
    LEFT OUTER JOIN dbo.admMovimientos MOV ON PRO.CIDPRODUCTO= MOV.CIDPRODUCTO 
    LEFT OUTER JOIN dbo.admDocumentos DOC ON MOV.CIDDOCUMENTO = DOC.CIDDOCUMENTO 
    LEFT OUTER JOIN dbo.admUnidadesMedidaPeso UMP ON MOV.CIDUNIDAD =UMP.CIDUNIDAD
    LEFT OUTER JOIN dbo.admDocumentosModelo DM ON MOV.CIDDOCUMENTODE = DM.CIDDOCUMENTODE
    LEFT OUTER JOIN dbo.admAgentes AG ON DOC.CIDAGENTE = AG.CIDAGENTE
    LEFT OUTER JOIN dbo.admAlmacenes ALM ON MOV.CIDALMACEN = ALM.CIDALMACEN
    WHERE DOC.CCANCELADO = 0 AND  PRO.CTIPOPRODUCTO = 1 AND PRO.CSTATUSPRODUCTO=1 AND DM.CIDDOCUMENTODE= 2 AND DOC.CFOLIO<>0";

$respuesta = 0;


    include "Procesos/login/conexioncom.php";
    $conn = new conexionFom();
    $conexion = $conn->conectarFom();
    $sql = $resp;
    $res = $conexion->query($sql);
    $respuesta = $res->fetchAll(PDO::FETCH_OBJ); 

 ?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title> Comercial-VMI</title>
        <link rel="shortcut icon" href="public/img/logos-FOC-blanco-V.png">
        <!--DT--> 
        <!-- <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" /> -->
        <!-- <link href= "https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css"/> -->
        <link rel= "https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css"/>
        <!--Boots-->   
        <link rel="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <link href="css/stylesC.css" rel="stylesheet" />
        <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
    
    <style>
        thead{
            /* background-color:#212529;    */
            color:#212529;
            text-align: center;
            font-size: .80rem;
        }
        tbody{
            text-align: center;
            font-size: .67rem;
        }
    </style>
    </head>

    <body class="sb-nav-fixed">
    <?php
     include "Menu.php";
    ?>
             <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Comercial</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
                            <li class="breadcrumb-item active">Comercial</li>
                        </ol>
                     
                        
                            <!--empieza tabla-->
                            <div class="container mb-4">
                                <div class="card-header">
                                <br>
                                    <i class="fas fa-table me-1"></i>
                                   INFORMACIÓN COMERCIAL
                                    <br>
                                    <div class="row">
                                    <div class="col-lg-12 col-sm-12"><br>       
                                    <table id="tablaReport" class="table table-hover " cellspacing="0" width="100%">
                                    <thead>         
                                        
                                        <th>SERIE</th>
                                        <th>FOLIO</th>
                                        <th>AGENTE</th>
                                        <th>CANTIDAD</th>
                                    <!-- <th>EMPRESA</th>-->
                                        <th>CÓDIGO DE PRODUCTO</th>
                                        <th>DESCRIPCION DEL PRODUCTO</th>
                                        <th>ALMACEN DE PRODUCTO</th>
                                        <th>FECHA</th>
                                        <th>PRECIO PRODUCTO</th>
                                        <th>MONTO TOTAL</th>
                                                
                                    </thead>
                                    <tbody> 
                                    <?php foreach ($respuesta as $mostrar): ?>
                                    <tr>
                                    <td><?php echo $mostrar->SERIE ?></td>
                                    <td><?php echo $mostrar->FOLIO ?></td>
                                    <td><?php echo $mostrar->AGENTE ?></td>
                                    <td><?php echo $mostrar->CANTIDAD ?></td>
                                    <td><?php echo $mostrar->CODIGO ?></td>
                                    <td><?php echo $mostrar->DESCRIPCION ?></td>
                                    <td><?php echo $mostrar->ALMACEN ?></td>
                                    <td><?php echo $mostrar->FECHA ?></td>
                                    <td><?php echo $mostrar->PRECIOP ?></td>
                                    <td><?php echo $mostrar->MONTOT ?></td>
                                    </tr>
                                    <?php endforeach; ?>
                                    </tbody>

                                    </table>                        
                                
                                    </div>  
                                    </div>  
                                </div>  
                            </div><!--cierrra tabla-->
                    </div>
                </main>
                <?php
                include "footer.php";
                ?>
           </div>             
        <!--JQ--> 
        <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
        <script src= https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js></script>
        <script src="https://code.jquery.com/jquery-1.11.2.min.js" type="text/javascript"> </script> 
        <script src="js/scripts.js"></script>
        <!--Boots-->    
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <!--DT--> 
        <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>    
        <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap5.min.js"></script>       
        <!--DB--> 
         <script>
            $(document).ready(function () {
            $('#tablaReport').DataTable({
                responsive: true,
                language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
            }
            });
            });
         </script>
    </body>
    
</html>
