import React from 'react';
import { Box } from '@mui/material';
import CustomDataGrid from '../../Componentes/Organismos/dataGrid';
import ContenedorLista from '../../Componentes/organismos/ContenedorLista';

const ListaGrupoEmpleados = () => {
  const columns = [];

  const rows = [];

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
      titulo='Lista de Empleados'
      descripcion='Gestiona y organiza los empleados registrados en el sistema.'
      informacionBotones={botones}
    >
      <Box width={'100%'}>
        <CustomDataGrid columns={columns} rows={rows} loading={true} checkboxSelection />
      </Box>
    </ContenedorLista>
  );
};

export default ListaGrupoEmpleados;
