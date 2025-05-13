import { Box } from '@mui/material';
import Icono from '@Atomos/Icono';
import Texto from '@Atomos/Texto';

const estiloTarjeta = {
  minWidth: { xs: '100%', sm: '250px', md: '300px' },
  maxWidth: '100%',
  flexGrow: 1,
};

const estiloTarjetaAgregar = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed rgba(15, 140, 241, 0.18)',
  backgroundColor: 'rgba(15, 140, 241, 0.18)',
  color: '#1976D2',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(15, 139, 241, 0.38)',
    transform: 'scale(1.03)',
  },
};

export const AgregarClienteTarjeta = () => {
  const handleAgregarCliente = () => {
    console.log('Agregar cliente');
    // Aquí iría la lógica para agregar un cliente
  };

  return (
    <Box
      onClick={handleAgregarCliente}
      sx={{ ...estiloTarjeta, ...estiloTarjetaAgregar }}
      role='button'
      tabIndex={0}
    >
      <Icono nombre='Add' size='large' />
      <Texto variant='button' sx={{ mt: 1 }}>
        Agregar cliente
      </Texto>
    </Box>
  );
};
