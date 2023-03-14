$(document).ready(function(){
    //Funcion para mostra y ocultar password de login
    const inconEye = document.querySelector(".eye");

    inconEye.addEventListener('click', function(){
        const icon = document.getElementById("eye");
        var tipo = document.getElementById("password");

        //Validar si esta oculto o no
        if(tipo.type == 'password'){
            tipo.type = 'text';
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }else{
            tipo.type = 'password';
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        }
    });
});    
//Redirige a LoginUsuarios.php para validar si existe el usuario o no y retorna una respuesta 
function loginUsuario(){
    $.ajax({
        type:"POST",
        data:$('#frmLogin').serialize(),
        url:"procesos/usuarios/login/loginUsuario.php",
        success:function(respuesta){
            respuesta = respuesta.trim();
            if(respuesta == 2){
                window.location.href = "vistas/proveedores.php";
            }else if(respuesta == 1){              
                Swal.fire("Error, validar usuario y contraseña");
            }else{
                Swal.fire("Error, validar usuario y contraseña");
            }  
        }
    });
    return false;
}
//Funcion para cambiar de password
/*function loginPassword(){
    pass1= document.getElementById('password');
    pass2 = document.getElementById('password2');
    if (pass1.value != pass2.value) {
        Swal.fire(":(","Error! las contraseñas no coinciden", "error");
    }else {
        $.ajax({
            type:"POST",
            data:$('#frmPassword').serialize(),
            url:"procesos/usuarios/login/password.php",
            success:function(respuesta){
                respuesta = respuesta.trim();
                if(respuesta == 1){
                    Swal.fire(":D","Password generado exitosamente!","success"); 
                    window.location.href = "proveedores.php";
                }else {
                    Swal.fire(":(","Error! " + respuesta, "error");
                }
            }
        });
    }
    return false; 
} */
