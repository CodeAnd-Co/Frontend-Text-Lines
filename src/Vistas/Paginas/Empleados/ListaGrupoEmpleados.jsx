//RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
import React from 'react';
import { Box, useTheme } from '@mui/material';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import { useConsultarGrupos } from '@Hooks/Empleados/useConsultarGrupos';
import { tokens } from '@SRC/theme';

const ListaEmpleados = () => {
  const { grupos, cargando, error } = useConsultarGrupos();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

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
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
    {
      variant: 'outlined',
      label: 'Importar',
      onClick: () => console.log('Importar'),
      size: 'large',
    },
    {
      variant: 'outlined',
      label: 'Exportar',
      onClick: () => console.log('Exportar'),
      size: 'large',
    },
    { variant: 'outlined', label: 'Editar', onClick: () => console.log('Editar'), size: 'large' },
    {
      label: 'Eliminar',
      onClick: () => console.log('Eliminar'),
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
    <ContenedorLista
      titulo='Grupos de Empleados'
      descripcion='Gestiona y organiza los grupos de empleados registrados en el sistema.'
      informacionBotones={botones}
    >
      <Box width={'100%'}>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <Tabla columns={columnas} rows={filas} loading={cargando} checkboxSelection />
      </Box>
    </ContenedorLista>
  );
};

export default ListaEmpleados;
