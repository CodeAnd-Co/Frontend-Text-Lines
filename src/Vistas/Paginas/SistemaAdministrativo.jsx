import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@Hooks/AuthProvider';
import Cookies from 'js-cookie';
import BarraLateral from '@Organismos/BarraLateral';
import NavegadorAdministrador from '@Organismos/NavegadorAdministrador'; // Faltaba

const estiloImagenLogo = { marginRight: '1rem' };

const SistemaAdministrativo = () => {
  const { cerrarSesion } = useAuth();
  const imagenCliente = Cookies.get('imagenClienteSeleccionado');
  const nombreCliente = Cookies.get('nombreClienteSeleccionado');

  const manejarCerrarSesion = async () => {
    await cerrarSesion();
  };

  const informacionBotones = [
    {
      label: 'Cerrar sesión',
      variant: 'contained',
      color: 'error',
      size: 'large',
      onClick: () => manejarCerrarSesion(),
    },
  ];

  return (
    <Box display='flex' height='100vh'>
      <BarraLateral />
      <Box component='main' flexGrow={1} overflow='auto'>
        <NavegadorAdministrador
          src={imagenCliente || '/placeholder.png'}
          alt='Logo empresa'
          titulo={nombreCliente}
          nombreIcono='ShoppingCart'
          varianteIcono='outlined'
          tamanoIcono='medium'
          colorIcono='primary'
          iconoClickeable
          tooltipIcono='Acceder a tienda'
          alturaImagen='auto'
          anchoImagen={{ xs: '200px', sm: '250px', md: '400px' }}
          ajuste='contain'
          clickeableImagen={false}
          estiloImagen={estiloImagenLogo}
          alClicIcono={() => {}}
          informacionBotones={informacionBotones}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <img
            src='/sitio-de-construccion.png'
            alt='Fondo'
            style={{
              width: '120px',
              maxWidth: '120px',
              display: 'block',
              marginBottom: '1.5rem',
            }}
          />
          <span style={{ fontSize: '1.5rem', fontWeight: 500 }}>En construcción...</span>
        </Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default SistemaAdministrativo;
