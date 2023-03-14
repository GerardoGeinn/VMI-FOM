function showPassword() {
    var password = document.getElementById("inputPassword");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }    

function loginUsuario(){
      $.ajax({
        type: "POST",
        url: "Procesos/login/log.php",
        data:$('#frmLogin').serialize(),
        success: function(respuesta) {
          respuesta = respuesta.trim();
          if(respuesta == 2){
            window.location.href = "index.php";
        }else if(respuesta == 1){
            Swal.fire("Error!, revisar usuario o contraseña");
        }else{
          Swal.fire("El ususario no existe, contactar al administrador"); 
        }
      }
    });
  
      return false;
    }


    function loginPassword(){   
        $.ajax({
                type:"POST",
                data:$('#frmPassword').serialize(),
                url:"Procesos/login/logpass.php",
                success:function($stmt){
                  $stmt = $stmt.trim();
                    
                    if($stmt == 1){
                        Swal.fire("Se actualizo la contraseña correctamente.","success"); 
                        window.location.href = "login.html";
                    }else if($stmt == 2)
                     {
                        Swal.fire("Las contraseñas no coinciden"); 
                        
                    }else if($stmt != 2){
                        Swal.fire("Usuario incorrecto"); 
                    }else{
                      Swal.fire("El ususario no existe, contactar al administrador"); 
                    }
   
            }
            
            });
        
        return false;   
    }

    function display_username() {
      // usuario loggeado
      if (isset($_SESSION['usuario'])) {
          // mostrar el nombre
         $_SESSION['usuario'];
      } 
  }