import Contenedor from '../atomos/Contenedor';
import CustomDataGrid from './dataGrid';

const ProductosCuotaSet = ({
  elevacion,
  sx,
  columnas,
  filas,
  paginacion,
  checkBox,
  onRowClick,
}) => {
  return (
    <Contenedor elevation={elevacion} sx={sx}>
      <CustomDataGrid
        columns={columnas}
        rows={filas}
        pageSize={paginacion}
        checkboxSelection={checkBox}
        onRowClick={onRowClick}
      />
    </Contenedor>
  );
};

export default ProductosCuotaSet;
