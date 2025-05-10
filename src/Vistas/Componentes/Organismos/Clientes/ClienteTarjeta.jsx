import TarjetaConImagen from '@Moleculas/TarjetaConImagen';

export const ClienteTarjeta = ({ cliente, modoEliminacion, onClienteClick, onIconoClick }) => {
  return (
    <TarjetaConImagen
      src={cliente.urlImagen}
      alt={cliente.nombreComercial}
      titulo={cliente.nombreComercial}
      nombreIcono={modoEliminacion ? 'Delete' : 'Info'}
      varianteIcono='outlined'
      tamanoIcono='large'
      colorIcono={modoEliminacion ? 'error' : 'action'}
      iconoClickeable={true}
      ajuste='contain'
      anchoImagen='100%'
      alturaImagen='250px'
      tooltipIcono={
        modoEliminacion ? 'Eliminar cliente' : `Ver información de ${cliente.nombreComercial}`
      }
      clickeableImagen={true}
      elevacion={3}
      alClicImagen={() =>
        onClienteClick(cliente.idCliente, cliente.urlImagen, cliente.nombreComercial)
      }
      alClicIcono={() => onIconoClick(cliente, modoEliminacion)}
    />
  );
};
