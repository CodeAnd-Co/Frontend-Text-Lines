import React from 'react';
import { useConsultarCategorias } from '../../../hooks/Categorias/useConsultarCategorias';
import CustomDataGrid from '../../Componentes/Organismos/Tabla';
import Alerta from '../../componentes/moleculas/Alerta';
import ModalCrearCategoria from '../../componentes/organismos/ModalCrearCategoria';
import ContenedorLista from '../../componentes/organismos/ContenedorLista';
import { useTheme } from '@mui/material';
import { tokens } from '../../../theme';

/**
 * Página para consultar y mostrar la lista de categorías en una tabla.
 *
 * Muestra los resultados en un `CustomDataGrid`, incluyendo
 * nombre, descripción y número de productos de cada categoría.
 *
 * @see [RF[47] Consulta lista de categorías](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47)
 */

const ListaCategorias = () => {
  // Hook que obtiene las categorías desde el repositorio
  const { categorias, cargando, error } = useConsultarCategorias();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Columnas para el DataGrid
  const columns = [
    { field: 'nombreCategoria', headerName: 'Nombre', flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', flex: 2 },
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
    {
      label: 'Añadir',
      variant: 'contained',
      color: 'primary',
      size: 'large',
      backgroundColor: colors.altertex[1],
      onClick: () => console.log('Añadir'),
    },
    {
      label: 'Editar',
      variant: 'outlined',
      color: 'primary',
      size: 'large',
      outlineColor: colors.altertex[1],
      onClick: () => console.log('Editar'),
    },
    {
      label: 'Eliminar',
      variant: 'contained',
      color: 'error',
      size: 'large',
      backgroundColor: colors.altertex[1],
      onClick: () => console.log('Eliminar'),
    },
  ];

  return (
    <ContenedorLista
      titulo='Categorías'
      descripcion='Gestiona las categorías de productos disponibles.'
      informacionBotones={botones}
    >
      <div style={{ height: 400, width: '100%' }}>
        {error && <Alerta tipo='error' mensaje={error} icono cerrable centradoInferior />}
        <CustomDataGrid columns={columns} rows={rows} loading={cargando} checkboxSelection />
      </div>
    </ContenedorLista>
  );
};

export default ListaCategorias;
