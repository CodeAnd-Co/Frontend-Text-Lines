import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from '../../../hooks/AuthProvider';
import Icono from '../../Componentes/Atomos/Icono';
import Cargador from '../../Componentes/Atomos/Cargador';
import Texto from '../../Componentes/Atomos/Texto';
import NavegadorAdministrador from '../../Componentes/Organismos/NavegadorAdministrador';
import TarjetaConImagen from '../../Componentes/Moleculas/TarjetaConImagen';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

const CLIENTES_SIMULADOS = [
  {
    id: 1,
    nombre: 'Toyota',
    imagen: 'https://1000marcas.net/wp-content/uploads/2019/12/logo-Toyota.png',
  },
  {
    id: 2,
    nombre: 'La Esquina Gourmet',
    imagen:
      'https://img.freepik.com/vector-premium/logo-restaurante-retro_23-2148474404.jpg?semt=ais_hybrid&w=740',
  },
];

const estiloImagenLogo = { marginRight: '1rem' };

const estiloTarjeta = {
  minWidth: { xs: '100%', sm: '250px', md: '300px' },
  maxWidth: '100%',
  flexGrow: 1,
};

const estiloTitulo = {
  margin: { xs: '2rem 0', sm: '4rem 0', md: '6rem 0' },
  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
};

const estiloTarjetaAgregar = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed #90CAF9',
  backgroundColor: '#E3F2FD',
  color: '#1976D2',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#BBDEFB',
    transform: 'scale(1.03)',
  },
};

const ListaClientes = () => {
  const navigate = useNavigate();
  const { cerrarSesion } = useAuth();
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClientes(CLIENTES_SIMULADOS);
      setCargando(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const manejarCerrarSesion = async () => {
    await cerrarSesion();
    navigate(RUTAS.INICIO_SESION);
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
    console.log('Cliente clickeado ID:', clienteId);
  };

  const renderTarjetaCliente = (cliente) => (
    <Box key={cliente.id} sx={estiloTarjeta}>
      <TarjetaConImagen
        src={cliente.imagen}
        alt={cliente.nombre}
        titulo={cliente.nombre}
        nombreIcono='Info'
        varianteIcono='outlined'
        tamanoIcono='large'
        colorIcono='action'
        iconoClickeable={true}
        ajuste='contain'
        anchoImagen='100%'
        alturaImagen='250px'
        tooltipIcono={`Ver información de ${cliente.nombre}`}
        clickeableImagen={true}
        elevacion={4}
        alClicImagen={() => handleClickCliente(cliente.id)}
        alClicIcono={() => handleClickCliente(cliente.id)}
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
        src='/logoAltertexLogin.svg'
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
          ¡Bienvenid@!
        </Texto>
        {cargando ? (
          <Cargador />
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
