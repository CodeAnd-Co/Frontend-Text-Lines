import TarjetaConImagen from '@Moleculas/TarjetaConImagen';

export const ClienteTarjeta = ({ cliente, modoEliminacion, onClienteClick, onIconoClick }) => {
  const nombreCliente = cliente.nombreComercial || cliente.nombreVisible || 'Cliente sin nombre';

  return (
    <TarjetaConImagen
      src={cliente.urlImagen}
      alt={nombreCliente}
      titulo={nombreCliente}
      nombreIcono={modoEliminacion ? 'Delete' : 'Info'}
      varianteIcono='outlined'
      tamanoIcono='large'
      colorIcono={modoEliminacion ? 'error' : 'action'}
      iconoClickeable={true}
      ajuste='contain'
      anchoImagen='100%'
      alturaImagen='250px'
      tooltipIcono={modoEliminacion ? 'Eliminar cliente' : `Ver información de ${nombreCliente}`}
      clickeableImagen={true}
      elevacion={3}
      alClicImagen={() => onClienteClick(cliente.idCliente, cliente.urlImagen, nombreCliente)}
      alClicIcono={() => onIconoClick(cliente, modoEliminacion)}
    />
  );
};
