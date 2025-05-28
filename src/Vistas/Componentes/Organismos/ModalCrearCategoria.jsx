import { useState, useEffect, useCallback, useRef } from 'react';
import ModalFlotante from '@Organismos/ModalFlotante';
import FormaCrearCategorias from '@Organismos/Formularios/FormaCrearCategoria';
import useCrearCategoria from '@Hooks/Categorias/useCrearCategoria';
import Alerta from '@Moleculas/Alerta';

const ModalCrearCategoria = ({ abierto = false, onCerrar, onCreado }) => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const tieneReseteo = useRef(false);

  const { crearCategoria, cargando, exito, error, mensaje, setError, resetEstado }
    = useCrearCategoria();

  useEffect(() => {
    if (!abierto && !tieneReseteo.current) {
      tieneReseteo.current = true;
      resetEstado();
      setTimeout(() => {
        setNombreCategoria('');
        setDescripcionCategoria('');
        setProductos([]);
        setMostrarAlerta(false);
      }, 0);
    } else if (abierto) {
      tieneReseteo.current = false;
    }
  }, [abierto, resetEstado]);

  useEffect(() => {
    let timeoutId;
    if (exito) {
      timeoutId = setTimeout(() => {
        if (onCreado) {
          onCreado();
        } else {
          onCerrar();
        }
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [exito, onCreado, onCerrar]);

  const handleCerrar = useCallback(() => {
    onCerrar();
  }, [onCerrar]);

  const handleConfirmar = async () => {
    if (!nombreCategoria.trim() || productos.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    await crearCategoria({
      nombreCategoria: nombreCategoria.trim(),
      descripcion: descripcionCategoria.trim(),
      productos,
    });
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
          duracion={exito ? 3000 :3000 }
          sx={{ margin: 3 }}
          cerrable
          onClose={error ? () => setError(false) : undefined}
        />
      )}
    </ModalFlotante>
  );
};

export default ModalCrearCategoria;
