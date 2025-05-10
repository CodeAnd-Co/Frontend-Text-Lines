import TarjetaConImagen from '@Moleculas/TarjetaConImagen';

export const ClienteTarjeta = ({ cliente, modoEliminacion, onClienteClick, onIconoClick }) => {
  const displayName = cliente.nombreComercial || cliente.nombreVisible || 'Cliente sin nombre';

  return (
    <TarjetaConImagen
      src={cliente.urlImagen}
      alt={displayName}
      titulo={displayName}
      nombreIcono={modoEliminacion ? 'Delete' : 'Info'}
      varianteIcono='outlined'
      tamanoIcono='large'
      colorIcono={modoEliminacion ? 'error' : 'action'}
      iconoClickeable={true}
      ajuste='contain'
      anchoImagen='100%'
      alturaImagen='250px'
      tooltipIcono={modoEliminacion ? 'Eliminar cliente' : `Ver información de ${displayName}`}
      clickeableImagen={true}
      elevacion={3}
      alClicImagen={() => onClienteClick(cliente.idCliente, cliente.urlImagen, displayName)}
      alClicIcono={() => onIconoClick(cliente, modoEliminacion)}
    />
  );
};
