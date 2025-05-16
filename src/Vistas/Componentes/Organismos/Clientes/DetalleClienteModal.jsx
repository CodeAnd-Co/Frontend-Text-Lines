import ModalCliente from '@Organismos/Clientes/ModalLeerCliente';
import InfoCliente from '@Moleculas/InfoCliente';
import Texto from '@Atomos/Texto';
import PropTypes from 'prop-types';
import { useAuth } from '@Hooks/AuthProvider';
import { PERMISOS } from '@Constantes/permisos';
import Alerta from '@Moleculas/Alerta';

export const DetalleClienteModal = ({
  open,
  cliente,
  modoEdicion,
  cargando,
  colores,
  onClose,
  onToggleEdicion,
  onToggleEliminar,
  onChange,
  onImageChange,
  imagenSubiendo,
  imagenError,
}) => {
  const { usuario } = useAuth();

  // Verificar si hay campos vacíos para deshabilitar el botón
  const camposInvalidos
    = modoEdicion && cliente ? !cliente.nombreLegal?.trim() || !cliente.nombreVisible?.trim() : false;

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
            label: 'ELIMINAR',
            variant: 'outlined',
            outlineColor: colores.rojo[2],
            onClick: onToggleEliminar,
          },
          {
            label: modoEdicion ? 'GUARDAR' : 'EDITAR',
            variant: 'contained',
            color: 'error',
            backgroundColor: colores.altertex[1],
            onClick: onToggleEdicion,
            // Deshabilitar botón si campos vacíos, hay error o no se tienen permisos
            disabled:
              !cliente
              || !usuario?.permisos?.includes(PERMISOS.ACTUALIZAR_CLIENTE)
              || camposInvalidos
              || imagenSubiendo,
          },
          {
            label: 'SALIR',
            variant: 'outlined',
            outlineColor: colores.primario[10],
            onClick: onClose,
          },
        ]}
        errorPanel={
          imagenError && (
            // <Alert severity='error' sx={{ mt: 3, mb: 2 }}>
            //   {imagenError}
            // </Alert>
            <Alerta
              tipo='error'
              mensaje={imagenError}
              cerrable
              duracion={2500}
              sx={{ mb: 2, mt: 2 }}
            />
          )
        }
      >
        {cargando ? (
          <Texto>Cargando cliente...</Texto>
        ) : cliente ? (
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
  onToggleEliminar: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func,
  imagenSubiendo: PropTypes.bool,
  imagenError: PropTypes.string,
};

export default DetalleClienteModal;
