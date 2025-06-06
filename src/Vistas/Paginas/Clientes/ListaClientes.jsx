// ListaClientes.jsx
// RF14 - Actualiza Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF14
// RF13 Leer cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF13
// RF15 Elimina Cliente - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF15

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
import { PERMISOS } from '@SRC/Utilidades/Constantes/permisos';
import { useState } from 'react';
import ModalCrearCliente from '@Organismos/Clientes/ModalCrearCliente';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
  const MySwal = withReactContent(Swal);
  const colores = tokens(tema.palette.mode);
  const navegar = useNavigate();
  const { usuario, nombreUsuario, cerrarSesion } = useAuth();
  const [abrirCrearCliente, setAbrirCliente] = useState(false);

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
    onCambioTextoConfirmacion,
    errorNombre,
  } = useClientes();

  const handleAbrirCrearCliente = () => setAbrirCliente(true);

  const handleCerrarCliente = () => setAbrirCliente(false);

  const handleClienteCreadoExitosamente = () => {
    handleCerrarCliente();
    MySwal.fire({
      title: <p>Por seguridad, se cerrará tu sesión</p>,
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 3000, // Muestra esta alerta por 3 segundos
      timerProgressBar: true,
    }).then(() => {
      cerrarSesion();
    });
  };

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
      outlineColor: colores.altertex[1],
      size: 'large',
      onClick: () =>
        navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE + RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.BASE),
    },
    {
      label: 'Configuración',
      variant: 'outlined',
      color: 'secondary',
      size: 'large',
      construccion: true,
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
          Hola, {nombreUsuario} 👋
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
            {usuario?.permisos?.includes(PERMISOS.CREAR_CLIENTE) && (
              <TarjetaAccion
                icono='Add'
                texto='Agregar cliente'
                onClick={handleAbrirCrearCliente}
              />
            )}
          </Box>
        )}
      </Box>

      <ModalCrearCliente
        abierto={abrirCrearCliente}
        onCerrar={handleCerrarCliente}
        onCreado={handleClienteCreadoExitosamente}
      />

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
        onCambioTextoConfirmacion={onCambioTextoConfirmacion}
        errorNombre={errorNombre}
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
