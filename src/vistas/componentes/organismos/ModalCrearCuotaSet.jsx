import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../Atomos/Boton';
import FormaCrearCuotaSet from '../organismos/Formularios/FormaCrearCuotaSet';
import ModalFlotante from '../organismos/ModalFlotante';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

const ModalCrearCuotaSet = () => {
  const navegar = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreCuotaSet, setNombreCuotaSet] = useState('');
  const [descripcionCuotaSet, setDescripcionCuotaSet] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const handleAbrir = () => setMostrarFormulario(true);
  const handleCerrar = () => setMostrarFormulario(false);

  const handleConfirmar = () => {
    // Validar que el nombre y descripción no estén vacíos después de eliminar espacios
    // y que haya al menos un producto seleccionado
    if (!nombreCuotaSet.trim() || !descripcionCuotaSet.trim() || productos.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    // Navegar a la siguiente página con datos limpios (sin espacios innecesarios)
    navegar(
      `${RUTAS.SISTEMA_ADMINISTRATIVO.BASE_TABLERO}${RUTAS.SISTEMA_ADMINISTRATIVO.CUOTAS.EDITAR_CUOTAS}`,
      {
        state: {
          nombreCuotaSet: nombreCuotaSet.trim(),
          descripcion: descripcionCuotaSet.trim(),
          productos,
        },
      }
    );
  };

  return (
    <>
      <Boton label={'Añadir'} variant={'contained'} onClick={handleAbrir} size='large' />
      <ModalFlotante
        open={mostrarFormulario}
        onClose={handleCerrar}
        onConfirm={handleConfirmar}
        titulo='Agregar Set de Cuotas'
        cancelLabel='Cancelar'
        confirmLabel='Crear'
      >
        <FormaCrearCuotaSet
          nombreCuotaSet={nombreCuotaSet}
          setNombreCuotaSet={setNombreCuotaSet}
          descripcionCuotaSet={descripcionCuotaSet}
          setDescripcionCuotaSet={setDescripcionCuotaSet}
          productos={productos}
          setProductos={setProductos}
          mostrarAlerta={mostrarAlerta}
          setMostrarAlerta={setMostrarAlerta}
        />
      </ModalFlotante>
    </>
  );
};

export default ModalCrearCuotaSet;
