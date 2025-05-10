import ModalCliente from '@Organismos/Clientes/ModalLeerCliente';
import InfoCliente from '@Moleculas/InfoCliente';
import Texto from '@Atomos/Texto';

export const DetalleClienteModal = ({
  open,
  cliente,
  modoEdicion,
  cargando,
  colores,
  onClose,
  onToggleEdicion,
  onChange,
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
            imagenURL={cliente?.imagenCliente}
            onChange={onChange}
          />
        ) : (
          <Texto>No se encontró información del cliente.</Texto>
        )}
      </ModalCliente>
    )
  );
};
