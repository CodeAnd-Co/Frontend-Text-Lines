import ModalCliente from '@Organismos/Clientes/ModalLeerCliente';
import InfoCliente from '@Moleculas/InfoCliente';
import Texto from '@Atomos/Texto';
import PropTypes from 'prop-types';
import { useAuth } from '@Hooks/AuthProvider';
import { PERMISOS } from '@Constantes/permisos';

// RF14 - Actualiza Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF14

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
            disabled: !cliente || !usuario?.permisos?.includes(PERMISOS.ACTUALIZAR_CLIENTE),
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
          <InfoCliente
            modoEdicion={modoEdicion}
            idCliente={cliente?.idCliente}
            nombreLegal={cliente?.nombreLegal}
            nombreVisible={cliente?.nombreVisible}
            empleados={cliente?.numeroEmpleados}
            usuariosAsignados={cliente?.usuariosAsignados}
            urlImagen={cliente?.urlImagen} // Changed to use consistent property name
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
  onChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func,
  imagenSubiendo: PropTypes.bool,
  imagenError: PropTypes.string,
};

export default DetalleClienteModal;
