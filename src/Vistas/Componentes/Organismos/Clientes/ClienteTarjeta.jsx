import TarjetaConImagen from '@Moleculas/TarjetaConImagen';

// Componente para mostrar la tarjeta de un cliente
export const ClienteTarjeta = ({ cliente, modoEliminacion, onClienteClick, onIconoClick }) => {
  // Determinar el nombre que se mostrará para el cliente
  const nombreCliente = cliente.nombreComercial || cliente.nombreVisible || 'Cliente sin nombre';

  return (
    <TarjetaConImagen
      src={cliente.urlImagen} // Imagen del cliente
      alt={nombreCliente} // Texto alternativo de la imagen
      titulo={nombreCliente} // Título mostrado en la tarjeta
      nombreIcono={modoEliminacion ? 'Delete' : 'Info'} // Ícono: eliminar o información
      varianteIcono='outlined' // Variante del botón del ícono
      tamanoIcono='large' // Tamaño del ícono
      colorIcono={modoEliminacion ? 'error' : 'action'} // Color del ícono según el modo
      iconoClickeable={true} // El ícono se puede hacer clic
      ajuste='contain' // Ajuste de la imagen
      anchoImagen='100%' // Ancho de la imagen
      alturaImagen='250px' // Altura de la imagen
      tooltipIcono={modoEliminacion ? 'Eliminar cliente' : `Ver información de ${nombreCliente}`} // Texto del tooltip
      clickeableImagen={true} // La imagen también es clickeable
      elevacion={3} // Sombra de la tarjeta
      alClicImagen={() => onClienteClick(cliente.idCliente, cliente.urlImagen, nombreCliente)} // Función al hacer clic en la imagen
      alClicIcono={() => onIconoClick(cliente, modoEliminacion)} // Función al hacer clic en el ícono
    />
  );
};
