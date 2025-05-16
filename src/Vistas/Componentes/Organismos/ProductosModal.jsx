import Tabla from '@Organismos/Tabla';

const ProductosModal = ({ columnas, filas, paginacion, checkBox, onRowClick, onRowSeleccion }) => {
  return (
    <Tabla
      columns={columnas}
      rows={filas}
      pageSize={paginacion}
      disableRowSelectionOnClick={true}
      checkboxSelection={checkBox}
      onRowClick={onRowClick}
      onRowSelectionModelChange={onRowSeleccion}
    />
  );
};

export default ProductosModal;
