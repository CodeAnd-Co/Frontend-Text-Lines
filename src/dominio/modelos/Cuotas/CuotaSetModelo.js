class CuotaSetModelo {
  constructor({
    nombreCuotaSet,
    descripcion,
    periodoRenovacion,
    renovacionHabilitada = true,
    productos = [],
    limites = {},
  }) {
    this.nombre = nombreCuotaSet || '';
    this.descripcion = descripcion || '';
    this.periodoRenovacion = periodoRenovacion || 6;
    this.renovacionHabilitada = renovacionHabilitada;

    this.productosYLimite = productos.map((producto) => {
      const id = producto.id?.toString();
      const limite = parseInt(limites[id], 10); // usa el ID como clave
      return {
        idProducto: id,
        limite,
        limiteActual: limite,
      };
    });
  }
}

export default CuotaSetModelo;
