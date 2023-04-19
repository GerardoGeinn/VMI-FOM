<!-- Modal -->
<div class="modal fade" id="editaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Orden</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <input type="text" id="idDetalle" name="idDetalle"  value="">
                <div class="row">
                    <div class="col-6">
                        <label for="Pedido" style="margin: 10px 0px 0px 0px">Numero Pedido</label>
                        <select class="form-select" name="Pedido" id="Pedido" style="width: 100%;" required>
                            <option value="">Selecciona Pedido</option>

                        </select>
                    </div>
                    <div class="col-6">
                        <label for="Orden" style="margin: 10px 0px 0px 0px">Codigo Orden de Compra</label>
                        <input type="text" style="height: 29px;"id="orden" name="orden">
                    </div>


                </div>

                <br> <br>
                <div class="row">
                    <div class="col-sm-12">
                        <input type="file" class="form-control" id="archivo" name="archivo">
                        <input type="text" id="urlEstado" name="urlEstado" hidden>
                    </div>
                </div>
                <br> <br>



            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Guardar Cambios</button>
            </div>
        </div>
    </div>
</div>