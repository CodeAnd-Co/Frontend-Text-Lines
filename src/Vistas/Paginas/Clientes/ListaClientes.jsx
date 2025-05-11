import { useNavigate } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { useAuth } from '@Hooks/AuthProvider';
import Cargador from '@Atomos/Cargador';
import Texto from '@Atomos/Texto';
import Alerta from '@Moleculas/Alerta';
import TarjetaConImagen from '@Moleculas/TarjetaConImagen';
import TarjetaAccion from '@Moleculas/TarjetaAccion';
import NavegadorAdministrador from '@Organismos/NavegadorAdministrador';
import ModalFlotante from '@Organismos/ModalFlotante';
import ModalCliente from '@Organismos/ModalLeerCliente';
import InfoCliente from '@Moleculas/ClienteInfo';
import Cookies from 'js-cookie';
import { tokens } from '@SRC/theme';
import { RUTAS } from '@Utilidades/Constantes/rutas';
import { useConsultarClientes } from '@Hooks/Clientes/useConsultarClientes';
import { useSeleccionarCliente } from '@Hooks/Clientes/useSeleccionarCliente';
import { useEliminarCliente } from '@Hooks/Clientes/useEliminarCliente';
import { useClientePorId } from '@Hooks/Clientes/useLeerCliente';
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

const ListaClientes = () => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
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

  const [idClienteDetalle, setIdClienteDetalle] = useState(null);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const {
    cliente,
    cargando: cargandoDetalle,
    error: errorDetalle,
  } = useClientePorId(modalDetalleAbierto ? idClienteDetalle : null);

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

  const manejarClickCliente = (clienteId, urlImagen, nombreComercial) => {
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
        }
        clickeableImagen={true}
        elevacion={3}
        alClicImagen={() =>
          manejarClickCliente(cliente.idCliente, cliente.urlImagen, cliente.nombreComercial)
        }
        alClicIcono={() => {
          if (modoEliminacion) {
            abrirModalEliminar(cliente);
          } else {
            setIdClienteDetalle(cliente.idCliente);
            setModalDetalleAbierto(true);
          }
        }}
      />
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
            {
              <TarjetaAccion
                icono='Add'
                texto='Agregar cliente'
                onClick={() => console.log('Agregar cliente')}
              />
            }
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

      {modalDetalleAbierto && (
        <ModalCliente
          open={modalDetalleAbierto}
          onClose={() => setModalDetalleAbierto(false)}
          onConfirm={() => setModalDetalleAbierto(false)}
          titulo={cliente?.nombreVisible || 'Cargando...'}
          tituloVariant='h4'
          botones={[
            {
              label: 'EDITAR',
              variant: 'contained',
              color: 'primary',
              backgroundColor: colores.altertex[1],
              onClick: () => console.log('Editar cliente'),
              disabled: !!errorDetalle,
            },
            {
              label: 'SALIR',
              variant: 'outlined',
              color: 'primary',
              outlineColor: colores.altertex[1],
              onClick: () => setModalDetalleAbierto(false),
            },
          ]}
        >
          {cargandoDetalle ? (
            <Texto>Cargando cliente...</Texto>
          ) : cliente ? (
            <InfoCliente
              idCliente={cliente.idCliente}
              nombreLegal={cliente.nombreLegal}
              nombreVisible={cliente.nombreVisible}
              empleados={cliente.numeroEmpleados}
              usuariosAsignados={cliente.usuariosAsignados}
              imagenURL={cliente.imagenCliente}
            />
          ) : (
            <Texto>No se encontró información del cliente.</Texto>
          )}
        </ModalCliente>
      )}

      {errorDetalle && (
        <div style={{ marginTop: '2rem' }}>
          <Alerta tipo='error' mensaje={errorDetalle} icono cerrable centradoInferior />
        </div>
      )}
    </>
  );
};

export default ListaClientes;
