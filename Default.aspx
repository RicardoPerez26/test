<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="test.Default" %>

<!DOCTYPE html>

<html>
<head>
    <title>Website is under construction! Somee International webhosting.</title>
    <!-- #include virtual ="scripts.aspx" -->
   
</head>
<body>
<h3>Lista de empleados</h3>
<button type="button" id="btn-nuevo" class="btn btn-primary" data-toggle="modal" data-target="#ModalNuevo">
  Nuevo
</button>
<table id="table-imprimir" class="table table-bordered table-radius">
                  <thead>
                    <tr>
                      <th class="col-subestudios text-center">Nombre Completo</th>
                      <th class="col-fecha text-center">Fecha Nacimiento</th>
                      <th class="col-hora text-center">Departamento</th>
                      <th class="col-preparacion text-center">Sueldo</th>
                      <th colspan="2" class="col-monto text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                                         
                  </tbody>

                </table>


<!-- Modal -->
<div class="modal fade" id="ModalEliminar" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitleEliminar">Modal Eliminar</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ¿Estas seguro de que deseas eliminar el empleado?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button id="btn-eliminacion" type="button" class="btn btn-primary">Eliminar</button>
      </div>
    </div>
  </div>
</div>
    <div class="modal fade" id="ModalModificar" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitleModificar">Modal Modificar</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div style="display:none" class="col-md-12"><label class="">Id:</label> <input id="Clave_emp" type="text"/></div>
        <div class="col-md-12"><label class="">Nombre:</label> <input id="nombreModificar" type="text"/><span style="display:none" class="error-nombre"></span></div>
          <div class="col-md-12"><label class="">Apellido Paterno:</label> <input id="paternoModificar" type="text"/><span style="display:none" class="error-paterno"></span></div>
          <div class="col-md-12"><label class="">Apellido Materno:</label> <input id="maternoModificar" type="text"/><span style="display:none" class="error-materno"></span></div>
          <div class="col-md-12"><label class="">Departamento:</label> <select id="departamentoModificar"><option>Seleccióne un departamento:</option></select><span style="display:none" class="error-departamento"></span></div>
          <div class="col-md-12"><label class="">Sueldo:</label> <input id="sueldoModificar" type="text"/><span style="display:none" class="error-sueldo"></span></div>
          <div class="col-md-12"><label class="">Fecha Nacimiento:</label> <input id="fecha-nacimientoModificar" class="fecha-nacimiento" type="text"/><span style="display:none" class="error-fecha"></span></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button id="btn-modificacion" type="button" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</div>


       <div class="modal fade" id="ModalNuevo" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitleNuevo">Modal Nuevo</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="col-md-12"><label class="">Nombre:</label> <input id="nombre" type="text"/><span style="display:none" id="error-nombre"></span></div>
          <div class="col-md-12"><label class="">Apellido Paterno:</label> <input id="paterno" type="text"/><span style="display:none" id="error-paterno"></span></div>
          <div class="col-md-12"><label class="">Apellido Materno:</label> <input id="materno" type="text"/><span style="display:none" id="error-materno"></span></div>
          <div class="col-md-12"><label class="">Departamento:</label> <select id="departamentoNuevo"><option value="0">Seleccióne un departamento:</option></select><span style="display:none" id="error-departamento"></span></div>
          <div class="col-md-12"><label class="">Sueldo:</label> <input id="sueldo" type="number"/><span style="display:none" id="error-sueldo"></span></div>
          <div class="col-md-12"><label class="">Fecha Nacimiento:</label> <input id="fecha-nacimiento" class="fecha-nacimiento" type="text"/><span style="display:none" id="error-fecha"></span></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button id="btn-guardar" type="button" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</div>
</body>
</html>
