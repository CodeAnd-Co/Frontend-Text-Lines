// RF48 Actualizar categoría de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF48
import { useState, useEffect, useCallback } from 'react';
import ModalFlotante from '@Organismos/ModalFlotante';
import FormaCrearCategorias from '@Organismos/Formularios/FormaCrearCategoria';
import Alerta from '@Moleculas/Alerta';
import { useActualizarCategoria } from '@Hooks/Categorias/useActualizarCategoria';

const ModalActualizarCategoria = ({ open, onClose, categoria, onActualizado }) => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const { actualizar, cargando, error, mensaje } = useActualizarCategoria();

  // Precargar datos al abrir el modal
  useEffect(() => {
    if (open && categoria) {
      setNombreCategoria(categoria.nombreCategoria || '');
      setDescripcionCategoria(categoria.descripcion || '');

      // Asegurarse de transformar productos a IDs si vienen como objetos
      const productosParseados = categoria.productos?.map((p) =>
        typeof p === 'object' ? p.idProducto : p
      );
      setProductos(productosParseados || []);
    }
  }, [open, categoria]);

  const handleConfirmar = async () => {
    if (!nombreCategoria.trim() || productos.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    const exito = await actualizar(categoria.idCategoria, {
        nombreCategoria: nombreCategoria.trim(),
        descripcion: descripcionCategoria.trim(),
        productos,
        });

        if (exito) {
        onActualizado?.();
        onClose();
        }

    if (!error) {
      onActualizado?.();
      onClose();
    }
  };
  

  



  const handleCerrar = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <ModalFlotante
      open={open}
      onClose={handleCerrar}
      onConfirm={handleConfirmar}
      titulo={`Editar: ${categoria?.nombreCategoria || ''}`}
      cancelLabel='Cancelar'
      confirmLabel={cargando ? 'Guardando...' : 'Guardar'}
      disabledConfirm={cargando}
    >
      <FormaCrearCategorias
        nombreCategoria={nombreCategoria}
        setNombreCategoria={setNombreCategoria}
        descripcionCategoria={descripcionCategoria}
        setDescripcionCategoria={setDescripcionCategoria}
        productos={productos}
        setProductos={setProductos}
        mostrarAlerta={mostrarAlerta}
        setMostrarAlerta={setMostrarAlerta}
      />
      {mensaje && (
        <Alerta
          tipo={error ? 'error' : 'success'}
          mensaje={mensaje}
          duracion={4000}
          sx={{ margin: 3 }}
          cerrable
        />
      )}
    </ModalFlotante>
  );
};

export default ModalActualizarCategoria;