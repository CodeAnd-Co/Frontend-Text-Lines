//RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
import React from 'react';
import { Box } from '@mui/material';
import Tabla from '../../Componentes/Organismos/Tabla';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import { useConsultarGrupos } from '../../../hooks/Empleados/useConsultarGrupos';
import { useMode, tokens } from '../../../theme';
import { useEliminarGrupoEmpleados } from '../../../hooks/Empleados/useEliminarGrupoEmpleados';
import { useState } from 'react';

const ListaEmpleados = () => {
  const { grupos, cargando, error } = useConsultarGrupos();
  const [theme] = useMode();
  const colores = tokens(theme.palette.mode);

  const [gruposSeleccionados, setGruposSeleccionados] = useState([]);
  const { eliminar, mensaje, cargando: cargandoEliminacion, error: errorEliminacion } = useEliminarGrupoEmpleados();


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
    { label: 'Añadir', onClick: () => console.log('Añadir'), size: 'large', backgroundColor: colores.altertex[1] },
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
    { variant: 'outlined', label: 'Editar', onClick: () => console.log('Editar'), size: 'large',      outlineColor: colores.altertex[1] },
    { label: cargandoEliminacion ? 'Eliminando...' : 'Eliminar',
      onClick: () => {
        console.log('Grupos a eliminar:', gruposSeleccionados);
        if (gruposSeleccionados.length === 0) return alert('Selecciona al menos un grupo');
        eliminar(gruposSeleccionados);
      }, size: 'large', backgroundColor: colores.altertex[1], },
  ];

  return (
    <ContenedorLista
      titulo='Grupos de Empleados'
      descripcion='Gestiona y organiza los grupos de empleados registrados en el sistema.'
      informacionBotones={botones}
    >
      <Box width={'100%'}>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <Tabla columns={columnas} rows={filas} loading={cargando} checkboxSelection onRowSelectionModelChange={(selectionModel) => {
    const ids = Array.isArray(selectionModel)
      ? selectionModel
      : Array.from(selectionModel?.ids || []);
    setGruposSeleccionados(ids);
  }}/>
      </Box>
    </ContenedorLista>
  );
};

export default ListaEmpleados;
