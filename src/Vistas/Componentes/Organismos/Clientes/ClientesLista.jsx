import { Box } from '@mui/material';
import { ClienteTarjeta } from '@Organismos/Clientes/ClienteTarjeta';

// Estilos para cada tarjeta
const estiloTarjeta = {
  minWidth: { xs: '100%', sm: '250px', md: '300px' },
  maxWidth: '100%',
  flexGrow: 1,
};

// Lista de clientes representada como tarjetas
export const ClientesLista = ({
  clientes, // Arreglo de clientes a mostrar
  modoEliminacion, // Si está activado el modo de eliminación
  onClienteClick, // Función al hacer clic en un cliente
  onIconoClick, // Función al hacer clic en el ícono de la tarjeta
  onMouseDown, // Evento al presionar mouse
  onMouseUp, // Evento al soltar mouse
  onTouchStart, // Evento al tocar en pantallas táctiles
  onTouchEnd, // Evento al soltar en pantallas táctiles
}) => {
  return clientes.map((cliente) => (
    <Box
      key={cliente.idCliente}
      sx={estiloTarjeta}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <ClienteTarjeta
        cliente={cliente}
        modoEliminacion={modoEliminacion}
        onClienteClick={onClienteClick}
        onIconoClick={onIconoClick}
      />
    </Box>
  ));
};
