import { useState } from 'react';
import Boton from '../Atomos/Boton';
import ModalFlotante from '../organismos/ModalFlotante';
import FormaCrearCategorias from './Formularios/FormaCrearCategoria';
import useCrearCategoria from '../../../hooks/Categorias/useCrearCategoria';
import Alerta from '../moleculas/Alerta';

const ModalCrearCategoria = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const { crearCategoria, cargando, exito, error, mensaje, setError, resetEstado }
    = useCrearCategoria();

  const handleAbrir = () => setMostrarFormulario(true);
  const handleCerrar = () => {
    setMostrarFormulario(false);
    setNombreCategoria('');
    setDescripcionCategoria('');
    setProductos([]);
    setMostrarAlerta(false);
    resetEstado();
  };

  const handleConfirmar = async () => {
    if (!nombreCategoria || productos.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    const fueCreada = await crearCategoria({
      nombreCategoria,
      descripcion: descripcionCategoria,
      productos,
    });

    if (fueCreada) {
      setTimeout(() => {
        handleCerrar();
      }, 2000);
    }
  };

  return (
    <>
      <Boton label={'Añadir'} variant={'contained'} onClick={handleAbrir} size='large' />
      <ModalFlotante
        open={mostrarFormulario}
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
    </>
  );
};

export default ModalCrearCategoria;
