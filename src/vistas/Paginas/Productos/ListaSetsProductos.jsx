// RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
import React from 'react';
import { Box } from '@mui/material';
import Tabla from '../../Componentes/Organismos/Tabla';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import { useConsultarSetsProductos } from '../../../hooks/SetsProductos/useConsultarSetsProductos';
import Alerta from '../../componentes/moleculas/Alerta'; // Asegúrate de importar Alerta
import Chip from '../../componentes/atomos/Chip';

const ListaSetsProductos = () => {
  const { setsDeProductos, cargando, error } = useConsultarSetsProductos();

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

  const rows = setsDeProductos.map((setProducto, index) => ({
    id: index,
    nombre: setProducto.nombre,
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
      descripcion='Gestiona y organiza los sets de productos que se pueden asignar a los grupos de empleados.'
      informacionBotones={botones}
    >
      <Box width='100%' mt='20px'>
        {error && (
          <Box mb={2}>
            <Alerta tipo='error' mensaje={error} icono cerrable centradoInferior />
          </Box>
        )}
        <Tabla columns={columns} rows={rows} loading={cargando} checkboxSelection />
      </Box>
    </ContenedorLista>
  );
};

export default ListaSetsProductos;
