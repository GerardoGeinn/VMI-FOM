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
$pedido = $_POST['Pedido'];
$orden =  $_POST['Orden'];

//Variables para determinar tamaño de imagen y formato
$directorio = "uploads/";
$archivo = $directorio . basename($_FILES["archivo"]["name"]);
$tipoArchivo = strtolower(pathinfo($archivo, PATHINFO_EXTENSION));
$limite_kb = 2000;
$url = "";

if (isset($_FILES['archivo']) && $_FILES['archivo']['name'] != "") {
    if ($tipoArchivo == "pdf") {
        $nuevoNombre = sprintf("%s_%d.%s", uniqid(), $usuario, $tipoArchivo);
        $guardado = $_FILES['archivo']['tmp_name'];

        //Validar que exista la ruta
        if (!file_exists('uploads/')) {
            mkdir('uploads/', 0777, true);
            if (file_exists('uploads/')) {
                if (move_uploaded_file($guardado, 'uploads/' . $nuevoNombre)) {
                    echo "Archivo guardado con exito";
                    $url = "uploads/" . $nuevoNombre;
                } else {
                    echo "Error al guardar el archivo";
                }
            }
        } else {
            if (move_uploaded_file($guardado, 'uploads/' . $nuevoNombre)) {
                echo "Archivo guardado con exito";
                $url = "uploads/" . $nuevoNombre;
            } else {
                echo "Error al guardar el archivo";
            }
        }
    } else {
        echo "Archivo no permitido o exede el tamaño de 200kb";
    }
} else {
    echo "MAL PROMADOR";
}

$consulta_pedido = "INSERT INTO vmi_ordenes (folio, orden_compra,url_orden_pdf) VALUES (:folio, :orden_compra, :url_orden_pdf)";
$stmt = $conexion->prepare($consulta_pedido);
$stmt->execute(['folio' => $pedido, 'orden_compra' => $orden, 'url_orden_pdf' => $url]);



header('Location: colaborador.php');
