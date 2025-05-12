import ModalCliente from '@Organismos/Clientes/ModalLeerCliente';
import InfoCliente from '@Moleculas/InfoCliente';
import Texto from '@Atomos/Texto';
import PropTypes from 'prop-types';
import { useAuth } from '@Hooks/AuthProvider';
import { PERMISOS } from '@Constantes/permisos';
import { Alert } from '@mui/material'; // Añadir importación de Alert

export const DetalleClienteModal = ({
  open,
  cliente,
  modoEdicion,
  cargando,
  colores,
  onClose,
  onToggleEdicion,
  onChange,
  onImageChange,
  imagenSubiendo,
  imagenError,
}) => {
  const { usuario } = useAuth();

  return (
    open && (
      <ModalCliente
        open={open}
        onClose={onClose}
        onConfirm={onClose}
        titulo={cliente?.nombreVisible || 'Cargando...'}
        tituloVariant='h4'
        botones={[
          {
            label: modoEdicion ? 'GUARDAR' : 'EDITAR',
            variant: 'contained',
            color: 'error',
            backgroundColor: colores.altertex[1],
            onClick: onToggleEdicion,
            // Deshabilitar botón si hay error o no se tienen permisos
            disabled:
              !cliente ||
              !usuario?.permisos?.includes(PERMISOS.ACTUALIZAR_CLIENTE) ||
              !!imagenError,
          },
          {
            label: 'SALIR',
            variant: 'outlined',
            outlineColor: colores.primario[10],
            onClick: onClose,
          },
        ]}
      >
        {cargando ? (
          <Texto>Cargando cliente...</Texto>
        ) : cliente ? (
          <>
            {/* Mostrar alerta de error de forma persistente */}
            {imagenError && (
              <Alert severity='error' sx={{ mb: 2 }}>
                {imagenError}
              </Alert>
            )}
            <InfoCliente
              modoEdicion={modoEdicion}
              idCliente={cliente?.idCliente}
              nombreLegal={cliente?.nombreLegal}
              nombreVisible={cliente?.nombreVisible}
              empleados={cliente?.numeroEmpleados}
              usuariosAsignados={cliente?.usuariosAsignados}
              urlImagen={cliente?.urlImagen}
              onChange={onChange}
              onImageChange={onImageChange}
              imagenSubiendo={imagenSubiendo}
              imagenError={imagenError}
            />
          </>
        ) : (
          <Texto>No se encontró información del cliente.</Texto>
        )}
      </ModalCliente>
    )
  );
};

DetalleClienteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  cliente: PropTypes.object,
  modoEdicion: PropTypes.bool.isRequired,
  cargando: PropTypes.bool.isRequired,
  colores: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onToggleEdicion: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func,
  imagenSubiendo: PropTypes.bool,
  imagenError: PropTypes.string,
};

export default DetalleClienteModal;
