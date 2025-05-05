//RF[50] - Elimina categoría de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF50

import { useState, useEffect } from 'react';
<<<<<<< HEAD:src/vistas/componentes/organismos/ModalEliminarCategoria.jsx
import { useEliminarCategorias } from '../../../hooks/Categorias/useEliminarCategorias';
import PopUp from '../moleculas/PopUp';
=======
import { useEliminarCategorias } from '@Hooks/Categorias/useEliminarCategorias';
import PopUp from '@Moleculas/PopUp';
>>>>>>> 946ea3a7a3a78789146f42a7f8ae590ce803cd9b:src/Vistas/Componentes/Organismos/ModalEliminarCategoria.jsx

const ModalEliminarCategoria = ({ open, onClose, idsCategoria, setAlerta, refrescarPagina }) => {
  const [confirmado, setConfirmado] = useState(false);
  const { mensaje, error } = useEliminarCategorias(confirmado ? idsCategoria : []);

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
          mensaje: `Error al eliminar las categorías: ${error}`,
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
      } else {
        setAlerta({
          tipo: 'success',
          mensaje: mensaje || 'Categorías eliminadas correctamente.',
          icono: true,
          cerrable: true,
          centradoInferior: true,
        });
        refrescarPagina();
      }
      setConfirmado(false);
    }
  }, [confirmado, mensaje, error, setAlerta, refrescarPagina]);

  return (
    <PopUp
      abrir={open}
      cerrar={handleCancelar}
      confirmar={handleConfirm}
      dialogo='¿Estás seguro de que deseas eliminar las categorías seleccionadas?'
      labelCancelar='Cancelar'
      labelConfirmar='Eliminar'
    />
  );
};

export default ModalEliminarCategoria;
