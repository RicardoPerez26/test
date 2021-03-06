CREATE TABLE Departamentos(
Departamento INT IDENTITY PRIMARY KEY,
Descripcion VARCHAR(50) NOT NULL,
)
GO

CREATE TABLE Empleados(
Clave_Emp INT IDENTITY(1,1) PRIMARY KEY,
Nombre VARCHAR(50) NOT NULL,
ApPaterno VARCHAR(50) NOT NULL,
ApMaterno VARCHAR(50) NOT NULL,
FecNac DATETIME NOT NULL,
Departamento INT NOT NULL FOREIGN KEY REFERENCES Departamentos(Departamento),
Sueldo MONEY NOT NULL
)
GO

CREATE PROCEDURE [dbo].[ExamenTalper_RegistroEmpleado]
   @Nombre VARCHAR(50),
    @ApPaterno VARCHAR(50),
   @ApMaterno VARCHAR(50),
   @FecNac DATE,
   @Departamento INT,
   @Sueldo MONEY
WITH EXECUTE AS OWNER   
AS
--   ===============================================================================================
--   Autor:            Ricardo Pérez
-- ================================================================================================
BEGIN
   SET NOCOUNT ON;

      INSERT INTO Empleados VALUES (@Nombre, @ApPaterno, @ApMaterno, @FecNac, @Departamento, @Sueldo)
      SELECT Clave_Emp, Nombre, ApPaterno, ApMaterno, FecNac, Departamento, Sueldo from Empleados WHERE Clave_Emp = @@IDENTITY

   SET NOCOUNT OFF
END
GO

CREATE PROCEDURE [dbo].[ExamenTalper_ModificarEmpleado]
   @Clave_Emp INT,
   @Nombre VARCHAR(50),
    @ApPaterno VARCHAR(50),
   @ApMaterno VARCHAR(50),
   @FecNac DATETIME,
   @Departamento INT,
   @Sueldo MONEY
WITH EXECUTE AS OWNER   
AS
--   ===============================================================================================
--   Autor:            Ricardo Pérez
-- ================================================================================================
BEGIN
   SET NOCOUNT ON;
      DECLARE @DepartamentoVal VARCHAR(50);
      SET @DepartamentoVal = (Select Descripcion from Departamentos where Departamento = @Departamento)
      UPDATE Empleados SET Nombre = @Nombre, ApPaterno = @ApPaterno, ApMaterno = @ApMaterno, FecNac = @FecNac, Departamento = @Departamento, Sueldo = @Sueldo
      WHERE Clave_Emp = @Clave_Emp
      SELECT @DepartamentoVal as 'DepartamentoVal', Clave_Emp, Nombre, ApPaterno, ApMaterno, FecNac, Departamento, Sueldo from Empleados WHERE Clave_Emp = @Clave_Emp

   SET NOCOUNT OFF
END
GO


CREATE PROCEDURE [dbo].[ExamenTalper_EliminarEmpleado]
   @Clave_Emp INT
WITH EXECUTE AS OWNER   
AS
--   ===============================================================================================
--   Autor:            Ricardo Pérez
-- ================================================================================================
BEGIN
   SET NOCOUNT ON;

      DELETE FROM Empleados WHERE Clave_Emp = @Clave_Emp
      SELECT Clave_Emp, Nombre, ApPaterno, ApMaterno, FecNac, Departamento, Sueldo from Empleados WHERE Clave_Emp = @Clave_Emp

   SET NOCOUNT OFF
END
GO


INSERT INTO Departamentos VALUES('Sistemas','Contabilidad','Soporte Tecnico','Compras','Recursos Humanos','Administración','Mercadotecnia')
GO

CREATE PROCEDURE [dbo].[ExamenTalper_DesplegarDepartamentos]
WITH EXECUTE AS OWNER   
AS
--   ===============================================================================================
--   Autor:            Ricardo Pérez
-- ================================================================================================
BEGIN
   SET NOCOUNT ON;

      SELECT Departamento, Descripcion from Departamentos

   SET NOCOUNT OFF
END
GO

CREATE PROCEDURE [dbo].[ExamenTalper_MostrarDatosUsuario]
@Clave_Emp INT   
WITH EXECUTE AS OWNER
AS
--   ===============================================================================================
--   Autor:            Ricardo Pérez
-- ================================================================================================
BEGIN
   SET NOCOUNT ON;
      DECLARE @DepartamentoVal VARCHAR(50);
      DECLARE @Departamento INT;
      SET @Departamento = (SELECT Departamento from Empleados where Clave_Emp = @Clave_Emp)
      SET @DepartamentoVal = (Select Descripcion from Departamentos where Departamento = @Departamento)
      SELECT @DepartamentoVal as 'DepartamentoVal', Clave_Emp, Nombre, ApPaterno, ApMaterno, FecNac, Departamento, Sueldo from Empleados WHERE Clave_Emp = @Clave_Emp

   SET NOCOUNT OFF
END
GO

CREATE PROCEDURE [dbo].[ExamenTalper_MostrarTodosUsuarios]
WITH EXECUTE AS OWNER
AS
--   ===============================================================================================
--   Autor:            Ricardo Pérez
-- ================================================================================================
BEGIN
   SET NOCOUNT ON;

      SELECT Clave_Emp, Nombre, ApPaterno, ApMaterno, FecNac, e.Departamento, d.Descripcion as 'DepartamentoVal', Sueldo from Empleados e inner join Departamentos d on e.Departamento = d.Departamento

   SET NOCOUNT OFF
END
GO