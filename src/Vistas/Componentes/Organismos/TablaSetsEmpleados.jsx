import Tabla from '@Organismos/Tabla';

const TablaSetsEmpleados = ({
  columnas,
  filas,
  paginacion,
  checkBox,
  onRowClick,
  onRowSelectionModelChange,
  selectionModel,
}) => {
  return (
    <Tabla
      columns={columnas}
      rows={filas}
      pageSize={paginacion}
      checkboxSelection={checkBox}
      onRowClick={onRowClick}
      onRowSelectionModelChange={onRowSelectionModelChange}
      selectionModel={selectionModel}
    />
  );
};

export default TablaSetsEmpleados;
