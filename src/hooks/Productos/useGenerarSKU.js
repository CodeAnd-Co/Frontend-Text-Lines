import { useCallback } from 'react';

export const useGenerarSKU = () => {
  const limpiarTexto = (texto) =>
    texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .toUpperCase();

  const obtenerCodigo = (texto, longitud = 3) => {
    const palabras = limpiarTexto(texto).split(' ');
    for (const palabra of palabras) {
      if (palabra.length >= longitud) return palabra.substring(0, longitud);
    }
    return limpiarTexto(texto).substring(0, longitud);
  };

  const generarSKU = useCallback((nombreProducto, nombreVariante, valorOpcion) => {
    const prefijo = obtenerCodigo(nombreProducto);
    const codigoVariante = obtenerCodigo(nombreVariante);
    const codigoOpcion = obtenerCodigo(valorOpcion);

    return `${prefijo}-${codigoVariante}-${codigoOpcion}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return generarSKU;
};
