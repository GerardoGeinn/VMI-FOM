
<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>

</head>

<body>
    

    <div class="modal fade" id="agregarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header bg-black text-white">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar Movimientos</h5>
                </div>
                <div class="modal-body">
            
                        <form id="Orden" action="guardar_mov.php" method="POST">
                
                            <input type="hidden" id="idOrden" name="idOrden" value="">

                            <input type="text" id="movi" name="movi" hidden>
                            <div class="row">
                                <div class="col-6">
                                    <label for="codigosa" style="margin: 10px 0px 0px 0px">Código SAP</label>
                                    <input type="text" style="height: 29px;" class="form-control" id="codigosa" name="codigosa" required>
                                </div>
                                <div class="col-6">
                                    <label for="descripcionp" style="margin: 10px 0px 0px 0px">Descripción de producto </label>
                                    <input type="text" style="height: 29px;" class="form-control" id="descripcionp" name="descripcionp" required>
                                </div>
                                <div class="col-6">
                                    <div  id="date-picker-example" class="md-form md-outline input-with-post-icon datepicker">
                                    <label for="fecha" style="margin: 10px 0px 0px 0px">Fecha orden de compra</label>            
                                    <i class="fas fa-calendar input-prefix"></i>                              
                                    <input type="text" style="height: 29px;" class="form-control" id="fecha" name="fecha" required>                               
                                    </div>
                                </div>
                                <div class="col-6">
                                    <label for="fabricacion" style="margin: 10px 0px 0px 0px">Unidades en Fabricación</label>
                                    <input type="text" style="height: 29px;" class="form-control" id="fabricacion" name="fabricacion" required>
                                </div>
                                <div class="col-6">
                                    <label for="transito" style="margin: 10px 0px 0px 0px">Unidades en Tránsito</label>
                                    <input type="text" style="height: 29px;" class="form-control" id="transito" name="transito" required>
                                </div>
                                <div class="col-6">
                                    <label for="stock" style="margin: 10px 0px 0px 0px">Unidades en Stock</label>
                                    <input type="text" style="height: 29px;" class="form-control" id="stock" name="stock" required>
                                </div>
                                <div class="col-6">
                                    <div  id="date-picker-example" class="md-form md-outline input-with-post-icon datepicker">
                                    <label for="fechafab" style="margin: 10px 0px 0px 0px">Fecha en Fabricación</label>            
                                    <i class="fas fa-calendar input-prefix"></i>                              
                                    <input type="text" style="height: 29px;" class="form-control" id="fechafab" name="fechafab" required>                               
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div  id="date-picker-example" class="md-form md-outline input-with-post-icon datepicker">
                                    <label for="fechatr" style="margin: 10px 0px 0px 0px">Fecha en Tránsito</label>            
                                    <i class="fas fa-calendar input-prefix"></i>                              
                                    <input type="text" style="height: 29px;" class="form-control" id="fechatr" name="fechatr" required>                               
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div  id="date-picker-example" class="md-form md-outline input-with-post-icon datepicker">
                                    <label for="fechast" style="margin: 10px 0px 0px 0px">Fecha en Stock</label>            
                                    <i class="fas fa-calendar input-prefix"></i>                              
                                    <input type="text" style="height: 29px;" class="form-control" id="fechast" name="fechast" required>                               
                                    </div>
                                </div>
                            </div>

    
                            <!-- Modal footer -->
                            <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            <button type="submit" class="btn btn-primary">Guardar</button>     
                            </div> 
                        </form>


                            <script src="try.js"></script>
                            <script>
                            // Data Picker Initialization
                            $('#fecha, #fechatr, #fechafab, #fechast').datepicker({
                            language: 'es',
                            inline: true,
                            format: 'dd/mm/yyyy',
                            todayHighlight: true,
                            clearBtn: true,
                            });
                            </script>
                        
                </div>
            </div>
        </div>                
    </div>
</body>
</html>