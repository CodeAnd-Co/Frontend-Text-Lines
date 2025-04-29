import { useState } from 'react';
import PopUpEliminar from '../../componentes/moleculas/PopUpEliminar';
import { RepositorioEliminarEmpleados } from '../../../dominio/repositorios/Empleados/RepositorioEliminarEmpleados';

const ModalEliminarEmpleado = ({ open, onClose, idsEmpleado, setAlerta, refrescarPagina }) => {
  const [cargando, setCargando] = useState(false);

  const handleConfirm = async () => {
    try {
      setCargando(true);

      // Debug: mostrar los IDs que se intentan eliminar
      console.log('IDs que se intentan eliminar:', idsEmpleado);

      // Convertir a enteros (por si acaso vienen como strings)
      const idsConvertidos = idsEmpleado.map(id => parseInt(id, 10)).filter(Number.isInteger);

      const { mensaje } = await RepositorioEliminarEmpleados.eliminarEmpleado(idsConvertidos);

      setAlerta({
        tipo: 'success',
        mensaje: mensaje || 'Empleados eliminados correctamente.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });

      refrescarPagina(); // O mejor aún: llamar a un método que recargue sin full reload
    } catch (error) {
      console.error('Error al eliminar:', error);
      setAlerta({
        tipo: 'error',
        mensaje: `Error al eliminar los empleados: ${error.message}`,
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    } finally {
      setCargando(false);
      onClose();
    }
  };

  const handleCancelar = () => {
    onClose();
  };

  return (
    <PopUpEliminar
      abrir={open}
      cerrar={handleCancelar}
      confirmar={handleConfirm}
      dialogo='¿Estás seguro de que deseas eliminar los empleados seleccionados?'
      labelCancelar='Cancelar'
      labelConfirmar={cargando ? 'Eliminando...' : 'Eliminar'}
    />
  );
};

export default ModalEliminarEmpleado;