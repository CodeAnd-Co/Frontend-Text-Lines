//RF[31] Consulta crear set de cuota - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31]

export class CuotaSetModelo {
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
