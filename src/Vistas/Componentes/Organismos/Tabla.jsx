import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens, themeSettings } from '@SRC/theme';
import { styled } from '@mui/material/styles';

const spanishLocaleText = {
  noRowsLabel: 'No hay filas',
  columnMenuSortAsc: 'Ordenar ascendente',
  columnMenuSortDesc: 'Ordenar descendente',
  columnMenuUnsort: 'Restablecer orden',
  columnMenuFilter: 'Filtrar',
  noResultsOverlayLabel: 'No se encontraron resultados.',
  filterOperatorContains: 'Contiene',
  filterOperatorEquals: 'Es igual a',
  filterOperatorStartsWith: 'Empieza con',
  filterOperatorEndsWith: 'Termina con',
  filterOperatorIs: 'Es',
  filterOperatorNot: 'No es',
  filterOperatorAfter: 'Después de',
  filterOperatorOnOrAfter: 'En o después de',
  filterOperatorBefore: 'Antes de',
  labelRowsPerPage: 'Filas por página:',
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
  footerRowSelected: (count) => `${count.toLocaleString()} fila(s) seleccionada(s)`,
  footerTotalRows: 'Filas Totales:',
  toolbarColumns: 'Columnas',
  toolbarFilters: 'Filtros',
  toolbarDensity: 'Densidad',
  toolbarExport: 'Exportar',
};

const StyledDataGrid = styled(DataGrid)(({ theme }) => {
  const colores = tokens(theme.palette.mode);
  const tema = themeSettings(theme.palette.mode);

  return {
    boxShadow: theme.shadows[1],
    border: 'none',
    backgroundColor: theme.palette.background.paper,
    fontFamily: tema.typography.body1.fontFamily,
    fontSize: tema.typography.body1.fontSize,

    width: '100%',
    maxWidth: '100%',
    maxHeight: '600px',
    overflow: 'auto',

    '& .MuiDataGrid-root': {
      overflow: 'auto',
    },

    '& .MuiDataGrid-virtualScroller': {
      overflowY: 'auto',
      overflowX: 'hidden',
    },

    '& .MuiDataGrid-cell': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: colores.menu[1],
      color: colores.texto[0],
      borderBottom: `1px solid ${theme.palette.divider}`,
      textAlign: 'center',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
    },

    '& .MuiDataGrid-row': {
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },

    '& .MuiDataGrid-footerContainer': {
      backgroundColor: colores.menu[2],
      borderTop: `1px solid ${theme.palette.divider}`,
      padding: '0 8px',
    },

    '& .MuiDataGrid-toolbarContainer': {
      padding: '8px',
      backgroundColor: colores.menu[0],
    },

    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
      color: colores.texto[1],
    },

    '& .MuiDataGrid-checkboxInput': {
      color: theme.palette.primary.main,
    },

    '& .MuiDataGrid-selectedRowCount': {
      visibility: 'hidden',
    },

    '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
      outline: 'none',
    },

    // Ocultar el separador de redimensionamiento de columnas
    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
  };
});

const Tabla = ({
  columns,
  rows,
  loading,
  pageSize,
  onRowClick,
  checkboxSelection,
  onRowSelectionModelChange,
  disableRowSelectionOnClick,
}) => {
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
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      disableColumnResize={true} // Esta prop deshabilita el redimensionamiento
      onRowSelectionModelChange={(seleccion) => {
        onRowSelectionModelChange(seleccion);
      }}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      pagination
      localeText={spanishLocaleText}
      rowHeight={70}
      disableColumnSelector
      slots={{
        toolbar: GridToolbar,
      }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
          csvOptions: { disableToolbarButton: true },
          printOptions: { disableToolbarButton: true },
        },
      }}
      initialState={{
        columns: {
          columnVisibilityModel: {},
        },
        filter: {
          filterModel: {
            items: [],
          },
        },
      }}
      hideColumnsButton
    />
  );
};

Tabla.propTypes = {
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
  onRowSelectionModelChange: PropTypes.func,
  disableRowSelectionOnClick: PropTypes.bool,
};

Tabla.defaultProps = {
  loading: false,
  pageSize: 5,
  onRowClick: () => {},
  onRowSelectionModelChange: () => {},
  disableRowSelectionOnClick: true,
};

export default Tabla;
