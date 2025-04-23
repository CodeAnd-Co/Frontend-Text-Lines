// src/ui/pages/Categorias/PaginaCategorias.jsx

import React from 'react';
import CustomDataGrid from '../../Componentes/Organismos/dataGrid';
import { useConsultarCategorias } from '../../../hooks/Categorias/useConsultarCategorias';

const ListaCategorias = () => {
  // Hook que obtiene las categorías desde el repositorio
  const { categorias, cargando, error } = useConsultarCategorias({ limit: 5, offset: 0 });

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
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <CustomDataGrid columns={columns} rows={rows} loading={cargando} checkboxSelection />
    </div>
  );
};

export default ListaCategorias;
