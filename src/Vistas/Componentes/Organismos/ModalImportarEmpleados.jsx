
import ModalFlotante from '@Organismos/ModalFlotante';
import { useCallback } from 'react';
import ContenedorImportar from '@Organismos/ContenedorImportar';


const ModalImportarEmpleados = ({
  abierto = false,
  onCerrar,
  onConfirm,
}) => {
    const handleCerrar = useCallback(() => {
        onCerrar(true);
      }, [onCerrar]);
  return (
    <ModalFlotante
      open={abierto}
      onClose={handleCerrar}
      onConfirm={onConfirm}
      titulo="Importar Empleados con CSV"
    >
      <ContenedorImportar />
      <a href="/plantilla_empleados.csv" download="plantilla_empleados.csv">
        Descargar CSV de ejemplo
        </a>
    </ModalFlotante>
  );
}
export default ModalImportarEmpleados;
