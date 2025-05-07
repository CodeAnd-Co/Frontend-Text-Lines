
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
      Descargar CSV de ejemplo
      <a href="/ruta/al/archivo/ejemplo.csv" download="empleados_ejemplo.csv"/>
    </ModalFlotante>
  );
}
export default ModalImportarEmpleados;
