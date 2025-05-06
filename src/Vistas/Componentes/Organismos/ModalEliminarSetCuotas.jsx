import { useState } from 'react';
import { RepositorioEliminarSetCuotas } from '@Dominio/Repositorios/Cuotas/repositorioEliminarSetCuotas';
import PopUpEliminar from '@Componentes/Moleculas/PopUp';

const ModalEliminarSetCuotas = ({ open, onClose, idsSetCuotas, setAlerta, refrescarPagina }) => {
  const [cargando, setCargando] = useState(false);

  const handleConfirm = async () => {
    try {
      // ✅ 1. Asegurarte de que sea array
      const idsArray = Array.isArray(idsSetCuotas) ? idsSetCuotas : Array.from(idsSetCuotas);

      // ✅ 2. Validar antes de enviar
      if (!idsArray.length) {
        console.warn('⚠️ [ModalEliminarSetCuotas] No se enviarán IDs vacíos.');
        setAlerta({
          tipo: 'error',
          mensaje: 'No hay sets de cuotas seleccionados para eliminar.',
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
        return;
      }

      console.log('🟢 [ModalEliminarSetCuotas] Enviando estos IDs al backend:', idsArray);
      setCargando(true);

      const { mensaje } = await RepositorioEliminarSetCuotas.eliminarSetCuotas(idsArray);

      setAlerta({
        tipo: 'success',
        mensaje: mensaje || 'Sets de cuotas eliminados correctamente.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });

      setTimeout(() => refrescarPagina(), 500);
    } catch (error) {
      setAlerta({
        tipo: 'error',
        mensaje: `Error al eliminar sets de cuotas: ${error.message}`,
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
      dialogo='¿Estás seguro de que deseas eliminar los sets de cuotas seleccionados?'
      labelCancelar='Cancelar'
      labelConfirmar='Eliminar'
      cargando={cargando}
    />
  );
};

export default ModalEliminarSetCuotas;
