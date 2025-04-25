//RF[47] Consulta lista de categorías - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47]

import React from 'react';
import CustomDataGrid from '../../Componentes/Organismos/Tabla';
import { useConsultarCategorias } from '../../../hooks/Categorias/useConsultarCategorias';
import Alerta from '../../componentes/moleculas/Alerta';

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

  return (
    <div style={{ height: 400, width: '100%' }}>
      {error && <Alerta tipo='error' mensaje={error} icono cerrable centradoInferior />}
      <CustomDataGrid columns={columns} rows={rows} loading={cargando} checkboxSelection />
    </div>
  );
};

export default ListaCategorias;
