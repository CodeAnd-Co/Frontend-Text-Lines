class cuotaSetModelo {
  constructor({
    idCliente, // 👈 include this
    nombreCuotaSet,
    descripcion,
    periodoRenovacion,
    renovacionHabilitada = true,
    productos = [],
    limites = [],
  }) {
    this.idCliente = idCliente; // 👈 assign it here

    this.nombre = nombreCuotaSet || '';
    this.descripcion = descripcion || '';
    this.periodoRenovacion = periodoRenovacion || 6;
    this.renovacionHabilitada = renovacionHabilitada;

    this.productosYLimite = productos.map((producto, index) => {
      const limite = limites[index];
      return {
        idProducto: producto,
        limite,
        limiteActual: limite,
      };
    });
  }
}

export default cuotaSetModelo;
