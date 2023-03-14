<?php
   class ConexionFom{
       
        public function conectarFom(){
         //Variables para conexion a MYSQL 
         $host = "172.16.100.14\\COMERCIAL2019";
         $user = "sa";
         $password = "Chesse2389";
         $db = "adFIBRAS_OPTICAS_MEXICO2019";
          try{
            $conn = new PDO("sqlsrv:server=$host;database=$db",$user,$password);

            return $conn;
            //echo "Conexion exitosa en elservidor $host";

          } catch(Exception $e){
                echo "Ocurrio un error en la conexion. " . $e->getMessage();
          }
         
        }
   }
?>