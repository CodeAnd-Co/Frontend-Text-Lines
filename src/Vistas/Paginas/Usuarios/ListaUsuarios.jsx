//RF02 Super Administrador Consulta Lista de Usuarios - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF2
//RF05 Super Administrador Consulta Lista de Usuarios - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF5

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioCrearUsuario from '@Organismos/Formularios/FormularioCrearUsuario';
import ModalFlotante from '@Organismos/ModalFlotante';
import Alerta from '@Moleculas/Alerta';
import ContenedorLista from '@Organismos/ContenedorLista';
import Tabla from '@Organismos/Tabla';
import Chip from '@Atomos/Chip';
import { useConsultarListaUsuarios } from '@Hooks/Usuarios/useConsultarListaUsuarios';
import { useEliminarUsuarios } from '@Hooks/Usuarios/useEliminarUsuarios';
import { RUTAS } from '@Constantes/rutas';
import { useMode, tokens } from '@SRC/theme';
import NavegadorAdministrador from '@Organismos/NavegadorAdministrador';
import { useUsuarioId } from '@Hooks/Usuarios/useLeerUsuario';
import InfoUsuario from '@Moleculas/UsuarioInfo';
import PopUp from '@SRC/Vistas/Componentes/Moleculas/PopUpEliminar';
const estiloImagenLogo = { marginRight: '1rem' };

/**
 * Página para consultar y mostrar la lista de usuarios en una tabla.
 *
 * Muestra los resultados en un `Tabla`, incluyendo
 * nombre, rol, cliente asociado, correo y teléfono de cada usuario.
 *
 * Además, permite consultar la información detallada de un usuario individual
 * al hacer clic en una fila de la tabla.
 *
 * @see [RF02 Super Administrador Consulta Lista de Usuarios](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF2)
 * @see [RF03 Leer usuario](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF3)
 * @see [RF05 Super Administrador Eliminar Usuario](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF5)
 */

