// ListaClientes.jsx
// RF14 - Actualiza Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF14

import { useNavigate } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { tokens } from '@SRC/theme';
import Texto from '@Atomos/Texto';
import Cargador from '@Atomos/Cargador';
import TarjetaAccion from '@Moleculas/TarjetaAccion';
import { ClientesLista } from '@Organismos/Clientes/ClientesLista';
import NavegadorAdministrador from '@Organismos/NavegadorAdministrador';
import { EliminarClienteModal } from '@Organismos/Clientes/EliminarClientesModal';
import { DetalleClienteModal } from '@Organismos/Clientes/DetalleClienteModal';
import { RUTAS } from '@Utilidades/Constantes/rutas';
import { useClientes } from '@Hooks/Clientes/useClientes';
import { useAuth } from '@Hooks/AuthProvider';

// Estilos
const estiloImagenLogo = { marginRight: '1rem' };
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
  const navegar = useNavigate();
  const { cerrarSesion } = useAuth();

  const {
    clientes,
    cargando,
    error,
    modoEliminacion,
    clienteEliminar,
    modalEliminacionAbierto,
    idClienteDetalle,
    modalDetalleAbierto,
    clienteEditado,
    modoEdicion,
    eliminacionExitosa,
    errorEliminacion,
    handleClienteClick,
    handleIconoClick,
    confirmarEliminacion,
    cancelarEliminacion,
    cerrarModalDetalle,
    toggleModoEdicion,
    handleClienteChange,
    cerrarAlertaExito,
    handleImagenChange,
    handleToggleEliminar,
    imagenSubiendo,
    imagenError,
    textoConfirmacion,
    botonDeshabilitado,
    handleChangeTextoConfirmacion,
  } = useClientes();

  const manejarCerrarSesion = async () => {
    await cerrarSesion();
  };

  const redirigirATienda = () => {
    navegar(RUTAS.SISTEMA_TIENDA.BASE, { replace: true });
  };

  const informacionBotones = [
    {
      label: 'Usuarios',
      variant: 'outlined',
      color: 'secondary',
      size: 'large',
      onClick: () =>
        navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE + RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.BASE),
    },
    {
      label: 'Configuración',
      variant: 'outlined',
      color: 'secondary',
      size: 'large',
      onClick: () =>
        navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE + RUTAS.SISTEMA_ADMINISTRATIVO.CONFIGURACION),
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
        estiloImagen={estiloImagenLogo}
        alClicIcono={redirigirATienda}
        informacionBotones={informacionBotones}
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
              onClienteClick={handleClienteClick}
              onIconoClick={handleIconoClick}
            />
            <TarjetaAccion
              icono='Add'
              texto='Agregar cliente'
              onClick={() => console.log('Agregar cliente')}
            />
          </Box>
        )}
      </Box>

      <EliminarClienteModal
        open={modalEliminacionAbierto}
        cliente={clienteEliminar}
        onConfirm={confirmarEliminacion}
        onCancel={cancelarEliminacion}
        eliminacionExitosa={eliminacionExitosa}
        errorEliminacion={errorEliminacion}
        onCloseAlert={cerrarAlertaExito}
        textoConfirmacion={textoConfirmacion}
        botonDeshabilitado={botonDeshabilitado}
        onChangeTextoConfirmacion={handleChangeTextoConfirmacion}
      />

      <DetalleClienteModal
        open={modalDetalleAbierto}
        cliente={clienteEditado}
        modoEdicion={modoEdicion}
        cargando={idClienteDetalle && !clienteEditado}
        colores={colores}
        onClose={cerrarModalDetalle}
        onToggleEdicion={toggleModoEdicion}
        onToggleEliminar={handleToggleEliminar}
        onChange={handleClienteChange}
        onImageChange={handleImagenChange}
        imagenSubiendo={imagenSubiendo}
        imagenError={imagenError}
      />
    </>
  );
};

export default ListaClientes;
