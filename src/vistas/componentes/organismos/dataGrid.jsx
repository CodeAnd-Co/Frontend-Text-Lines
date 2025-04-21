import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { tokens, themeSettings } from '../../../theme';
import { styled } from '@mui/material/styles';

/** Data grid personalizado usando Material UI */
const spanishLocaleText = {
  // Ya tenías estos
  noRowsLabel: 'No hay filas',
  columnMenuSortAsc: 'Ordenar ascendente',
  columnMenuSortDesc: 'Ordenar descendente',
  columnMenuUnsort: 'Restablecer orden',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Ocultar columna',
  columnMenuManageColumns: 'Mostrar columnas',
  filterOperatorContains: 'Contiene',
  filterOperatorEquals: 'Es igual a',
  filterOperatorStartsWith: 'Empieza con',
  filterOperatorEndsWith: 'Termina con',
  filterOperatorIs: 'Es',
  filterOperatorNot: 'No es',
  filterOperatorAfter: 'Después de',
  filterOperatorOnOrAfter: 'En o después de',
  filterOperatorBefore: 'Antes de',
  filterOperatorOnOrBefore: 'En o antes de',
  filterOperatorIsEmpty: 'Está vacío',
  filterOperatorIsNotEmpty: 'No está vacío',
  filterOperatorIsAnyOf: 'Es cualquiera de',
  filterOperatorDoesNotContain: 'No contiene',
  filterOperatorDoesNotEqual: 'No es igual a',

  filterPanelOperator: 'Operador',
  filterPanelColumns: 'Columnas',
  filterPanelAddFilter: 'Agregar filtro',
  filterPanelDeleteIconLabel: 'Eliminar',

  // Paginación
  footerRowSelected: (count) => `${count.toLocaleString()} fila(s) seleccionada(s)`,
  footerTotalRows: 'Filas Totales:',

  // Otros opcionales
  toolbarColumns: 'Columnas',
  toolbarFilters: 'Filtros',
  toolbarDensity: 'Densidad',
  toolbarExport: 'Exportar',
};

const StyledDataGrid = styled(DataGrid)(({ theme }) => {
  const colores = tokens(theme.palette.mode);
  const tema = themeSettings(theme.palette.mode);
  return {
    '& .MuiDataGrid-root': {
      border: 'none',
    },
    '& .MuiDataGrid-cell': {
      borderBottom: 'none',
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: colores.menu[2],
      borderBottom: 'none',
    },
    '& .MuiDataGrid-footerContainer': {
      borderTop: 'none',
      backgroundColor: colores.menu[2],
    },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
      color: colores.texto[1],
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: tema.typography.subtitulo2.fontSize,
      fontWeight: tema.typography.subtitulo2.fontWeight,
      fontFamily: tema.typography.subtitulo2.fontFamily,
    },
  };
});

const CustomDataGrid = ({ columns, rows, loading, pageSize, onRowClick, checkboxSelection }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: pageSize || 5,
  });

  return (
    <StyledDataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      pageSize={paginationModel.pageSize}
      onRowClick={onRowClick}
      checkboxSelection={checkboxSelection}
      disableSelectionOnClick
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      pageSizeOptions={[5]}
      pagination
      localeText={spanishLocaleText}
    />
  );
};

CustomDataGrid.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool,
  pageSize: PropTypes.number,
  onRowClick: PropTypes.func,
  checkboxSelection: PropTypes.bool,
};

// Default props
CustomDataGrid.defaultProps = {
  loading: false,
  pageSize: 5,
  onRowClick: () => {},
  checkboxSelection: false,
};

export default CustomDataGrid;
