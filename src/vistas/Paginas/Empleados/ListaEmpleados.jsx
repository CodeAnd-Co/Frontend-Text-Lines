// RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
// RF20 - Eliminar empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF20
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Tabla from '../../Componentes/Organismos/Tabla';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import { useConsultarEmpleados } from '../../../hooks/Empleados/useConsultarEmpleados';
import Alerta from '../../componentes/moleculas/Alerta';
import PopUpEliminar from '../../componentes/moleculas/PopUpEliminar';
import { useEliminarEmpleado } from '../../../hooks/Empleados/useEliminarEmpleado';
import { useMode, tokens } from '../../../theme';
import { useAuth } from '../../../hooks/AuthProvider';
import { PERMISOS } from '../../../Utilidades/Constantes/permisos';
import { tokens } from '../../../theme';

const ListaGrupoEmpleados = () => {
  const { empleados, cargando, error, refetch } = useConsultarEmpleados();
  const { eliminar } = useEliminarEmpleado();
  const [theme] = useMode();
  const colores = tokens(theme.palette.mode);
  const { usuario } = useAuth();
  const MENSAJE_POPUP_ELIMINAR =
    '¿Estás seguro de que deseas eliminar los empleados seleccionados? Esta acción no se puede deshacer.';

  const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const [openModalEliminar, setAbrirPopUpEliminar] = useState(false);

  const manejarCancelarEliminar = () => {
    setAbrirPopUpEliminar(false);
  };

  const manejarConfirmarEliminar = async () => {
    try {
      await eliminar(empleadosSeleccionados);
      await refetch();
      setAlerta({
        tipo: 'success',
        mensaje: 'Empleados eliminados correctamente.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      setEmpleadosSeleccionados([]);
    } catch {
      setAlerta({
        tipo: 'error',
        mensaje: 'Ocurrió un error al eliminar los empleados.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    } finally {
      setAbrirPopUpEliminar(false);
    }
  };
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  const columnas = [
    { field: 'nombreCompleto', headerName: 'Nombre del Empleado', flex: 1 },
    { field: 'correoElectronico', headerName: 'Correo Electrónico', flex: 1 },
    { field: 'numeroEmergencia', headerName: 'Número de Emergencia', width: 180 },
    { field: 'areaTrabajo', headerName: 'Área de Trabajo', flex: 1 },
    { field: 'posicion', headerName: 'Posición', flex: 1 },
    { field: 'cantidadPuntos', headerName: 'Puntos', width: 100 },
    { field: 'antiguedad', headerName: 'Antigüedad', flex: 1 },
  ];

  const filas = empleados.map((empleado) => ({
    id: empleado.idEmpleado,
    nombreCompleto: empleado.nombreCompleto,
    correoElectronico: empleado.correoElectronico,
    numeroEmergencia: empleado.numeroEmergencia,
    areaTrabajo: empleado.areaTrabajo,
    posicion: empleado.posicion,
    cantidadPuntos: empleado.cantidadPuntos,
    antiguedad: empleado.antiguedad,
  }));

  const botones = [
    {
      label: 'Añadir',
      onClick: () => console.log('Añadir'),
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
    {
      variant: 'outlined',
      label: 'Importar',
      onClick: () => console.log('Importar'),
      size: 'large',
      outlineColor: colores.altertex[1],
    },
    {
      variant: 'outlined',
      label: 'Exportar',
      onClick: () => console.log('Exportar'),
      size: 'large',
      outlineColor: colores.altertex[1],
    },
    {
      variant: 'outlined',
      label: 'Editar',
      onClick: () => console.log('Editar'),
      size: 'large',
      outlineColor: colores.altertex[1],
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (empleadosSeleccionados.length === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un empleado para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setAbrirPopUpEliminar(true);
        }
      },
      disabled: !usuario?.permisos?.includes(PERMISOS.ELIMINAR_EMPLEADO),
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
    <>
      <ContenedorLista
        titulo='Lista de Empleados'
        descripcion='Consulta y administra la información de los empleados registrados para cada cliente.'
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
              setEmpleadosSeleccionados(ids);
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
        abrir={openModalEliminar}
        cerrar={manejarCancelarEliminar}
        confirmar={manejarConfirmarEliminar}
        dialogo={MENSAJE_POPUP_ELIMINAR}
      />
    </>
  );
};

export default ListaGrupoEmpleados;
