import { useState, useEffect } from 'react';
import ModalFlotante from '../organismos/ModalFlotante';
import FormaCrearCategorias from './Formularios/FormaCrearCategoria';
import useCrearCategoria from '../../../hooks/Categorias/useCrearCategoria';
import Alerta from '../moleculas/Alerta';

/**
 * @see [RF[46] Consulta lista de categorías](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF46)
 */

const ModalCrearCategoria = ({ abierto = false, onCerrar, onCreado }) => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const { crearCategoria, cargando, exito, error, mensaje, setError, resetEstado } =
    useCrearCategoria();

  // Resetea el estado cuando se cierra el modal
  useEffect(() => {
    if (!abierto) {
      resetForm();
    }
  }, [abierto]);

  const resetForm = () => {
    setNombreCategoria('');
    setDescripcionCategoria('');
    setProductos([]);
    setMostrarAlerta(false);
    resetEstado();
  };

  const handleCerrar = () => {
    resetForm();
    onCerrar();
  };

  const handleConfirmar = async () => {
    // Validar que el nombre de categoría no esté vacío después de eliminar espacios
    // y que haya al menos un producto seleccionado
    if (!nombreCategoria.trim() || productos.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    // Enviar datos con nombres limpios (sin espacios innecesarios)
    const fueCreada = await crearCategoria({
      nombreCategoria: nombreCategoria.trim(),
      descripcion: descripcionCategoria.trim(),
      productos,
    });

    if (fueCreada) {
      setTimeout(() => {
        if (onCreado) onCreado();
        handleCerrar();
      }, 2000);
    }
  };

  return (
    <ModalFlotante
      open={abierto}
      onClose={handleCerrar}
      onConfirm={handleConfirmar}
      titulo='Agregar Categorias'
      cancelLabel='Cancelar'
      confirmLabel={cargando ? 'Creando...' : 'Crear'}
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
      {(exito || error) && (
        <Alerta
          tipo={exito ? 'success' : 'error'}
          mensaje={mensaje}
          duracion={exito ? 4000 : 6000}
          sx={{ margin: 3 }}
          cerrable
          onClose={error ? () => setError(false) : undefined}
        />
      )}
    </ModalFlotante>
  );
};

export default ModalCrearCategoria;
