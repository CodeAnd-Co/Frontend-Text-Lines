import Tabla from '@Organismos/Tabla';

const EmpleadosModal = ({ columnas, filas, paginacion, checkBox, onRowClick }) => {
  return (
    <Tabla
      columns={columnas}
      rows={filas}
      pageSize={paginacion}
      checkboxSelection={checkBox}
      onRowClick={onRowClick}
      onRowSelectionModelChange={() => {}}
    />
  );
}

export default EmpleadosModal;