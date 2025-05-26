import { Box } from '@mui/material';
import Icono from '@Atomos/Icono';
import Texto from '@Atomos/Texto';

// Constantes en español
const TEXTOS = {
  AGREGAR_CLIENTE: 'Agregar cliente',
};

// Estilos
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
  height: '100%', // Para que tenga la misma altura que las otras tarjetas
  minHeight: '150px', // Altura mínima para que se vea bien
};

export const AgregarClienteTarjeta = ({ handleAbrirCrearCliente }) => {
  const handleAgregarCliente = () => {
    if (handleAbrirCrearCliente) {
      handleAbrirCrearCliente(); // Llama a la función pasada como prop
    } else {
      console.error('handleAbrirCrearCliente no está definido');
    }
  };

  return (
    <Box
      onClick={handleAgregarCliente}
      sx={{ ...estiloTarjeta, ...estiloTarjetaAgregar }}
      role='button'
      tabIndex={0}
      aria-label={TEXTOS.AGREGAR_CLIENTE}
    >
      <Icono nombre='Add' size='large' />
      <Texto variant='button' sx={{ mt: 1 }}>
        {TEXTOS.AGREGAR_CLIENTE}
      </Texto>
    </Box>
  );
};

export default AgregarClienteTarjeta;
