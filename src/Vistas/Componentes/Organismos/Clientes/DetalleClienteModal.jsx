import ModalCliente from '@Organismos/Clientes/ModalLeerCliente';
import InfoCliente from '@Moleculas/InfoCliente';
import Texto from '@Atomos/Texto';
import PropTypes from 'prop-types';

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
            color: 'primary',
            backgroundColor: colores.altertex[1],
            onClick: onToggleEdicion,
            disabled: !cliente,
          },
          {
            label: 'SALIR',
            variant: 'outlined',
            color: 'primary',
            outlineColor: colores.altertex[1],
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
