import Tabla from '@Organismos/Tabla';

const ProductosModal = ({ columnas, filas, paginacion, checkBox, onRowClick }) => {
  return (
    <Tabla
      columns={columnas}
      rows={filas}
      pageSize={paginacion}
      checkboxSelection={checkBox}
      onRowClick={onRowClick}
    />
  );
};

export default ProductosModal;
