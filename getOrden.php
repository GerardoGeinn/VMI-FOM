<?php
session_start();
$usuario = $_SESSION['usuario'];

if (!isset($usuario)) {
    header("Location:login.html");
}

include "Procesos/login/conexion.php";
$conVMI = new Conexion();
$conexionVMI = $conVMI->conectar();

$id = $_POST['id'];



$sqlOrdenes = "SELECT top 1 id_orden,folio,orden_compra FROM vmi_ordenes where id_orden = $id";
$resOrdenes = $conexionVMI->query($sqlOrdenes);


$res = [];
$res = $resOrdenes ->fetchAll(PDO::FETCH_OBJ);

echo json_encode ($res, JSON_UNESCAPED_UNICODE);


