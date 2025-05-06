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

// ID del superusuario que no debe ser eliminado
const SUPERUSER_ID = 1;

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

  // Función para verificar si se está intentando eliminar el superusuario
  const verificarSeleccion = (seleccion) => {
    // Filtrar el ID de superusuario si está en la selección
    const seleccionSinSuperuser = seleccion.filter((id) => Number(id) !== SUPERUSER_ID);

    // Si la selección original tenía el superusuario y ahora no lo tiene
    if (seleccion.length !== seleccionSinSuperuser.length) {
      setAlerta({
        tipo: 'warning',
        mensaje:
          'El rol de superusuario no puede ser eliminado. Se procederá con los demás roles seleccionados.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
        duracion: 3500,
      });
    }

    return seleccionSinSuperuser;
  };

  const manejarConfirmarEliminar = async () => {
    try {
      // Verificar que no se esté intentando eliminar el superusuario
      const seleccionFiltrada = verificarSeleccion(seleccionados);

      // Si no hay roles para eliminar después de filtrar
      if (seleccionFiltrada.length === 0) {
        setAbrirPopupEliminar(false);
        return;
      }

      await eliminar(seleccionFiltrada);
      recargar();

      // Si había algún superusuario en la selección original pero se procedió con los demás roles
      if (seleccionados.length !== seleccionFiltrada.length) {
        setAlerta({
          tipo: 'success',
          mensaje: `Roles eliminados correctamente, excepto el rol de superusuario que está protegido.`,
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

      // No resetear la selección para permitir intentar de nuevo
      // Solo limpiar si todos los seleccionados se eliminaron correctamente
      if (seleccionFiltrada.length === seleccionados.length) {
        setSeleccionados([]);
      } else {
        // Mantener solo el superusuario seleccionado para que el usuario pueda ver qué no se eliminó
        const superuserSeleccionado = seleccionados.filter((id) => Number(id) === SUPERUSER_ID);
        setSeleccionados(superuserSeleccionado);
      }
    } catch (error) {
      console.error('Error al eliminar roles:', error);
      setAlerta({
        tipo: 'error',
        mensaje: 'Ocurrió un error al eliminar los roles. Puedes intentarlo de nuevo.',
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
      align: 'center',
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
          // Verificar si se intenta eliminar el superusuario
          const seleccionFiltrada = verificarSeleccion(seleccionados);

          // Continuar con la eliminación incluso si se intentó eliminar el superusuario
          // pero aún hay otros roles seleccionados
          if (seleccionFiltrada.length > 0) {
            // Mantener los seleccionados originales para la UI, pero usar los filtrados para la eliminación
            setAbrirPopupEliminar(true);
          } else if (
            (seleccionFiltrada.length === 0 && seleccionados.includes(String(SUPERUSER_ID)))
            || (seleccionFiltrada.length === 0 && seleccionados.includes(SUPERUSER_ID))
          ) {
            // Si solo se seleccionó el superusuario, mostrar un mensaje más claro
            setAlerta({
              tipo: 'warning',
              mensaje:
                'No se puede eliminar el rol de super administrador. Por favor, selecciona otros roles.',
              icono: true,
              cerrable: true,
              centradoInferior: true,
              duracion: 3000,
            });
          }
        }
      },
      disabled: !usuario.permisos?.includes(PERMISOS.ELIMINAR_ROL),
    },
    {
      label: 'Atrás',
      onClick: redirigirAUsuarios,
      size: 'large',
      backgroundColor: 'transparent',
      color: colores.primario[2],
      border: `1px solid ${colores.primario[2]}`,
      height: '40px',
    },
  ];

  return (
    <>
      <ContenedorLista
        titulo='Lista de Roles'
        descripcion='Gestiona y organiza los roles registrados en el sistema.'
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

      <ModalCrearRol abierto={modalCrearAbierto} onCerrar={handleCerrarModalCrear} />

      {alerta && (
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          icono={alerta.icono}
          cerrable={alerta.cerrable}
          duracion={2500}
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
