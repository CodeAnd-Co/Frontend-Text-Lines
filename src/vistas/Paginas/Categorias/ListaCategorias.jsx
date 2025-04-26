//RF[47] Consulta lista de categorías - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47]

import React from 'react';
import Tabla from '../../Componentes/Organismos/Tabla';
import { useConsultarCategorias } from '../../../hooks/Categorias/useConsultarCategorias';
import Alerta from '../../componentes/moleculas/Alerta';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import { Box } from '@mui/material';

const ListaCategorias = () => {
  // Hook que obtiene las categorías desde el repositorio
  const { categorias, cargando, error } = useConsultarCategorias();

  // Columnas para el DataGrid
  const columns = [
    {
      field: 'nombreCategoria',
      headerName: 'Nombre',
      flex: 1,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      flex: 2,
    },
    {
      field: 'cantidadProductos',
      headerName: 'Número de productos asociados',
      type: 'number',
      flex: 1,
    },
  ];

  // Las filas deben tener un campo `id`, usamos `idCategoria`
  const rows = categorias.map((cat) => ({
    id: cat.idCategoria,
    nombreCategoria: cat.nombreCategoria,
    descripcion: cat.descripcion,
    cantidadProductos: cat.cantidadProductos,
    idCliente: cat.idCliente,
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
      titulo='Categorías'
      descripcion='Gestiona y organiza las categorías registradas en el sistema.'
      informacionBotones={botones}
    >
      <Box style={{ height: 400, width: '100%' }}>
        {error && <Alerta tipo='error' mensaje={error} icono cerrable centradoInferior />}
        <Tabla columns={columns} rows={rows} loading={cargando} checkboxSelection />
      </Box>
    </ContenedorLista>
  );
};

export default ListaCategorias;
