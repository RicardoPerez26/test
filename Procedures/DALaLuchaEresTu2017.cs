using BLToolkit.DataAccess;
using test.Models;
using System;
using System.Collections.Generic;

namespace test.Procedures
{
    public abstract class DALaLuchaEresTu2017 : DataAccessor<object, DALaLuchaEresTu2017>
    {
        [SprocName("ExamenTalper_RegistroEmpleado")]
        public abstract Usuarios Registro(string Nombre, string ApPaterno, string ApMaterno, DateTime FecNac, int Departamento, int Sueldo);
        [SprocName("ExamenTalper_ModificarEmpleado")]
        public abstract Usuarios ModificarEmpleado(int Clave_Emp, string Nombre, string ApPaterno, string ApMaterno, DateTime FecNac, int Departamento, int Sueldo);
        [SprocName("ExamenTalper_DesplegarDepartamentos")]
        public abstract List<Departamentos> MostrarDepartamentos();
        [SprocName("ExamenTalper_MostrarTodosUsuarios")]
        public abstract List<Usuarios> MostrarTodosUsuarios();
        [SprocName("ExamenTalper_MostrarDatosUsuario")]
        public abstract Usuarios MostrarDatosUsuario(int Clave_Emp);
        [SprocName("ExamenTalper_EliminarEmpleado")]
        public abstract Usuarios EliminarEmpleado(int Clave_Emp);
    }
}