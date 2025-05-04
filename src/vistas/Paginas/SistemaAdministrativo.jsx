import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import Cookies from 'js-cookie';
import BarraLateral from '../componentes/Organismos/BarraLateral';
import NavegadorAdministrador from '../componentes/Organismos/NavegadorAdministrador'; // Faltaba

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
        <Outlet />
      </Box>
    </Box>
  );
};

export default SistemaAdministrativo;
