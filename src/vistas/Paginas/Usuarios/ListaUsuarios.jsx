//RF02 Super Administrador Consulta Lista de Usuarios - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF2
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthProvider';
import FormularioCrearUsuario from '../../Componentes/organismos/Formularios/FormularioCrearUsuario';
import ModalFlotante from '../../componentes/organismos/ModalFlotante';
import Alerta from '../../componentes/moleculas/Alerta';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import Tabla from '../../componentes/organismos/Tabla';
import Chip from '../../componentes/atomos/Chip';
import { useConsultarListaUsuarios } from '../../../hooks/Usuarios/useConsultarListaUsuarios';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';
import { useMode, tokens } from '../../../theme';
import NavegadorAdministrador from '../../Componentes/Organismos/NavegadorAdministrador';
import { useUsuarioId } from '../../../hooks/Usuarios/useLeerUsuario';
import InfoUsuario from '../../componentes/moleculas/UsuarioInfo';
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
 */

const ListaUsuarios = () => {
  const [theme] = useMode();
  const colores = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { cerrarSesion } = useAuth();
  const { usuarios, cargando, error } = useConsultarListaUsuarios();

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

        return (
          <Chip
            label={isSuspendido ? 'Suspendido' : params.value || 'N/A'}
            variant='filled'
            size='medium'
            shape='circular'
            backgroundColor={isSuspendido ? '#ffa726' : '#f0f0f0'}
            textColor={isSuspendido ? '#ffffff' : '#000000'}
          />
        );
      },
    },
    { field: 'correo', headerName: 'Correo electrónico', flex: 1 },
    { field: 'telefono', headerName: 'Telefono', flex: 1 },
  ];

  const rows = [
    ...new Map(
      usuarios.map((usuario) => [
        usuario.idUsuario,
        {
          id: usuario.idUsuario,
          idUsuario: usuario.idUsuario,
          nombre: usuario.nombre,
          rol: usuario.rol || 'Sin rol',
          cliente: usuario.cliente,
          estatus: usuario.estatus,
          correo: usuario.correo,
          telefono: usuario.telefono,
        },
      ])
    ).values(),
  ];

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
      onClick: redirigirAInicio,
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
      color: 'error',
      size: 'large',
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
        titulo={<div style={{ textAlign: 'center' }}>Usuarios</div>}
        descripcion={
          <div style={{ textAlign: 'center' }}>
            Gestiona y organiza los usuarios registrados en el sistema.
          </div>
        }
        informacionBotones={botones}
      >
        {modalCrearUsuarioAbierto && (
          <FormularioCrearUsuario open={modalCrearUsuarioAbierto} onClose={handleClose} />
        )}

        <div style={{ marginTop: 20, height: 650, width: '100%' }}>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          <Tabla
            columns={columns}
            rows={rows}
            loading={cargando}
            pageSize={10}
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
