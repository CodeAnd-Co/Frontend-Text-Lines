/**
 * 🧩 Modelo de un usuario
 */
export class UsuarioLectura {
  constructor({
    idUsuario,
    nombreCompleto,
    correoElectronico,
    numeroTelefono,
    direccion,
    fechaNacimiento,
    genero,
    estatus,
    rol,
    clientes = [], 
  }) {
    console.log("📦 [UsuarioLectura] Datos recibidos para instanciar el modelo:");
    console.log({
      idUsuario,
      nombreCompleto,
      correoElectronico,
      numeroTelefono,
      direccion,
      fechaNacimiento,
      genero,
      estatus,
      rol,
      clientes,
    });

    this.idUsuario = idUsuario;
    this.nombreCompleto = nombreCompleto;
    this.correoElectronico = correoElectronico;
    this.numeroTelefono = numeroTelefono;
    this.direccion = direccion;
    this.fechaNacimiento = fechaNacimiento;
    this.genero = genero;
    this.estatus = estatus;
    this.rol = rol;
    this.clientes = clientes; 

    console.log("✅ [UsuarioLectura] Instancia creada:", this);
  }
}
