import React from 'react';
import { Box } from '@mui/material';
import CustomDataGrid from '../../Componentes/Organismos/dataGrid';
import ContenedorLista from '../../Componentes/organismos/ContenedorLista';
import { useConsultarGrupos } from '../../../hooks/Empleados/useConsultarGrupos';

const ListaGrupoEmpleados = () => {
  const { grupos, cargando, error } = useConsultarGrupos();

  const columns = [
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

  const rows = grupos.map((grupo) => ({
    id: grupo.idGrupo,
    nombre: grupo.geNombre,
    descripcion: grupo.descripcion,
    idSetProducto: grupo.idSetProducto,
    setProducto: grupo.spNombre,
    totalEmpleados: grupo.totalEmpleados,
  }));

  const botones = [
    { label: 'Añadir', onClick: () => console.log('Añadir'), size: 'large' },
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
    { label: 'Eliminar', onClick: () => console.log('Eliminar'), size: 'large' },
  ];

  return (
    <ContenedorLista
      titulo='Grupos de Empleados'
      descripcion='Gestiona y organiza los grupos de empleados registrados en el sistema.'
      informacionBotones={botones}
    >
      <Box width={'100%'}>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <CustomDataGrid columns={columns} rows={rows} loading={cargando} checkboxSelection />
      </Box>
    </ContenedorLista>
  );
};

export default ListaGrupoEmpleados;
