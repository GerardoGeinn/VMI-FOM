<?php

    //usuario y password colocado
    $usuario = $_POST['inputUsuario'];
    $pass = $_POST['inputPassword'];

   

    include "usuarios.php";

    //clase y metodo para validar existencia de usuario
    $USUARIO = new Usuarios();
    echo $USUARIO->loginUsuario($usuario, $pass);

        //iniciar sission
        session_start();
        $_SESSION["usuario"] = htmlentities($_POST['inputUsuario']);
        $_SESSION["pass"] = htmlentities($_POST['inputPassword']);
