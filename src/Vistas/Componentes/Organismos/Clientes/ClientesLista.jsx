import { Box } from '@mui/material';
import { ClienteTarjeta } from '@Organismos/Clientes/ClienteTarjeta';

const estiloTarjeta = {
  minWidth: { xs: '100%', sm: '250px', md: '300px' },
  maxWidth: '100%',
  flexGrow: 1,
};

export const ClientesLista = ({
  clientes,
  modoEliminacion,
  onClienteClick,
  onIconoClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
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
