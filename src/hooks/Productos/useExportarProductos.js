// RF58 - Exportar Productos - https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF58

import { useState } from 'react';
import { exportarProductos as repoExportarProductos } from '@Repositorios/Productos/RepositorioExportarProducto';

/**
 * Hook para gestionar la exportación de productos en formato XLSX.
 *
 * @returns {{
 *   exportar: (idsProductos: number[]) => Promise<void>,
 *   cargando: boolean,
 *   error: string | null,
 *   mensaje: string
 * }}
 */
const useExportarProductos = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const exportar = async (idsProducto) => {
    setCargando(true);
    setError(null);
    setMensaje('');

    try {
      const response = await repoExportarProductos(idsProducto);

      const fecha = new Date()
        .toLocaleDateString('es-CO', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .split('/')
        .reverse()
        .join('-');
      const url = window.URL.createObjectURL(
        new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
      );

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `productos_${fecha}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMensaje('Archivo exportado exitosamente');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return { exportar, cargando, error, mensaje };
};

export default useExportarProductos;
