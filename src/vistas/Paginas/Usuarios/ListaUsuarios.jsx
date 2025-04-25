//RF02 Super Administrador Consulta Lista de Usuarios - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF2
//RF1 - Crear Usuario - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF1
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../../hooks/AuthProvider';
import ModalFlotante from '../../componentes/organismos/ModalFlotante';
import FormularioCrearUsuario from '../../componentes/organismos/Formularios/FormularioCrearUsuario';
import Alerta from '../../componentes/moleculas/Alerta';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import Tabla from '../../componentes/organismos/Tabla';
import Chip from '../../componentes/atomos/Chip';
import { useConsultarListaUsuarios } from '../../../hooks/Usuarios/useConsultarListaUsuarios';
import { useCrearUsuario } from '../../../hooks/Usuarios/useCrearUsuario';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';
import { useMode, tokens } from '../../../theme';
import NavegadorAdministrador from '../../Componentes/Organismos/NavegadorAdministrador';

const estiloImagenLogo = { marginRight: '1rem' };

const ListaUsuarios = () => {
  const [theme] = useMode();
  const colores = tokens(theme.palette.mode);
  const [alerta, setAlerta] = useState(null);
  const { usuarios, cargando, error } = useConsultarListaUsuarios();
  const navigate = useNavigate();
  const {
    open,
    datosUsuario,
    errores,
    setDatosUsuario,
    handleOpen,
    handleClose,
    handleGuardarUsuario,
  } = useCrearUsuario();

  const manejarConfirmacion = async () => {
    const resultado = await handleGuardarUsuario();

    if (resultado?.mensaje) {
      setAlerta({
        tipo: resultado.exito ? 'success' : 'error',
        mensaje: resultado.mensaje,
      });
    }
  };

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
        backgroundColor: colores.verde[1],
        color: '#fff',
        '&:hover': {
          backgroundColor: colores.verde[1],
          opacity: 0.9,
          opacity: 0.9,
        },
      },
    },
    {
      label: 'Añadir',
      onClick: () => handleOpen(),
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
    {
      label: 'Eliminar',
      onClick: () => redirigirAInicio(),
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
      onClick: () => navigate(RUTAS.SISTEMA_ADMINISTRATIVO.BASE),
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
  const manejarCerrarSesion = async () => {
    await cerrarSesion();
  };
  const { cerrarSesion } = useAuth();

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
        {alerta && (
          <Alerta
            tipo={alerta.tipo}
            mensaje={alerta.mensaje}
            cerrable
            duracion={4000}
            centradoInferior
            onClose={() => setAlerta(null)}
          />
        )}

        <ModalFlotante
          open={open}
          onClose={handleClose}
          onConfirm={manejarConfirmacion}
          titulo='Crear nuevo usuario'
        >
          <FormularioCrearUsuario
            datosUsuario={datosUsuario}
            setDatosUsuario={setDatosUsuario}
            errores={errores}
          />
        </ModalFlotante>

        <div style={{ marginTop: 20, height: 650, width: '100%' }}>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          <Tabla columns={columns} rows={rows} loading={cargando} checkboxSelection pageSize={10} />
        </div>
      </ContenedorLista>
    </>
  );
};

export default ListaUsuarios;
