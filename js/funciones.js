var app = { //url de conexion local

    //urltest: 'http://localhost:59762/Beneficiaria',
    urltest: 'http://mantixd-001-site1.htempurl.com/Beneficiaria',
    urlAgenda: "",
    idagenda: 0,
    lat: 0,
    lng: 0,
    EstatusConfirmarDatos: false,
    
};

$(document).ready(function () {

    $(function () {
        $(".fecha-nacimiento").datepicker();
    });

    $TodosUsuarios = (function () {
        $.ajax({
            type: "GET",
            url: app.urltest + "/MostrarTodosUsuarios",
            crossDomain: true,
            dataType: "json",
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    var htmlAgregar = "";
                    htmlAgregar += "<tr><td style='display:none'>" + response[i].Clave_Emp + "</td><td>" + response[i].Nombre + " " + response[i].ApPaterno + " " + response[i].ApMaterno + "</td><td>" + response[i].FecNac + "</td><td>" + response[i].DepartamentoVal + "</td><td>$" + response[i].Sueldo + "</td><td><a href='#' data-id=" + response[i].Clave_Emp + " class='btn-modificar btn btn-primary' data-toggle='modal' data-target='#ModalModificar'>Modificar</a></td><td><button type='button'  data-id=" + response[i].Clave_Emp + " class='btn-eliminacion btn btn-primary' data-toggle='modal' data-target='#ModalEliminar'>Eliminar</button></td></tr>"
                    $("#table-imprimir tbody").append(htmlAgregar);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                debugger;
            }
        });
    });
    $TodosUsuarios();
    $("#btn-guardar").click(function (event) {
        if (!Validaciones()) {
            $('form .has-error select, form .has-error input, form .has-error textarea').first().focus();
            return false;
            event.preventDefault(event);
            event.stopPropagation();
        } else {
            var UsuarioRegistro = {};
            UsuarioRegistro.Nombre = $("#nombre").val();
            UsuarioRegistro.ApPaterno = $("#paterno").val();
            UsuarioRegistro.ApMaterno = $("#materno").val();
            UsuarioRegistro.FecNac = $("#fecha-nacimiento").val();
            UsuarioRegistro.Departamento = parseInt($("#departamentoNuevo option:selected").val());
            UsuarioRegistro.Sueldo = parseInt($("#sueldo").val());

            $.ajax({
                type: "POST",
                url: app.urltest + "/GuardarEmpleado",
                crossDomain: true,
                dataType: "json",
                async: false,
                data: UsuarioRegistro,
                success: function (response) {
                    $("#table-imprimir tbody tr").remove();
                    $TodosUsuarios();
                    $(function () {
                        $('#ModalNuevo').modal('toggle');
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    debugger;
                }
            });
        }
    });
    $("#btn-modificacion").click(function (event) {
        if (!ValidacionesModificacion()) {
            $('form .has-error select, form .has-error input, form .has-error textarea').first().focus();
            return false;
            event.preventDefault(event);
            event.stopPropagation();
        } else {
            var UsuarioRegistro = {};
            UsuarioRegistro.Clave_Emp = $("#Clave_emp").val();
            UsuarioRegistro.Nombre = $("#nombreModificar").val();
            UsuarioRegistro.ApPaterno = $("#paternoModificar").val();
            UsuarioRegistro.ApMaterno = $("#maternoModificar").val();
            UsuarioRegistro.FecNac = $("#fecha-nacimientoModificar").val();
            UsuarioRegistro.Departamento = parseInt($("#departamentoModificar option:selected").val());
            UsuarioRegistro.Sueldo = parseInt($("#sueldoModificar").val());

            $.ajax({
                type: "POST",
                url: app.urltest + "/ModificarEmpleado",
                crossDomain: true,
                dataType: "json",
                async: false,
                data: UsuarioRegistro,
                success: function (response) {
                    $("#table-imprimir tbody tr").remove();
                    $TodosUsuarios();
                    $(function () {
                        $('#ModalModificar').modal('toggle');
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    debugger;
                }
            });
        }
    });
    $(document).on("click", ".btn-eliminacion", function (event) {
        $("#Clave_emp").val($(this).attr("data-id"));
        });
    $(document).on("click", "#btn-eliminacion", function (event) {
        var UsuarioRegistro = {};
        UsuarioRegistro.Clave_Emp = parseInt($("#Clave_emp").val());

        $.ajax({
            type: "POST",
            url: app.urltest + "/EliminarEmpleado",
            crossDomain: true,
            dataType: "json",
            async: false,
            data: UsuarioRegistro,
            success: function (response) {
                $("#table-imprimir tbody tr").remove();
                $TodosUsuarios();
                $(function () {
                    $('#ModalEliminar').modal('toggle');
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                debugger;
            }
        });
    });
    $("#btn-nuevo").click(function (event) {
        $("#nombre").val("");
        $("#paterno").val("");
        $("#materno").val("");
        $("#fecha-nacimiento").val("");
        $("#departamentoNuevo").empty();
        $("#departamentoNuevo").append("<option value='0'>Seleccione un departamento:</option>");
        $("#sueldo").val("");

        $.ajax({
            type: "GET",
            url: app.urltest + "/MostrarDepartamentos",
            crossDomain: true,
            dataType: "json",
            success: function (response) {

                for (var i = 0; i < response.length; i++) {
                    $("#departamentoNuevo").append("<option value=" + response[i].Departamento + "> " + response[i].Descripcion + " </option>");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                debugger;
            }
        });
    });
    $(document).on("click", ".btn-modificar", function (event) {
        var UsuarioRegistro = {};
        UsuarioRegistro.Clave_Emp = parseInt($(this).attr('data-id'));
        
        $.ajax({
            type: "POST",
            url: app.urltest + "/MostrarDatosUsuario",
            crossDomain: true,
            dataType: "json",
            data: UsuarioRegistro,
            success: function (response) {
                $.ajax({
                    type: "GET",
                    url: app.urltest + "/MostrarDepartamentos",
                    crossDomain: true,
                    dataType: "json",
                    success: function (respuesta) {
                       
                        for (var i = 0; i < respuesta.length; i++) {
                            $("#departamentoModificar").append("<option value=" + respuesta[i].Departamento + "> " + respuesta[i].Descripcion + " </option>");
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        debugger;
                    }
                });
                $("#Clave_emp").val(response.Clave_Emp);
               $("#nombreModificar").val(response.Nombre);
               $("#paternoModificar").val(response.ApPaterno);
               $("#maternoModificar").val(response.ApMaterno);
               $("#fecha-nacimientoModificar").val(response.FecNac);
               $("#departamentoModificar option").text(response.DepartamentoVal);
               $("#departamentoModificar option").val(response.Departamento);
               $("#sueldoModificar").val(response.Sueldo);
               
            },
            error: function (jqXHR, textStatus, errorThrown) {
                debugger;
            }
        });
    });

    $vacio = (function (campo) {
        if ($("#" + campo).val() == "" || $("#" + campo).val().length === 0)
            return true;
        else
            return false;
    });

    function Validaciones() {
        var esValido = true;

        if ($vacio('nombre')) {
            $("#error-nombre").show().html("El nombre es obligatorio");
            $("#nombre").closest(".form-group").addClass("has-error");
            esValido = false;
        } else {
            $("#error-nombre").show().html("");
            $("#nombre").closest(".form-group").removeClass("has-error");

        }
        if ($vacio('paterno')) {
            $("#error-paterno").show().html("El apellido paterno es obligatorio");
            $("#paterno").closest(".form-group").addClass("has-error");
            esValido = false;
        } else {
            $("#error-paterno").show().html("");
            $("#paterno").closest(".form-group").removeClass("has-error");

        }
        if ($vacio('materno')) {
            $("#error-materno").show().html("El apellido materno es obligatorio");
            $("#materno").closest(".form-group").addClass("has-error");
            esValido = false;
        } else {
            $("#error-materno").show().html("");
            $("#materno").closest(".form-group").removeClass("has-error");

        }
        if ($vacio('fecha-nacimiento')) {
            $("#error-fecha").show().html("La fecha de nacimiento es obligatoria");
            $("#fecha-nacimiento").closest(".form-group").addClass("has-error");
            esValido = false;
        } else {
            $("#error-fecha").show().html("");
            $("#fecha-nacimiento").closest(".form-group").removeClass("has-error");

        }
        if ($("#departamentoNuevo option:selected").val() == 0) {
            $("#error-departamento").show().html("El campo departamento es obligatorio");
            $("#departamentoNuevo").closest(".form-group").addClass("has-error");
            esValido = false;
        } else {
            $("#error-departamento").show().html("");
            $("#departamentoNuevo").closest(".form-group").removeClass("has-error");

        }
        if ($vacio('sueldo')) {
            $("#error-sueldo").show().html("El sueldo es obligatorio");
            $("#sueldo").closest(".form-group").addClass("has-error");
            esValido = false;
        } else {
            $("#error-sueldo").show().html("");
            $("#sueldo").closest(".form-group").removeClass("has-error");

        }
        

        return esValido;
    }

    function ValidacionesModificacion() {
        var esValido = true;

        if ($vacio('nombreModificar')) {
            $(".error-nombre").show().html("El nombre es obligatorio");
            $("#nombreModificar").closest(".form-group").addClass("has-error");
            esValido = false;
        } else {
            $(".error-nombre").show().html("");
            $("#nombreModificar").closest(".form-group").removeClass("has-error");

        }
        if ($vacio('paternoModificar')) {
            $(".error-paterno").show().html("El apellido paterno es obligatorio");
            $("#paternoModificar").closest(".form-group").addClass("has-error");
            esValido = false;
        } else {
            $(".error-paterno").show().html("");
            $("#paternoModificar").closest(".form-group").removeClass("has-error");

        }
        if ($vacio('maternoModificar')) {
            $(".error-materno").show().html("El apellido materno es obligatorio");
            $("#maternoModificar").closest(".form-group").addClass("has-error");
            esValido = false;
        } else {
            $(".error-materno").show().html("");
            $("#maternoModificar").closest(".form-group").removeClass("has-error");

        }
        if ($vacio('fecha-nacimientoModificar')) {
            $(".error-fecha").show().html("La fecha de nacimiento es obligatoria");
            $("#fecha-nacimientoModificar").closest(".form-group").addClass("has-error");
            esValido = false;
        } else {
            $(".error-fecha").show().html("");
            $("#fecha-nacimientoModificar").closest(".form-group").removeClass("has-error");

        }
        if ($("#departamentoModificar option:selected").val() == 0) {
            $(".error-departamento").show().html("El campo departamento es obligatorio");
            $("#departamentoModificar").closest(".form-group").addClass("has-error");
            esValido = false;
        } else {
            $(".error-departamento").show().html("");
            $("#departamentoModificar").closest(".form-group").removeClass("has-error");

        }
        if ($vacio('sueldoModificar')) {
            $(".error-sueldo").show().html("El sueldo es obligatorio");
            $("#sueldoModificar").closest(".form-group").addClass("has-error");
            esValido = false;
        } else {
            $(".error-sueldo").show().html("");
            $("#sueldoModificar").closest(".form-group").removeClass("has-error");

        }


        return esValido;
    }

});
