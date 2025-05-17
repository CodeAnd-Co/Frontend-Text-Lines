import { useEffect, useState } from 'react';
import { RepositorioClientes } from '@Repositorios/Clientes/repositorioLeerCliente';

/**
 * Hook para obtener los datos de un cliente por su ID
 * @param {number} idCliente - ID del cliente a consultar
 * @returns {{
 *   cliente: ClienteLectura | null,
 *   mensaje: string,
 *   cargando: boolean,
 *   error: string | null
 * }}
 *
 * @see RF[13] Leer cliente - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF13)
 */
export const useClientePorId = (idCliente) => {
  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCliente = async () => {
      setCargando(true);
      setError(null);

      try {
        const { cliente, mensaje } = await RepositorioClientes.obtenerPorId(idCliente);

        const clienteNormalizado = cliente
          ? {
              ...cliente,
              urlImagen: cliente.urlImagen || cliente.imagenURL || cliente.imagenCliente || null,
            }
          : null;

        setCliente(clienteNormalizado);
        setMensaje(mensaje);
      } catch (err) {
        setError(err.message);
        setCliente(null);
      } finally {
        setCargando(false);
      }
    };

    if (idCliente) {
      obtenerCliente();
    } else {
      setCliente(null);
      setMensaje('');
      setCargando(false);
      setError(null);
    }
  }, [idCliente]);

  return { cliente, mensaje, cargando, error };
};
