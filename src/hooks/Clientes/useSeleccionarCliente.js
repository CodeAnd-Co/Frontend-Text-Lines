import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { RUTAS } from '../../Utilidades/Constantes/rutas';
import { RepositorioSeleccionarCliente } from '../../Dominio/repositorios/Clientes/RepositorioSeleccionarCliente';

/**
 * Hook personalizado para seleccionar un cliente en el sistema.
 *
 * @returns {Object} Un objeto con la función `seleccionarCliente`, que se puede usar para seleccionar un cliente
 * y redirigir al tablero del sistema administrativo.
 */

export const useSeleccionarCliente = () => {
  const navigate = useNavigate();
  const { verificarSesion } = useAuth();

  const seleccionarCliente = useCallback(
    async (idCliente) => {
      try {
        const mensaje = await RepositorioSeleccionarCliente.seleccionarCliente(idCliente);
        await verificarSesion();
        navigate(RUTAS.SISTEMA_ADMINISTRATIVO.BASE + RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO);
      } catch (error) {}
    },
    [navigate, verificarSesion]
  );

  return { seleccionarCliente };
};
