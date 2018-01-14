using BLToolkit.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

using System.Configuration;
using test.Models;
using test.Procedures;

namespace test
{
    public class DAManager : DbManager
    {
        public dynamic EjecutarSP<T>(params object[] parametros)
        {
            T x = (T)new object();
            var nombre = x.GetType().Name;
            var metodo = typeof(DALaLuchaEresTu2017).GetMethod(nombre);
            
            using (var db = new DbManager(ConfigurationManager.ConnectionStrings["defaultConnection"].ConnectionString))
            {
                db.SetSpCommand(nombre, parametros);
            }
            return null;
        }
    }
}