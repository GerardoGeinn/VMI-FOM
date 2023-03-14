<?php

$resp="";

    $resp = "SELECT 
    DOC.CSERIEDOCUMENTO AS SERIE, DOC.CFOLIO AS FOLIO, ISNULL(AG.CNOMBREAGENTE,'')AS AGENTE, DOC.CTOTALUNIDADES AS CANTIDAD, 
    PRO.CCODIGOPRODUCTO AS CODIGO,PRO.CNOMBREPRODUCTO AS DESCRIPCION, ALM.CNOMBREALMACEN AS ALMACEN, MOV.CPRECIO AS PRECIOP, 
    CONVERT(VARCHAR,DOC.CFECHA,103) AS FECHA, 
    DOC.CTOTAL AS MONTOT
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
  <div class="table-responsive-xxl">
    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <table class="table table-sm table-striped table-hover table-bordered" id="tablaReport">
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
        <tbody > 
            <?php
            foreach($respuesta as $mostrar):
            ?>

            <tr>
                <td><?php echo $mostrar->SERIE?></td>
                <td><?php echo $mostrar->FOLIO?></td>
                <td><?php echo $mostrar->AGENTE?></td>
                <td><?php echo $mostrar->CANTIDAD?></td>
                <td><?php echo $mostrar->CODIGO?></td>
                <td><?php echo $mostrar->DESCRIPCION?></td>
                <td><?php echo $mostrar->ALMACEN?></td>
                <td><?php echo $mostrar->FECHA?></td>
                <td><?php echo $mostrar->PRECIOP?></td>
                <td><?php echo $mostrar->MONTOT?></td>
            </tr>
            <?php 
            endforeach;
            ?>
         </tbody>
        </table>
    </div>
  </div>        
<!-- <script src="tcomercial.js"></script> -->
