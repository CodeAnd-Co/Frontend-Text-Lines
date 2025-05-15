import { useNavigate } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { useAuth } from '@Hooks/AuthProvider';
import Texto from '@Atomos/Texto';
import Cargador from '@Atomos/Cargador';
import NavegadorAdministrador from '@Organismos/NavegadorAdministrador';
import { tokens } from '@SRC/theme';
import { RUTAS } from '@Utilidades/Constantes/rutas';
import { useClientes } from '@Hooks/Clientes/useClientes';
import { ClientesLista } from '@Organismos/Clientes/ClientesLista';
import { AgregarClienteTarjeta } from '@Organismos/Clientes/AgregarClienteTarjeta';
import { EliminarClienteModal } from '@Organismos/Clientes/EliminarClientesModal';
import { DetalleClienteModal } from '@Organismos/Clientes/DetalleClienteModal';

const estiloLogo = { marginRight: '1rem' };
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
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);
  const redirigir = useNavigate();
  const { cerrarSesion } = useAuth();

  const {
    clientes,
    cargando,
    error,
    modoEliminacion,
    clienteAEliminar,
    modalEliminacionAbierto,
    idClienteDetalle,
    modalDetalleAbierto,
    clienteEditado,
    modoEdicion,
    eliminacionExitosa,
    errorEliminacion,
    alClicCliente,
    alClicIcono,
    alPresionarInicio,
    alPresionarFin,
    confirmarEliminacion,
    cancelarEliminacion,
    cerrarModalDetalle,
    alternarModoEdicion,
    alCambiarCliente,
    cerrarAlertaExito,
    alCambiarImagen,
    imagenSubiendo,
    errorImagen,
  } = useClientes();

  const manejarCerrarSesion = async () => {
    await cerrarSesion();
  };

  const redirigirATienda = () => {
    redirigir(RUTAS.SISTEMA_TIENDA.BASE, { replace: true });
  };

  const botonesNavegacion = [
    {
      label: 'Usuarios',
      variant: 'outlined',
      color: 'secondary',
      size: 'large',
      onClick: () =>
        redirigir(RUTAS.SISTEMA_ADMINISTRATIVO.BASE + RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.BASE),
    },
    {
      label: 'Configuración',
      variant: 'outlined',
      color: 'secondary',
      size: 'large',
      onClick: () =>
        redirigir(RUTAS.SISTEMA_ADMINISTRATIVO.BASE + RUTAS.SISTEMA_ADMINISTRATIVO.CONFIGURACION),
    },
    {
      label: 'Cerrar sesión',
      variant: 'contained',
      color: 'error',
      size: 'large',
      onClick: manejarCerrarSesion,
    },
  ];

  return (
    <>
      <NavegadorAdministrador
        src='/logoAltertexLight.svg'
        alt='Logo empresa'
        alturaImagen='auto'
        anchoImagen={{ xs: '150px', sm: '250px', md: '400px' }}
        ajuste='contain'
        clickeableImagen={false}
        estiloImagen={estiloLogo}
        alClicIcono={redirigirATienda}
        informacionBotones={botonesNavegacion}
      />

      <Box
        width='100%'
        maxWidth='1200px'
        component='main'
        display='flex'
        flexDirection='column'
        alignItems='center'
        margin='auto'
        p={2}
        pb={6}
      >
        <Texto variant='h1' align='center' sx={estiloTitulo}>
          Bienvenid@
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
            <ClientesLista
              clientes={clientes}
              modoEliminacion={modoEliminacion}
              onClienteClick={alClicCliente}
              onIconoClick={alClicIcono}
              onMouseDown={alPresionarInicio}
              onMouseUp={alPresionarFin}
              onTouchStart={alPresionarInicio}
              onTouchEnd={alPresionarFin}
            />
            <AgregarClienteTarjeta />
          </Box>
        )}
      </Box>

      <EliminarClienteModal
        open={modalEliminacionAbierto}
        cliente={clienteAEliminar}
        onConfirm={confirmarEliminacion}
        onCancel={cancelarEliminacion}
        eliminacionExitosa={eliminacionExitosa}
        errorEliminacion={errorEliminacion}
        onCloseAlert={cerrarAlertaExito}
      />

      <DetalleClienteModal
        open={modalDetalleAbierto}
        cliente={clienteEditado}
        modoEdicion={modoEdicion}
        cargando={idClienteDetalle && !clienteEditado}
        colores={colores}
        onClose={cerrarModalDetalle}
        onToggleEdicion={alternarModoEdicion}
        onChange={alCambiarCliente}
        onImageChange={alCambiarImagen}
        imagenSubiendo={imagenSubiendo}
        imagenError={errorImagen}
      />
    </>
  );
};

export default ListaClientes;
