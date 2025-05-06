//RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
//RF25 Eliminar Grupo de empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF25

import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import { useConsultarGrupos } from '@Hooks/Empleados/useConsultarGrupos';
import { tokens } from '@SRC/theme';
import { Box, useTheme } from '@mui/material';
import Alerta from '@Moleculas/Alerta';
import { useEliminarGrupoEmpleados } from '@Hooks/Empleados/useEliminarGrupoEmpleados';
import { useState, React } from 'react';
import PopUpEliminar from '@Moleculas/PopUp';
import { useAuth } from '@Hooks/AuthProvider';
import { PERMISOS } from '@Constantes/permisos';

const ListaEmpleados = () => {
  const { grupos, cargando, error, refetch } = useConsultarGrupos();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const MENSAJE_POPUP_ELIMINAR
    = '¿Estás seguro de que deseas eliminar los grupos seleccionados? Esta acción no se puede deshacer.';

  const [gruposSeleccionados, setGruposSeleccionados] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const { eliminar } = useEliminarGrupoEmpleados();
  const [abrirPopUpEliminar, setAbrirPopUpEliminar] = useState(false);
  const manejarCancelarEliminar = () => {
    setAbrirPopUpEliminar(false);
  };
  const { usuario } = useAuth();
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
      field: 'idSetProducto',
      headerName: 'ID Set de Productos',
      type: 'number',
      flex: 1,
    },
    {
      field: 'setProducto',
      headerName: 'Nombre del Set de Productos',
      flex: 2,
    },
    {
      field: 'totalEmpleados',
      headerName: 'Total de Empleados',
      type: 'number',
      flex: 1,
    },
  ];

  const filas = grupos.map((grupo) => ({
    id: grupo.idGrupo,
    nombre: grupo.geNombre,
    descripcion: grupo.descripcion,
    idSetProducto: grupo.idSetProducto,
    setProducto: grupo.spNombre,
    totalEmpleados: grupo.totalEmpleados,
  }));

  const botones = [
    {
      label: 'Añadir',
      onClick: () => console.log('Añadir'),
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
    },

    {
      variant: 'outlined',
      label: 'Editar',
      onClick: () => console.log('Editar'),
      color: 'primary',
      size: 'large',
      outlineColor: colores.primario[10],
    },
    {
      label: 'Eliminar',
      onClick: () => {
        console.log('Grupos a eliminar:', gruposSeleccionados);
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
  return (
    <>
      <ContenedorLista
        titulo='Grupos de Empleados'
        descripcion='Gestiona y organiza los grupos de empleados registrados en el sistema.'
        informacionBotones={botones}
      >
        <Box width={'100%'}>
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
          />
        </Box>
      </ContenedorLista>
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
    </>
  );
};

export default ListaEmpleados;