const ListaUsuarios = () => {
  const [theme] = useMode();
  const colores = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [alerta, setAlerta] = useState(null);
  const { usuarios, cargando, error, recargar } = useConsultarListaUsuarios();

  const [modalCrearUsuarioAbierto, setModalCrearUsuarioAbierto] = useState(false);
  const [idUsuarioSeleccionado, setIdUsuarioSeleccionado] = useState(null);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const {
    usuario,
    cargando: cargandoDetalle,
    error: errorDetalle,
  } = useUsuarioId(modalDetalleAbierto ? idUsuarioSeleccionado : null);

  const redirigirAInicio = () => {
    navigate(RUTAS.SISTEMA_ADMINISTRATIVO.BASE, { replace: true });
  };

  const manejarCerrarSesion = async () => {};

  const {
    usuariosAEliminar,
    abrirPopUp,
    manejarSeleccion,
    manejarAbrirPopUp,
    manejarCerrarPopUp,
    eliminarUsuarios,
  } = useEliminarUsuarios(setAlerta, recargar);

  useEffect(() => {}, [usuariosAEliminar]);

  const manejarEliminarUsuarios = async () => {
    await eliminarUsuarios();
  };

  const manejarSeleccionUsuarios = (seleccionados) => {
    // seleccionados: { type: 'include', ids: Set }
    const ids = Array.from(seleccionados.ids || []);
    const roles = new Set();

    ids.forEach((id) => {
      const fila = rows.find((row) => row.id === id);
      if (fila && fila.rol) {
        roles.add(fila.rol);
      }
    });

    manejarSeleccion({
      ids: new Set(ids),
      rol: roles,
    });
  };

  const handleOpen = () => setModalCrearUsuarioAbierto(true);
  const handleClose = () => setModalCrearUsuarioAbierto(false);

  const columns = [
    { field: 'idUsuario', headerName: 'ID Usuario', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'rol', headerName: 'Rol', flex: 1 },
    {
      field: 'cliente',
      headerName: 'Cliente',
      flex: 1,
      renderCell: (params) => {
        const isSuspendido = params.row.estatus === 0;
        const clientes = Array.isArray(params.value)
          ? params.value
          : params.value
          ? [params.value]
          : [];

        if (isSuspendido) {
          return (
            <Chip
              label='Suspendido'
              variant='filled'
              size='medium'
              shape='circular'
              backgroundColor='#ffa726'
              textColor='#ffffff'
            />
          );
        }

        if (clientes.length === 0) {
          return (
            <Chip
              label='N/A'
              variant='filled'
              size='medium'
              shape='circular'
              backgroundColor='#f0f0f0'
              textColor='#000000'
            />
          );
        }

        const clientesConcatenados = clientes.join(', ');

        return (
          <Chip
            label={clientesConcatenados}
            variant='filled'
            size='medium'
            shape='circular'
            backgroundColor='#f0f0f0'
            textColor='#000000'
          />
        );
      },
    },
    { field: 'correo', headerName: 'Correo electrónico', flex: 1 },
    { field: 'telefono', headerName: 'Telefono', flex: 1 },
  ];

  const rows = Object.values(
    usuarios.reduce((acc, usuario) => {
      const id = usuario.idUsuario;
      if (!acc[id]) {
        acc[id] = {
          id,
          idUsuario: id,
          nombre: usuario.nombre,
          rol: usuario.rol || 'Sin rol',
          cliente: usuario.cliente ? [usuario.cliente] : [],
          estatus: usuario.estatus,
          correo: usuario.correo,
          telefono: usuario.telefono,
        };
      } else {
        if (usuario.cliente) {
          acc[id].cliente.push(usuario.cliente);
        }
      }
      return acc;
    }, {})
  );

  const botones = [
    {
      label: 'Roles',
      onClick: () =>
        navigate(
          `${RUTAS.SISTEMA_ADMINISTRATIVO.BASE}${RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.BASE}${RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.CONSULTAR_ROLES}`
        ),
      variant: 'contained',
      size: 'large',
      sx: {
        backgroundColor: colores.verde[1],
        color: '#fff',
        '&:hover': {
          backgroundColor: colores.verde[1],
          opacity: 0.9,
        },
      },
    },

    {
      label: 'Añadir',
      onClick: handleOpen,
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
    {
      label: 'Eliminar',
      onClick: manejarAbrirPopUp,
      variant: 'contained',
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
  ];

  const redirigirATienda = () => {
    navigate(RUTAS.SISTEMA_TIENDA.BASE, { replace: true });
  };

  const botonesBarraAdministradora = [
    {
      label: 'Atras',
      variant: 'outlined',
      color: 'secondary',
      size: 'large',
      onClick: redirigirAInicio,
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
        informacionBotones={botonesBarraAdministradora}
      />
      <ContenedorLista
        titulo={<span style={{ textAlign: 'center', display: 'block' }}>Usuarios</span>}
        descripcion={
          <span style={{ textAlign: 'center', display: 'block' }}>
            Gestiona y organiza los usuarios registrados en el sistema.
          </span>
        }
        informacionBotones={botones}
      >
        {alerta && (
          <Alerta
            tipo={alerta.tipo}
            mensaje={alerta.mensaje}
            cerrable
            duracion={4000}
            onClose={() => setAlerta(null)}
          />
        )}
        {modalCrearUsuarioAbierto && (
          <FormularioCrearUsuario open={modalCrearUsuarioAbierto} onClose={handleClose} />
        )}

        <PopUp
          abrir={abrirPopUp}
          cerrar={manejarCerrarPopUp}
          confirmar={manejarEliminarUsuarios}
          dialogo={`¿Estás seguro de que deseas eliminar ${usuariosAEliminar.ids.size} usuario(s) seleccionado(s)?`}
          labelCancelar='Cancelar'
          labelConfirmar='Eliminar'
        />

        <div style={{ marginTop: 20, height: 650, width: '100%' }}>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          <Tabla
            columns={columns}
            rows={rows}
            loading={cargando}
            pageSize={10}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={manejarSeleccionUsuarios}
            onRowClick={(params) => {
              setIdUsuarioSeleccionado(params.row.idUsuario);

              setModalDetalleAbierto(true);
            }}
          />
        </div>

        {modalDetalleAbierto && (
          <ModalFlotante
            open={modalDetalleAbierto}
            onClose={() => setModalDetalleAbierto(false)}
            onConfirm={() => setModalDetalleAbierto(false)}
            titulo={usuario?.nombreCompleto || 'Cargando...'}
            tituloVariant='h4'
            botones={[
              {
                label: 'EDITAR',
                variant: 'contained',
                color: 'primary',
                backgroundColor: colores.altertex[1],
                onClick: () => console.log('Editar usuario'),
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
              <p>Cargando usuario...</p>
            ) : usuario ? (
              <InfoUsuario
                modoEdicion={false}
                cliente={
                  usuario.clientes?.some((cliente) => cliente?.nombreCliente)
                    ? usuario.clientes
                        .filter((cliente) => cliente?.nombreCliente)
                        .map((cliente) => cliente.nombreCliente)
                        .join(', ')
                    : 'Sin cliente asignado'
                }
                rol={usuario.rol}
                datosContacto={{
                  email: usuario.correoElectronico,
                  telefono: usuario.numeroTelefono,
                  direccion: usuario.direccion,
                }}
                datosAdicionales={{
                  nacimiento: new Date(usuario.fechaNacimiento).toLocaleDateString('es-MX'),
                  genero: usuario.genero,
                }}
                estadoUsuario={{
                  label: usuario.estatus === 1 ? 'Activo' : 'Inactivo',
                  color: 'primary',
                  shape: 'circular',
                  backgroundColor: 'rgba(24, 50, 165, 1)',
                }}
                opcionesRol={[
                  { value: 'Super Administrador', label: 'Administrador' },
                  { value: 'Supervisor', label: 'Supervisor' },
                  { value: 'Empleado', label: 'Usuario' },
                ]}
              />
            ) : (
              <p>No se encontró información del usuario.</p>
            )}
          </ModalFlotante>
        )}

        {errorDetalle && (
          <div style={{ marginTop: '2rem' }}>
            <Alerta tipo='error' mensaje={errorDetalle} icono cerrable centradoInferior />
          </div>
        )}
      </ContenedorLista>
    </>
  );
};

export default ListaUsuarios;
