using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using test.Models;
using System.Text.RegularExpressions;
using System.Text;
using System.Net.Http.Headers;
using System.Configuration;
using System.Net.Mail;
using System.Web.Script.Serialization;
using System.Security.Cryptography;
using System.IO;
using test.Procedures;
using System.Globalization;

namespace test.Controllers
{
    [RoutePrefix("Beneficiaria")]
    public class BeneficiariaController : ApiController
    {

        [Route("GuardarEmpleado")]
        [HttpPost]
        public HttpResponseMessage GuardarEmpleado(Usuarios UsuarioRegistro)
        {

            try
            {
                var sddashboard = DALaLuchaEresTu2017.CreateInstance();
                string fechanueva = UsuarioRegistro.FecNac.ToString();
                DateTime dt = Convert.ToDateTime(fechanueva);
                fechanueva = dt.ToString("dd/MM/yyyy");
                Usuarios usuarios = sddashboard.Registro(UsuarioRegistro.Nombre,UsuarioRegistro.ApPaterno,UsuarioRegistro.ApMaterno, UsuarioRegistro.FecNac, UsuarioRegistro.Departamento, UsuarioRegistro.Sueldo);
                return Request.CreateResponse(usuarios);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("ModificarEmpleado")]
        [HttpPost]
        public HttpResponseMessage ModificarEmpleado(Usuarios UsuarioRegistro)
        {

            try
            {
                var sddashboard = DALaLuchaEresTu2017.CreateInstance();
                Usuarios usuarios = sddashboard.ModificarEmpleado(UsuarioRegistro.Clave_Emp,UsuarioRegistro.Nombre, UsuarioRegistro.ApPaterno, UsuarioRegistro.ApMaterno, UsuarioRegistro.FecNac, UsuarioRegistro.Departamento, UsuarioRegistro.Sueldo);
                return Request.CreateResponse(usuarios);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("MostrarTodosUsuarios")]
        [HttpGet]
        public HttpResponseMessage MostrarTodosUsuarios()
        {

            try
            {
                var sddashboard = DALaLuchaEresTu2017.CreateInstance();
                List<Usuarios> usuarios = sddashboard.MostrarTodosUsuarios();
                for(int i = 0; i < usuarios.Count; i++)
                {
                    string fechanueva = usuarios[i].FecNac.ToString();
                    DateTime dt = Convert.ToDateTime(fechanueva);
                    fechanueva = dt.ToString("dd/MM/yyyy");
                }
                return Request.CreateResponse(usuarios);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("MostrarDatosUsuario")]
        [HttpPost]
        public HttpResponseMessage MostrarDatosUsuario(Usuarios datosUsuario)
        {

            try
            {
                var sddashboard = DALaLuchaEresTu2017.CreateInstance();
                Usuarios usuarios = sddashboard.MostrarDatosUsuario(datosUsuario.Clave_Emp);
                return Request.CreateResponse(usuarios);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("EliminarEmpleado")]
        [HttpPost]
        public HttpResponseMessage EliminarEmpleado(Usuarios datosUsuario)
        {

            try
            {
                var sddashboard = DALaLuchaEresTu2017.CreateInstance();
                Usuarios usuarios = sddashboard.EliminarEmpleado(datosUsuario.Clave_Emp);
                return Request.CreateResponse(usuarios);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("MostrarDepartamentos")]
        [HttpGet]
        public HttpResponseMessage MostrarDepartamentos()
        {

            try
            {
                var sddashboard = DALaLuchaEresTu2017.CreateInstance();
                List<Departamentos> usuarios = sddashboard.MostrarDepartamentos();
                return Request.CreateResponse(usuarios);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}
