// RF[30] - Elimina producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30
import { useState, useEffect } from 'react';
import { useEliminarProductos } from '../../../hooks/Productos/useEliminarProductos';
import PopUpEliminar from '../../componentes/moleculas/PopUpEliminar';

/**
 * Modal para confirmar la eliminación de productos.
 */
const ModalEliminarProducto = ({ open, onClose, idsProducto, setAlerta, refrescarPagina }) => {
  const [confirmado, setConfirmado] = useState(false);
  const { mensaje, error } = useEliminarProductos(confirmado ? idsProducto : []);

  const handleConfirmar = () => {
    setConfirmado(true);
    onClose();
    refrescarPagina();
  };

  const handleCancelar = () => {
    setConfirmado(false);
    onClose();
  };

  useEffect(() => {
    if (confirmado) {
      if (error) {
        setAlerta({
          tipo: 'error',
          mensaje: `Error al eliminar los productos: ${error}`,
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
      } else {
        setAlerta({
          tipo: 'success',
          mensaje: mensaje || 'Producto(s) eliminado(s) correctamente.',
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
      }
      setConfirmado(false);
    }
  }, [confirmado, mensaje, error, setAlerta]);

  return (
    <PopUpEliminar
      abrir={open}
      cerrar={handleCancelar}
      confirmar={handleConfirmar}
      dialogo="¿Estás seguro de que deseas eliminar los productos seleccionados?"
      labelCancelar="Cancelar"
      labelConfirmar="Eliminar"
    />
  );
};

export default ModalEliminarProducto;