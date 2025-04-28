// RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
import React from 'react';
import { Box } from '@mui/material';
import Tabla from '../../Componentes/Organismos/Tabla';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import { useConsultarSetsProductos } from '../../../hooks/SetsProductos/useConsultarSetsProductos';
import Chip from '../../componentes/atomos/Chip';

const ListaSetsProductos = () => {
  const { grupos, cargando, error } = useConsultarSetsProductos(); // <-- usar 'grupos'

  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 2,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      flex: 3,
    },
    {
      field: 'activo',
      headerName: 'Disponibilidad en stock',
      flex: 1,
      renderCell: (params) => {
        const isActivo = params.value === 1;

        return (
          <Chip
            label={isActivo ? 'Disponible' : 'No disponible'}
            variant='filled'
            color={isActivo ? 'primary' : undefined}
            size='medium'
            shape='cuadrada'
            backgroundColor={isActivo ? undefined : '#f0f0f0'}
            textColor={isActivo ? undefined : '#000000'}
          />
        );
      },
    },
  ];

  const rows = grupos.map((setProducto, index) => ({
    id: index, // Le ponemos el index como id temporal (porque tu API no manda id único)
    nombre: setProducto.nombre, // propiedad correcta (todo minúscula)
    descripcion: setProducto.descripcion,
    activo: setProducto.activo,
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
      titulo='Sets de productos'
      descripcion='Gestiona y organiza los sets de productos registrados en el sistema.'
      informacionBotones={botones}
    >
      <Box width='100%'>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <Tabla columns={columns} rows={rows} loading={cargando} checkboxSelection />
      </Box>
    </ContenedorLista>
  );
};

export default ListaSetsProductos;
