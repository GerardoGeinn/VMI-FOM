<!-- Modal -->
<div class="modal fade" id="eliminaModal" tabindex="-1" role="dialog" aria-labelledby="eliminaModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="eliminaModalLabel">Aviso</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ¿Desea eliminar el registro?
            </div>

            <div class="modal-footer">
                <form action="eliminarPedido.php" method="POST">
                    <input  type="hidden" name = "ideliminar" id = "ideliminar">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="submit" name="deletepedido" id="deletepedido" class="btn btn-primary">Eliminar</button>
            </div>
            </form>
        </div>
    </div>
</div>