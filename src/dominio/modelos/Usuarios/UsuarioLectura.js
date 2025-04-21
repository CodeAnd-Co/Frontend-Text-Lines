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
    rol, // nuevo campo
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
      rol, // incluir en log
    });

    this.idUsuario = idUsuario;
    this.nombreCompleto = nombreCompleto;
    this.correoElectronico = correoElectronico;
    this.numeroTelefono = numeroTelefono;
    this.direccion = direccion;
    this.fechaNacimiento = fechaNacimiento;
    this.genero = genero;
    this.estatus = estatus;
    this.rol = rol; // asignar

    console.log("✅ [UsuarioLectura] Instancia creada:", this);
  }
}
