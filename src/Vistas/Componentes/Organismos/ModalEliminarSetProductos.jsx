//RF[45] Elimina set de productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF45]

import { useEffect, useState } from 'react';
import { useEliminarSetProductos } from '@Hooks/SetsProductos/useEliminarSetProductos';
import PopUp from '@SRC/Vistas/Componentes/Moleculas/PopUp';

const ModalEliminarSetProductos = ({
  open,
  onClose,
  idsSetProductos,
  setAlerta,
  refrescarPagina,
}) => {
  const [confirmado, setConfirmado] = useState(false);
  const { mensaje, error } = useEliminarSetProductos(confirmado ? idsSetProductos : []);

  const handleConfirm = () => {
    setConfirmado(true);
    onClose();
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
          mensaje: `Error al eliminar los sets de productos: ${error}`,
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
      } else {
        setAlerta({
          tipo: 'success',
          mensaje: mensaje || 'Sets de productos eliminados correctamente.',
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
        setTimeout(() => {
          refrescarPagina();
        }, 500);
      }
      setConfirmado(false);
    }
  }, [confirmado, mensaje, error, setAlerta, refrescarPagina]);

  return (
    <PopUp
      abrir={open}
      cerrar={handleCancelar}
      confirmar={handleConfirm}
      dialogo='¿Estás seguro de que deseas eliminar los sets de productos seleccionados?'
      labelCancelar='Cancelar'
      labelConfirmar='Eliminar'
    />
  );
};

export default ModalEliminarSetProductos;
