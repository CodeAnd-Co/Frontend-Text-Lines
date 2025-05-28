import { useState, useEffect, useCallback, useRef } from 'react';
import ModalFlotante from '@Organismos/ModalFlotante.jsx';
import FormaCrearSetsProducto from '@Organismos/Formularios/FormaCrearSetsProducto.jsx';
import useCrearSetsProducto from '@Hooks/SetsProductos/useCrearSetsProducto';
import Alerta from '@Moleculas/Alerta';

const ModalCrearSetsProductos = ({ abierto = false, onCerrar, onCreado }) => {
  const [nombreSetsProducto, setNombreSetsProducto] = useState('');
  const [nombreVisible, setNombreVisible] = useState('');
  const [descripcionSetsProducto, setDescripcionSetsProducto] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const tieneReseteo = useRef(false);

  const { crearSetsProducto, cargando, exito, error, mensaje, setError, resetEstado }
    = useCrearSetsProducto();

  useEffect(() => {
    if (!abierto && !tieneReseteo.current) {
      tieneReseteo.current = true;
      resetEstado();
      setTimeout(() => {
        setNombreSetsProducto('');
        setNombreVisible('');
        setDescripcionSetsProducto('');
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
    if (!nombreSetsProducto.trim() || !nombreVisible.trim() || productos.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    await crearSetsProducto({
      nombre: nombreSetsProducto.trim(),
      nombreVisible: nombreVisible.trim(),
      descripcion: descripcionSetsProducto.trim(),
      productos,
    });
  };

  return (<>
    <ModalFlotante
      open={abierto}
      onClose={handleCerrar}
      onConfirm={handleConfirmar}
      titulo='Crear sets de productos'
      cancelLabel='Cancelar'
      confirmLabel={cargando ? 'Creando...' : 'Crear'}
      disabledConfirm={cargando}
    >
      <FormaCrearSetsProducto
        nombreSetsProducto={nombreSetsProducto}
        setNombreSetsProducto={setNombreSetsProducto}
        nombreVisible={nombreVisible}
        setNombreVisible={setNombreVisible}
        descripcionSetsProducto={descripcionSetsProducto}
        setDescripcionSetsProducto={setDescripcionSetsProducto}
        productos={productos}
        setProductos={setProductos}
        mostrarAlerta={mostrarAlerta}
        setMostrarAlerta={setMostrarAlerta}
      />
    </ModalFlotante>
      {(exito || error) && (
        <Alerta
          tipo={exito ? 'success' : 'error'}
          mensaje={mensaje}
          duracion={exito ? 3000 : 3000}
          sx={{ margin: 3 }}
          cerrable
          onClose={error ? () => setError(false) : undefined}
          centradoInferior
        />
      )}
    </>
  );
};

export default ModalCrearSetsProductos;