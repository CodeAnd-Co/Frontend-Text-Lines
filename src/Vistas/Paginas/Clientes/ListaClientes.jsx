import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from '@Hooks/AuthProvider';
import Icono from '@Atomos/Icono';
import Cargador from '@Atomos/Cargador';
import Texto from '@Atomos/Texto';
import Alerta from '@Moleculas/Alerta';
import NavegadorAdministrador from '@Organismos/NavegadorAdministrador';
import TarjetaConImagen from '@Moleculas/TarjetaConImagen';
import ModalFlotante from '@Organismos/ModalFlotante';
import Cookies from 'js-cookie';
import { RUTAS } from '@Constantes/rutas';
import { useConsultarClientes } from '@Hooks/Clientes/useConsultarClientes';
import { useSeleccionarCliente } from '@Hooks/Clientes/useSeleccionarCliente';
import { useEliminarCliente } from '@Hooks/Clientes/useEliminarCliente';
import { useState, useEffect, useRef } from 'react';

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
  const { clientes: clientesOriginales, cargando, error } = useConsultarClientes();
  const [clientes, setClientes] = useState([]);
  const { seleccionarCliente } = useSeleccionarCliente();
  const [idEliminar, setIdEliminar] = useState(null);
  const [eliminacionExitosa, setEliminacionExitosa] = useState(false);
  const { error: errorEliminacion } = useEliminarCliente(
    idEliminar,
    setEliminacionExitosa,
    (idClienteEliminado) => {
      setClientes((prev) => prev.filter((cliente) => cliente.idCliente !== idClienteEliminado));
      Cookies.remove('imagenClienteSeleccionado');
      Cookies.remove('nombreClienteSeleccionado');
      seleccionarCliente(null);
      setIdEliminar(null);
    }
  );

  const [modoEliminacion, setModoEliminacion] = useState(false);
  const tiempoPresionado = useRef(null);
  const ignorarPrimerClick = useRef(false);
  const [clienteEliminar, setClienteEliminar] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const manejarInicioPresionado = () => {
    tiempoPresionado.current = setTimeout(() => {
      setModoEliminacion(true);
      ignorarPrimerClick.current = true;
    }, 800);
  };

  const manejarFinPresionado = () => {
    if (!modoEliminacion) {
      clearTimeout(tiempoPresionado.current);
    }
  };

  useEffect(() => {
    const manejarClickFuera = () => {
      if (ignorarPrimerClick.current) {
        ignorarPrimerClick.current = false;
        return;
      }
      if (modoEliminacion) {
        setModoEliminacion(false);
      }
    };
    document.addEventListener('click', manejarClickFuera);
    return () => document.removeEventListener('click', manejarClickFuera);
  }, [modoEliminacion]);

  useEffect(() => {
    if (clientesOriginales) {
      setClientes(clientesOriginales);
    }
  }, [clientesOriginales]);

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

  const handleClickCliente = (clienteId, urlImagen, nombreComercial) => {
    const idCliente = parseInt(clienteId, 10);
    seleccionarCliente(idCliente);
    Cookies.set('imagenClienteSeleccionado', urlImagen, { expires: 1 });
    Cookies.set('nombreClienteSeleccionado', nombreComercial, { expires: 1 });
  };

  const abrirModalEliminar = (cliente) => {
    setClienteEliminar(cliente);
    setModalAbierto(true);
  };

  const confirmarEliminacion = () => {
    if (!clienteEliminar) return;
    setIdEliminar(clienteEliminar.idCliente);
    setModalAbierto(false);
    setClienteEliminar(null);
  };

  const cancelarEliminacion = () => {
    setModalAbierto(false);
    setClienteEliminar(null);
  };

  const renderTarjetaCliente = (cliente) => (
    <Box
      key={cliente.idCliente}
      sx={estiloTarjeta}
      onMouseDown={manejarInicioPresionado}
      onMouseUp={manejarFinPresionado}
      onTouchStart={manejarInicioPresionado}
      onTouchEnd={manejarFinPresionado}
    >
      <TarjetaConImagen
        src={cliente.urlImagen}
        alt={cliente.nombreComercial}
        titulo={cliente.nombreComercial}
        nombreIcono={modoEliminacion ? 'Delete' : 'Info'} // nuevo
        varianteIcono='outlined'
        tamanoIcono='large'
        colorIcono={modoEliminacion ? 'error' : 'action'} //nuevo
        iconoClickeable={true}
        ajuste='contain'
        anchoImagen='100%'
        alturaImagen='250px'
        tooltipIcono={
          modoEliminacion ? 'Eliminar cliente' : `Ver información de ${cliente.nombreComercial}`
        } // nuevo
        clickeableImagen={true}
        elevacion={3}
        alClicImagen={() =>
          handleClickCliente(cliente.idCliente, cliente.urlImagen, cliente.nombreComercial)
        }
        alClicIcono={() => {
          if (modoEliminacion) {
            abrirModalEliminar(cliente);
          }
        }}
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

      <ModalFlotante
        open={modalAbierto}
        onClose={cancelarEliminacion}
        onConfirm={confirmarEliminacion}
        titulo={`¿Estás seguro de que deseas eliminar a ${clienteEliminar?.nombreComercial}?`}
        confirmLabel='Confirmar'
        cancelLabel='Cancelar'
      >
        <Texto>Esta acción no se puede deshacer.</Texto>
      </ModalFlotante>

      {errorEliminacion && (
        <Alerta tipo='error' mensaje={errorEliminacion} icono cerrable centradoInferior />
      )}

      {eliminacionExitosa && (
        <Alerta
          tipo='success'
          mensaje='Cliente eliminado exitosamente.'
          icono
          cerrable
          centradoInferior
          duracion={3000}
          onClose={() => setEliminacionExitosa(false)}
        />
      )}
    </>
  );
};

export default ListaClientes;
