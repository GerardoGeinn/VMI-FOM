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
$idOrden = $_POST['ideliminar'];



var_dump($idOrden);

$consulta_mov = "DELETE FROM vmi_ordenes WHERE id_orden = :id_orden" ;
$stmt = $conexion-> prepare($consulta_mov);
$stmt-> execute(['id_orden' => $idOrden]);



header('Location: colaborador.php');

?>


<script src="try.js"></script>
