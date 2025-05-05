import Contenedor from '@Atomos/Contenedor';
import Tabla from '@Organismos/Tabla';

const ProductosModal = ({ elevacion, sx, columnas, filas, paginacion, checkBox, onRowClick }) => {
  return (
    <Contenedor elevation={elevacion} sx={sx}>
      <Tabla
        columns={columnas}
        rows={filas}
        pageSize={paginacion}
        checkboxSelection={checkBox}
        onRowClick={onRowClick}
      />
    </Contenedor>
  );
};

export default ProductosModal;
