import { useState, useEffect, useCallback } from 'react';
import ModalFlotante from '../organismos/ModalFlotante';
import FormaCrearCategorias from './Formularios/FormaCrearCategoria';
import useCrearCategoria from '../../../hooks/Categorias/useCrearCategoria';
import Alerta from '../moleculas/Alerta';

const ModalCrearCategoria = ({ abierto = false, onCerrar, onCreado }) => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const { crearCategoria, cargando, exito, error, mensaje, setError, resetEstado }
    = useCrearCategoria();

  const resetForm = useCallback(() => {
    setNombreCategoria('');
    setDescripcionCategoria('');
    setProductos([]);
    setMostrarAlerta(false);
    resetEstado();
  }, [resetEstado]);

  const handleCerrar = useCallback(() => {
    resetForm();
    onCerrar();
  }, [resetForm, onCerrar]);

  // Resetea el estado cuando se cierra el modal
  useEffect(() => {
    if (!abierto) {
      resetForm();
    }
  }, [abierto, resetForm]);

  // Efecto para detectar cuando la creación es exitosa
  useEffect(() => {
    if (exito) {
      setTimeout(() => {
        if (onCreado) {
          onCreado();
        } else {
          handleCerrar();
        }
      }, 2000);
    }
  }, [exito, onCreado, handleCerrar]);

  const handleConfirmar = async () => {
    // Validar que el nombre de categoría no esté vacío después de eliminar espacios
    // y que haya al menos un producto seleccionado
    if (!nombreCategoria.trim() || productos.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    // Enviar datos con nombres limpios (sin espacios innecesarios)
    await crearCategoria({
      nombreCategoria: nombreCategoria.trim(),
      descripcion: descripcionCategoria.trim(),
      productos,
    });

    // No necesitamos hacer nada más aquí, el useEffect para exito se encargará
    // de llamar a onCreado cuando sea necesario
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
