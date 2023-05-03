<?php
session_start();
$usuario = $_SESSION['usuario'];

if (!isset($usuario)) {
    header("Location:login.html");
}


include "Procesos/login/conexioncom.php";
$con = new conexionFom();
$conexion = $con->conectarFom();

include "Procesos/login/conexion.php";
$conVMI = new Conexion();
$conexionVMI = $conVMI->conectar();


$sql = "SELECT TOP 50 CONVERT(INT,CFOLIO) AS CFOLIO
FROM admDocumentos
WHERE CCANCELADO = 0 AND CIDDOCUMENTODE = 2
ORDER BY CSERIEDOCUMENTO";
$res = $conexion->query($sql);

$sqlOrdenes = "SELECT id_orden,folio,orden_compra,fecha_creacion FROM vmi_ordenes";
$resOrdenes = $conexionVMI->query($sqlOrdenes);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Tables - SB Admin</title>
    <link rel="shortcut icon" href="public/img/logos-FOC-blanco-V.png">
    <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
    <link href="css/styles.css" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
</head>

<body class="sb-nav-fixed">
    <?php
    include "Menu.php";
    ?>
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Tables</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
                    <li class="breadcrumb-item active">Tables</li>
                </ol>
                <div class="card mb-4">
                    <div class="card-body">
                        DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the
                        <a target="_blank" href="https://datatables.net/">official DataTables documentation</a>
                        .
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table me-1"></i>
                        DataTable Examples
                    </div>
                </div>

                <div>
                    <button type="button" class="btn btn-primary" id="btn-modal" data-bs-toggle="modal" data-bs-target="#modalOrden">Agregar</button>
                </div>

                <!--                       -->
                <!--   <form action="guardar_orden.php" method="POST" enctype="multipart/form-data">-->
                <!-- The Modal -->
                <div class="modal" id="modalOrden">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">

                            <!-- Modal Header -->
                            <div class="modal-header bg-black text-white">
                                <h4 class="modal-title">Agregar Orden de Compra</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <!-- Modal body -->
                            <div class="modal-body">
                                <form action="guardar_orden.php" method="POST" enctype="multipart/form-data">
                                    <input type="text" id="id" name="id" hidden>
                                    <div class="row">
                                        <div class="col-6">
                                            <label for="Pedido" style="margin: 10px 0px 0px 0px">Numero Pedido</label>
                                            <select class="form-select" name="Pedido" id="Pedido" style="width: 100%;" required>
                                                <option value="">Selecciona Pedido</option>
                                                <?php foreach ($res as $opciones) { ?>
                                                    <option value="<?php echo $opciones['CFOLIO'] ?>"><?php echo $opciones['CFOLIO'] ?> </option>
                                                <?php } ?>
                                            </select>
                                        </div>
                                        <div class="col-6">
                                            <label for="Orden" style="margin: 10px 0px 0px 0px">Codigo Orden de Compra</label>
                                            <input type="text" style="height: 29px;" class="form-control" id="Orden" name="Orden">
                                        </div>


                                    </div>

                                    <br> <br>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <input type="file" class="form-control" id="archivo" name="archivo">
                                            <input type="text" id="urlEstado" name="urlEstado" hidden>
                                        </div>
                                    </div>
                                    <br> <br>
                            </div>
                            <!-- Modal footer -->
                            <div class="modal-footer">
                                <button type="button" id="btnsalir" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary"> Guardar </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>




                <div class="card-body">
                    <table id="datatablesSimple" class="table align-middle">
                        <thead>
                            <tr>
                                <th>Agregar</th>
                                <th>Id Orden</th>
                                <th>Folio</th>
                                <th>Orden de Compra</th>
                                <th>Fecha Creacion</th>
                                <th>Accion</th>

                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Id Orden</th>
                                <th>Folio</th>
                                <th>Orden de Compra</th>
                                <th>Fecha Creacion</th>
                                <th>Accion</th>
                            </tr>
                        </tfoot>
                        <tbody>

                            <?php foreach ($resOrdenes as $opciones_orden) { ?>
                                <tr>
                                    <td>
                                        <a href="#" class="btn btn-sm btn-outline-info" data-toggle="modal" data-target="#agregarModal" onclick="DatoIdOrden(<?= $opciones_orden['id_orden']; ?>)">
                                        <i class="fa-solid fa-plus"></i>
                                        </a>
                                    </td>
                                    <td><?= $opciones_orden['id_orden']; ?> </td>
                                    <td><?= $opciones_orden['folio']; ?> </td>
                                    <td><?= $opciones_orden['orden_compra']; ?> </td>
                                    <td><?= $opciones_orden['fecha_creacion']; ?> </td>
                                    <td>
                                        <a href="#" class="btn btn-sm btn-warning" data-toggle="modal" data-target="#editaModal" onclick="DatoIdOrdenEditar(<?= $opciones_orden['id_orden']; ?>,'<?= $opciones_orden['orden_compra']; ?>')"><i class="fa-solid fa-pen-to-square" ></i> Editar</a>
                                        <a href="#" class="btn btn-sm btn-danger"  data-toggle="modal" data-target="#eliminaModal" onclick="DatoIdOrdenEliminar(<?= $opciones_orden['id_orden']; ?>)"><i class="fa-solid fa-trash"></i> Eliminar</a>
                                    </td>


                                </tr>
                            <?php } ?>


                        </tbody>
                    </table>
                </div>
            </div>
    </div>
    </main>



    </div>
    </div>

    <?php
    include "footer.php";
    include "editaModal.php";
    include "eliminaModal.php";
    include "agregarModal.php";
    ?>

<script src="try.js"></script>



</body>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="js/scripts.js"></script>
<script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
<script src="js/datatables-simple-demo.js"></script>

<script src="public/jquery/jquery-3.6.0.js"></script>
<script src="public/bootstrap/js/popper.min.js"></script>
<script src="public/bootstrap/js/bootstrap.min.js"></script>
<script src="public/bootstrap/js/bootstrap.bundle.min2.js"></script>
<!--DataTable-->
<script src="public/tabla/js/bootstrap.bundle.min.js"></script>
<!--<script src="../public/datatable/js/jquery.dataTables.min.js"></script>-->
<script src="public/tabla/js/jquery.dataTables.min.js"></script>
<!--<script src="../public/datatable/js/dataTables.bootstrap4.min.js"></script>-->
<script src="public/tabla/js/dataTables.bootstrap5.min.js"></script>
<!--<script src="../public/datatable/js/dataTables.responsive.min.js"></script>-->
<script src="public/tabla/js/dataTables.responsive.min.js"></script>
<!--<script src="../public/datatable/js/responsive.bootstrap4.min.js"></script>-->
<script src="public/tabla/js/responsive.bootstrap5.min.js"></script>
<!--DataTable Buttons-->
<!-- <script src="../public/tabla/buttons/dataTables.buttons.min.js"></script>-->
<!-- <script src="../public/tabla/buttons/jszip.min.js"></script>-->
<!--<script src="../public/tabla/buttons/pdfmake.min.js"></script>-->
<!--<script src="../public/tabla/buttons/vfs_fonts.js"></script>-->
<script src="public/tabla/buttons/buttons.html5.min.js"></script>
<!--SweetAlert-->
<script src="public/sweetalert2/sweetalert2@11.js"></script>
<script src="public/select2/select2.min.js"></script>
<!--Graficas-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.0/Chart.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.0/Chart.bundle.min.js"></script>

</html>