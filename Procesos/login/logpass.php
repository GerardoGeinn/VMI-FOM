<?php
    //iniciar sission
    session_start();
    //usuario y password colocado
    $currentUser = $_POST['currentUser'];
    $password = $_POST['password'];
    $password2 = $_POST['password2'];
    include "usuarios.php";

    //clase y metodo para validar existencia de usuario
    $USUARIO = new Usuarios();
    echo $USUARIO->loginPassword($currentUser,$password,$password2);

?>