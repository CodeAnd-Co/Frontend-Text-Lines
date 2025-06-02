import Tabla from '@Organismos/Tabla';

/**
 * Componente que encapsula la tabla de empleados para uso en formularios.
 *
 * @param {Array} columnas - Columnas a mostrar
 * @param {Array} filas - Datos de los empleados
 * @param {number} paginacion - Tamaño de página
 * @param {boolean} checkBox - Si se permiten checkboxes
 * @param {boolean} cargando - Estado de carga
 * @param {string|null} error - Mensaje de error si ocurre
 * @param {function} onRowClick - Callback cuando se da clic a una fila
 * @param {function} onSeleccionCheckbox - Callback cuando cambia la selección por checkbox 
 */
const EmpleadosModal = ({
  columnas,
  filas,
  paginacion,
  checkBox,
  cargando,
  error,
  onRowClick,
  onSeleccionCheckbox, 
}) => {
  return (
    <Tabla
      columns={columnas}
      rows={filas}
      pageSize={paginacion}
      checkboxSelection={checkBox}
      disableRowSelectionOnClick={true}
      loading={cargando}
      error={error}
      onRowClick={onRowClick}
      onRowSelectionModelChange={onSeleccionCheckbox}
    />
  );
};

export default EmpleadosModal;