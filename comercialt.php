
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title> Comercial-VMI</title>
        <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
        <!--Boots-->   
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <link href="css/styles.css" rel="stylesheet" />
        <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
    </head>
    <body class="sb-nav-fixed">
    <?php
     include "Menu.php";
    ?>
             <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Comercial</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
                            <li class="breadcrumb-item active">Comercial</li>
                        </ol>
                        <div class="card mb-4"></div>
                        
                            <!--empieza tabla-->
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    Información Comercial
                                    <hr>
                                  <!-- <div id="tabla"> -->
                                  <?php
                                    include "tablacom.php";
                                    ?>
                                 </div>  
                            </div><!--cierrra tabla-->
                    </div>
                </main>
                <?php
                include "footer.php";
                ?>
           </div>             
        <!--JQ--> 
        <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
        <script src= https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js></script>
        <script src="https://code.jquery.com/jquery-1.11.2.min.js" type="text/javascript"> </script> 
        <script src="js/scripts.js"></script>
        <!--Boots-->    
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <!--DT--> 
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
        <script src= https://cdn.datatables.net/1.13.3/js/jquery.dataTables.min.js></script>
        <!--DB--> 
        <!-- <script src="tcomercial.js"></script> -->
    </body>
    
</html>
