using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace test.Models
{
    public class Usuarios
    {
        public int Clave_Emp { get; set; }
        public string Nombre { get; set; }
        public string ApPaterno { get; set; }
        public string ApMaterno { get; set; }
        public DateTime FecNac { get; set; }
        public int Departamento { get; set; }
        public int Sueldo { get; set; }
        public string DepartamentoVal { get; set; }
    }
}