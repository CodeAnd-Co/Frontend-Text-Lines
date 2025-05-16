// RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
// RF23 Lee grupo de empleados -https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF23
import React, { useState } from 'react';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import { useConsultarGrupos } from '@Hooks/Empleados/useConsultarGrupos';
import { tokens } from '@SRC/theme';
import { Box, useTheme } from '@mui/material';
import Alerta from '@Moleculas/Alerta';
import { useEliminarGrupoEmpleados } from '@Hooks/Empleados/useEliminarGrupoEmpleados';
import PopUpEliminar from '@Moleculas/PopUp';
import { useAuth } from '@Hooks/AuthProvider';
import { PERMISOS } from '@Constantes/permisos';
import InfoGrupoEmpleados from '@Moleculas/GrupoEmpleadosInfo';
import { useGrupoEmpleadosId } from '@Hooks/Empleados/useLeerGrupoEmpleados';
import ModalFlotante from '@Organismos/ModalFlotante';
import ModalCrearGrupoEmpleado from '@Organismos/ModalCrearGrupoEmpleado';

const ListaGrupoEmpleados = () => {
  const { grupos, cargando, error, refetch } = useConsultarGrupos();
  const { usuario } = useAuth();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const MENSAJE_POPUP_ELIMINAR
    = '¿Estás seguro de que deseas eliminar los grupos seleccionados? Esta acción no se puede deshacer.';

  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [gruposSeleccionados, setGruposSeleccionados] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const { eliminar } = useEliminarGrupoEmpleados();
  const [abrirPopUpEliminar, setAbrirPopUpEliminar] = useState(false);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [idGrupoSeleccionado, setIdGrupoSeleccionado] = useState(null);

  const {
    grupoEmpleados,
    cargando: cargandoDetalle,
    error: errorDetalle,
  } = useGrupoEmpleadosId(modalDetalleAbierto ? idGrupoSeleccionado : null);
  const manejarCancelarEliminar = () => {
    setAbrirPopUpEliminar(false);
  };
  const manejarConfirmarEliminar = async () => {
    try {
      await eliminar(gruposSeleccionados);
      await refetch();
      setAlerta({
        tipo: 'success',
        mensaje: 'Grupos eliminados correctamente.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      setGruposSeleccionados([]);
    } catch {
      setAlerta({
        tipo: 'error',
        mensaje: 'Ocurrió un error al eliminar los grupos.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    } finally {
      setAbrirPopUpEliminar(false);
    }
  };

  const columnas = [
    {
      field: 'nombre',
      headerName: 'Nombre del Grupo',
      flex: 2,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      flex: 3,
    },
    {
      field: 'totalEmpleados',
      headerName: 'Total de Empleados',
      type: 'number',
      flex: 1,
    },
  ];

  const filas = Array.isArray(grupos)
    ? grupos.map((grupo) => ({
        id: grupo.idGrupo,
        nombre: grupo.geNombre,
        descripcion: grupo.descripcion,
        idSetProducto: grupo.idSetProducto,
        setProducto: grupo.spNombre,
        totalEmpleados: grupo.totalEmpleados,
      }))
    : [];

  const handleAbrirModalCrear = () => setModalCrearAbierto(true);
  const handleCerrarModalCrear = () => setModalCrearAbierto(false);

  const botones = [
    {
      label: 'Añadir',
      onClick: handleAbrirModalCrear,
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
      // construccion: true,
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (gruposSeleccionados.length === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un grupo de empleados para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setAbrirPopUpEliminar(true);
        }
      },
      disabled: !usuario?.permisos?.includes(PERMISOS.ELIMINAR_GRUPO_EMPLEADOS),
      size: 'large',
      color: 'error',
      backgroundColor: colores.altertex[1],
    },
  ];

  const manejarGrupoCreadoExitosamente = () => {
    refetch(); // Recarga la lista de grupos
    setAlerta({
      tipo: 'success',
      mensaje: 'Grupo de empleados creado correctamente.',
      icono: true,
      cerrable: true,
      centradoInferior: true,
    });
  };

  return (
    <>
      <ContenedorLista
        titulo='Grupos de Empleados'
        descripcion='Gestiona y organiza los grupos de empleados registrados en el sistema.'
        informacionBotones={botones}
      >
        <Box width='100%'>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          <Tabla
            columns={columnas}
            rows={filas}
            loading={cargando}
            checkboxSelection
            onRowSelectionModelChange={(selectionModel) => {
              const ids = Array.isArray(selectionModel)
                ? selectionModel
                : Array.from(selectionModel?.ids || []);
              setGruposSeleccionados(ids);
            }}
            onRowClick={(params) => {
              setIdGrupoSeleccionado(params.row.id);
              setModalDetalleAbierto(true);
            }}
          />
        </Box>
      </ContenedorLista>

      <ModalCrearGrupoEmpleado
        abierto={modalCrearAbierto}
        onCerrar={handleCerrarModalCrear}
        onCreado={manejarGrupoCreadoExitosamente}
      />
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
      <PopUpEliminar
        abrir={abrirPopUpEliminar}
        cerrar={manejarCancelarEliminar}
        confirmar={manejarConfirmarEliminar}
        dialogo={MENSAJE_POPUP_ELIMINAR}
      />
      {modalDetalleAbierto && (
        <ModalFlotante
          open={modalDetalleAbierto}
          onClose={() => setModalDetalleAbierto(false)}
          titulo={grupoEmpleados?.nombre || 'Cargando...'}
          tituloVariant='h4'
          customWidth={800}
          botones={[
            {
              label: 'Editar',
              variant: 'contained',
              color: 'primary',
              backgroundColor: colores.altertex[1],
              onClick: () => console.log('Editar usuario'),
              disabled: true, //disabled: !!errorDetalle,
            },
            {
              label: 'Salir',
              variant: 'outlined',
              color: 'primary',
              outlineColor: colores.primario[10],
              onClick: () => setModalDetalleAbierto(false),
            },
          ]}
        >
          {cargandoDetalle ? (
            <p>Cargando información del grupo de empleados...</p>
          ) : errorDetalle ? (
            <p>Error al cargar la información del grupo de empleados: {errorDetalle}</p>
          ) : (
            <InfoGrupoEmpleados
              modoEdicion={false}
              nombre={grupoEmpleados?.nombre || ''}
              descripcion={grupoEmpleados?.descripcion || ''}
              setsProductos={grupoEmpleados?.setsProductos || []}
              empleados={grupoEmpleados?.empleados || []}
            />
          )}
        </ModalFlotante>
      )}
    </>
  );
};

export default ListaGrupoEmpleados;
