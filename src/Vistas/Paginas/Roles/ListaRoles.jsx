//RF[7] Consulta Lista de Roles - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF7]
import React, { useState } from 'react';
import CustomDataGrid from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import { useConsultarRoles } from '@Hooks/Roles/useConsultarRoles';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '@SRC/theme';
import { useNavigate } from 'react-router-dom';
import { RUTAS } from '@Constantes/rutas';
import ModalCrearRol from '@Organismos/ModalCrearRol';
import { PERMISOS } from '@Utilidades/Constantes/permisos';
import { useAuth } from '@Hooks/AuthProvider';
import Alerta from '@Moleculas/Alerta';
import PopUp from '@Moleculas/PopUp';
import { useEliminarRol } from '@Hooks/Roles/useEliminarRol';
import NavegadorAdministrador from '@Organismos/NavegadorAdministrador';

const estiloImagenLogo = { marginRight: '1rem' };
// ID del superusuario que no debe ser eliminado
const SUPERUSER_ID = 1;
const SUPERVISOR_ID = 2;
const EMPLEADO_ID = 3;

const ListaRoles = () => {
  const { roles, cargando, error, recargar } = useConsultarRoles();
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);
  const navigate = useNavigate();

  const MENSAJE_POPUP_ELIMINAR = '¿Estás seguro de que deseas eliminar los roles seleccionados?';

  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [alerta, setAlerta] = useState(null);
  const { eliminar } = useEliminarRol();
  const [seleccionados, setSeleccionados] = useState([]);
  const [abrirPopupEliminar, setAbrirPopupEliminar] = useState(false);
  const manejarCancelarElimnar = () => {
    setAbrirPopupEliminar(false);
  };

  const { usuario } = useAuth();

  const manejarCrearRolExitoso = () => {
    setAlerta({
      tipo: 'success',
      mensaje: 'Rol creado exitosamente.',
      icono: true,
      cerrable: true,
      centradoInferior: true,
      duracion: 3000,
    });
    recargar();
  };

  const manejarCerrarSesion = async () => {
    await cerrarSesion();
  };

  const verificarSeleccion = (seleccion) => {
      const IDS_PROTEGIDOS = [SUPERUSER_ID, SUPERVISOR_ID, EMPLEADO_ID];
    const seleccionSinSuperuser = seleccion.filter((id) => !IDS_PROTEGIDOS.includes(Number(id)));

    if (seleccion.length !== seleccionSinSuperuser.length) {
      setAlerta({
        tipo: 'warning',
        mensaje:
          'No se pueden eliminar los roles protegidos (Super Admin, Empleado). Se procederá con los demás roles seleccionados.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
        //duracion: 3500,
      });
    }

    return seleccionSinSuperuser;
  };

  const manejarConfirmarEliminar = async () => {
    try {
      const seleccionFiltrada = verificarSeleccion(seleccionados);

      if (seleccionFiltrada.length === 0) {
        setAbrirPopupEliminar(false);
        return;
      }

      await eliminar(seleccionFiltrada);
      recargar();

      if (seleccionados.length !== seleccionFiltrada.length) {
        setAlerta({
          tipo: 'success',
          mensaje:
            'Roles eliminados correctamente, excepto el rol protegido que está protegido.',
          icono: true,
          cerrable: true,
          centradoInferior: true,
          duracion: 3000,
        });
      } else {
        setAlerta({
          tipo: 'success',
          mensaje: 'Roles eliminados correctamente.',
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
      }

      if (seleccionFiltrada.length === seleccionados.length) {
        setSeleccionados([]);
      } else {
        const superuserSeleccionado = seleccionados.filter((id) => Number(id) === SUPERUSER_ID);
        setSeleccionados(superuserSeleccionado);
      }
    } catch (error) {
      console.error('Error al eliminar roles:', error);
      setAlerta({
        tipo: 'error',
         mensaje: error.message || 'Ocurrió un error al eliminar los roles. Puedes intentarlo de nuevo.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
        duracion: 3000,
      });
    } finally {
      setAbrirPopupEliminar(false);
    }
  };

  const columnas = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 0.5,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      flex: 1.5,
      headerAlign: 'center',
    },
  ];

  const redirigirAUsuarios = () => {
    const path = `${RUTAS.SISTEMA_ADMINISTRATIVO.BASE}${RUTAS.SISTEMA_ADMINISTRATIVO.USUARIOS.BASE}`;
    navigate(path, { replace: true });
  };

  const filas = roles.map((rol) => ({
    id: rol.idRol,
    nombre: rol.nombre,
    descripcion: rol.descripcion,
    estado: rol.estado,
    urlImagen: rol.urlImagen,
  }));

  const handleCerrarModalCrear = () => {
    setModalCrearAbierto(false);
  };

  const botones = [
    {
      label: 'Añadir',
      variant: 'contained',
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: () => setModalCrearAbierto(true),
    },
    {
      label: 'Eliminar',
      variant: 'contained',
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: () => {
        if (seleccionados.length === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un rol para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          const seleccionFiltrada = verificarSeleccion(seleccionados);
          const IDS_PROTEGIDOS = [SUPERUSER_ID, SUPERVISOR_ID, EMPLEADO_ID];

          if (seleccionFiltrada.length > 0) {
            setAbrirPopupEliminar(true);
          } else if (
            seleccionFiltrada.length === 0 
              && seleccionados.some(id => IDS_PROTEGIDOS.includes(Number(id)))
          ) {
            setAlerta({
              tipo: 'warning',
              mensaje:
                'No se pueden eliminar los roles protegidos (Super Admin, Empleado).',
              icono: true,
              cerrable: true,
              centradoInferior: true,
              duracion: 2500,
            });
          }
        }
      },
      disabled: !usuario.permisos?.includes(PERMISOS.ELIMINAR_ROL),
    },
  ];
  const botonesBarraAdministradora = [
    {
      label: 'Atrás',
      variant: 'outlined',
      color: 'secondary',
      outlineColor: colores.altertex[1],
      size: 'large',
      onClick: redirigirAUsuarios,
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
  const { cerrarSesion } = useAuth();
  const redirigirATienda = () => {
    navigate(RUTAS.SISTEMA_TIENDA.BASE, { replace: true });
  };

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
        titulo={<span style={{ textAlign: 'center', display: 'block' }}>Lista Roles</span>}
        descripcion={
          <span style={{ textAlign: 'center', display: 'block' }}>
            Gestiona y organiza los roles registrados en el sistema.
          </span>
        }
        informacionBotones={botones}
      >
        <Box sx={{ mt: '20px' }}>
          {error && (
            <Typography
              variant='h6'
              color='error'
              sx={{ textAlign: 'center', marginBottom: '20px' }}
            >
              Error: {error}
            </Typography>
          )}

          <CustomDataGrid
            columns={columnas}
            rows={filas}
            loading={cargando}
            disableRowSelectionOnClick={true}
            checkboxSelection
            onRowSelectionModelChange={(seleccion) => {
              const ids = Array.isArray(seleccion) ? seleccion : Array.from(seleccion?.ids || []);
              setSeleccionados(ids);
            }}
            getRowClassName={(params) =>
              Number(params.id) === SUPERUSER_ID ? 'superuser-row' : ''
            }
            sx={{
              '& .superuser-row': {
                backgroundColor: 'rgba(255, 217, 102, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 217, 102, 0.3)',
                },
              },
            }}
          />
        </Box>
      </ContenedorLista>

      <ModalCrearRol
        abierto={modalCrearAbierto}
        onCerrar={handleCerrarModalCrear}
        onRolCreado={manejarCrearRolExitoso}
      />

      {alerta && (
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          icono={alerta.icono}
          cerrable={alerta.cerrable}
          duracion={alerta.duracion}
          centradoInferior={alerta.centradoInferior}
          onClose={() => setAlerta(null)}
        />
      )}

      <PopUp
        abrir={abrirPopupEliminar}
        cerrar={manejarCancelarElimnar}
        confirmar={manejarConfirmarEliminar}
        dialogo={MENSAJE_POPUP_ELIMINAR}
      />
    </>
  );
};

export default ListaRoles;
