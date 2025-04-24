import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from '../../../hooks/AuthProvider';
import Icono from '../../componentes/Atomos/Icono';
import Cargador from '../../componentes/Atomos/Cargador';
import Texto from '../../componentes/Atomos/Texto';
import NavegadorAdministrador from '../../Componentes/Organismos/NavegadorAdministrador';
import TarjetaConImagen from '../../componentes/Moleculas/TarjetaConImagen';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';
import { useConsultarClientes } from '../../../hooks/Clientes/useConsultarClientes';
import { useSeleccionarCliente } from '../../../hooks/Clientes/useSeleccionarCliente';

const estiloImagenLogo = { marginRight: '1rem' };

const estiloTarjeta = {
  minWidth: { xs: '100%', sm: '250px', md: '300px' },
  maxWidth: '100%',
  flexGrow: 1,
};

const estiloTitulo = {
  marginTop: { xs: '2rem', sm: '4rem', md: '6rem' },
  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
  textTransform: 'uppercase',
};

const estiloSubtitulo = {
  marginBottom: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
  fontWeight: 500,
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

const ListaClientes = () => {
  const navigate = useNavigate();
  const { cerrarSesion } = useAuth();

  const { clientes, cargando, error } = useConsultarClientes();
  const { seleccionarCliente } = useSeleccionarCliente();

  const manejarCerrarSesion = async () => {
    await cerrarSesion();
  };

  const redirigirATienda = () => {
    navigate(RUTAS.SISTEMA_TIENDA.BASE, { replace: true });
  };

  const informacionBotones = [
    {
      label: 'Usuarios',
      variant: 'outlined',
      color: 'secondary',
      size: 'large',
      onClick: () =>
        navigate(RUTAS.SISTEMA_ADMINISTRATIVO.BASE + RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.BASE),
    },
    {
      label: 'Configuración',
      variant: 'outlined',
      color: 'secondary',
      size: 'large',
      onClick: () =>
        navigate(RUTAS.SISTEMA_ADMINISTRATIVO.BASE + RUTAS.SISTEMA_ADMINISTRATIVO.CONFIGURACION),
    },
    {
      label: 'Cerrar sesión',
      variant: 'contained',
      color: 'error',
      size: 'large',
      onClick: () => manejarCerrarSesion(),
    },
  ];

  const handleClickCliente = (clienteId) => {
    const idCliente = parseInt(clienteId, 10);
    seleccionarCliente(idCliente);
  };

  const renderTarjetaCliente = (cliente) => (
    <Box key={cliente.idCliente} sx={estiloTarjeta}>
      <TarjetaConImagen
        src={cliente.urlImagen}
        alt={cliente.nombreComercial}
        titulo={cliente.nombreComercial}
        nombreIcono='Info'
        varianteIcono='outlined'
        tamanoIcono='large'
        colorIcono='action'
        iconoClickeable={true}
        ajuste='contain'
        anchoImagen='100%'
        alturaImagen='250px'
        tooltipIcono={`Ver información de ${cliente.nombreComercial}`}
        clickeableImagen={true}
        elevacion={3}
        alClicImagen={() => handleClickCliente(cliente.idCliente)}
        alClicIcono={() => handleClickCliente(cliente.idCliente)}
      />
    </Box>
  );

  const renderTarjetaAgregarCliente = () => (
    <Box
      onClick={() => console.log('Agregar cliente')}
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

  return (
    <>
      <NavegadorAdministrador
        src='/logoAltertexLight.svg'
        alt='Logo empresa'
        nombreIcono='ShoppingCart'
        varianteIcono='outlined'
        tamanoIcono='large'
        colorIcono='primary'
        iconoClickeable={true}
        tooltipIcono='Acceder a tienda'
        alturaImagen='auto'
        anchoImagen={{ xs: '150px', sm: '250px', md: '400px' }}
        ajuste='contain'
        clickeableImagen={false}
        estiloImagen={estiloImagenLogo}
        alClicIcono={redirigirATienda}
        informacionBotones={informacionBotones}
      />

      <Box
        width={'100%'}
        maxWidth='1200px'
        component='main'
        display='flex'
        flexDirection='column'
        alignItems='center'
        margin={'auto'}
        p={2}
        pb={6}
      >
        <Texto variant='h1' align='center' sx={estiloTitulo}>
          Bienvenid⭐
        </Texto>
        <Texto variant='h4' align='center' color='text.secondary' sx={estiloSubtitulo}>
          Selecciona un cliente para gestionar su sistema o crea uno nuevo
        </Texto>

        {cargando ? (
          <Cargador />
        ) : error ? (
          <Texto variant='body1' color='error'>{`Error: ${error}`}</Texto>
        ) : (
          <Box
            display='grid'
            gridTemplateColumns={{
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            gap={2}
            width='100%'
          >
            {clientes.map(renderTarjetaCliente)}
            {renderTarjetaAgregarCliente()}
          </Box>
        )}
      </Box>
    </>
  );
};

export default ListaClientes;
