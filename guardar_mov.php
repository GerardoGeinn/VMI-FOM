<?php
session_start();
$usuario = $_SESSION['usuario'];

if (!isset($usuario)) {
    header("Location:login.html");
}

include "Procesos/login/conexion.php";
$con = new Conexion();
$conexion = $con->conectar();

//Variables obtenidas del FORM
$codigo = $_POST['codigosa'];
$descripcion =  $_POST['descripcionp'];
$fecha = $_POST['fecha'];
$ufabricacion =  $_POST['fabricacion'];
$utransito = $_POST['transito'];
$ustock =  $_POST['stock'];
$ffabricacion = $_POST['fechafab'];
$ftransito =  $_POST['fechatr'];
$fstock = $_POST['fechast'];
$idOrden = $_POST['idOrden'];
$CodigoComercial = $_POST['CodigoComercial'];

var_dump($_POST);

$consulta_mov = "INSERT INTO vmi_movimientos (id_orden, codigo, descripcion, fecha_oc, unidades_fabricacion, unidades_transito, unidades_stock, fecha_fabricacion, fecha_transito, fecha_stock,
CodigoComercial)
VALUES (:id_orden, :codigo, :descripcion, :fecha_oc, :unidades_fabricacion, :unidades_transito, :unidades_stock, :fecha_fabricacion, :fecha_transito, :fecha_stock,
:CodigoComercial)";
$stmt = $conexion-> prepare($consulta_mov);
$stmt-> execute(['id_orden' => $idOrden, 'codigo' => $codigo,'descripcion' => $descripcion, 'fecha_oc' =>$fecha, 'unidades_fabricacion' =>$ufabricacion, 'unidades_transito' =>$utransito, 'unidades_stock' =>$ustock, 'fecha_fabricacion' =>$ffabricacion, 'fecha_transito' =>$ftransito, 'fecha_stock' =>$fstock,
'CodigoComercial'=>$CodigoComercial]);



header('Location: colaborador.php');

?>


<script src="try.js"></script>
