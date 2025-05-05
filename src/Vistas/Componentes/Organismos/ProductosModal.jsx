import Contenedor from '@SRC/Vistas/Componentes/Atomos/Contenedor';
import Tabla from '@SRC/Vistas/Componentes/Organismos/Tabla';

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
