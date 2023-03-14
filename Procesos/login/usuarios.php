<?php
    include "conexion.php";

class Usuarios extends Conexion{

    public function __construct(){
        //Traer conexion
        $this->conexion = new Conexion();
        $this->conexion = $this->conexion->conectar();
    }

    //Funcion para validar existencia de usuario
    public function loginUsuario($usuario,$pass){

        $conexion = Conexion::conectar();
        $sql = "SELECT usuario,contraseña, perfil FROM dbo.vmi_usuarios WHERE usuario = '$usuario' AND contraseña = '$pass' AND estatus = 'A'";
        $stmt = $conexion->query($sql);
        $respuesta = $stmt->fetchAll(PDO::FETCH_OBJ);

        foreach($respuesta as $mostrar){
            $usuario = $mostrar->usuario;
            $contraseña =$mostrar->contraseña;
            $perfil =$mostrar->perfil;
        }

        $_SESSION['usuario']['usuario'] = $usuario;
        $_SESSION['usuario']['contraseña'] = $contraseña;
        $_SESSION['usuario']['perfil'] = $perfil;

        
         
       if(isset($_SESSION['usuario']['usuario'])  &&  isset($_SESSION['usuario']['contraseña'] )){
            return 2;
       }else{
            return 1;
       }
    }

 //Cambio de contraseña
public function loginPassword($currentUser,$password,$password2){

    if (isset($_POST['currentUser']) && isset($_POST['password']) && isset($_POST['password2'])) {
      $currentUser = $_POST['currentUser'];
      $password = $_POST['password'];
      $password2 = $_POST['password2'];
    
      // Conectar al SQL Server 
      $conexion = Conexion::conectar();
    
        if ($conexion) {
        //Si hay con hace la query
        $sql = "SELECT * FROM dbo.vmi_usuarios WHERE usuario = '$currentUser' AND estatus='A'";
        $stmt= $conexion->query($sql);
        $respuesta = $stmt->fetchAll(PDO::FETCH_OBJ);
        
        if ($respuesta) { 
          // Verifica que los 2 pass sean iguales
          if ($password == $password2) {
            // Cambia pass
            $sql = "UPDATE dbo.vmi_usuarios SET contraseña = '$password' WHERE usuario = '$currentUser'";
            $stmt= $conexion->query($sql);
     
       
            if ($stmt) {
              // si hay uppdate
              return 1;
            } 
        }
        else {
            return 2;
        }
    }
  }
    } else {
      
      echo "Fallo conexion.";
    }
  }
 }

 ?>